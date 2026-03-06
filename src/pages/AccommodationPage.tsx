import React from 'react';
import { motion } from 'motion/react';
import { Hotel, Star, MapPin, Wifi, Coffee, Car, Shield, ArrowLeft, ExternalLink } from 'lucide-react';
import { useTrip } from '../TripContext';
import { useNavigate } from 'react-router-dom';

export const AccommodationPage = () => {
  const { currentPlan, currentRequest } = useTrip();
  const navigate = useNavigate();

  if (!currentPlan) {
    navigate('/plan');
    return null;
  }

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Coffee, label: 'Breakfast' },
    { icon: Car, label: 'Parking' },
    { icon: Shield, label: 'Safe' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-slate-500 hover:text-brand-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Itinerary</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Accommodation Options</h1>
          <p className="text-slate-600">Top-rated stays in {currentRequest?.destination} matching your budget.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {currentPlan.recommendations.hotels.map((hotel, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&sig=${i}`} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = `https://picsum.photos/seed/hotel-${i}/800/600`;
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                  {hotel.rating}
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{hotel.name}</h3>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Per Night</span>
                    <span className="text-lg font-bold text-brand-600">₹{hotel.price.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-slate-400 text-xs mb-6">
                  <MapPin className="w-3 h-3 mr-1" />
                  Central {currentRequest?.destination}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">{hotel.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-slate-500">
                      <div className="p-1.5 rounded-lg bg-slate-50">
                        <amenity.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-medium">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center space-x-3">
                  <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all text-sm">
                    Select Stay
                  </button>
                  <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-brand-600 transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Insight */}
        <div className="mt-16 bg-brand-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center flex-shrink-0">
            <Hotel className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">Why these options?</h3>
            <p className="text-white/80 leading-relaxed">
              Our AI analyzed over 500 properties in {currentRequest?.destination} and selected these based on your {currentRequest?.budget} budget, {currentRequest?.style} travel style, and proximity to your planned activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
