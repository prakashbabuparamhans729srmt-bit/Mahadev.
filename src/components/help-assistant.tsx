'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HelpCircle, Send, Cpu, Bot, User, Mic, Paperclip } from 'lucide-react';
import { assistantFlow } from '@/ai/flows/assistant-flow';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Declare SpeechRecognition types for window object
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export function HelpAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // States for dragging functionality
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // States for speech recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages, isLoading]);

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearResetTimer();
    };
  }, []);

  // Setup Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'hi-IN'; // Hindi
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      toast({
        variant: 'destructive',
        title: 'Voice Error',
        description: `An error occurred: ${event.error}`,
      });
      setIsListening(false);
    };
    
    recognition.onend = () => {
        setIsListening(false);
    }

    recognitionRef.current = recognition;
  }, [toast]);


  const handleSend = async () => {
    if (!input.trim()) return;
    clearResetTimer(); // Interaction detected

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // We pass the current input and the updated message history to the flow
      const response = await assistantFlow({ query: currentInput, history: [...messages, userMessage] });
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = { role: 'assistant', content: "माफ़ कीजिए, कुछ गड़बड़ हो गई। कृपया फिर से प्रयास करें।" };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("AI Assistant Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    clearResetTimer(); // Interaction detected
    if (!recognitionRef.current) {
        toast({
            variant: 'destructive',
            title: 'Unsupported Browser',
            description: 'Your browser does not support speech recognition.',
        });
        return;
    }
    
    if (isListening) {
        recognitionRef.current.stop();
    } else {
        setInput(''); // Clear input before starting
        recognitionRef.current.start();
        setIsListening(true);
    }
  };
  
  const handleAttachFile = () => {
      clearResetTimer(); // Interaction detected
      toast({
          title: "सुविधा जल्द ही आ रही है",
          description: "फ़ाइल अटैचमेंट की सुविधा जल्द ही लागू की जाएगी।",
      });
  };

  // Mouse down event to start dragging
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    clearResetTimer(); // Clear timer on new drag
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPositionRef.current = { x: position.x, y: position.y };
    e.preventDefault();
  };

  // Mouse move event to update position while dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: initialPositionRef.current.x + dx,
      y: initialPositionRef.current.y + dy,
    });
  };

  // Mouse up event to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // If the popover is open, start a timer to reset its position
    if (isOpen) {
      clearResetTimer(); // Clear any existing timer
      resetTimerRef.current = setTimeout(() => {
        if (!isDragging) { // Add a check to ensure it's not currently being dragged
            setPosition({ x: 0, y: 0 });
        }
        resetTimerRef.current = null;
      }, 10000); // 10 seconds
    }
  };
  
  // Effect to add and remove global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset position and clear timer when popover is closed
      setPosition({ x: 0, y: 0 });
      clearResetTimer();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-2xl"
          size="icon"
        >
          <HelpCircle className="h-9 w-9" />
          <span className="sr-only">Help Assistant</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 mr-4 mb-2 p-0 border-0 shadow-2xl rounded-2xl" 
        side="top" 
        align="end"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onPointerMove={clearResetTimer} // Clear timer on any interaction with the content
        onFocusCapture={clearResetTimer} // Clear timer when content gains focus
      >
        <div className="flex flex-col h-[60vh] max-h-[700px] bg-card rounded-2xl">
          <div 
            onMouseDown={handleMouseDown}
            className="p-4 border-b text-center bg-secondary/30 rounded-t-2xl cursor-grab active:cursor-grabbing"
          >
            <h4 className="font-bold leading-none flex items-center justify-center">
              <Cpu className="mr-2 text-primary" />
              AI सहायक
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              मैं आपकी कैसे मदद कर सकता हूँ?
            </p>
          </div>
          
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                  )}
                  <div
                    className={`max-w-xs rounded-2xl p-3 text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                   {message.role === 'user' && (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                      <User size={20} />
                    </div>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3">
                   <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Bot size={20} />
                    </div>
                  <div className="max-w-xs rounded-2xl p-3 text-sm bg-secondary rounded-bl-none flex items-center">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150 ml-1"></div>
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300 ml-1"></div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="relative">
              <Input
                placeholder={isListening ? "सुन रहा हूँ..." : "एक संदेश लिखें..."}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clearResetTimer();
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                className="pl-12 pr-12 rounded-full"
              />
               <Button
                size="icon"
                variant="ghost"
                className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleAttachFile}
                disabled={isLoading}
              >
                <Paperclip size={18} />
              </Button>
              {input.trim() ? (
                <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                    onClick={handleSend}
                    disabled={isLoading}
                >
                    <Send size={18} />
                </Button>
              ) : (
                <Button
                    size="icon"
                    variant={isListening ? 'destructive' : 'default'}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                    onClick={handleMicClick}
                    disabled={isLoading}
                >
                    <Mic size={18} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
