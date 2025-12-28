export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  industry: string;
  overview: {
    client: string;
    duration: string;
    team: string;
    tech: string[];
  };
  challenges: {
    title: string;
    problem: string;
    solution: string;
  }[];
  metrics: {
    value: string;
    label: string;
  }[];
  testimonial: {
    quote: string;
    name: string;
    title: string;
    imageUrl: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    id: "portfolio-1",
    slug: "ecommerce-website",
    title: "उन्नत ई-कॉमर्स प्लेटफॉर्म",
    description: "फैशन फॉरवर्ड के लिए एक अत्याधुनिक ऑनलाइन शॉपिंग अनुभव बनाना, जिससे बिक्री में 30% की वृद्धि हुई।",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDB8fHx8MTc2NjEzNDIwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    industry: "ई-कॉमर्स और रिटेल",
    overview: {
      client: "फैशन फॉरवर्ड",
      duration: "3 महीने",
      team: "4 डेवलपर्स, 2 डिज़ाइनर, 1 PM",
      tech: ["Next.js", "Firebase", "Stripe", "Tailwind CSS"],
    },
    challenges: [
      {
        title: "स्केलेबल इन्वेंटरी मैनेजमेंट",
        problem: "10,000 से अधिक उत्पादों की इन्वेंटरी को वास्तविक समय में प्रबंधित करना और सिंक करना एक बड़ी चुनौती थी।",
        solution: "हमने एक कस्टम फायरस्टोर डेटा मॉडल विकसित किया और सर्वरलेस फ़ंक्शंस का उपयोग करके इन्वेंटरी अपडेट को स्वचालित किया।",
      },
      {
        title: "सहज भुगतान प्रवाह",
        problem: "उपयोगकर्ताओं के लिए भुगतान प्रक्रिया को सरल और सुरक्षित बनाना ताकि कार्ट परित्याग (cart abandonment) को कम किया जा सके।",
        solution: "Stripe पेमेंट्स को सीधे एकीकृत किया गया, जिससे कई भुगतान विकल्पों के साथ एक-क्लिक चेकआउट अनुभव संभव हुआ।",
      }
    ],
    metrics: [
      { value: "30%", label: "बिक्री में वृद्धि" },
      { value: "40%", label: "कार्ट परित्याग में कमी" },
      { value: "500ms", label: "पेज लोड समय" },
      { value: "4.8/5", label: "उपयोगकर्ता रेटिंग" },
    ],
    testimonial: {
      quote: "Hajaro Grahako ने हमारी ई-कॉमर्स साइट को बदल दिया। उनकी टीम पेशेवर और अविश्वसनीय रूप से कुशल है। बिक्री में 30% की वृद्धि हुई!",
      name: "प्रिया शर्मा",
      title: "सीईओ, फैशन फॉरवर्ड",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NjYxNTM1NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    id: "portfolio-2",
    slug: "corporate-web-app",
    title: "कॉर्पोरेट वेब ऐप डैशबोर्ड",
    description: "टेक सॉल्यूशंस के लिए एक आंतरिक डैशबोर्ड का विकास, जिससे उत्पादकता में 25% की वृद्धि हुई।",
    imageUrl: "https://images.unsplash.com/photo-1758411898847-c5f669bed02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxkYXNoYm9hcmQlMjBhcHB8ZW58MHx8fHwxNzY2MTcwMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    industry: "SaaS और टेक्नोलॉजी",
    overview: {
      client: "टेक सॉल्यूशंस",
      duration: "5 महीने",
      team: "6 डेवलपर्स, 2 डिज़ाइनर, 2 QA",
      tech: ["React", "Node.js", "GraphQL", "PostgreSQL"],
    },
    challenges: [
       {
        title: "जटिल डेटा विज़ुअलाइज़ेशन",
        problem: "हजारों डेटा बिंदुओं को एक समझने योग्य और इंटरैक्टिव डैशबोर्ड में प्रस्तुत करना।",
        solution: "हमने Recharts और D3.js का उपयोग करके कस्टम, रियल-टाइम चार्ट और ग्राफ़ बनाए।",
      },
      {
        title: "मल्टी-लेवल यूजर एक्सेस",
        problem: "विभिन्न उपयोगकर्ता भूमिकाओं (एडमिन, मैनेजर, कर्मचारी) के लिए सुरक्षित और अलग-अलग एक्सेस स्तर प्रदान करना।",
        solution: "हमने एक भूमिका-आधारित एक्सेस कंट्रोल (RBAC) प्रणाली लागू की जो प्रत्येक उपयोगकर्ता को केवल प्रासंगिक डेटा और कार्यक्षमता तक पहुँच प्रदान करती है।",
      }
    ],
    metrics: [
      { value: "25%", label: "उत्पादकता में वृद्धि" },
      { value: "70%", label: "रिपोर्टिंग समय में कमी" },
      { value: "99.9%", label: "अपटाइम" },
      { value: "4.9/5", label: "कर्मचारी संतुष्टि" },
    ],
    testimonial: {
      quote: "एक जटिल वेब ऐप के लिए एक समर्पित टीम की आवश्यकता थी, और उन्होंने इसे पूरा किया। 24/7 समर्थन जीवन रक्षक रहा है। अत्यधिक अनुशंसित!",
      name: "अमित सिंह",
      title: "प्रबंधक, टेक सॉल्यूशंस",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb3Jwb3JhdGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjYyMDU1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    id: "portfolio-3",
    slug: "travel-mobile-app",
    title: "AI-पावर्ड ट्रैवल मोबाइल ऐप",
    description: "यात्रा डायरी के लिए एक अभिनव मोबाइल ऐप जिसने 1 मिलियन से अधिक डाउनलोड प्राप्त किए।",
    imageUrl: "https://images.unsplash.com/photo-1528033978085-52f315289665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhcHB8ZW58MHx8fHwxNzY2MjA1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    industry: "यात्रा और पर्यटन",
    overview: {
      client: "यात्रा डायरी",
      duration: "6 महीने",
      team: "5 डेवलपर्स, 2 डिज़ाइनर, 1 AI स्पेशलिस्ट",
      tech: ["React Native", "Python", "Firebase", "Google Maps API"],
    },
    challenges: [
      {
        title: "AI यात्रा कार्यक्रम निर्माण",
        problem: "उपयोगकर्ता की वरीयताओं के आधार पर स्वचालित रूप से व्यक्तिगत यात्रा कार्यक्रम बनाना।",
        solution: "हमने एक मशीन लर्निंग मॉडल को प्रशिक्षित किया जो उपयोगकर्ता के इनपुट और ऐतिहासिक डेटा का विश्लेषण करके अनुकूलित यात्रा सुझाव देता है।",
      },
      {
        title: "ऑफलाइन कार्यक्षमता",
        problem: "कमजोर या बिना नेटवर्क वाले क्षेत्रों में भी ऐप को उपयोगी बनाए रखना।",
        solution: "हमने ऑफ़लाइन मानचित्र, स्थानीय डेटा कैशिंग और एक सिंक इंजन लागू किया जो कनेक्शन उपलब्ध होने पर डेटा को स्वचालित रूप से अपडेट करता है।",
      }
    ],
    metrics: [
      { value: "1M+", label: "ऐप डाउनलोड" },
      { value: "4.7/5", label: "ऐप स्टोर रेटिंग" },
      { value: "60%", label: "उपयोगकर्ता प्रतिधारण दर" },
      { value: "200k", label: "मासिक सक्रिय उपयोगकर्ता" },
    ],
    testimonial: {
      quote: "हमारे मोबाइल ऐप को शानदार फीडबैक मिला है, यह सब उनकी विशेषज्ञता के कारण है। प्रक्रिया सहज थी और परिणाम अपेक्षाओं से बढ़कर थे।",
      name: "रोहित वर्मा",
      title: "संस्थापक, यात्रा डायरी",
      imageUrl: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcGVyc29ufGVufDB8fHx8MTc2NjE0MDMxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    id: "portfolio-4",
    slug: "custom-analytics-solution",
    title: "कस्टम एनालिटिक्स सॉल्यूशन",
    description: "एक बड़े उद्यम के लिए एक शक्तिशाली, कस्टम एनालिटिक्स प्लेटफॉर्म जिसने डेटा-संचालित निर्णय लेने में क्रांति ला दी।",
    imageUrl: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MHx8fHwxNzY2MTQxNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    industry: "बिग डेटा और एनालिटिक्स",
    overview: {
      client: "ग्लोबल एंटरप्राइजेज",
      duration: "8 महीने",
      team: "8 डेवलपर्स, 3 डेटा वैज्ञानिक, 2 DevOps",
      tech: ["Spark", "Kafka", "React", "Python", "AWS"],
    },
    challenges: [
      {
        title: "रियल-टाइम डेटा पाइपलाइन",
        problem: "प्रति सेकंड लाखों घटनाओं को संसाधित करने के लिए एक मजबूत और स्केलेबल डेटा पाइपलाइन का निर्माण।",
        solution: "हमने काफ्का और स्पार्क स्ट्रीमिंग का उपयोग करके एक इवेंट-संचालित वास्तुकला डिजाइन की जो बड़े पैमाने पर डेटा को संभालने में सक्षम थी।",
      },
      {
        title: "भविष्य कहनेवाला मॉडलिंग",
        problem: "भविष्य की प्रवृत्तियों का अनुमान लगाने और व्यावसायिक परिणामों को अनुकूलित करने के लिए भविष्य कहनेवाला मॉडल विकसित करना।",
        solution: "हमारी डेटा विज्ञान टीम ने ऐतिहासिक डेटा पर कई मशीन लर्निंग मॉडल बनाए और तैनात किए, जिससे पूर्वानुमान सटीकता में 40% का सुधार हुआ।",
      }
    ],
    metrics: [
      { value: "40%", label: "पूर्वानुमान सटीकता में सुधार" },
      { value: "50%", label: "संचालन लागत में कमी" },
      { value: "1PB+", label: "प्रति माह संसाधित डेटा" },
      { value: "99.99%", label: "सेवा अपटाइम" },
    ],
    testimonial: {
      quote: "यह सिर्फ एक सॉफ्टवेयर प्रोजेक्ट नहीं था, यह एक व्यावसायिक परिवर्तन था। Hajaro Grahako की टीम हमारी विस्तार बन गई।",
      name: "अंजलि देसाई",
      title: "मुख्य डेटा अधिकारी, ग्लोबल एंटरप्राइजेज",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974",
    },
  },
];
