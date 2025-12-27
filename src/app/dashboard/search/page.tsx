'use client';

import { Suspense, useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useUser, useAuth } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2, MessageSquare, Briefcase, Search, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { getFileIcon } from '@/lib/file-icons';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { firebaseWithRetry } from '@/lib/firebase-retry';


async function performSearch(token: string, query: string) {
    const API_URL = `/api/search?q=${encodeURIComponent(query)}`;
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to perform search');
        }
        const data = await response.json();
        return data.data;
    });
}


function SearchResults() {
    const searchParams = useSearchParams();
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const q = searchParams.get('q') || '';
    const { toast } = useToast();

    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!isUserLoading && user && auth && q) {
                setIsLoading(true);
                setError(null);
                try {
                    const token = await auth.currentUser?.getIdToken();
                    if (!token) throw new Error("Authentication token not available.");
                    const results = await performSearch(token, q);
                    setSearchResults(results);
                } catch (err: any) {
                    setError(err);
                    toast({
                        variant: 'destructive',
                        title: 'Search Failed',
                        description: err.message,
                    });
                } finally {
                    setIsLoading(false);
                }
            } else if (!isUserLoading) {
                setIsLoading(false);
            }
        };

        fetchSearch();

    }, [user, auth, q, isUserLoading, toast]);


    if (!q) {
        return (
            <div className="text-center py-10">
                <p className="text-muted-foreground">खोजने के लिए कुछ टाइप करें।</p>
            </div>
        );
    }
    
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        )
    }
    
    if (error) {
        return (
             <div className="text-center py-20 bg-card rounded-lg border">
                <AlertTriangle className="h-10 w-10 mx-auto text-destructive mb-4" />
                <p className="text-lg font-semibold">खोज विफल</p>
                <p className="text-muted-foreground text-sm">{error.message}</p>
            </div>
        )
    }


    if (searchResults.length === 0) {
        return (
            <div className="text-center py-20 bg-card rounded-lg border">
                <AlertTriangle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-semibold">कोई परिणाम नहीं मिला</p>
                <p className="text-muted-foreground text-sm">"{q}" के लिए कोई प्रोजेक्ट, फ़ाइल या संदेश नहीं मिला।</p>
            </div>
        );
    }

    const getIcon = (type: string, fileType?: string) => {
        switch (type) {
            case 'प्रोजेक्ट': return <Briefcase className="h-6 w-6 text-primary" />;
            case 'फ़ाइल': return getFileIcon(fileType || 'file');
            case 'संदेश': return <MessageSquare className="h-6 w-6 text-blue-500" />;
            default: return <FileText className="h-6 w-6 text-muted-foreground" />;
        }
    };
    
    const getLink = (item: any) => {
        switch (item.type) {
            case 'प्रोजेक्ट': return `/dashboard/project/${item.id}`;
            case 'फ़ाइल': return `/dashboard/files`; // Ideally link to the specific file
            case 'संदेश': return `/dashboard/messages`; // Ideally link to the specific message
            default: return '/dashboard';
        }
    }


    return (
        <div className="space-y-4">
            {searchResults.map((item, index) => (
                <Link href={getLink(item)} key={index}>
                    <Card className="hover:bg-secondary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4 flex items-start gap-4">
                             <div className="p-3 bg-secondary rounded-lg">
                                {getIcon(item.type, item.fileType)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{item.name || item.text.substring(0, 50) + '...'}</p>
                                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">{item.type}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 truncate">
                                    {item.description || item.size || `From: ${item.senderName}`}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

export default function SearchPage() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || '';

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3 mb-8">
              <Search className="h-7 w-7 text-primary"/>
              खोज परिणाम
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>"{q}" के लिए परिणाम</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<Loader2 className="mx-auto h-8 w-8 animate-spin" />}>
                        <SearchResults />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
