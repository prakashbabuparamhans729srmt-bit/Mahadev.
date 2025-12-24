
import {
  Store, Briefcase, Pencil, GraduationCap, Building, LandPlot, Clapperboard,
  HeartPulse, Utensils, Car, Ticket, Palette, Camera, Music, Film, Bot,
  Cloud, Smartphone, Link, Shirt, Carrot, Pill, BookOpen, Banknote,
  Home, Handshake, Users, Globe, Factory, Truck, Building2, BrainCircuit, Gamepad, Podcast, Drama, UserCheck, Heart, ShieldQuestion
} from 'lucide-react';

export const categoryIcons: { [key: string]: React.ReactNode } = {
  'ई-कॉमर्स': <Store className="h-6 w-6" />,
  'कॉर्पोरेट': <Briefcase className="h-6 w-6" />,
  'ब्लॉग': <Pencil className="h-6 w-6" />,
  'शैक्षिक': <GraduationCap className="h-6 w-6" />,
  'रिटेल': <Store className="h-6 w-6" />,
  'उद्योग': <Factory className="h-6 w-6" />,
  'स्वास्थ्य': <HeartPulse className="h-6 w-6" />,
  'कानूनी': <LandPlot className="h-6 w-6" />,
  'मनोरंजन': <Clapperboard className="h-6 w-6" />,
  'फोटोग्राफी': <Camera className="h-6 w-6" />,
  'संगीत': <Music className="h-6 w-6" />,
  'फिल्म/मीडिया': <Film className="h-6 w-6" />,
  'AI/ML': <BrainCircuit className="h-6 w-6" />,
  'SaaS': <Cloud className="h-6 w-6" />,
  'मोबाइल ऐप': <Smartphone className="h-6 w-6" />,
  'ब्लॉकचेन': <Link className="h-6 w-6" />,
  'फैशन': <Shirt className="h-6 w-6" />,
  'ग्रोसरी': <Carrot className="h-6 w-6" />,
  'फार्मा': <Pill className="h-6 w-6" />,
  'बुक्स': <BookOpen className="h-6 w-6" />,
  'रियल एस्टेट': <Home className="h-6 w-6" />,
  'रेस्तरां': <Utensils className="h-6 w-6" />,
  'ऑटो': <Car className="h-6 w-6" />,
  'इवेंट': <Ticket className="h-6 w-6" />,
  'एजेंसी': <Users className="h-6 w-6" />,
  'सर्विस': <Handshake className="h-6 w-6" />,
  'फाइनेंस': <Banknote className="h-6 w-6" />,
  'लॉजिस्टिक्स': <Truck className="h-6 w-6" />,
  'कंस्ट्रक्शन': <Building className="h-6 w-6" />,
  'गेमिंग': <Gamepad className="h-6 w-6" />,
  'पॉडकास्ट': <Podcast className="h-6 w-6" />,

  // specialized
  'B2B पोर्टल': <Building2 className="h-6 w-6" />,
  'फ्रेंचाइजी': <Store className="h-6 w-6" />,
  'ट्यूटर पोर्टल': <UserCheck className="h-6 w-6" />,
  'रिसर्च पोर्टल': <BookOpen className="h-6 w-6" />,
  'मेंटल हेल्थ': <Heart className="h-6 w-6" />,
  'ट्रैवल': <Globe className="h-6 w-6" />,
  'इंटीरियर डिज़ाइन': <Palette className="h-6 w-6" />,
  'जॉब पोर्टल': <Briefcase className="h-6 w-6" />,
  'मैट्रिमोनियल': <Users className="h-6 w-6" />,
  'NGO': <Handshake className="h-6 w-6" />,
  'बीमा': <ShieldQuestion className="h-6 w-6" />,
  'अन्य': <Globe className="h-6 w-6" />,
};

export const projectCategories = [
  {
    group: 'लोकप्रिय वेबसाइट प्रकार',
    types: [
      { name: 'ई-कॉमर्स', features: ['उत्पाद सूची', 'शॉपिंग कार्ट', 'भुगतान गेटवे', 'इन्वेंटरी मैनेजमेंट', 'सर्च'], budget: '₹50K - ₹5L+', timeline: '4-12 सप्ताह', projects: 450 },
      { name: 'कॉर्पोरेट', features: ['कंपनी प्रोफाइल', 'सेवाएं', 'संपर्क फॉर्म', 'टीम पेज', 'सोशल शेयर'], budget: '₹25K - ₹2L', timeline: '3-8 सप्ताह', projects: 320 },
      { name: 'ब्लॉग', features: ['लेख प्रबंधन', 'टिप्पणियाँ', 'श्रेणियाँ', 'सदस्यता', 'खोज'], budget: '₹15K - ₹80K', timeline: '2-4 सप्ताह', projects: 280 },
      { name: 'शैक्षिक', features: ['कोर्स मैनेजमेंट', 'छात्र पोर्टल', 'ऑनलाइन परीक्षा', 'सर्टिफिकेशन', 'पेमेंट'], budget: '₹40K - ₹3L', timeline: '4-10 सप्ताह', projects: 150 },
    ]
  },
  {
    group: 'व्यवसाय और उद्यम',
    types: [
      { name: 'रिटेल', features: ['स्टोर लोकेटर', 'इन-स्टोर पिकअप', 'लॉयल्टी प्रोग्राम', 'मल्टी-स्टोर'], budget: '₹60K - ₹4L', timeline: '4-10 सप्ताह', projects: 110 },
      { name: 'उद्योग', features: ['उत्पाद कैटलॉग', 'तकनीकी दस्तावेज़', 'सप्लायर पोर्टल', 'क्वोटेशन सिस्टम'], budget: '₹80K - ₹6L', timeline: '6-14 सप्ताह', projects: 50 },
      { name: 'स्वास्थ्य', features: ['डॉक्टर अपॉइंटमेंट', 'ऑनलाइन परामर्श', 'मेडिकल ब्लॉग', 'पेशेंट पोर्टल'], budget: '₹55K - ₹3L', timeline: '4-8 सप्ताह', projects: 120 },
      { name: 'कानूनी', features: ['वकील प्रोफाइल', 'केस स्टडी', 'कानूनी ब्लॉग', 'डॉक्यूमेंट टेम्प्लेट'], budget: '₹45K - ₹2.5L', timeline: '3-7 सप्ताह', projects: 70 },
    ]
  },
  {
    group: 'क्रिएटिव और मीडिया',
    types: [
      { name: 'मनोरंजन', features: ['इवेंट कैलेंडर', 'टिकटिंग सिस्टम', 'सेलेब्रिटी प्रोफाइल', 'वीडियो स्ट्रीमिंग'], budget: '₹70K - ₹5L', timeline: '5-12 सप्ताह', projects: 65 },
      { name: 'फोटोग्राफी', features: ['गैलरी पोर्टफोलियो', 'ऑनलाइन बुकिंग', 'क्लाइंट प्रूफिंग', 'प्रिंट ऑर्डरिंग'], budget: '₹30K - ₹1.5L', timeline: '2-5 सप्ताह', projects: 180 },
      { name: 'संगीत', features: ['ऑडियो/वीडियो प्लेयर', 'अल्बम डिस्प्ले', 'मर्चेंडाइज स्टोर', 'इवेंट्स'], budget: '₹40K - ₹2L', timeline: '3-7 सप्ताह', projects: 95 },
      { name: 'फिल्म/मीडिया', features: ['वीडियो स्ट्रीमिंग', 'कंटेंट मैनेजमेंट', 'सब्सक्रिप्शन प्लान्स', 'मल्टी-भाषा'], budget: '₹90K - ₹8L', timeline: '6-16 सप्ताह', projects: 40 },
    ]
  },
   {
    group: 'टेक्नोलॉजी और स्टार्टअप',
    types: [
      { name: 'AI/ML', features: ['AI डेमो इंटरफेस', 'डेटा विज़ुअलाइज़ेशन', 'API डॉक्यूमेंटेशन', 'मॉडल डैशबोर्ड'], budget: '₹2L - ₹15L+', timeline: '8-20 सप्ताह', projects: 25 },
      { name: 'SaaS', features: ['यूज़र डैशबोर्ड', 'सब्सक्रिप्शन प्लान्स', 'बिलिंग सिस्टम', 'मल्टी-टेनेंट'], budget: '₹1.5L - ₹10L+', timeline: '6-18 सप्ताह', projects: 80 },
      { name: 'मोबाइल ऐप', features: ['ऐप फीचर्स पेज', 'डाउनलोड लिंक्स', 'यूज़र गाइड्स', 'सपोर्ट पोर्टल'], budget: '₹80K - ₹5L', timeline: '4-12 सप्ताह', projects: 130 },
      { name: 'ब्लॉकचेन', features: ['वॉलेट इंटीग्रेशन', 'ट्रांजैक्शन हिस्ट्री', 'स्मार्ट कॉन्ट्रैक्ट', 'ब्लॉक एक्सप्लोरर'], budget: '₹1.5L - ₹12L+', timeline: '8-24 सप्ताह', projects: 15 },
    ]
  },
   {
    group: 'विशिष्ट ई-कॉमर्स',
    types: [
        { name: 'फैशन', features: ['साइज गाइड', 'वर्चुअल ट्रायल', 'फैशन ब्लॉग', 'AR ट्रायल'], budget: '₹60K - ₹6L', timeline: '5-14 सप्ताह', projects: 90 },
        { name: 'ग्रोसरी', features: ['स्लॉट बुकिंग', 'लाइव ट्रैकिंग', 'सब्सक्रिप्शन बॉक्स', 'रेसिपी सेक्शन'], budget: '₹70K - ₹5L', timeline: '6-12 सप्ताह', projects: 30 },
        { name: 'फार्मा', features: ['प्रिस्क्रिप्शन अपलोड', 'मेडिकल सलाह', 'डॉक्टर कनेक्ट', 'रिमाइंडर'], budget: '₹85K - ₹7L', timeline: '6-15 सप्ताह', projects: 20 },
        { name: 'बुक्स', features: ['ई-बुक डाउनलोड', 'ऑडियोबुक स्ट्रीमिंग', 'बुक प्रिव्यू', 'ऑथर पोर्टल'], budget: '₹40K - ₹3L', timeline: '4-10 सप्ताह', projects: 55 },
    ]
  },
   {
    group: 'स्थानीय और सामुदायिक',
    types: [
        { name: 'रियल एस्टेट', features: ['प्रॉपर्टी लिस्टिंग', 'वर्चुअल टूर', 'एजेंट पोर्टल', 'लोन कैलकुलेटर'], budget: '₹50K - ₹4L', timeline: '4-10 सप्ताह', projects: 90 },
        { name: 'रेस्तरां', features: ['मेन्यू डिस्प्ले', 'टेबल बुकिंग', 'ऑनलाइन ऑर्डरिंग', 'डिलीवरी ट्रैकिंग'], budget: '₹35K - ₹2.5L', timeline: '3-7 सप्ताह', projects: 160 },
        { name: 'ऑटो', features: ['वाहन कैटलॉग', 'फाइनेंस कैलकुलेटर', 'टेस्ट ड्राइव बुकिंग', 'सेल्स CRM'], budget: '₹75K - ₹6L', timeline: '5-14 सप्ताह', projects: 45 },
        { name: 'इवेंट', features: ['इवेंट कैलेंडर', 'टिकटिंग सिस्टम', 'स्पीकर प्रोफाइल', 'स्पॉन्सर मैनेजमेंट'], budget: '₹60K - ₹5L', timeline: '4-12 सप्ताह', projects: 75 },
    ]
  },
  {
    group: 'अन्य विशिष्ट श्रेणियां',
    types: [
        { name: 'जॉब पोर्टल', features: ['नौकरी लिस्टिंग', 'रिज्यूमे बिल्डर', 'कंपनी प्रोफाइल', 'आवेदन ट्रैकिंग'], budget: '₹90K - ₹7L', timeline: '6-15 सप्ताह', projects: 35 },
        { name: 'मैट्रिमोनियल', features: ['प्रोफाइल मैचिंग', 'चैट/मैसेजिंग', 'सुरक्षा फीचर्स', 'सब्सक्रिप्शन प्लान्स'], budget: '₹1L - ₹8L', timeline: '8-18 सप्ताह', projects: 18 },
        { name: 'NGO', features: ['दान संग्रह', 'अभियान पेज', 'वालंटियर मैनेजमेंट', 'इवेंट्स'], budget: '₹30K - ₹2L', timeline: '3-8 सप्ताह', projects: 100 },
        { name: 'बीमा', features: ['पॉलिसी तुलना', 'ऑनलाइन क्लेम', 'एजेंट पोर्टल', 'प्रीमियम कैलकुलेटर'], budget: '₹1.2L - ₹9L', timeline: '8-20 सप्ताह', projects: 12 },
    ]
  }
];
