'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Video,
  MoreHorizontal,
  Paperclip,
  Send,
  Archive,
  Star,
  Loader2,
  AlertTriangle,
  Mic,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useUser, useAuth } from '@/firebase';
import { addDoc, collection, query, where, orderBy, serverTimestamp, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { FirestorePermissionError, errorEmitter } from '@/firebase';
import { firebaseWithRetry } from '@/lib/firebase-retry';
import { debounce } from 'lodash';

interface Message {
    id?: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    timestamp: any;
    status?: 'sending' | 'sent' | 'failed';
    translations?: Record<string, string>;
}

async function getProjects(token: string) {
    const API_URL = '/api/projects';
    return firebaseWithRetry(async () => {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch projects');
        }
        const data = await response.json();
        return data.data;
    });
}

const useTypingIndicator = (chatId: string | null) => {
    const firestore = useFirestore();
    const { user } = useUser();
    const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});

    const sendTypingEvent = useMemo(() =>
        debounce(() => {
            if (!firestore || !user || !chatId) return;
            const typingRef = doc(firestore, `projects/${chatId}/typing`, user.uid);
            setDoc(typingRef, {
                displayName: user.displayName || 'अनाम',
                timestamp: serverTimestamp(),
            });
        }, 500),
    [firestore, user, chatId]);

    useEffect(() => {
        if (!firestore || !chatId || !user) return;

        const typingColRef = collection(firestore, `projects/${chatId}/typing`);
        const unsubscribe = onSnapshot(typingColRef, (snapshot) => {
            const now = Date.now();
            const newTypingUsers: Record<string, string> = {};

            snapshot.docs.forEach((doc) => {
                const data = doc.data();
                const docTime = data.timestamp?.toDate().getTime();
                
                // Only consider recent typing events (within 10 seconds) and not self
                if (doc.id !== user.uid && now - docTime < 10000) {
                     newTypingUsers[doc.id] = data.displayName || 'कोई';
                }
            });
            setTypingUsers(newTypingUsers);
        });

        return () => unsubscribe();
    }, [firestore, chatId, user]);
    
    return { typingUsers, sendTypingEvent };
}


export default function MessagesPage() {
    const { toast } = useToast();
    const [input, setInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();
    const auth = useAuth();
    const [activeChat, setActiveChat] = useState<any>(null);

    const [projects, setProjects] = useState<any[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!isUserLoading && user && auth) {
                try {
                    const token = await user.getIdToken();
                    const userProjects = await getProjects(token);
                    setProjects(userProjects);
                    if (!activeChat && userProjects.length > 0) {
                        setActiveChat(userProjects[0]);
                    }
                } catch (err: any) {
                    toast({
                        variant: "destructive",
                        title: "Error fetching projects",
                        description: err.message,
                    });
                } finally {
                    setProjectsLoading(false);
                }
            } else if (!isUserLoading) {
                setProjectsLoading(false);
            }
        };

        if(projectsLoading) {
            fetchProjects();
        }
    }, [user, isUserLoading, toast, activeChat, projectsLoading]);
    
    const activeChatId = activeChat?.id;

    const messagesQuery = useMemo(() => {
        if (!firestore || !activeChatId) return null;
        return query(collection(firestore, `projects/${activeChatId}/messages`), orderBy('timestamp', 'asc'));
    }, [firestore, activeChatId]);

    const { data: messages, setData: setMessages, isLoading: messagesLoading, error: messagesError } = useCollection<Message>(messagesQuery);
    const { typingUsers, sendTypingEvent } = useTypingIndicator(activeChatId);
    
    const otherTypingUser = Object.values(typingUsers)[0];
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, typingUsers]);


    const handleSend = useCallback(async () => {
      if (!input.trim() || !firestore || !user || !activeChatId) return;

      const tempId = `temp-${Date.now()}`;
      const messageText = input;
      setInput('');

      const tempMessage: Message = {
        id: tempId,
        senderId: user.uid,
        senderName: user.displayName || 'अनाम',
        senderAvatar: user.photoURL || user.displayName?.[0] || 'U',
        text: messageText,
        timestamp: new Date(),
        status: 'sending',
      };
      
      // Optimistic UI update
      setMessages(prev => prev ? [...prev, tempMessage] : [tempMessage]);
      
      try {
        const messagesCollection = collection(firestore, `projects/${activeChatId}/messages`);
        const messageDocRef = doc(messagesCollection); // Get a new doc ref
        
        await setDoc(messageDocRef, {
            senderId: user.uid,
            senderName: user.displayName || 'अनाम',
            senderAvatar: user.photoURL || user.displayName?.[0] || 'U',
            text: messageText,
            timestamp: serverTimestamp(),
            projectId: activeChatId,
        });

        // No need to update status on success, onSnapshot will handle it.
        // We remove the temp message once the real one arrives via onSnapshot.
        // This logic is implicitly handled by `useCollection` as it refreshes `messages`
        // and the temp message with its ID won't be in the new snapshot.
        // To be perfectly robust, one might filter out the temp message if the real one has arrived.
        // But for now, we rely on the collection refresh.

      } catch (serverError) {
            setMessages(prev => prev?.map(m => m.id === tempId ? { ...m, status: 'failed' } : m) ?? null);
            console.error("Error sending message:", serverError);
            const permissionError = new FirestorePermissionError({
              path: `projects/${activeChatId}/messages`,
              operation: 'create',
              requestResourceData: { text: messageText },
            });
            errorEmitter.emit('permission-error', permissionError);
            toast({
                variant: 'destructive',
                title: 'त्रुटि',
                description: 'संदेश भेजने में विफल।',
            });
            setInput(messageText); // Re-set input if sending failed
      }
    }, [input, firestore, user, activeChatId, toast, setMessages]);

    const handleAction = (message: string) => {
        toast({
            title: "सुविधा जल्द ही आ रही है",
            description: message,
        });
    }


  return (
    <div className="h-full flex text-sm">
        {/* Left Sidebar for contacts */}
        <div className="w-1/3 border-r border-border/50 h-full flex flex-col">
            <div className="p-4 border-b border-border/50">
                <h2 className="font-bold text-lg font-headline">चैट्स</h2>
                 <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="प्रोजेक्ट खोजें..." 
                        className="pl-9 bg-card/50" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
             <ScrollArea className="flex-1">
                <div className="flex gap-2 p-2 border-b border-border/50">
                    <Button variant="ghost" size="sm">सभी</Button>
                    <Button variant="ghost" size="sm" className="relative">अपठित</Button>
                    <Button variant="ghost" size="sm"><Star className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="sm"><Archive className="h-4 w-4"/></Button>
                </div>
                <div className="p-2 space-y-1">
                    {projectsLoading && <div className="p-4 text-center"><Loader2 className="h-5 w-5 animate-spin mx-auto"/></div>}
                    
                    {/* Project Contacts */}
                    {projects?.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(project => (
                        <div key={project.id} onClick={() => setActiveChat(project)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors ${activeChat?.id === project.id ? 'bg-secondary' : ''}`}>
                             <Avatar className="relative">
                                <AvatarFallback>{project.name[0]}</AvatarFallback>
                                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-secondary"></div>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{project.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-xs text-muted-foreground truncate">प्रोजेक्ट चैनल</p>
                                </div>
                            </div>
                        </div>
                    ))}
                     {(!projects || projects.length === 0) && !projectsLoading && (
                        <div className="p-4 text-center text-xs text-muted-foreground">
                            कोई प्रोजेक्ट नहीं मिला।
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="w-2/3 h-full flex flex-col p-4 pb-0">
             <Card className="flex-1 flex flex-col bg-card/50 border-border/30 rounded-2xl">
                <CardHeader className="flex-row items-center justify-between p-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                         <Avatar className="relative">
                            <AvatarFallback>{activeChat?.name[0] || '?'}</AvatarFallback>
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                        </Avatar>
                        <div>
                            <h3 className="font-bold">{activeChat?.name || 'चैट चुनें'}</h3>
                            {otherTypingUser ? (
                                <p className="text-xs text-primary animate-pulse">{otherTypingUser} टाइप कर रहा है...</p>
                            ) : (
                                <p className="text-xs text-green-400 flex items-center gap-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    ऑनलाइन
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleAction('वीडियो कॉल की सुविधा जल्द ही आ रही है।')}><Video className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleAction('अधिक विकल्प दिखाने की सुविधा जल्द ही आएगी।')}><MoreHorizontal className="h-5 w-5"/></Button>
                    </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messagesLoading && <div className="flex justify-center items-center h-full"><Loader2 className="h-6 w-6 animate-spin"/></div>}
                        {messagesError && <div className="text-center text-destructive"><AlertTriangle className="mx-auto mb-2"/> संदेश लोड करने में विफल।</div>}
                        {messages?.map((msg) => {
                            const isSending = msg.status === 'sending';
                            const isFailed = msg.status === 'failed';
                            const timestamp = msg.timestamp ? (msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp)) : new Date();

                            return (
                                <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                    {msg.senderId !== user?.uid && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={msg.senderAvatar}/>
                                            <AvatarFallback>{msg.senderName?.[0]}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={isFailed ? 'opacity-70' : ''}>
                                        <div className={`flex items-baseline gap-2 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                            <p className="font-semibold text-sm">{msg.senderId === user?.uid ? 'आप' : msg.senderName}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {isSending ? 'भेज रहा है...' : new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}
                                            </p>
                                        </div>
                                        <div className={`max-w-xs rounded-2xl p-3 mt-1 relative group ${
                                            msg.senderId === user?.uid
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-secondary rounded-bl-none'
                                        }`}
                                        >
                                            {msg.text}
                                            {isFailed && <span className="text-destructive-foreground text-xs block pt-1">(विफल)</span>}
                                        </div>
                                    </div>
                                    {msg.senderId === user?.uid && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.photoURL || ''} />
                                            <AvatarFallback>{user.displayName?.[0] || 'U'}</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            );
                        })}
                         {(!messages || messages.length === 0) && !messagesLoading && (
                            <div className="text-center text-xs text-muted-foreground pt-10">
                                {activeChatId ? `इस प्रोजेक्ट के लिए अभी कोई संदेश नहीं हैं।` : 'शुरू करने के लिए एक चैट चुनें।'}
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 mt-auto">
                    <div className="relative bg-secondary/80 rounded-full">
                        <Input 
                            placeholder="अपना संदेश यहाँ टाइप करें..." 
                            className="bg-transparent border-none rounded-full h-12 pr-24 pl-12" 
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                sendTypingEvent();
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={!user || !activeChatId}
                        />
                        <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleAction('फ़ाइल अटैचमेंट की सुविधा जल्द ही आ रही है।')}>
                            <Paperclip />
                        </Button>
                        {input.trim() ? (
                            <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90" onClick={handleSend} disabled={!input.trim()}>
                                <Send />
                            </Button>
                        ) : (
                             <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90" onClick={() => handleAction('ऑडियो संदेश की सुविधा जल्द ही आ रही है।')}>
                                <Mic />
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}
