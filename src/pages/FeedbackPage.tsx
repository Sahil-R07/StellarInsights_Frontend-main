
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/PageLayout';
import AnimatedText from '@/components/ui-custom/AnimatedText';
import AstroCard from '@/components/ui-custom/AstroCard';
import StarryBackground from '@/components/ui-custom/StarryBackground';
import AstralCircle from '@/components/ui-custom/AstralCircle';
import ApiService from '@/services/api';

// Mock data for feedback (replace with actual API call in production)
const MOCK_FEEDBACK = [
  { id: 1, prediction: 'You will experience a significant career opportunity this month.', feedback: 'This came true! I got a job offer from my dream company.', rating: 5 },
  { id: 2, prediction: 'A close relationship will face challenges, requiring patience and communication.', feedback: 'I had a disagreement with my partner but we worked through it.', rating: 4 },
  { id: 3, prediction: 'Financial gains are likely through unexpected sources.', feedback: 'No unexpected money came my way yet.', rating: 2 },
  { id: 4, prediction: 'Travel plans may experience delays but will ultimately be fulfilling.', feedback: 'My flight was delayed but the trip was amazing!', rating: 5 },
  { id: 5, prediction: 'Your health will benefit from a new routine or practice.', feedback: 'Started yoga and I feel better already.', rating: 4 },
];

export default function FeedbackPage() {
  const [prediction, setPrediction] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackList, setFeedbackList] = useState(MOCK_FEEDBACK);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const handleSubmitFeedback = async () => {
    if (!prediction.trim()) {
      toast.error('Please enter a prediction');
      return;
    }
    
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please rate the prediction');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Call API to submit feedback
      await ApiService.submitFeedback({
        prediction,
        feedback,
        rating
      });
      
      // Add to local state (in a real app, you might refresh from API)
      const newFeedback = {
        id: feedbackList.length + 1,
        prediction,
        feedback,
        rating
      };
      
      setFeedbackList([newFeedback, ...feedbackList]);
      
      // Reset form
      setPrediction('');
      setFeedback('');
      setRating(0);
      
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter feedback based on search term and rating
  const filteredFeedback = feedbackList.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.prediction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === null || item.rating === filterRating;
    
    return matchesSearch && matchesRating;
  });

  return (
    <PageLayout>
      <StarryBackground density="low" />
      
      {/* Decorative elements */}
      <AstralCircle 
        size="lg" 
        color="bg-primary" 
        position={{ top: '10%', right: '5%' }} 
      />
      <AstralCircle 
        size="md" 
        color="bg-celestial-light" 
        position={{ bottom: '20%', left: '5%' }} 
      />
      
      <div className="page-container">
        <div className="max-w-4xl mx-auto">
          <AnimatedText
            text="User Feedback & Experiences"
            variant="h1"
            className="text-3xl md:text-4xl font-bold mb-6 text-center"
          />
          
          <AnimatedText
            text="Share your experience with our astrological predictions and help improve the system."
            variant="p"
            animation="fade-in"
            delay={200}
            className="text-lg text-muted-foreground mb-10 text-center max-w-2xl mx-auto"
          />
          
          <div className="grid grid-cols-1 gap-8">
            {/* Submit Feedback Form */}
            <AstroCard variant="glass">
              <h2 className="text-xl font-medium mb-4">Submit Your Feedback</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="prediction" className="block text-sm font-medium mb-1">
                    Prediction Received
                  </label>
                  <Textarea
                    id="prediction"
                    value={prediction}
                    onChange={(e) => setPrediction(e.target.value)}
                    placeholder="Enter the prediction you received..."
                    className="resize-none"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium mb-1">
                    Your Feedback
                  </label>
                  <Textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your experience with this prediction..."
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rate Accuracy (1-5)
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          fill={(hoverRating || rating) >= star ? 'currentColor' : 'none'}
                          className="h-6 w-6 text-primary transition-all"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={handleSubmitFeedback} 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Feedback'
                  )}
                </Button>
              </div>
            </AstroCard>
            
            {/* Feedback List */}
            <AstroCard variant="glass">
              <h2 className="text-xl font-medium mb-4">Community Feedback</h2>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search feedback..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={filterRating !== null ? filterRating : ''}
                      onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                    >
                      <option value="">All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>
                </div>
                
                {filteredFeedback.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Prediction</TableHead>
                          <TableHead>Feedback</TableHead>
                          <TableHead className="w-[100px]">Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeedback.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.prediction.length > 40 ? `${item.prediction.substring(0, 40)}...` : item.prediction}
                            </TableCell>
                            <TableCell>{item.feedback}</TableCell>
                            <TableCell>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    fill={i < item.rating ? 'currentColor' : 'none'}
                                    className="text-primary"
                                  />
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No feedback found matching your filters.
                  </div>
                )}
              </div>
            </AstroCard>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
