'use client';

import { BrainCircuit, Cloud, Code, Handshake, PenRuler, Rocket } from "lucide-react";
import React from 'react';

const coreCompetencies = [
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: "डिजिटल इंजीनियरिंग",
    description: "हम आपकी सोच को एक डिजिटल हकीकत में बदलते हैं।"
  },
  {
    icon: <PenRuler className="h-8 w-8 text-accent" />,
    title: "उत्पाद और डिजाइन",
    description: "उपयोगकर्ता-केंद्रित और आकर्षक डिजाइन जो आपके ग्राहकों को पसंद आएं।"
  },
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: "कस्टम सॉफ्टवेयर",
    description: "आपकी विशेष जरूरतों के लिए तैयार किए गए शक्तिशाली सॉफ्टवेयर समाधान।"
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-accent" />,
    title: "AI और ऑटोमेशन",
    description: "आर्टिफिशियल इंटेलिजेंस की मदद से आपके व्यवसाय को स्वचालित और स्मार्ट बनाएं।"
  },
  {
    icon: <Cloud className="h-8 w-8 text-accent" />,
    title: "क्लाउड समाधान",
    description: "स्केलेबल और सुरक्षित क्लाउड इन्फ्रास्ट्रक्चर जो आपके व्यवसाय के साथ बढ़ता है।"
  },
  {
    icon: <Handshake className="h-8 w-8 text-accent" />,
    title: "एंटरप्राइज ट्रांसफॉर्मेशन",
    description: "हम आपके उद्यम को डिजिटल युग के लिए तैयार करने में मदद करते हैं।"
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-card border-y">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
              हमारे बारे में
            </div>
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">
              डिजिटल प्रगति को गति देना
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hajaro Grahako सिर्फ एक सॉफ्टवेयर कंपनी नहीं है; हम आपकी सफलता के पार्टनर हैं। हमारा मिशन दुनिया भर के हजारों ग्राहकों को विश्व स्तरीय डिजिटल समाधान प्रदान करना है जो उनके व्यवसाय को नई ऊंचाइयों पर ले जाए।
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {coreCompetencies.map((competency) => (
              <div key={competency.title} className="p-4 rounded-lg text-center bg-background/50 hover:bg-secondary/50 transition-colors">
                <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
                  {competency.icon}
                </div>
                <h3 className="text-sm font-semibold">{competency.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
