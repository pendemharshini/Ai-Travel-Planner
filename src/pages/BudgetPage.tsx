import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useTrip } from '../TripContext';
import { DollarSign, TrendingUp, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BudgetPage = () => {
  const { currentPlan, currentRequest } = useTrip();
  const navigate = useNavigate();

  if (!currentPlan) {
    navigate('/plan');
    return null;
  }

  const costData = [
    { name: 'Flights', value: currentPlan.costs.flights, color: '#0ea5e9' },
    { name: 'Accommodation', value: currentPlan.costs.accommodation, color: '#6366f1' },
    { name: 'Food', value: currentPlan.costs.food, color: '#f59e0b' },
    { name: 'Transport', value: currentPlan.costs.transport, color: '#10b981' },
    { name: 'Activities', value: currentPlan.costs.activities, color: '#ec4899' },
    { name: 'Visa & Insurance', value: currentPlan.costs.visa + currentPlan.costs.insurance, color: '#8b5cf6' },
  ].filter(d => d.value > 0);

  const dailyData = currentPlan.itinerary.map(day => ({
    name: `Day ${day.day}`,
    cost: day.activities.reduce((sum, act) => sum + act.estimatedCost, 0) + (currentPlan.costs.food / currentPlan.itinerary.length)
  }));

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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Budget Breakdown</h1>
          <p className="text-slate-600">A detailed analysis of your estimated travel expenses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Category Distribution */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Category Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Spending */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Daily Spending Estimate</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="cost" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-brand-600 p-8 rounded-[2.5rem] text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-white/10">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Total Budget</span>
            </div>
            <div className="text-4xl font-bold mb-2">₹{currentPlan.costs.total.toLocaleString()}</div>
            <p className="text-sm text-white/70">Estimated total for {currentRequest?.travelers} travelers</p>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-white/10">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Daily Average</span>
            </div>
            <div className="text-4xl font-bold mb-2">
              ₹{Math.round(currentPlan.costs.total / currentPlan.itinerary.length).toLocaleString()}
            </div>
            <p className="text-sm text-white/70">Per day across the entire trip</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Smart Tip</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Buffer for Misc</h4>
            <p className="text-sm text-slate-500 leading-relaxed">We've included a 10% buffer (₹{Math.round(currentPlan.costs.misc).toLocaleString()}) for unexpected expenses like local tips or spontaneous activities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
