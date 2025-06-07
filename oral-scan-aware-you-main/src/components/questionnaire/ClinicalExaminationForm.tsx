
import { Control, UseFormWatch } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionnaireData } from "../PatientQuestionnaire";

interface ClinicalExaminationFormProps {
  control: Control<QuestionnaireData>;
  watch: UseFormWatch<QuestionnaireData>;
}

const ClinicalExaminationForm = ({ control, watch }: ClinicalExaminationFormProps) => {
  const lesionPresent = watch("lesionPresent");

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Clinical Examination</h3>
        <p className="text-sm text-muted-foreground">
          Record observations during oral cancer screening examination
        </p>
      </div>

      {/* General Appearance */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">General Appearance</h4>
        
        <FormField
          control={control}
          name="generalAppearance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overall condition of patient</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="appearance-normal" />
                    <label htmlFor="appearance-normal">Normal/Healthy</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pale" id="appearance-pale" />
                    <label htmlFor="appearance-pale">Pale</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weak" id="appearance-weak" />
                    <label htmlFor="appearance-weak">Weak/Lethargic</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="appearance-other" />
                    <label htmlFor="appearance-other">Other</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="generalAppearanceNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional notes on general appearance</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe any notable observations..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Extraoral Examination */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Extraoral Examination</h4>
        
        <FormField
          control={control}
          name="lymphNodes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lymph nodes (neck, submandibular, submental)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="lymph-normal" />
                    <label htmlFor="lymph-normal">Normal (not palpable)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enlarged" id="lymph-enlarged" />
                    <label htmlFor="lymph-enlarged">Enlarged/Palpable</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tender" id="lymph-tender" />
                    <label htmlFor="lymph-tender">Tender</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="lymph-fixed" />
                    <label htmlFor="lymph-fixed">Fixed/Immobile</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="facialAsymmetry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facial asymmetry</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="asymmetry-none" />
                    <label htmlFor="asymmetry-none">No asymmetry</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mild" id="asymmetry-mild" />
                    <label htmlFor="asymmetry-mild">Mild asymmetry</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="severe" id="asymmetry-severe" />
                    <label htmlFor="asymmetry-severe">Severe asymmetry</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Intraoral Examination */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Intraoral Examination</h4>
        
        <FormField
          control={control}
          name="oralHygiene"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overall oral hygiene</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excellent" id="hygiene-excellent" />
                    <label htmlFor="hygiene-excellent">Excellent</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="hygiene-good" />
                    <label htmlFor="hygiene-good">Good</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="hygiene-fair" />
                    <label htmlFor="hygiene-fair">Fair</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="hygiene-poor" />
                    <label htmlFor="hygiene-poor">Poor</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lesion Assessment Section */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <h5 className="font-medium text-base mb-4">Lesion Assessment</h5>
          
          <FormField
            control={control}
            name="lesionPresent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is there a lesion present?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="lesion-yes" />
                      <label htmlFor="lesion-yes">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="lesion-no" />
                      <label htmlFor="lesion-no">No</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not-sure" id="lesion-not-sure" />
                      <label htmlFor="lesion-not-sure">I am not sure</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {lesionPresent === "yes" && (
            <div className="mt-6 space-y-4">
              <FormField
                control={control}
                name="lesionLocationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the location of the lesion? (Select all that apply)</FormLabel>
                    <div className="space-y-2">
                      {['Tongue', 'Lips', 'Palate', 'Buccal Mucosa', 'Floor of the mouth', 'Other'].map((location) => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location.toLowerCase().replace(/\s+/g, '-')}`}
                            checked={field.value?.includes(location) || false}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              if (checked) {
                                field.onChange([...currentValue, location]);
                              } else {
                                field.onChange(currentValue.filter((item) => item !== location));
                              }
                            }}
                          />
                          <label htmlFor={`location-${location.toLowerCase().replace(/\s+/g, '-')}`}>
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the colour of the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="white" id="color-white" />
                          <label htmlFor="color-white">White</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="red" id="color-red" />
                          <label htmlFor="color-red">Red</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mixed" id="color-mixed" />
                          <label htmlFor="color-mixed">Mixed</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="color-other" />
                          <label htmlFor="color-other">Other</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the approximate size of the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="up-to-5mm" id="size-small" />
                          <label htmlFor="size-small">Up to 5 mm</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="5-20mm" id="size-medium" />
                          <label htmlFor="size-medium">Between 5-20 mm</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="more-than-20mm" id="size-large" />
                          <label htmlFor="size-large">More than 20 mm</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="size-other" />
                          <label htmlFor="size-other">Other</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionShape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the shape of the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="round" id="shape-round" />
                          <label htmlFor="shape-round">Round</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="rectangular" id="shape-rectangular" />
                          <label htmlFor="shape-rectangular">Rectangular</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="shape-other" />
                          <label htmlFor="shape-other">Other</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionDistribution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the distribution of the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="localized" id="dist-localized" />
                          <label htmlFor="dist-localized">Localized</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="generalized" id="dist-generalized" />
                          <label htmlFor="dist-generalized">Generalized</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="single" id="dist-single" />
                          <label htmlFor="dist-single">Single</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="multiple" id="dist-multiple" />
                          <label htmlFor="dist-multiple">Multiple</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionDefinition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the definition of the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="well-defined" id="def-well" />
                          <label htmlFor="def-well">Well-defined</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="poorly-defined" id="def-poorly" />
                          <label htmlFor="def-poorly">Poorly-defined</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lesionClassification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Based on the above information, how will you classify the lesion?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-suspicious" id="class-non-suspicious" />
                          <label htmlFor="class-non-suspicious">Non-suspicious oral lesion</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="suspicious" id="class-suspicious" />
                          <label htmlFor="class-suspicious">Suspicious Oral Potentially Malignant Lesion</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="oral-cancer" id="class-cancer" />
                          <label htmlFor="class-cancer">Oral Cancer</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="class-other" />
                          <label htmlFor="class-other">Other</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        {/* Continue with original examination fields */}
        <FormField
          control={control}
          name="tongueExamination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tongue examination</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="tongue-normal" />
                    <label htmlFor="tongue-normal">Normal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coated" id="tongue-coated" />
                    <label htmlFor="tongue-coated">Coated</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ulcerated" id="tongue-ulcerated" />
                    <label htmlFor="tongue-ulcerated">Ulcerated</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leukoplakia" id="tongue-leukoplakia" />
                    <label htmlFor="tongue-leukoplakia">Leukoplakia</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="erythroplakia" id="tongue-erythroplakia" />
                    <label htmlFor="tongue-erythroplakia">Erythroplakia</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="floorOfMouth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Floor of mouth</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="floor-normal" />
                    <label htmlFor="floor-normal">Normal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="swollen" id="floor-swollen" />
                    <label htmlFor="floor-swollen">Swollen</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="indurated" id="floor-indurated" />
                    <label htmlFor="floor-indurated">Indurated</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ulcerated" id="floor-ulcerated" />
                    <label htmlFor="floor-ulcerated">Ulcerated</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="buccalMucosa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buccal mucosa (cheeks)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="buccal-normal" />
                    <label htmlFor="buccal-normal">Normal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="white-patches" id="buccal-white" />
                    <label htmlFor="buccal-white">White patches</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="red-patches" id="buccal-red" />
                    <label htmlFor="buccal-red">Red patches</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ulcers" id="buccal-ulcers" />
                    <label htmlFor="buccal-ulcers">Ulcers</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="gingivae"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gums (gingivae)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthy" id="gums-healthy" />
                    <label htmlFor="gums-healthy">Healthy (pink, firm)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inflamed" id="gums-inflamed" />
                    <label htmlFor="gums-inflamed">Inflamed (red, swollen)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bleeding" id="gums-bleeding" />
                    <label htmlFor="gums-bleeding">Bleeding</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recession" id="gums-recession" />
                    <label htmlFor="gums-recession">Recession</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Clinical Assessment */}
      <div className="space-y-4">
        <h4 className="font-medium text-base">Clinical Assessment</h4>
        
        <FormField
          control={control}
          name="participantId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participant ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter participant ID..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="riskLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk assessment for oral cancer</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="risk-low" />
                    <label htmlFor="risk-low">Low risk</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="risk-moderate" />
                    <label htmlFor="risk-moderate">Moderate risk</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="risk-high" />
                    <label htmlFor="risk-high">High risk</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urgent" id="risk-urgent" />
                    <label htmlFor="risk-urgent">Urgent referral needed</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="clinicalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clinical notes and observations</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Record detailed clinical observations, recommendations, and next steps..." 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="followUpRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Follow-up appointment required
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="referralRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Specialist referral required
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Next Step:</strong> After completing this clinical examination, proceed to capture photographic documentation for AI analysis and record keeping.
        </p>
      </div>
    </div>
  );
};

export default ClinicalExaminationForm;
