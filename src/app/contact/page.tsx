import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card border-b">
          <div className="px-4 md:px-6">
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
                <form className="space-y-4">
                  <Input type="text" placeholder="आपका नाम" className="w-full" required />
                  <Input type="email" placeholder="आपका ईमेल" className="w-full" required />
                  <Textarea placeholder="आपका संदेश..." className="w-full" rows={5} required />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    संदेश भेजें
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
