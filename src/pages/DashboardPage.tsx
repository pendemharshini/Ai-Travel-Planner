import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Calendar, MapPin, DollarSign, ArrowRight, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useTrip } from '../TripContext';
import { Link, useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { savedTrips, setCurrentRequest, setCurrentPlan } = useTrip();
  const navigate = useNavigate();

  const handleViewTrip = (trip: any) => {
    setCurrentRequest(trip.request);
    setCurrentPlan(trip.plan);
    navigate('/itinerary');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Trips</h1>
            <p className="text-slate-600">Manage your planned adventures and saved itineraries.</p>
          </div>
          <Link to="/plan" className="flex items-center space-x-2 bg-brand-600 text-white px-6 py-3 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20">
            <Plus className="w-5 h-5" />
            <span>New Trip</span>
          </Link>
        </div>

        {savedTrips.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No trips saved yet</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Start planning your next journey and save it here to access it anytime.</p>
            <Link to="/plan" className="inline-flex items-center space-x-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
              <span>Start Planning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedTrips.map((trip) => (
              <motion.div 
                key={trip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{trip.request.destination}</h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        From {trip.request.departureCity}
                      </div>
                    </div>
                    <div className="bg-brand-50 px-3 py-1 rounded-full text-xs font-bold text-brand-600 flex items-center">
                      <span className="mr-1">₹</span>
                      {trip.plan.costs.total.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-8 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5 text-brand-600" />
                      {new Date(trip.request.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Plus className="w-4 h-4 mr-1.5 text-brand-600" />
                      {trip.plan.itinerary.length} Days
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleViewTrip(trip)}
                      className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Plan</span>
                    </button>
                    <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
