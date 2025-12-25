'use client';

import { useState, useEffect, useRef } from 'react';
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
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const initialContacts = [
    {
        name: 'स्मार्ट ERP टीम',
        avatar: 'S',
        lastMessage: 'बढ़िया, रिव्यू करते हैं।',
        time: '11:00 AM',
        unread: 0,
        online: true,
        type: 'group'
    },
    {
        name: 'ई-कॉमर्स पोर्टल टीम',
        avatar: 'E',
        lastMessage: 'हाँ, डिज़ाइन स्वीकृत है।',
        time: 'कल',
        unread: 2,
        online: false,
        type: 'group'
    },
    {
        name: 'प्रिया शर्मा (UI/UX)',
        avatar: 'P',
        lastMessage: 'मैं आपको वायरफ्रेम भेज रही हूँ।',
        time: '18/04/24',
        unread: 0,
        online: true,
        type: 'user'
    },
    {
        name: 'HG-Bot',
        avatar: <Bot size={20}/>,
        lastMessage: 'मैं आपकी कैसे मदद कर सकता हूँ?',
        time: '17/04/24',
        unread: 0,
        online: true,
        type: 'bot'
    }
];

const initialMessages = [
    { role: 'other', name: 'राहुल', text: 'नमस्ते, प्रोजेक्ट अपडेट तैयार है। क्या हम कल सुबह रिव्यू कर सकते हैं?', time: '10:45 AM', avatar: 'R' },
    { role: 'me', name: 'अमित कुमार', text: 'बढ़िया, रिव्यू करते हैं। मैं 11 बजे फ्री हूँ।', time: '11:00 AM', avatar: 'A' },
];


export default function MessagesPage() {
    const { toast } = useToast();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState(initialMessages);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(initialContacts);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = initialContacts.filter(contact =>
            contact.name.toLowerCase().includes(lowercasedQuery) ||
            contact.lastMessage.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredContacts(filtered);
    }, [searchQuery]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);


    const handleSend = () => {
        if (!input.trim()) return;
        
        setMessages(prev => [
            ...prev,
            { role: 'me', name: 'अमित कुमार', text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}), avatar: 'A' }
        ]);

        setInput('');
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
                        placeholder="संदेश या संपर्क खोजें..." 
                        className="pl-9 bg-card/50" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
             <ScrollArea className="flex-1">
                <div className="flex gap-2 p-2 border-b border-border/50">
                    <Button variant="ghost" size="sm" onClick={() => toast({ description: 'सभी संदेश दिखाए जा रहे हैं।' })}>सभी</Button>
                    <Button variant="ghost" size="sm" className="relative" onClick={() => toast({ description: 'केवल अपठित संदेश दिखाए जा रहे हैं।' })}>
                        अपठित
                        <Badge className="absolute -top-1 -right-2 h-4 w-4 justify-center p-0">2</Badge>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('तारांकित संदेश दिखाने की सुविधा जल्द ही आएगी।')}><Star className="h-4 w-4"/></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('संग्रहीत संदेश दिखाने की सुविधा जल्द ही आएगी।')}><Archive className="h-4 w-4"/></Button>
                </div>
                <div className="p-2 space-y-1">
                    {filteredContacts.map(contact => (
                        <div key={contact.name} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors bg-secondary">
                             <Avatar className="relative">
                                <AvatarFallback>{contact.avatar}</AvatarFallback>
                                {contact.online && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-secondary"></div>}
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{contact.name}</p>
                                    <p className="text-xs text-muted-foreground">{contact.time}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                                    {contact.unread > 0 && <Badge className="h-5 w-5 justify-center p-0 bg-primary">{contact.unread}</Badge>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="w-2/3 h-full flex flex-col p-4 pb-0">
             <Card className="flex-1 flex flex-col bg-card/50 border-border/30 rounded-2xl">
                <CardHeader className="flex-row items-center justify-between p-4 border-b border-border/50">
                    <div className="flex items-center gap-3">
                         <Avatar className="relative">
                            <AvatarFallback>S</AvatarFallback>
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></div>
                        </Avatar>
                        <div>
                            <h3 className="font-bold">स्मार्ट ERP टीम</h3>
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
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'me' ? 'justify-end' : ''}`}>
                                {msg.role === 'other' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{msg.avatar}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div>
                                    <div className={`flex items-baseline gap-2 ${msg.role === 'me' ? 'justify-end' : ''}`}>
                                        <p className="font-semibold text-sm">{msg.name}</p>
                                        <p className="text-xs text-muted-foreground">{msg.time}</p>
                                    </div>
                                    <div className={`max-w-xs rounded-2xl p-3 mt-1 ${
                                        msg.role === 'me'
                                            ? 'bg-primary text-primary-foreground rounded-br-none'
                                            : 'bg-secondary rounded-bl-none'
                                    }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                                {msg.role === 'me' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://picsum.photos/seed/1/100/100" />
                                        <AvatarFallback>{msg.avatar}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
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
                        />
                        <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleAction('फ़ाइल अटैचमेंट की सुविधा जल्द ही आ रही है।')}>
                            <Paperclip />
                        </Button>
                        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-primary hover:bg-primary/90" onClick={handleSend}>
                            <Send />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  );
}
