import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface ConnectAccountPromptProps {
  // In the future, we can add props to control visibility, like 'isOpen' and 'onClose'
  // For now, it's always visible.
}

export function ConnectAccountPrompt({}: ConnectAccountPromptProps) {
  // TODO: Add state and logic to handle closing the prompt later
  const isVisible = true; // Hardcoded to true as requested

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
      <Card className="w-full max-w-md shadow-xl relative pointer-events-auto">
        <CardContent className="p-8 text-center space-y-4">
          <div className="flex justify-center mb-4">
             <div className="bg-orange-100 rounded-full p-3 inline-flex">
               <Home className="h-8 w-8 text-orange-600" />
             </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            You've reached a premium feature
          </h2>
          <p className="text-gray-600 mb-4">
            Unlock powerful tools to manage your Google Business Profile and sync reviews automatically.
          </p>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white h-10">
            Upgrade Now to Premium
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Cancel anytime. 14-day money back guarantee.
          </p>
          {/* Optional: Add a close button later */}
          {/* <button 
             onClick={() => {}} // Add close handler later
             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
           >
             <X className="h-5 w-5" /> 
           </button> */}
        </CardContent>
      </Card>
    </div>
  );
} 