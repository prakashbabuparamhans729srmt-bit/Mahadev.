import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12">
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
              <h3 className="font-semibold tracking-wider uppercase">कानूनी</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">सेवा की शर्तें</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">गोपनीयता नीति</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Hajaro Grahako. सर्वाधिकार सुरक्षित।</p>
        </div>
      </div>
    </footer>
  );
}
