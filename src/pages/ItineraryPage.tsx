import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Utensils, ChevronRight, Share2, Download, Heart, PieChart, Sparkles, Star, Users, Car, Bus, Train, ExternalLink } from 'lucide-react';
import { useTrip } from '../TripContext';
import { useNavigate } from 'react-router-dom';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ItineraryPage = () => {
  const { currentPlan, currentRequest, saveTrip, setCurrentPlan } = useTrip();
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);

  if (!currentPlan || !currentRequest) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No trip plan found</h2>
        <button onClick={() => navigate('/plan')} className="bg-brand-600 text-white px-6 py-2 rounded-full">
          Start Planning
        </button>
      </div>
    );
  }

  const downloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ai-trip-planner-${currentRequest.destination.toLowerCase()}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const costData = [
    { name: 'Flights', value: currentPlan.costs.flights, color: '#0ea5e9' },
    { name: 'Accommodation', value: currentPlan.costs.accommodation, color: '#6366f1' },
    { name: 'Food', value: currentPlan.costs.food, color: '#f59e0b' },
    { name: 'Transport', value: currentPlan.costs.transport, color: '#10b981' },
    { name: 'Activities', value: currentPlan.costs.activities, color: '#ec4899' },
  ].filter(d => d.value > 0);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50" ref={pdfRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-brand-600 font-bold mb-2">
              <Sparkles className="w-5 h-5" />
              <span>AI-Generated Itinerary</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {currentRequest.destination} Adventure
            </h1>
            <div className="flex items-center space-x-4 text-slate-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {currentRequest.startDate} - {currentRequest.endDate}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {currentRequest.travelers} Travelers
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={downloadPDF}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                saveTrip(currentRequest, currentPlan);
                alert('Trip saved to your dashboard!');
              }}
              className="flex items-center space-x-2 bg-brand-600 text-white px-6 py-3 rounded-full font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20"
            >
              <Heart className="w-5 h-5" />
              <span>Save Trip</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Itinerary */}
          <div className="lg:col-span-2 space-y-12">
            {currentPlan.itinerary.map((day, idx) => (
              <motion.div 
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 border-l-2 border-slate-200"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-600 border-4 border-white shadow-sm" />
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">Day {day.day}: {day.title}</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Utensils className="w-3 h-3 mr-1" />
                        {day.meals.lunch}
                      </div>
                    </div>
                  </div>
                </div>

                  <div className="space-y-6">
                    {day.activities.map((act, i) => (
                      <React.Fragment key={i}>
                          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-xl bg-slate-50 text-slate-500">
                                <Clock className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-bold text-slate-400">{act.time}</span>
                            </div>
                            <div className="text-brand-600 font-bold text-sm bg-brand-50 px-3 py-1 rounded-full">
                              ₹{act.estimatedCost.toLocaleString()}
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900 mb-2">{act.activity}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed mb-4">{act.description}</p>
                          
                          {/* Maps Grounding Links */}
                          {act.groundingLinks && act.groundingLinks.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {act.groundingLinks.map((link, lIdx) => (
                                <a 
                                  key={lIdx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-1 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-md hover:bg-brand-100 transition-colors"
                                >
                                  <MapPin className="w-3 h-3" />
                                  <span>{link.title}</span>
                                  <ExternalLink className="w-2 h-2" />
                                </a>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center text-xs text-slate-400 font-medium">
                            <MapPin className="w-3 h-3 mr-1" />
                            {act.location}
                          </div>
                        </div>

                        {act.transportToNext && act.transportToNext.length > 0 && (
                          <div className="py-4 px-6 border-l-2 border-dashed border-slate-200 ml-6 my-2">
                            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                              <ChevronRight className="w-3 h-3 rotate-90" />
                              <span>Transport to next location</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {act.transportToNext.map((opt, j) => (
                                <div key={j} className="flex-1 min-w-[200px] bg-slate-50 border border-slate-100 p-4 rounded-2xl hover:border-brand-200 transition-colors">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                                      {opt.mode.toLowerCase().includes('bus') ? <Bus className="w-4 h-4 text-brand-500" /> : 
                                       opt.mode.toLowerCase().includes('train') || opt.mode.toLowerCase().includes('metro') ? <Train className="w-4 h-4 text-brand-500" /> :
                                       <Car className="w-4 h-4 text-brand-500" />}
                                      <span>{opt.mode}</span>
                                    </div>
                                    <div className="text-brand-600 font-bold text-xs">₹{opt.estimatedCost.toLocaleString()}</div>
                                  </div>
                                  <div className="flex items-center text-[10px] text-slate-400 mb-2">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {opt.duration}
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-relaxed italic">"{opt.description}"</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Cost & Recommendations */}
          <div className="space-y-8">
            {/* Cost Breakdown */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Cost Breakdown</h3>
                <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
                  <span className="font-bold text-lg">₹</span>
                </div>
              </div>

              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={costData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {costData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 mb-8">
                {costData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-500 font-medium">Total Estimated Cost</span>
                  <span className="text-2xl font-bold text-slate-900">₹{currentPlan.costs.total.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-400">Prices are estimates based on current market data and your preferences.</p>
              </div>
              
              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => navigate('/budget')}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-5 h-5 text-slate-400" />
                    <span className="font-bold text-slate-700">Detailed Budget</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Hotel Recommendations */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-bold mb-6">Top Recommendations</h3>
              <div className="space-y-6">
                {currentPlan.recommendations.hotels.map((hotel, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <h4 className="font-bold group-hover:text-brand-400 transition-colors">{hotel.name}</h4>
                        {hotel.mapsUrl && (
                          <a 
                            href={hotel.mapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-brand-400 flex items-center hover:underline mt-1"
                          >
                            <MapPin className="w-2 h-2 mr-1" />
                            View on Maps
                          </a>
                        )}
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-3 h-3 fill-yellow-400 mr-1" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mb-3 line-clamp-2">{hotel.description}</p>
                    <div className="text-sm font-bold text-brand-400">₹{hotel.price.toLocaleString()} / night</div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/accommodation')}
                className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all text-sm"
              >
                View More Options
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


