'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  GitBranch,
  Terminal,
  Clock,
  CheckCircle,
  Loader2,
  AlertTriangle,
  Server,
  Cloud,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Deployment = { 
  id: string; 
  status: 'सफल' | 'विफल' | 'जारी'; 
  branch: string; 
  time: string; 
  duration: string;
};

const initialDeploymentHistory: Deployment[] = [
  { id: 'dpl_ab12cd34', status: 'सफल', branch: 'main', time: '2 घंटे पहले', duration: '92s' },
  { id: 'dpl_ef56gh78', status: 'विफल', branch: 'feat/new-contact-form', time: '1 दिन पहले', duration: '45s' },
  { id: 'dpl_ij90kl12', status: 'सफल', branch: 'main', time: '3 दिन पहले', duration: '88s' },
];

export default function DeployPage() {
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [deploymentHistory, setDeploymentHistory] = useState<Deployment[]>(initialDeploymentHistory);

  const handleDeploy = () => {
    setIsDeploying(true);
    setProgress(0);

    const newDeployment: Deployment = {
      id: `dpl_${Math.random().toString(36).substring(2, 10)}`,
      status: 'जारी',
      branch: 'main',
      time: 'अभी',
      duration: '...'
    };

    setDeploymentHistory(prev => [newDeployment, ...prev]);

    toast({
      title: '🚀 डिप्लॉयमेंट शुरू हो रहा है...',
      description: 'लाइव सर्वर पर आपका नवीनतम संस्करण बनाया और तैनात किया जा रहा है।',
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return prev;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsDeploying(false);
      setDeploymentHistory(prev => 
        prev.map(d => d.id === newDeployment.id ? { ...d, status: 'सफल', duration: `${Math.floor(Math.random() * 30) + 80}s` } : d)
      );
      toast({
        title: '✅ डिप्लॉयमेंट सफल!',
        description: 'आपका ऐप अब नवीनतम संस्करण पर लाइव है।',
      });
    }, 5000);
  };
  
  const handleAction = (message: string) => {
    toast({
      title: "सुविधा जल्द ही आ रही है",
      description: message,
    });
  }

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'सफल': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'विफल': return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case 'जारी': return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <Rocket className="h-7 w-7 text-primary" />
            डिप्लॉयमेंट हब
          </h1>
          <p className="text-muted-foreground">
            अपने एप्लिकेशन को उत्पादन (production) में प्रबंधित और तैनात करें।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>लाइव डिप्लॉयमेंट</CardTitle>
              <CardDescription>
                मुख्य ब्रांच को उत्पादन में तैनात करें।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <GitBranch className="text-primary" />
                  <div>
                    <p className="font-semibold">तैनात करने के लिए ब्रांच</p>
                    <p className="text-sm text-muted-foreground">main</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/30">Production</Badge>
              </div>
              
              {isDeploying && (
                <div className="space-y-2 pt-4">
                    <p className="text-sm text-center text-muted-foreground">डिप्लॉयमेंट प्रगति...</p>
                    <Progress value={progress} />
                    <p className="text-xs text-center text-muted-foreground animate-pulse">
                        {progress < 30 ? "बिल्ड शुरू हो रहा है..." : progress < 70 ? "मॉड्यूल संकलित हो रहे हैं..." : "Vercel पर फ़ाइलें अपलोड हो रही हैं..."}
                    </p>
                </div>
              )}

            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button onClick={handleDeploy} disabled={isDeploying} size="lg" className="w-full h-12 text-base">
                {isDeploying ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Rocket className="mr-2 h-5 w-5" />
                )}
                {isDeploying ? 'डिप्लॉय हो रहा है...' : 'अभी डिप्लॉय करें'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>सेवा स्थिति</CardTitle>
                 <CardDescription>आपकी मुख्य सेवाओं का रियल-टाइम स्वास्थ्य।</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2"><Cloud className="text-cyan-400" /> Vercel Hosting</span>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>ऑनलाइन</span>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2"><Server className="text-amber-400" /> Firebase Services</span>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>ऑनलाइन</span>
                    </div>
                </div>
                 <div className="flex items-center justify-between">
                    <span className="font-semibold flex items-center gap-2"><GitBranch className="text-slate-400" /> GitHub Repo</span>
                    <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <span>ऑनलाइन</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
                 <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">
                        <Server className="mr-2 h-4 w-4" />
                        Firebase कंसोल पर जाएं
                    </a>
                </Button>
            </CardFooter>
        </Card>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>डिप्लॉयमेंट इतिहास</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentHistory.map((d) => (
                  <div key={d.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(d.status)}
                      <div>
                        <p className="font-mono text-sm">{d.id}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <GitBranch className="h-3 w-3" />
                            <span>{d.branch}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 sm:mt-0">
                      <div className="text-sm flex items-center gap-1.5"><Clock className="h-3 w-3"/> {d.time} ({d.duration})</div>
                       <Button variant="link" size="sm" onClick={() => handleAction(`डिप्लॉयमेंट ${d.id} के लिए लॉग जल्द ही उपलब्ध होंगे।`)}>
                          <Terminal className="mr-2 h-4 w-4"/> देखें लॉग
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
