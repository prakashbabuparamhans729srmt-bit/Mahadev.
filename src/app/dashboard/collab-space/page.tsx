
'use client';

import { Button } from '@/components/ui/button';
import { Expand, Users, Video, Mic, Share2, PhoneOff, VideoOff, MicOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CollabSpacePage() {
  const { toast } = useToast();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setHasCameraPermission(true);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // In a real app, you'd use a WebRTC connection to send this stream
        // and receive the remote stream. For now, we'll simulate the remote stream.
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'कैमरा एक्सेस अस्वीकृत',
          description: 'कृपया इस ऐप का उपयोग करने के लिए अपने ब्राउज़र सेटिंग्स में कैमरा और माइक अनुमति सक्षम करें।',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        // Cleanup function to stop media tracks when component unmounts
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            const stream = localVideoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);
  
  const handleToggleMic = () => setIsMicOn(!isMicOn);
  const handleToggleCamera = () => {
     if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getVideoTracks().forEach(track => track.enabled = !isCameraOn);
     }
     setIsCameraOn(!isCameraOn);
  }

  return (
    <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl h-[75vh] bg-card/50 border border-border/30 rounded-3xl flex flex-col relative shadow-lg overflow-hidden">
          
          <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
            <div className="flex -space-x-2">
              <span className="h-8 w-8 rounded-full bg-red-500 border-2 border-card animate-pulse"></span>
              <span className="h-8 w-8 rounded-full bg-blue-500 border-2 border-card"></span>
            </div>
            <Button variant="outline" size="sm"><Users className="mr-2 h-4 w-4"/> २ लोग ऑनलाइन</Button>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
            {/* Remote Video */}
            <div className="relative bg-secondary rounded-2xl flex items-center justify-center">
                <video ref={remoteVideoRef} className="w-full h-full object-cover rounded-2xl" autoPlay muted />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">क्लाइंट</div>
                {!hasCameraPermission && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <VideoOff className="h-12 w-12 text-muted-foreground mb-2"/>
                        <p className="font-semibold">क्लाइंट का कैमरा बंद है</p>
                    </div>
                )}
            </div>
             {/* Local Video */}
            <div className="relative bg-secondary rounded-2xl flex items-center justify-center">
                <video ref={localVideoRef} className="w-full h-full object-cover rounded-2xl" autoPlay muted />
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">आप</div>
                {!hasCameraPermission && (
                    <Alert variant="destructive" className="absolute w-11/12 max-w-sm">
                      <AlertTitle>कैमरा एक्सेस आवश्यक है</AlertTitle>
                      <AlertDescription>
                        कृपया इस सुविधा का उपयोग करने के लिए कैमरा एक्सेस की अनुमति दें।
                      </AlertDescription>
                    </Alert>
                )}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 p-3 bg-background/70 backdrop-blur-sm rounded-full">
             <Button variant={isMicOn ? 'secondary' : 'destructive'} size="lg" className="rounded-full h-14 w-14 p-0" onClick={handleToggleMic}>
                {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6"/>}
             </Button>
             <Button variant={isCameraOn ? 'secondary' : 'destructive'} size="lg" className="rounded-full h-14 w-14 p-0" onClick={handleToggleCamera}>
                {isCameraOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
             </Button>
             <Button variant="destructive" size="lg" className="rounded-full px-6 h-14">
                <PhoneOff className="h-6 w-6 mr-2 md:mr-0"/> <span className="hidden md:inline">लीव करें</span>
             </Button>
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Share2 className="h-6 w-6" /></Button>
             <Button variant="secondary" size="lg" className="rounded-full h-14 w-14 p-0"><Expand className="h-6 w-6" /></Button>
          </div>

        </div>
      </div>
    </div>
  );
}
