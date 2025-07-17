'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Building, MapPin, Phone, Globe, Search, Loader2, CheckCircle, Link2, ArrowRight } from 'lucide-react';
import CharacterMessage from './CharacterMessage';
import OnboardingLayout from './OnboardingLayout';
import { usePlaces } from '@/app/(protected-views)/(features)/scan/hooks/usePlaces';
import { toast } from '@/components/hooks/use-toast';
import { stripPhoneNumber } from '@/lib/utils/phoneUtils';
import AuthService from '@/lib/auth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BusinessConnectScreenProps {
  onNext: (data: { businessData?: any; connectionType: 'search' | 'gmb' }) => void;
  onBack: () => void;
}


const BusinessConnectScreen: React.FC<BusinessConnectScreenProps> = ({ onNext, onBack }) => {
  const [businessInput, setBusinessInput] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showGMBDialog, setShowGMBDialog] = useState(false);
  const authService = AuthService.getInstance();
  
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

  const handleContinueWithSearch = () => {
    if (selectedBusiness) {
      onNext({ businessData: selectedBusiness, connectionType: 'search' });
    }
  };

  const handleConnectGMB = () => {
    const token = authService.getAccessToken();
    
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please log in to connect your Google Business Profile.",
        variant: "destructive",
      });
      return;
    }

    // Get the base URL from environment or default
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://app.localrank.dev';
    const url = `${baseUrl}/gmb/auth/start/?token=${encodeURIComponent(token)}`;
    
    // Store onboarding state to resume after OAuth
    localStorage.setItem('onboarding_step', '3'); // Will continue to pricing after GMB connect
    localStorage.setItem('onboarding_flow', 'v3');
    
    // Redirect to GMB OAuth
    window.location.href = url;
  };

  const handleSkipWithDemo = () => {
    const demoStarbucks = {
      name: 'Starbucks',
      address: '1912 Pike Pl, Seattle, WA 98101, USA',
      location: {
        lat: 47.6101,
        lng: -122.3421
      },
      place_id: 'ChIJQSrBBv1VkFQRFXbpFHRTnTI',
      phone: '(206) 448-8762',
      website: 'https://www.starbucks.com',
      rating: 4.2,
      user_ratings_total: 1250,
      business_status: 'OPERATIONAL',
      types: ['cafe', 'food', 'point_of_interest', 'store', 'establishment']
    };
    
    onNext({ 
      businessData: demoStarbucks,
      connectionType: 'search'
    });
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={11}
      onNext={selectedBusiness ? handleContinueWithSearch : undefined}
      onBack={onBack}
      nextButtonText="Continue with this business"
      nextButtonDisabled={!selectedBusiness}
      hideNextButton={true}
    >
      <div className="max-w-3xl mx-auto">
        <CharacterMessage
          message={(
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Let's Find Your Business 🏢
              </h2>
              <p className="text-gray-600">
                Search on Google Maps or connect your Google Business Profile for advanced features
              </p>
            </>
          )}
          imageSize={64}
          imageAlt="Jacky Chou"
        />

        <div className="mt-8 space-y-8">
            {/* Primary Option: Search on Google Maps */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                Find Your Business
              </h3>
              
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
                  <span className="ml-3 text-gray-600">Finding your business details...</span>
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

                    <Button
                      onClick={handleContinueWithSearch}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    >
                      Continue with this business
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Advanced Options */}
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Need more options?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => setShowGMBDialog(true)}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    Connect Google Business
                  </Button>
                  <Button
                    onClick={handleSkipWithDemo}
                    variant="ghost"
                    className="flex items-center justify-center text-gray-600"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Skip with Demo (Starbucks)
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* GMB Connection Dialog */}
      <Dialog open={showGMBDialog} onOpenChange={setShowGMBDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Google Business Profile</DialogTitle>
            <DialogDescription>
              You'll be redirected to Google for authorization. This allows us to:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 my-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-sm">Read your business information</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-sm">Manage posts and updates</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-sm">Respond to customer reviews</span>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowGMBDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectGMB} className="bg-blue-600 hover:bg-blue-700">
              Continue to Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </OnboardingLayout>
  );
};

export default BusinessConnectScreen;
