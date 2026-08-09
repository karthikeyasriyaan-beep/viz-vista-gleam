import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export function GmailFeedbackPoll() {
  const { user } = useAuth();
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);

  const vote = async (choice: 'yes' | 'no') => {
    if (!user || voted) return;
    setVoted(choice);
    await supabase.from('feature_feedback').insert({
      user_id: user.id,
      feature: 'gmail_connect',
      vote: choice,
    });
  };

  if (voted) {
    return (
      <p className="text-[10px] text-muted-foreground font-medium mt-1">
        Thanks for the feedback! 🙏
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-1">
      <span className="text-[10px] text-muted-foreground font-medium">Want this feature?</span>
      <button
        onClick={() => vote('yes')}
        className="p-1 rounded-md hover:bg-muted transition-colors"
        aria-label="Yes, keep Gmail Connect"
      >
        <ThumbsUp className="h-3 w-3 text-muted-foreground" />
      </button>
      <button
        onClick={() => vote('no')}
        className="p-1 rounded-md hover:bg-muted transition-colors"
        aria-label="No, remove Gmail Connect"
      >
        <ThumbsDown className="h-3 w-3 text-muted-foreground" />
      </button>
    </div>
  );
}