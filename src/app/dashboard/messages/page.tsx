
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
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
  Users,
  Bot,
  Loader2,
  AlertTriangle,
  Languages,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useUser } from '@/firebase';
import { addDoc, collection, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

const DUMMY_PROJECT_ID = '1042';

interface Message {
    id?: string;
    senderId: string;
    text: string;
    timestamp: any;
    senderName: string;
    senderAvatar: string;
    translations?: Record<string, string>;
}

const aiBotContact = {
    id: 'ai-gemini-bot',
    name: 'AI Gemini Bot',
    isBot: true,
};

export default function MessagesPage() {
    const { toast } = useToast();
    const [input, setInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const firestore = useFirestore();
    const { user } = useUser();
    const [activeChat, setActiveChat] = useState<any>(null);


    // In a real app, you would fetch a list of user's projects/chats
    const projectsQuery = useMemo(() => {
        if (!firestore || !user) return null;
        return query(collection(firestore, 'projects'), where("clientId", "==", user.uid));
    }, [firestore, user]);
    const { data: projects, isLoading: projectsLoading } = useCollection(projectsQuery);
    
    useEffect(() => {
        if (!activeChat && projects && projects.length > 0) {
            setActiveChat(projects[0]);
        }
    }, [projects, activeChat]);

    const activeChatId = activeChat?.id;

    const messagesQuery = useMemo(() => {
        if (!firestore || !activeChatId) return null;
        const collectionPath = activeChat.isBot ? `bots/${activeChatId}/messages` : `projects/${activeChatId}/messages`;
        return query(collection(collectionPath), orderBy('timestamp', 'asc'));
    }, [firestore, activeChatId, activeChat?.isBot]);

    const { data: messages, isLoading: messagesLoading, error: messagesError } = useCollection<Message>(messagesQuery);
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);


    const handleSend = async () => {
        if (!input.trim() || !firestore || !user || !activeChatId) return;
        
        const collectionPath = activeChat.isBot ? `bots/${activeChatId}/messages` : `projects/${activeChatId}/messages`;

        const messageData: any = {
            senderId: user.uid,
            timestamp: serverTimestamp(),
            senderName: user.displayName || 'अनाम',
            senderAvatar: user.photoURL || user.displayName?.[0] || 'U',
        };

        // The Gemini Chatbot extension expects the user's prompt in a field named `prompt`
        if (activeChat.isBot) {
            messageData.prompt = input;
        } else {
            messageData.text = input;
            messageData.projectId = activeChatId;
        }

        setInput('');
        
        try {
            await addDoc(collection(firestore, collectionPath), messageData);
        } catch (error) {
            console.error("Error sending message:", error);
            toast({
                variant: 'destructive',
                title: 'त्रुटि',
                description: 'संदेश भेजने में विफल।',
            });
            // Re-set input if sending failed
            setInput(input);
        }
    };

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
                        placeholder="संपर्क खोजें..." 
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
                    
                    {/* AI Bot Contact */}
                    <div onClick={() => setActiveChat(aiBotContact)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors ${activeChat?.id === aiBotContact.id ? 'bg-secondary' : ''}`}>
                         <Avatar className="relative">
                            <AvatarFallback><Bot/></AvatarFallback>
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-secondary"></div>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold">{aiBotContact.name}</p>
                            <p className="text-xs text-muted-foreground truncate">सहायता और जानकारी</p>
                        </div>
                    </div>

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
                            <AvatarFallback>{activeChat?.isBot ? <Bot/> : activeChat?.name[0] || '?'}</AvatarFallback>
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                        </Avatar>
                        <div>
                            <h3 className="font-bold">{activeChat?.name || 'चैट चुनें'}</h3>
                            <p className="text-xs text-green-400 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                ऑनलाइन
                            </p>
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
                            // Gemini bot extension puts the response in `response`, not `text`
                            const messageText = activeChat.isBot ? msg.response : msg.text;
                            return (
                                <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                    {msg.senderId !== user?.uid && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={msg.senderAvatar}/>
                                            <AvatarFallback>{msg.senderName?.[0] || <Bot />}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div>
                                        <div className={`flex items-baseline gap-2 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}>
                                            <p className="font-semibold text-sm">{msg.senderId === user?.uid ? 'आप' : msg.senderName || 'AI Bot'}</p>
                                            <p className="text-xs text-muted-foreground">{msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}) : ''}</p>
                                        </div>
                                        <div className={`max-w-xs rounded-2xl p-3 mt-1 relative group ${
                                            msg.senderId === user?.uid
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-secondary rounded-bl-none'
                                        }`}
                                        >
                                            {messageText}
                                            {/* Translate Text extension adds a 'translations' map */}
                                            {msg.translations?.en && (
                                                <div className="absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Badge variant="outline" className="text-xs bg-card">
                                                        <Languages className="mr-1.5 h-3 w-3" />
                                                        {msg.translations.en}
                                                    </Badge>
                                                </div>
                                            )}
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
                                {activeChatId ? `इस ${activeChat.isBot ? 'बॉट' : 'प्रोजेक्ट'} के लिए अभी कोई संदेश नहीं हैं।` : 'शुरू करने के लिए एक चैट चुनें।'}
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
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={!user || !activeChatId}
                        />
                        <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleAction('फ़ाइल अटैचमेंट की सुविधा जल्द ही आ रही है।')}>
                            <Paperclip />
                        </Button>
                        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90" onClick={handleSend} disabled={!input.trim()}>
                            <Send />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}

    
