import { Card } from "@/components/ui/card";
import { Rocket, Lightbulb, PencilRuler, Code, TestTube, CheckCircle } from "lucide-react";

const processSteps = [
  {
    icon: <Lightbulb className="h-8 w-8 text-accent" />,
    title: "1. खोज और रणनीति",
    description: "आपकी आवश्यकताओं, लक्ष्यों और दर्शकों को समझने के लिए गहन विश्लेषण।",
  },
  {
    icon: <PencilRuler className="h-8 w-8 text-accent" />,
    title: "2. डिजाइन और प्रोटोटाइप",
    description: "उपयोगकर्ता-केंद्रित डिजाइन बनाना और फीडबैक के लिए इंटरेक्टिव प्रोटोटाइप तैयार करना।",
  },
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "3. विकास",
    description: "साफ, कुशल और स्केलेबल कोड लिखना, सर्वोत्तम प्रथाओं का उपयोग करके।",
  },
  {
    icon: <TestTube className="h-8 w-8 text-accent" />,
    title: "4. परीक्षण",
    description: "त्रुटि-मुक्त, उच्च-प्रदर्शन उत्पाद सुनिश्चित करने के लिए कठोर गुणवत्ता आश्वासन।",
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "5. लॉन्च",
    description: "आपके एप्लिकेशन को दुनिया के लिए तैनात करना और एक सहज संक्रमण सुनिश्चित करना।",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: "6. समर्थन और विकास",
    description: "निरंतर सफलता सुनिश्चित करने के लिए चल रही सहायता, रखरखाव और भविष्य में वृद्धि।",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-card border-y">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              हमारी प्रक्रिया
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              विचार से लॉन्च तक का सफर
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              हमारी 6-चरणीय प्रक्रिया सुनिश्चित करती है कि आपका प्रोजेक्ट समय पर, बजट के भीतर और उच्चतम गुणवत्ता मानकों के साथ पूरा हो।
            </p>
          </div>
        </div>
        <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"></div>
            <div className="grid gap-8 md:grid-cols-2">
                {processSteps.map((step, index) => (
                    <div key={step.title} className={`flex gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                         <div className="relative hidden md:block">
                            <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 1 ? '-right-[23px]' : '-left-[23px]'}`}>
                                <div className="h-4 w-4 rounded-full bg-primary border-4 border-card"></div>
                            </div>
                        </div>
                        <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row items-center gap-4 p-6">
                                {step.icon}
                                <div className="text-center md:text-left">
                                    <h3 className="font-bold font-headline">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
