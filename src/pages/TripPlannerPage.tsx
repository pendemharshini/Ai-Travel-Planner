import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Users, Wallet, Plane, Hotel, Utensils, Sparkles, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTrip } from '../TripContext';
import { generateTripPlan } from '../services/geminiService';

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center space-x-4 mb-12">
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
          currentStep >= step ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-slate-200 text-slate-500'
        }`}>
          {step}
        </div>
        {step < 3 && (
          <div className={`w-12 h-1 bg-slate-200 rounded-full overflow-hidden`}>
            <div className={`h-full bg-brand-600 transition-all duration-500 ${currentStep > step ? 'w-full' : 'w-0'}`} />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const TripPlannerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentRequest, setCurrentPlan } = useTrip();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: location.state?.destination || '',
    departureCity: '',
    startDate: location.state?.startDate || '',
    endDate: '',
    travelers: 1,
    budget: 'moderate',
    style: 'balanced',
    accommodation: 'hotel',
    transport: 'flight',
    food: 'local',
    activities: [] as string[],
    purpose: 'vacation'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleActivity = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const [loadingMessage, setLoadingMessage] = useState('Analyzing your preferences...');

  const loadingMessages = [
    'Analyzing your preferences...',
    'Searching for the best destinations...',
    'Finding local hidden gems...',
    'Calculating travel costs...',
    'Optimizing your route...',
    'Curating local dining spots...',
    'Generating your dream itinerary...',
    'Almost there! Finalizing details...'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 3000);

    try {
      const plan = await generateTripPlan(formData);
      setCurrentRequest(formData);
      setCurrentPlan(plan);
      navigate('/itinerary');
    } catch (error: any) {
      console.error('Failed to generate plan:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Plan Your Dream Trip</h1>
          <p className="text-slate-600">Tell us your preferences and our AI will craft the perfect journey for you.</p>
        </div>

        <StepIndicator currentStep={step} />

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-brand-600" /> Destination
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      placeholder="e.g. Munnar, Kerala"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Plane className="w-4 h-4 mr-2 text-brand-600" /> Departure City
                    </label>
                    <input
                      type="text"
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai, India"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-brand-600" /> Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-brand-600" /> End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center">
                    <Users className="w-4 h-4 mr-2 text-brand-600" /> Number of Travelers
                  </label>
                  <div className="flex items-center space-x-4">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <button
                        key={num}
                        onClick={() => setFormData(prev => ({ ...prev, travelers: typeof num === 'string' ? 6 : num }))}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          (formData.travelers === num || (num === '6+' && formData.travelers >= 6))
                            ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Wallet className="w-4 h-4 mr-2 text-brand-600" /> Budget Range
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'budget', label: 'Budget', desc: 'Hostels & Street Food' },
                        { id: 'moderate', label: 'Moderate', desc: 'Hotels & Local Dining' },
                        { id: 'luxury', label: 'Luxury', desc: 'Resorts & Fine Dining' },
                      ].map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setFormData(prev => ({ ...prev, budget: b.id }))}
                          className={`p-4 rounded-2xl text-left border-2 transition-all ${
                            formData.budget === b.id ? 'border-brand-600 bg-brand-50/50' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="font-bold text-slate-900">{b.label}</div>
                          <div className="text-xs text-slate-500">{b.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-bold text-slate-700 flex items-center">
                      <Hotel className="w-4 h-4 mr-2 text-brand-600" /> Accommodation
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'hotel', label: 'Hotel', icon: Hotel },
                        { id: 'hostel', label: 'Hostel', icon: Users },
                        { id: 'resort', label: 'Resort', icon: Sparkles },
                        { id: 'airbnb', label: 'Airbnb', icon: MapPin },
                      ].map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setFormData(prev => ({ ...prev, accommodation: a.id }))}
                          className={`p-4 rounded-2xl text-left border-2 flex items-center space-x-4 transition-all ${
                            formData.accommodation === a.id ? 'border-brand-600 bg-brand-50/50' : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${formData.accommodation === a.id ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <a.icon className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-slate-900">{a.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-[2] bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-brand-600" /> Activities & Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Adventure', 'Cultural', 'Nature', 'Nightlife', 'Shopping', 'Foodie', 'Relaxation', 'History', 'Photography'].map((act) => (
                      <button
                        key={act}
                        onClick={() => toggleActivity(act)}
                        className={`p-4 rounded-2xl text-center border-2 transition-all font-medium ${
                          formData.activities.includes(act) ? 'border-brand-600 bg-brand-50/50 text-brand-700' : 'border-slate-100 text-slate-600 hover:border-slate-200'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 flex items-center">
                    <Utensils className="w-4 h-4 mr-2 text-brand-600" /> Food Preference
                  </label>
                  <select
                    name="food"
                    value={formData.food}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="local">Local Cuisine</option>
                    <option value="international">International</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="halal">Halal</option>
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-[2] bg-brand-600 text-white py-4 rounded-2xl font-bold hover:bg-brand-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-600/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating Itinerary...</span>
                        </div>
                        <span className="text-[10px] font-normal mt-1 text-white/70 animate-pulse">{loadingMessage}</span>
                      </div>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generate My Trip</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
