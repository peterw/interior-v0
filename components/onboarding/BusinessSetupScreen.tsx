'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Building, MapPin, Phone, Globe, Search, Loader2, CheckCircle } from 'lucide-react';
import CharacterMessage from './CharacterMessage';
import { usePlaces } from '@/app/(protected-views)/(features)/scan/hooks/usePlaces';
import { toast } from '@/components/hooks/use-toast';
import { stripPhoneNumber } from '@/lib/utils/phoneUtils';

interface BusinessSetupScreenProps {
  onNext: (data: { businessData: any }) => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BusinessSetupScreen: React.FC<BusinessSetupScreenProps> = ({ onNext, onBack }) => {
  const [businessInput, setBusinessInput] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  
  const shouldShowSuggestions = businessInput.length > 2 && !selectedBusiness;
  const { suggestions, loading: placesLoading, getDetails } = usePlaces(
    shouldShowSuggestions ? businessInput : ""
  );

  const handleBusinessInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBusinessInput(value);
    if (selectedBusiness) {
      setSelectedBusiness(null);
    }
  };

  const extractText = (textObj: any): string => {
    if (typeof textObj === 'string') return textObj;
    if (textObj && typeof textObj === 'object' && textObj.text) return textObj.text;
    return '';
  };

  const handleSuggestionSelect = async (suggestion: { placeId: string; text: string; fullData: any }) => {
    try {
      setIsLoadingDetails(true);
      setBusinessInput(suggestion.text);

      const placeDetails = await getDetails(suggestion.placeId);
      console.log('Place details:', placeDetails);

      const businessData = {
        placeId: suggestion.placeId,
        name: extractText(placeDetails.displayName) || extractText(placeDetails.name) || suggestion.text,
        address: extractText(placeDetails.formattedAddress),
        googleMapsUrl: placeDetails.googleMapsUri,
        phoneNumber: stripPhoneNumber(placeDetails.nationalPhoneNumber || placeDetails.internationalPhoneNumber),
        website: placeDetails.websiteUri,
        rating: placeDetails.rating,
        userRatingCount: placeDetails.userRatingCount,
        location: placeDetails.location,
        primaryType: placeDetails.primaryType,
      };

      setSelectedBusiness(businessData);
    } catch (error) {
      console.error('Error fetching place details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleContinue = () => {
    if (selectedBusiness) {
      onNext({ businessData: selectedBusiness });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white p-6">
      <div className="w-full max-w-2xl flex-grow flex flex-col">
        {/* Back Arrow */}
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-4 self-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Progress Bar (Step 2/8 = 25%) */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
        </div>

        {/* Main Content Area - Animated */}
        <motion.div 
          className="flex-grow"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <CharacterMessage message="Let's set up your business profile. Start by searching for your business on Google:" />

          <div className="mt-6 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for your business name..."
                  value={businessInput}
                  onChange={handleBusinessInputChange}
                  className="pl-10 pr-4 py-3 text-base"
                />
                {placesLoading && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-gray-400" />
                )}
              </div>

              {/* Autocomplete Suggestions */}
              {suggestions.length > 0 && !selectedBusiness && (
                <Card className="absolute z-10 w-full mt-1 shadow-lg">
                  <div className="py-2 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.placeId}
                        onClick={() => handleSuggestionSelect(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b last:border-b-0"
                      >
                        <div className="flex items-start">
                          <Building className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{suggestion.text}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Loading Details */}
            {isLoadingDetails && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600">Loading business details...</span>
              </div>
            )}

            {/* Selected Business Details */}
            {selectedBusiness && !isLoadingDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-green-200 bg-green-50">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Business Found!</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedBusiness.name}</p>
                      </div>
                    </div>
                    
                    {selectedBusiness.address && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <p className="text-gray-600">{selectedBusiness.address}</p>
                      </div>
                    )}
                    
                    {selectedBusiness.phoneNumber && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <p className="text-gray-600">{selectedBusiness.phoneNumber}</p>
                      </div>
                    )}
                    
                    {selectedBusiness.website && (
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                        <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedBusiness.website}
                        </a>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Alternative Options */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">Don't see your business?</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Handle manual entry or GMB sync
                  toast({
                    title: "Coming Soon",
                    description: "Manual entry and GMB sync options will be available soon.",
                  });
                }}
              >
                Add manually or sync with GMB
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Continue Button - Animated */}
      <motion.div 
        className="w-full max-w-2xl mt-auto pt-6 border-t border-gray-200"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedBusiness}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 text-lg rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessSetupScreen;