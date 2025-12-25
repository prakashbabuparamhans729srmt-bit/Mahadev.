
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CtaSection() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "डेटाबेस कनेक्शन उपलब्ध नहीं है।",
        });
        return;
    }
    
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        service: formData.get('service') as string,
        idea: formData.get('idea') as string,
    };

    try {
        const inquiriesCollection = collection(firestore, 'inquiries');
        await addDoc(inquiriesCollection, {
            ...data,
            createdAt: serverTimestamp(),
        });
        
        setIsAlertOpen(true);
        form.reset();
    } catch (error) {
        console.error("Error submitting inquiry:", error);
        toast({
            variant: "destructive",
            title: "त्रुटि",
            description: "आपकी पूछताछ भेजने में विफल। कृपया बाद में पुनः प्रयास करें।",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
    <section className="bg-card border-b">
      <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-headline text-6xl font-bold tracking-tighter sm:text-7xl xl:text-8xl/none italic">
                <span className="block text-foreground">चलो कुछ</span>
                <span className="block text-accent">बेहतरीन</span>
                <span className="block text-foreground">बनाएं।</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                एक विचार है? हम उसे वास्तविकता में बदलने के लिए तैयार हैं। आज
                ही अपनी यात्रा शुरू करें।
              </p>
            </div>
          </div>
          <div className="bg-secondary/30 p-8 rounded-2xl shadow-2xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">नाम</label>
                  <Input name="name" id="name" placeholder="उदा. राहुल" type="text" className="bg-background/50 border-border" required />
                </div>
                <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-medium text-muted-foreground">ईमेल</label>
                  <Input name="email" id="email" placeholder="email@example.com" type="email" className="bg-background/50 border-border" required />
                </div>
              </div>
              <div className="space-y-2">
                 <label htmlFor="service" className="text-sm font-medium text-muted-foreground">सेवा</label>
                <Input name="service" id="service" placeholder="वेबसाइट डेवलपमेंट" type="text" className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                 <label htmlFor="idea" className="text-sm font-medium text-muted-foreground">आपका आईडिया</label>
                <Textarea name="idea" id="idea" placeholder="हमें थोड़ा विस्तार से बताएं..." rows={4} className="bg-background/50 border-border" required />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transition-transform duration-200 hover:scale-105" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Send className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'भेज रहा है...' : 'संदेश भेजें'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
     <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>संदेश भेजा गया!</AlertDialogTitle>
            <AlertDialogDescription>
              आपकी पूछताछ प्राप्त हो गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी। धन्यवाद!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlertOpen(false)}>ठीक है</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    