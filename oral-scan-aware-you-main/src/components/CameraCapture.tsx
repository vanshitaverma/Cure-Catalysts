import { useState, useRef, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Camera, CameraOff, RotateCcw, Check, AlertCircle, Lightbulb, Eye } from "lucide-react";

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
  onClose: () => void;
}

const CameraCapture = ({ onImageCaptured, onClose }: CameraCaptureProps) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const protocolSteps = [
    {
      title: "Patient Positioning",
      description: "Position patient comfortably with head supported",
      tips: [
        "Patient should be seated upright or slightly reclined",
        "Ensure patient's head is stable and well-supported",
        "Ask patient to relax facial muscles"
      ],
      icon: <Eye className="w-5 h-5" />
    },
    {
      title: "Lighting Setup",
      description: "Ensure optimal lighting conditions",
      tips: [
        "Use bright, white light source (LED recommended)",
        "Position light to avoid shadows in oral cavity",
        "Ensure even illumination without glare",
        "Natural daylight or clinical examination light is ideal"
      ],
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      title: "Camera Positioning",
      description: "Position camera at correct angle and distance",
      tips: [
        "Hold device 6-8 inches from patient's mouth",
        "Keep camera perpendicular to the area being photographed",
        "Ensure entire lesion/area of interest is visible",
        "Use both hands to stabilize the device"
      ],
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: "Oral Cavity Preparation",
      description: "Prepare the oral cavity for imaging",
      tips: [
        "Ask patient to open mouth wide but comfortably",
        "Use tongue depressor or gauze to retract soft tissues if needed",
        "Ensure saliva is managed (gauze/suction if available)",
        "Clean any debris from the area of interest"
      ],
      icon: <AlertCircle className="w-5 h-5" />
    }
  ];

  const startCamera = async () => {
    setIsLoading(true);
    console.log("Starting camera...");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
          facingMode: "environment"
        }
      });
      
      console.log("Camera stream obtained:", stream);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for the video to be ready and start playing
        const handleVideoReady = () => {
          console.log("Video is playing and ready");
          setIsStreaming(true);
          setIsLoading(false);
        };

        // Use playing event which fires when video actually starts playing
        videoRef.current.addEventListener('playing', handleVideoReady, { once: true });
        
        // Force play the video
        try {
          await videoRef.current.play();
          console.log("Video play() called successfully");
        } catch (playError) {
          console.error("Video play error:", playError);
          // Still set streaming true as the stream might work
          handleVideoReady();
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsLoading(false);
      
      let errorMessage = "Unable to access camera. Please check permissions.";
      if (error instanceof Error) {
        if (error.name === "NotAllowedError") {
          errorMessage = "Camera permission denied. Please allow camera access and try again.";
        } else if (error.name === "NotFoundError") {
          errorMessage = "No camera found. Please ensure your device has a camera.";
        } else if (error.name === "NotReadableError") {
          errorMessage = "Camera is already in use by another application.";
        }
      }
      
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    console.log("Stopping camera...");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log("Camera track stopped:", track.kind);
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsLoading(false);
  };

  const captureImage = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const file = new File([blob], `oral-examination-${timestamp}.jpg`, {
          type: 'image/jpeg'
        });
        onImageCaptured(file);
        stopCamera();
        toast({
          title: "Image Captured",
          description: "Successfully captured oral examination image",
        });
      }
    }, 'image/jpeg', 0.9);
  }, [onImageCaptured, toast]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const nextStep = () => {
    if (currentStep < protocolSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      startCamera();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isStreaming) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full rounded-lg bg-black"
              style={{ maxHeight: '70vh' }}
            />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <Badge className="bg-green-500 text-white">
                Live Camera
              </Badge>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  stopCamera();
                  onClose();
                }}
              >
                <CameraOff className="w-4 h-4 mr-2" />
                Close
              </Button>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={stopCamera}
                className="bg-white/90"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retake
              </Button>
              <Button
                size="lg"
                onClick={captureImage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Camera className="w-12 h-12 mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold mb-2">Starting Camera...</h3>
            <p className="text-muted-foreground">Please allow camera access if prompted</p>
            <Button 
              variant="outline" 
              onClick={stopCamera}
              className="mt-4"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Image Capture Protocol
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {protocolSteps.length}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              {protocolSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentStep
                      ? "bg-blue-600"
                      : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {protocolSteps[currentStep].icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {protocolSteps[currentStep].title}
                </h3>
                <p className="text-muted-foreground">
                  {protocolSteps[currentStep].description}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Important Tips:</h4>
              <ul className="space-y-1">
                {protocolSteps[currentStep].tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                    <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className={currentStep === protocolSteps.length - 1 ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {currentStep === protocolSteps.length - 1 ? (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Start Camera
                </>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraCapture;
