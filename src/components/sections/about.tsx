import { BrainCircuit, Cloud, Code, Handshake, PenRuler, Rocket } from "lucide-react";

const CoreCompetency = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 text-primary">{icon}</div>
        <div>
            <h4 className="font-bold font-headline text-lg mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{children}</p>
        </div>
    </div>
);


export default function AboutSection() {
  return (
    <section id="about" className="bg-card border-y">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                        हमारे बारे में
                    </div>
                    <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
                        विचारों को हकीकत में बदलना
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Hajaro Grahako (MDC) एक भविष्य-केंद्रित सॉफ्टवेयर डेवलपमेंट एजेंसी है जो व्यवसायों के लिए डिजिटल अनुभव तैयार करती है। हमारा मिशन भारत के हर कोने में व्यवसायों को विश्व स्तरीय तकनीक के साथ सशक्त बनाना है।
                    </p>
                     <p className="text-muted-foreground">
                        हम सिर्फ कोड नहीं लिखते; हम विकास को गति देने, प्रक्रियाओं को सरल बनाने और स्थायी प्रभाव छोड़ने वाले समाधान तैयार करते हैं।
                    </p>
                </div>
                <div className="space-y-8">
                   <CoreCompetency icon={<Rocket className="h-6 w-6" />} title="रणनीति और परामर्श ('A')">
                       हम आपके विचार को समझते हैं, उसे चुनौती देते हैं, और एक सफल उत्पाद के लिए एक ठोस रोडमैप तैयार करते हैं।
                   </CoreCompetency>
                   <CoreCompetency icon={<PenRuler className="h-6 w-6" />} title="UI/UX और उत्पाद डिजाइन">
                       हम सहज, आकर्षक और आपके व्यावसायिक लक्ष्यों को प्राप्त करने के लिए डिज़ाइन किए गए उपयोगकर्ता अनुभव तैयार करते हैं।
                   </CoreCompetency>
                   <CoreCompetency icon={<Code className="h-6 w-6" />} title="वेब और मोबाइल एप्लिकेशन डेवलपमेंट">
                       iOS, Android और वेब के लिए मजबूत, सुरक्षित और स्केलेबल समाधान, जो उत्कृष्टता के लिए बनाए गए हैं।
                   </CoreCompetency>
                    <CoreCompetency icon={<BrainCircuit className="h-6 w-6" />} title="AI और डेटा एनालिटिक्स">
                       हम आपके डेटा को कार्रवाई योग्य अंतर्दृष्टि में बदलते हैं, जिससे आप डेटा-संचालित निर्णय ले सकते हैं।
                   </CoreCompetency>
                    <CoreCompetency icon={<Cloud className="h-6 w-6" />} title="क्लाउड और DevOps">
                       कुशल, स्वचालित और सुरक्षित परिनियोजन के लिए क्लाउड-नेटिव आर्किटेक्चर, जो लाखों उपयोगकर्ताओं को संभालने के लिए तैयार है।
                   </CoreCompetency>
                   <CoreCompetency icon={<Handshake className="h-6 w-6" />} title="अनवरत समर्थन और विकास ('Z')">
                       हमारा रिश्ता लॉन्च पर समाप्त नहीं होता है। हम आपके उत्पाद को बनाए रखने और विकसित करने के लिए निरंतर समर्थन प्रदान करते हैं।
                   </CoreCompetency>
                </div>
            </div>
        </div>
    </section>
  );
}