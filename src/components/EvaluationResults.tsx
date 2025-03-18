
import React from 'react';
import { DesignEvaluation, CriteriaItem } from '@/models/designCriteria';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, FileText, Calendar } from 'lucide-react';

interface EvaluationResultsProps {
  evaluation: DesignEvaluation | null;
}

const ScoreCard = ({ criteria }: { criteria: CriteriaItem }) => {
  const percentage = (criteria.score / criteria.maxScore) * 100;
  
  let progressColor = 'bg-amber-500';
  if (percentage >= 80) progressColor = 'bg-green-500';
  else if (percentage <= 40) progressColor = 'bg-red-500';
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{criteria.name}</CardTitle>
            <CardDescription className="text-xs">{criteria.description}</CardDescription>
          </div>
          <Badge className={`${percentage >= 80 ? 'bg-green-100 text-green-800' : percentage <= 40 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
            {criteria.score}/{criteria.maxScore}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className="h-2" 
            indicatorClassName={progressColor}
          />
          <p className="text-sm text-muted-foreground">{criteria.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const EvaluationResults: React.FC<EvaluationResultsProps> = ({ evaluation }) => {
  if (!evaluation) return null;
  
  const { totalScore, maxPossibleScore, criteria, fileName, uploadDate, status, overallFeedback } = evaluation;
  const percentage = (totalScore / maxPossibleScore) * 100;
  
  let statusBadge;
  if (status === 'completed') {
    statusBadge = <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Completed</Badge>;
  } else if (status === 'processing') {
    statusBadge = <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" /> Processing</Badge>;
  } else {
    statusBadge = <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" /> Error</Badge>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Design Evaluation Results</h2>
          <div className="flex items-center gap-2 mt-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{fileName}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {uploadDate.toLocaleDateString()} at {uploadDate.toLocaleTimeString()}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {statusBadge}
          <div className="mt-2 flex items-center gap-2">
            <div className="text-3xl font-bold">
              {totalScore}/{maxPossibleScore}
            </div>
            <div className="text-sm">
              ({percentage.toFixed(0)}%)
            </div>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Overall Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{overallFeedback}</p>
        </CardContent>
      </Card>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Detailed Criteria</h3>
        {criteria.map((item) => (
          <ScoreCard key={item.id} criteria={item} />
        ))}
      </div>
    </div>
  );
};

export default EvaluationResults;
