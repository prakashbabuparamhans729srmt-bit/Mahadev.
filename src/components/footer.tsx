"use client";

import Link from "next/link";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Send } from "lucide-react";
import React, { useState } from "react";
import { useFirestore } from "@/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

function NewsletterForm() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
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
        const email = formData.get('email') as string;

        if (!email) {
            toast({
                variant: "destructive",
                title: "त्रुटि",
                description: "कृपया एक ईमेल पता दर्ज करें।",
            });
            setIsLoading(false);
            return;
        }

        try {
            // The Mailchimp extension will be configured to listen to this collection
            const subscriberRef = doc(firestore, 'mailchimp_subscribers', email);
            await setDoc(subscriberRef, {
                subscribed_at: serverTimestamp(),
            });

            toast({
                title: "सब्सक्राइब करने के लिए धन्यवाद!",
                description: "आपको हमारे न्यूज़लेटर में जोड़ दिया गया है।",
            });
            form.reset();
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            toast({
                variant: "destructive",
                title: "त्रुटि",
                description: "सदस्यता लेने में विफल। कृपया बाद में पुनः प्रयास करें।",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-4">
             <h3 className="font-semibold tracking-wider uppercase">न्यूज़लेटर</h3>
             <p className="text-sm text-muted-foreground">
                नवीनतम अपडेट और ऑफ़र प्राप्त करने के लिए सब्सक्राइब करें।
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <Input name="email" type="email" placeholder="आपका ईमेल" className="bg-background/50 border-border" required />
                <Button type="submit" size="icon" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                </Button>
            </form>
        </div>
    )
}

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Hajaro Grahako</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              पूर्ण विकास समाधान: आपकी दृष्टि, हमारा कोड।
            </p>
            <div className="text-sm text-muted-foreground">
              <p>📞 +91-XXXXXXXXXX</p>
              <p>✉️ info@hajarograhako.com</p>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold tracking-wider uppercase">सेवाएं</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">वेबसाइट डेवलपमेंट</Link></li>
                <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">मोबाइल ऐप्स</Link></li>
                <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">वेब ऐप</Link></li>
                <li><Link href="/#services" className="text-sm text-muted-foreground hover:text-foreground">कस्टम सॉल्यूशंस</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold tracking-wider uppercase">कंपनी</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground">हमारे बारे में</Link></li>
                <li><Link href="/#portfolio" className="text-sm text-muted-foreground hover:text-foreground">पोर्टफोलियो</Link></li>
                <li><Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground">मूल्य निर्धारण</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">संपर्क करें</Link></li>
              </ul>
            </div>
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hajaro Grahako. सर्वाधिकार सुरक्षित। | <Link href="/terms" className="hover:underline">नियम और शर्तें</Link></p>
        </div>
      </div>
    </footer>
  );
}
