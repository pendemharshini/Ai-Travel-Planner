import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, ArrowRight, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationCard = ({ name, country, rating, price, image, tags }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100"
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/seed/${name.toLowerCase()}/800/600`;
        }}
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 flex items-center">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
        {rating}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{name}</h3>
          <div className="flex items-center text-slate-500 text-xs">
            <MapPin className="w-3 h-3 mr-1" />
            {country}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block">Avg. Cost</span>
          <span className="text-sm font-bold text-brand-600">₹{price}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag: string) => (
          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-400 px-2 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>
      <Link 
        to="/plan" 
        state={{ destination: `${name}, ${country}` }}
        className="mt-6 w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold hover:bg-brand-600 hover:text-white transition-all group"
      >
        <span>Plan Trip</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </motion.div>
);

export const ExplorePage = () => {
  const destinations = [
    { name: 'Munnar', country: 'India', rating: '4.8', price: '25,000', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800', tags: ['Nature', 'Hills', 'Tea'] },
    { name: 'Leh', country: 'India', rating: '4.9', price: '45,000', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800', tags: ['Adventure', 'Mountains', 'Biking'] },
    { name: 'Udaipur', country: 'India', rating: '4.7', price: '35,000', image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?auto=format&fit=crop&q=80&w=800', tags: ['Palace', 'Lakes', 'Royal'] },
    { name: 'Goa', country: 'India', rating: '4.9', price: '20,000', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800', tags: ['Beach', 'Party', 'Relax'] },
    { name: 'Varanasi', country: 'India', rating: '4.8', price: '15,000', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800', tags: ['Spiritual', 'Ghats', 'Culture'] },
    { name: 'Hampi', country: 'India', rating: '4.9', price: '18,000', image: 'https://images.unsplash.com/photo-1600100397608-f010e423b971?auto=format&fit=crop&q=80&w=800', tags: ['History', 'Ruins', 'Art'] },
    { name: 'Andaman', country: 'India', rating: '4.8', price: '55,000', image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9c85f95?auto=format&fit=crop&q=80&w=800', tags: ['Island', 'Scuba', 'Beach'] },
    { name: 'Srinagar', country: 'India', rating: '4.8', price: '40,000', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800', tags: ['Valley', 'Lakes', 'Nature'] },
    { name: 'Jaisalmer', country: 'India', rating: '4.7', price: '28,000', image: 'https://images.unsplash.com/photo-1545051905-39115d544108?auto=format&fit=crop&q=80&w=800', tags: ['Desert', 'Fort', 'Camel'] },
    { name: 'Coorg', country: 'India', rating: '4.8', price: '22,000', image: 'https://images.unsplash.com/photo-1590050752117-23a97b02bb17?auto=format&fit=crop&q=80&w=800', tags: ['Coffee', 'Nature', 'Hills'] },
    { name: 'Rishikesh', country: 'India', rating: '4.9', price: '12,000', image: 'https://images.unsplash.com/photo-1517630800677-932d836ab680?auto=format&fit=crop&q=80&w=800', tags: ['Yoga', 'Ganges', 'Adventure'] },
    { name: 'Mysore', country: 'India', rating: '4.7', price: '16,000', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800', tags: ['Palace', 'Heritage', 'Silk'] },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Explore Destinations</h1>
            <p className="text-slate-600">Discover your next favorite place to visit.</p>
          </div>
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none text-sm"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex overflow-x-auto pb-8 space-x-3 no-scrollbar">
          {['All', 'Popular', 'Beach', 'Mountain', 'City', 'Adventure', 'Cultural', 'Luxury'].map((filter) => (
            <button 
              key={filter}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === 'All' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={i} {...dest} />
          ))}
        </div>

        {/* Destination Insights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Safety Ratings</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Real-time safety data and traveler reports to ensure you stay informed and secure.</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Tourist Popularity</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Avoid the crowds or find the hotspots with our dynamic popularity tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
