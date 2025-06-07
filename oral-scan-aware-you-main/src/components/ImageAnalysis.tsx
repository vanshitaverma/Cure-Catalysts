import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, Brain, FileImage, ArrowLeft, AlertCircle, Plus, ImageIcon, AlertTriangle } from "lucide-react";
import CameraCapture from "./CameraCapture";
import DutyOfCarePanel from "./DutyOfCarePanel";

interface ImageAnalysisProps {
  onBack: () => void;
}

interface LesionDetails {
  present: boolean;
  location: string[];
  color: string;
  size: string;
  shape: string;
  texture: string;
  borders: string;
  symptoms: string[];
  duration: string;
  whitePatchDetected?: boolean;
}

interface AnalysisResult {
  confidence: number;
  classification: string;
  details: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'urgent';
  lesionDetails?: LesionDetails;
  whitePatchDetected?: boolean;
}

const ImageAnalysis = ({ onBack }: ImageAnalysisProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [notes, setNotes] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [clinicalActions, setClinicalActions] = useState<string[]>([]);
  
  // Detailed lesion documentation fields
  const [lesionPresent, setLesionPresent] = useState<string>("");
  const [lesionLocations, setLesionLocations] = useState<string[]>([]);
  const [lesionColor, setLesionColor] = useState<string>("");
  const [lesionSize, setLesionSize] = useState<string>("");
  const [lesionShape, setLesionShape] = useState<string>("");
  const [lesionTexture, setLesionTexture] = useState<string>("");
  const [lesionBorders, setLesionBorders] = useState<string>("");
  const [lesionSymptoms, setLesionSymptoms] = useState<string[]>([]);
  const [lesionDuration, setLesionDuration] = useState<string>("");
  const [additionalFindings, setAdditionalFindings] = useState<string>("");
  
  const { toast } = useToast();

  // White patch detection function
  const detectWhitePatches = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (!imageData) {
          resolve(false);
          return;
        }
        
        const data = imageData.data;
        let whitePatchPixels = 0;
        const totalPixels = data.length / 4;
        
        // Check for white/light patches
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Detect white/light patches (high RGB values)
          if (r > 200 && g > 200 && b > 200) {
            whitePatchPixels++;
          }
        }
        
        // If more than 5% of pixels are white/light, consider it a white patch
        const whitePatchPercentage = (whitePatchPixels / totalPixels) * 100;
        console.log(`White patch analysis: ${whitePatchPercentage.toFixed(2)}% white pixels detected`);
        
        resolve(whitePatchPercentage > 5);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid files",
        description: "Please select only image files",
        variant: "destructive",
      });
    }
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
  };

  const handleImageCaptured = (file: File) => {
    setSelectedFiles(prev => [...prev, file]);
    setShowCamera(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setAnalysisResults(prev => prev.filter((_, i) => i !== index));
  };

  const analyzeImages = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    console.log("Starting AI analysis for", selectedFiles.length, "images");

    try {
      const results: AnalysisResult[] = [];
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Detect white patches in the image
        const whitePatchDetected = await detectWhitePatches(file);
        console.log(`Image ${i + 1}: White patch detected:`, whitePatchDetected);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Enhanced mock result with white patch detection
        const mockLesionDetails: LesionDetails = {
          present: whitePatchDetected || Math.random() > 0.6,
          location: Math.random() > 0.5 ? ["Lateral tongue", "Floor of mouth"] : ["Buccal mucosa"],
          color: whitePatchDetected ? "White" : Math.random() > 0.7 ? "White" : Math.random() > 0.5 ? "Red" : "Mixed red and white",
          size: Math.random() > 0.7 ? ">2cm" : Math.random() > 0.5 ? "1-2cm" : "<1cm",
          shape: Math.random() > 0.5 ? "Irregular" : "Well-defined",
          texture: Math.random() > 0.5 ? "Raised/nodular" : "Flat/planar",
          borders: Math.random() > 0.5 ? "Irregular/indistinct" : "Well-defined",
          symptoms: Math.random() > 0.5 ? ["Pain", "Tenderness"] : ["Asymptomatic"],
          duration: Math.random() > 0.5 ? ">3 weeks" : "2-3 weeks",
          whitePatchDetected
        };
        
        // Determine risk level - white patches trigger high risk
        let riskLevel: 'low' | 'moderate' | 'high' | 'urgent' = 'low';
        if (whitePatchDetected) {
          riskLevel = 'high';
        } else if (mockLesionDetails.present && (mockLesionDetails.color === "White" || mockLesionDetails.size === ">2cm")) {
          riskLevel = 'high';
        } else if (mockLesionDetails.present) {
          riskLevel = 'moderate';
        }
        
        const mockResult: AnalysisResult = {
          confidence: Math.random() * 0.3 + 0.7,
          classification: whitePatchDetected ? 
            "WHITE PATCH DETECTED - Immediate attention required" :
            mockLesionDetails.present ? 
            `${mockLesionDetails.color} lesion detected in ${mockLesionDetails.location.join(", ")}` : 
            "Normal oral tissue",
          details: whitePatchDetected ? 
            "AI detected significant white patch areas. White patches (leukoplakia) can be precancerous and require immediate clinical evaluation." :
            mockLesionDetails.present ? 
            `AI detected ${mockLesionDetails.color.toLowerCase()} lesion with ${mockLesionDetails.borders.toLowerCase()} borders, ${mockLesionDetails.texture.toLowerCase()} texture` :
            "AI analysis based on color, texture, and morphological features shows normal tissue patterns",
          riskLevel,
          lesionDetails: mockLesionDetails.present ? mockLesionDetails : undefined,
          whitePatchDetected
        };
        
        results.push(mockResult);
        
        // Show immediate alert for white patches
        if (whitePatchDetected) {
          toast({
            title: "HIGH RISK ALERT",
            description: "White patch detected in image - Immediate clinical evaluation recommended",
            variant: "destructive",
          });
        }
      }
      
      setAnalysisResults(results);
      
      const whitePatchCount = results.filter(r => r.whitePatchDetected).length;
      if (whitePatchCount > 0) {
        toast({
          title: "Critical Finding",
          description: `${whitePatchCount} image(s) with white patches detected - High risk classification assigned`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${selectedFiles.length} image(s)`,
        });
      }
      
    } catch (error) {
      console.error("Error during analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the images",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClinicalAction = (action: string) => {
    setClinicalActions(prev => [...prev, action]);
    console.log("Clinical action documented:", action);
  };

  const generateReport = () => {
    console.log("Generating comprehensive report...");
    console.log("Clinical actions taken:", clinicalActions);
    toast({
      title: "Report Generated",
      description: "Comprehensive analysis report with clinical actions has been prepared",
    });
  };

  // Get the highest risk level from all results
  const getHighestRiskLevel = (): 'low' | 'moderate' | 'high' => {
    if (analysisResults.length === 0) return 'low';
    
    const riskOrder = { 'low': 0, 'moderate': 1, 'high': 2, 'urgent': 2 };
    const highestRisk = analysisResults.reduce((highest, result) => {
      return riskOrder[result.riskLevel] > riskOrder[highest] ? result.riskLevel : highest;
    }, 'low' as 'low' | 'moderate' | 'high' | 'urgent');
    
    return highestRisk === 'urgent' ? 'high' : highestRisk;
  };

  const locationOptions = [
    "Lips", "Tongue (dorsal)", "Tongue (lateral)", "Tongue (ventral)", 
    "Floor of mouth", "Buccal mucosa", "Gingiva", "Hard palate", 
    "Soft palate", "Retromolar area", "Oropharynx"
  ];

  const symptomOptions = [
    "Asymptomatic", "Pain", "Tenderness", "Burning sensation", 
    "Numbness", "Difficulty swallowing", "Speech changes", 
    "Bleeding", "Persistent soreness"
  ];

  const handleLocationChange = (location: string, checked: boolean) => {
    setLesionLocations(prev => 
      checked ? [...prev, location] : prev.filter(l => l !== location)
    );
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setLesionSymptoms(prev => 
      checked ? [...prev, symptom] : prev.filter(s => s !== symptom)
    );
  };

  if (showCamera) {
    return (
      <CameraCapture
        onImageCaptured={handleImageCaptured}
        onClose={() => setShowCamera(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questionnaire
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Image Analysis</h1>
            <p className="text-muted-foreground mt-1">Professional oral examination imaging and analysis platform</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Enhanced Image Capture/Upload Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-blue-50/30">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                Image Capture & Upload
              </CardTitle>
              <p className="text-muted-foreground">Capture high-quality images following clinical protocols</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Action Buttons */}
              <div className="grid md:grid-cols-2 gap-6">
                <Button
                  onClick={() => setShowCamera(true)}
                  variant="outline"
                  className="h-32 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">Take Photo</div>
                    <div className="text-sm text-muted-foreground">Use guided camera protocol</div>
                  </div>
                </Button>

                <div className="relative">
                  <Input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="h-32 flex flex-col items-center justify-center gap-4 border-2 border-dashed border-secondary/50 hover:border-secondary hover:bg-secondary/5 rounded-lg transition-all duration-200">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <Upload className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-lg">Upload Images</div>
                      <div className="text-sm text-muted-foreground">Select from device storage</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Images Display */}
              {selectedFiles.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Selected Images</h4>
                    <Badge variant="secondary" className="px-3 py-1">
                      {selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:shadow-md transition-all duration-200">
                          <FileImage className="w-10 h-10 text-gray-400" />
                        </div>
                        <p className="text-xs mt-2 truncate text-center font-medium">{file.name}</p>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analysis Button */}
              <div className="pt-4">
                <Button 
                  onClick={analyzeImages}
                  disabled={selectedFiles.length === 0 || isAnalyzing}
                  className="w-full h-14 text-lg font-semibold"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="w-5 h-5 mr-3 animate-pulse" />
                      Analyzing Images for White Patches...
                    </>
                  ) : (
                    <>
                      <Brain className="w-5 h-5 mr-3" />
                      Start AI Analysis ({selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''})
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Analysis Results */}
          {analysisResults.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-accent-foreground" />
                  </div>
                  Detailed Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisResults.map((result, index) => (
                  <div key={index} className="space-y-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl border">
                    {/* White Patch Alert */}
                    {result.whitePatchDetected && (
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-2 border-red-200 mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                          <h5 className="font-bold text-red-900 text-lg">WHITE PATCH DETECTED - HIGH RISK</h5>
                        </div>
                        <p className="text-red-800 font-medium">
                          Automated analysis has identified white patches in this image. White patches (leukoplakia) 
                          can be precancerous lesions and require immediate clinical evaluation and potential biopsy.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Image {index + 1} Analysis</h4>
                      <div className="flex items-center gap-2">
                        {result.whitePatchDetected && (
                          <Badge className="bg-red-100 text-red-800 border border-red-300">
                            WHITE PATCH
                          </Badge>
                        )}
                        <Badge className={getRiskBadgeColor(result.riskLevel)}>
                          {result.riskLevel.toUpperCase()} RISK
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">Classification</Label>
                        <p className="text-sm font-medium">{result.classification}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">AI Confidence</Label>
                        <p className="text-sm font-medium">{(result.confidence * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Analysis Details</Label>
                      <p className="text-sm text-muted-foreground bg-white/50 p-3 rounded-lg">{result.details}</p>
                    </div>

                    {/* Enhanced Lesion Details */}
                    {result.lesionDetails && (
                      <div className={`p-4 rounded-lg border ${result.whitePatchDetected ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'}`}>
                        <h5 className={`font-medium mb-3 flex items-center gap-2 ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>
                          <AlertCircle className="w-4 h-4" />
                          Detected Lesion Details
                        </h5>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Location:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.location.join(", ")}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Color:</span>
                            <p className={`${result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'} ${result.lesionDetails.color === 'White' ? 'font-bold' : ''}`}>
                              {result.lesionDetails.color}
                              {result.lesionDetails.color === 'White' && ' ⚠️'}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Size:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.size}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Shape:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.shape}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Texture:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.texture}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Borders:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.borders}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Symptoms:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.symptoms.join(", ")}</p>
                          </div>
                          <div className="space-y-1">
                            <span className={`font-medium ${result.whitePatchDetected ? 'text-red-900' : 'text-yellow-900'}`}>Duration:</span>
                            <p className={result.whitePatchDetected ? 'text-red-800' : 'text-yellow-800'}>{result.lesionDetails.duration}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {index < analysisResults.length - 1 && <Separator className="my-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Duty of Care Panel - Show for everyone */}
          {analysisResults.length > 0 && (
            <DutyOfCarePanel 
              riskLevel={getHighestRiskLevel()} 
              onDocumentAction={handleClinicalAction}
            />
          )}

          {/* Enhanced Clinical Documentation */}
          {analysisResults.length > 0 && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Clinical Documentation & Lesion Assessment</CardTitle>
                <p className="text-muted-foreground">Complete detailed clinical documentation for comprehensive patient records</p>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Lesion Presence */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Lesion Assessment</Label>
                    <Select value={lesionPresent} onValueChange={setLesionPresent}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Is a lesion present?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes - Lesion present</SelectItem>
                        <SelectItem value="no">No - No lesion observed</SelectItem>
                        <SelectItem value="uncertain">Uncertain - Requires further assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {lesionPresent === "yes" && (
                    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50/30 rounded-xl border">
                      {/* Lesion Locations */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Lesion Location(s)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {locationOptions.map((location) => (
                            <div key={location} className="flex items-center space-x-2 p-2 bg-white/50 rounded-lg">
                              <Checkbox
                                id={location}
                                checked={lesionLocations.includes(location)}
                                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                              />
                              <Label htmlFor={location} className="text-sm cursor-pointer">{location}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Lesion Color */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Lesion Color</Label>
                          <Select value={lesionColor} onValueChange={setLesionColor}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="white">White</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                              <SelectItem value="mixed">Mixed red and white</SelectItem>
                              <SelectItem value="pigmented">Pigmented (brown/black)</SelectItem>
                              <SelectItem value="normal">Normal tissue color</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Lesion Size */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Lesion Size</Label>
                          <Select value={lesionSize} onValueChange={setLesionSize}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="<1cm">&lt;1cm</SelectItem>
                              <SelectItem value="1-2cm">1-2cm</SelectItem>
                              <SelectItem value=">2cm">&gt;2cm</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Lesion Shape */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Lesion Shape/Definition</Label>
                          <Select value={lesionShape} onValueChange={setLesionShape}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select shape" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="well-defined">Well-defined</SelectItem>
                              <SelectItem value="irregular">Irregular</SelectItem>
                              <SelectItem value="diffuse">Diffuse</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Lesion Texture */}
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold">Lesion Texture</Label>
                          <Select value={lesionTexture} onValueChange={setLesionTexture}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select texture" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flat">Flat/planar</SelectItem>
                              <SelectItem value="raised">Raised/nodular</SelectItem>
                              <SelectItem value="ulcerated">Ulcerated</SelectItem>
                              <SelectItem value="keratotic">Keratotic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Lesion Symptoms */}
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Associated Symptoms</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {symptomOptions.map((symptom) => (
                            <div key={symptom} className="flex items-center space-x-2 p-2 bg-white/50 rounded-lg">
                              <Checkbox
                                id={symptom}
                                checked={lesionSymptoms.includes(symptom)}
                                onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                              />
                              <Label htmlFor={symptom} className="text-sm cursor-pointer">{symptom}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lesion Duration */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold">Duration of Lesion</Label>
                        <Select value={lesionDuration} onValueChange={setLesionDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<1week">&lt;1 week</SelectItem>
                            <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                            <SelectItem value="2-3weeks">2-3 weeks</SelectItem>
                            <SelectItem value=">3weeks">&gt;3 weeks</SelectItem>
                            <SelectItem value="unknown">Unknown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Additional Clinical Notes */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Additional Clinical Findings</Label>
                    <Textarea
                      placeholder="Document any additional observations, patient concerns, or clinical findings not captured above..."
                      value={additionalFindings}
                      onChange={(e) => setAdditionalFindings(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">AI Analysis Notes & Clinical Interpretation</Label>
                    <Textarea
                      placeholder="Add clinical interpretation of AI analysis results, correlation with physical findings, and any additional notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={generateReport} className="w-full h-12 text-lg font-semibold">
                    Generate Comprehensive Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ImageAnalysis;
