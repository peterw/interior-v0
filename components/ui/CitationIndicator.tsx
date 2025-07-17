import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from '@/lib/axios';
import { Card, CardContent } from "@/components/ui/card";
import { cf } from "@/lib/cf"

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const pulseAnimation = `
  @keyframes green-pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  
  .green-pulse-indicator {
    animation: green-pulse 2s infinite;
    background-color: #10b981;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
`;

const CitationIndicator = () => {
  const [totalCitations, setTotalCitations] = useState<number>(2312); // Default fallback number
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchTotalCitations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BACKEND_API_URL}/api/citations/total-citations/`);
        console.log('Total citations API response:', response.data);
        if (response.data && response.data.total_citations) {
          setTotalCitations(response.data.total_citations);
        }
        setError(false);
      } catch (err) {
        console.error('Error fetching total citations:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalCitations();
  }, []);

  return (
    <Card className="mb-6 border rounded-lg shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <style dangerouslySetInnerHTML={{ __html: pulseAnimation }} />
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 relative mb-4">
            <Image 
              src={cf("/images/globe.png")} 
              alt="Globe" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center mb-1">
              <span className="green-pulse-indicator"></span>
              <span className="font-medium">
                {isLoading ? "Loading citations..." : 
                 error ? "2312 indexed citations" : 
                 `${totalCitations.toLocaleString()} citations`}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              already created
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CitationIndicator;
