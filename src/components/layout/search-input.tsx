'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function SearchInput() {
    const router = useRouter();
    const [globalSearch, setGlobalSearch] = useState('');

    const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && globalSearch.trim()) {
            router.push(`/dashboard/search?q=${encodeURIComponent(globalSearch.trim())}`);
        }
    }

    return (
        <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="प्रोजेक्ट, फ़ाइलें, और संदेश खोजें..."
                className="pl-10 h-11 bg-card/50 border-border/30"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                onKeyDown={handleGlobalSearch}
            />
        </div>
    );
}
