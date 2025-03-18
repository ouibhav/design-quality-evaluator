
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import EvaluationResults from '@/components/EvaluationResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DesignEvaluation, mockEvaluationResults } from '@/models/designCriteria';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DesignQualityAssurance = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<DesignEvaluation | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    // Reset evaluation when a new file is selected
    setEvaluationResults(null);
  };

  const handleEvaluate = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a PDF file to evaluate."
      });
      return;
    }

    setIsEvaluating(true);
    
    // Simulate API call with timeout
    try {
      // In a real application, this would be an API call to a backend service
      setTimeout(() => {
        // Mock evaluation results
        const results = mockEvaluationResults(selectedFile.name);
        setEvaluationResults(results);
        setIsEvaluating(false);
        
        toast({
          title: "Evaluation complete",
          description: "Your design has been evaluated successfully."
        });
      }, 3000);
    } catch (error) {
      setIsEvaluating(false);
      toast({
        variant: "destructive",
        title: "Evaluation failed",
        description: "An error occurred during the evaluation process."
      });
    }
  };

  const resetEvaluation = () => {
    setSelectedFile(null);
    setEvaluationResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!evaluationResults ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Design Quality Assurance</h1>
                <p className="text-gray-600">
                  Upload your Plan Set to evaluate quality and receive feedback
                </p>
              </div>
              
              <Card>
                <CardContent className="pt-6">
                  <FileUpload onFileSelected={handleFileSelected} />
                  
                  <div className="mt-6 flex justify-center">
                    <Button 
                      onClick={handleEvaluate} 
                      disabled={!selectedFile || isEvaluating} 
                      className="bg-gold-500 hover:bg-gold-600 text-white"
                    >
                      {isEvaluating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Evaluating...
                        </>
                      ) : (
                        'Evaluate Design'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {isEvaluating && (
                <div className="mt-8 text-center">
                  <div className="inline-block rounded-lg bg-white p-6 shadow-md">
                    <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-gold-500" />
                    <h3 className="text-lg font-medium">Analyzing your design...</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      This may take up to a minute depending on the complexity
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quality Check</h1>
                <Button 
                  variant="outline" 
                  onClick={resetEvaluation}
                >
                  Evaluate Another Plan Set
                </Button>
              </div>
              
              <EvaluationResults evaluation={evaluationResults} />
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Design Quality Evaluator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DesignQualityAssurance;
