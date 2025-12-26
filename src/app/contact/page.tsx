'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import React, { type FormEvent, useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const idea = formData.get('message') as string;

    try {
        const inquiriesCollection = collection(firestore, 'inquiries');
        await addDoc(inquiriesCollection, {
            name: name,
            email: email,
            idea: idea,
            createdAt: serverTimestamp(),
        });

        toast({
            title: "संदेश भेजा गया!",
            description: "आपकी पूछताछ प्राप्त हो गई है। हम जल्द ही आपसे संपर्क करेंगे।",
        });
        form.reset();
    } catch (error: any) {
        console.error("Error submitting inquiry:", error);
        toast({
            variant: "destructive",
            title: "त्रुटि",
            description: error.message || "आपका संदेश भेजने में विफल। कृपया बाद में पुनः प्रयास करें।",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-b">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <h1 className="font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                  हमसे संपर्क करें
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  कोई सवाल है या प्रोजेक्ट शुरू करना चाहते हैं? हमें एक संदेश भेजें और हम जल्द से जल्द आपसे संपर्क करेंगे।
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-6 w-6 text-accent" />
                    <div>
                      <h3 className="font-semibold">ईमेल</h3>
                      <a href="mailto:info@hajarograhako.com" className="text-muted-foreground hover:text-primary">
                        info@hajarograhako.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-6 w-6 text-accent" />
                    <div>
                      <h3 className="font-semibold">फ़ोन</h3>
                      <p className="text-muted-foreground">+91-XXXXXXXXXX</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">आपका नाम</Label>
                    <Input id="name" name="name" type="text" placeholder="आपका नाम" className="w-full" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">आपका ईमेल</Label>
                    <Input id="email" name="email" type="email" placeholder="आपका ईमेल" className="w-full" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">आपका संदेश</Label>
                    <Textarea id="message" name="message" placeholder="आपका संदेश..." className="w-full" rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <MessageSquare className="mr-2 h-4 w-4" />
                    )}
                    {isLoading ? 'भेज रहा है...' : 'संदेश भेजें'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
