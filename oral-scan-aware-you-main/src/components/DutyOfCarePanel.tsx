
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Clock, Calendar, FileText, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DutyOfCarePanelProps {
  riskLevel: 'high' | 'moderate' | 'low';
  onDocumentAction: (action: string) => void;
}

const DutyOfCarePanel = ({ riskLevel, onDocumentAction }: DutyOfCarePanelProps) => {
  const { toast } = useToast();

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'high':
        return {
          title: "High Risk - Immediate Action Required",
          icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
          badgeColor: "bg-red-100 text-red-800",
          urgency: "URGENT",
          action: "NHS Two-Week Wait Referral",
          timeframe: "Within 24 hours",
          pathway: "Urgent referral to secondary care (ENT or OMFS)",
          steps: [
            "Complete urgent referral via NHS e-Referral Service",
            "Provide patient with referral information and timeline",
            "Document referral in GP system (EMIS/SystmOne)",
            "Ensure patient understands urgency and next steps"
          ]
        };
      case 'moderate':
        return {
          title: "Medium Risk - Routine Clinical Review",
          icon: <Clock className="w-5 h-5 text-orange-600" />,
          badgeColor: "bg-orange-100 text-orange-800",
          urgency: "ROUTINE",
          action: "GP Clinical Examination",
          timeframe: "Within 1-2 weeks",
          pathway: "Book routine GP appointment for further evaluation",
          steps: [
            "Schedule GP appointment within 1-2 weeks",
            "Conduct thorough clinical examination",
            "Consider routine specialist referral if indicated",
            "Document findings and follow-up plan"
          ]
        };
      default:
        return {
          title: "Low Risk - Monitor and Advise",
          icon: <Calendar className="w-5 h-5 text-green-600" />,
          badgeColor: "bg-green-100 text-green-800",
          urgency: "MONITOR",
          action: "Watchful Waiting",
          timeframe: "3-6 months follow-up",
          pathway: "Monitor and re-examine if symptoms worsen",
          steps: [
            "Provide oral hygiene advice and education",
            "Set follow-up reminder for 3-6 months",
            "Advise patient to return if symptoms worsen",
            "Document findings in patient record"
          ]
        };
    }
  };

  const config = getRiskConfig();

  const handleActionComplete = (step: string) => {
    onDocumentAction(step);
    toast({
      title: "Action Documented",
      description: `${step} has been recorded`,
    });
  };

  return (
    <Card className="border-l-4 border-l-orange-500">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {config.icon}
            Duty of Care - Clinical Pathway
          </CardTitle>
          <Badge className={config.badgeColor}>
            {config.urgency}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Risk Assessment Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">{config.title}</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Recommended Action:</span>
              <p className="text-gray-700">{config.action}</p>
            </div>
            <div>
              <span className="font-medium">Timeframe:</span>
              <p className="text-gray-700">{config.timeframe}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Clinical Pathway */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            UK Clinical Pathway: {config.pathway}
          </h4>
          
          <div className="space-y-3">
            {config.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleActionComplete(step)}
                  className="text-xs"
                >
                  Mark Complete
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        {riskLevel === 'high' && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h5 className="font-medium text-red-900 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Emergency Contact Information
            </h5>
            <p className="text-sm text-red-800 mb-3">
              For urgent referrals outside normal hours or if patient condition deteriorates:
            </p>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">NHS 111:</span> 111
              </div>
              <div>
                <span className="font-medium">Emergency:</span> 999
              </div>
            </div>
          </div>
        )}

        <Separator />

        {/* Documentation Reminder */}
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <strong>Documentation Requirements:</strong> Ensure all findings, decisions, and referrals are properly documented in the patient's electronic health record in accordance with GMC guidance on record keeping.
        </div>
      </CardContent>
    </Card>
  );
};

export default DutyOfCarePanel;
