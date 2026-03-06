import React, { createContext, useContext, useState, useEffect } from 'react';
import { TripPlanRequest, TripPlanResponse } from './services/geminiService';

interface TripContextType {
  currentRequest: TripPlanRequest | null;
  setCurrentRequest: (req: TripPlanRequest) => void;
  currentPlan: TripPlanResponse | null;
  setCurrentPlan: (plan: TripPlanResponse) => void;
  savedTrips: { id: string; request: TripPlanRequest; plan: TripPlanResponse; date: string }[];
  saveTrip: (req: TripPlanRequest, plan: TripPlanResponse) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRequest, setCurrentRequest] = useState<TripPlanRequest | null>(null);
  const [currentPlan, setCurrentPlan] = useState<TripPlanResponse | null>(null);
  const [savedTrips, setSavedTrips] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('saved_trips');
    if (stored) setSavedTrips(JSON.parse(stored));
  }, []);

  const saveTrip = (req: TripPlanRequest, plan: TripPlanResponse) => {
    const newTrip = {
      id: Math.random().toString(36).substr(2, 9),
      request: req,
      plan: plan,
      date: new Date().toISOString()
    };
    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem('saved_trips', JSON.stringify(updated));
  };

  return (
    <TripContext.Provider value={{
      currentRequest, setCurrentRequest,
      currentPlan, setCurrentPlan,
      savedTrips, saveTrip
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) throw new Error('useTrip must be used within a TripProvider');
  return context;
};
