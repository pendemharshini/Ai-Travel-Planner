import React from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Calendar, Users, ArrowRight, Star, TrendingUp, ShieldCheck, Globe, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const FeaturedCard = ({ title, location, price, image, rating }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
  >
    <div className="aspect-[4/5] overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
        onError={(e: any) => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/seed/${title.toLowerCase().replace(/\s+/g, '-')}/800/1000`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <div className="flex items-center space-x-1 mb-2">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium">{rating}</span>
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <div className="flex items-center text-white/80 text-sm mb-4">
        <MapPin className="w-3 h-3 mr-1" />
        {location}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-white/60 block uppercase tracking-wider">Est. Cost</span>
          <span className="text-lg font-bold">₹{price}</span>
        </div>
        <button className="bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-brand-600 p-2 rounded-full transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
);

export const LandingPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [date, setDate] = React.useState('');

  const destinations = [
    { title: 'Munnar Hills', location: 'Kerala', price: '25,000', rating: '4.8', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800' },
    { title: 'Leh Ladakh', location: 'Ladakh', price: '45,000', rating: '4.9', image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?auto=format&fit=crop&q=80&w=800' },
    { title: 'Udaipur Palace', location: 'Rajasthan', price: '35,000', rating: '4.7', image: 'https://images.unsplash.com/photo-1590593162211-f98f76d28ec5?auto=format&fit=crop&q=80&w=800' },
    { title: 'Goa Beaches', location: 'Goa', price: '20,000', rating: '4.9', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800' },
    { title: 'Varanasi Ghats', location: 'Uttar Pradesh', price: '15,000', rating: '4.8', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800' },
    { title: 'Hampi Ruins', location: 'Karnataka', price: '18,000', rating: '4.9', image: 'https://images.unsplash.com/photo-1586724230021-4c38383a6a36?auto=format&fit=crop&q=80&w=800' },
    { title: 'Andaman Islands', location: 'Andaman', price: '55,000', rating: '4.8', image: 'https://images.unsplash.com/photo-1589136777351-fdc9c9c85f95?auto=format&fit=crop&q=80&w=800' },
    { title: 'Srinagar Valley', location: 'Kashmir', price: '40,000', rating: '4.8', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = "https://picsum.photos/seed/travel-hero/1920/1080";
            }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Your Next Adventure, <br />
              <span className="text-brand-400">Crafted by AI.</span>
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Personalized itineraries, precise cost predictions, and smart recommendations. Plan your dream trip in seconds.
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 flex items-center px-4 w-full">
                <MapPin className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full py-3 text-slate-900 focus:outline-none placeholder:text-slate-400 font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-slate-200" />
              <div className="flex-1 flex items-center px-4 w-full relative">
                <Calendar className="text-slate-400 w-5 h-5 mr-3" />
                <input 
                  type="date"
                  className="w-full py-3 text-slate-900 focus:outline-none font-medium bg-transparent cursor-pointer appearance-none"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <button 
                onClick={() => navigate('/plan', { state: { destination: search, startDate: date } })}
                className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl md:rounded-full font-bold transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-600/20"
              >
                <Search className="w-5 h-5" />
                <span>Start Planning</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Happy Travelers', value: '50k+', icon: Users },
              { label: 'Destinations', value: '1,200+', icon: Globe },
              { label: 'AI Itineraries', value: '100k+', icon: TrendingUp },
              { label: 'Verified Safety', value: '100%', icon: ShieldCheck },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Suggestions Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center space-x-2 text-brand-600 font-bold mb-4">
                <Sparkles className="w-5 h-5" />
                <span>Smart Recommendations</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Not sure where to go? <br />
                Let our AI decide.
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Our advanced algorithms analyze global travel trends and your personal preferences to suggest the perfect destination for your next escape.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Adventure Seekers', desc: 'Rugged landscapes and adrenaline-pumping activities.', icon: TrendingUp },
                  { title: 'Culture Enthusiasts', desc: 'Immersive historical sites and local traditions.', icon: Globe },
                  { title: 'Relaxation Experts', desc: 'Serene beaches and world-class wellness retreats.', icon: ShieldCheck },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="p-3 rounded-2xl bg-brand-50 text-brand-600">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000" 
                  alt="AI Suggestion" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/seed/ai-suggestion/1000/800";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">AI Top Pick</span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400 mr-1" />
                      <span className="text-xs font-bold">4.9</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Munnar, Kerala</h3>
                  <p className="text-sm text-slate-600 mb-4">Perfect for a serene getaway with breathtaking tea plantations and misty hills.</p>
                  <button 
                    onClick={() => navigate('/plan', { state: { destination: 'Munnar, Kerala' } })}
                    className="w-full py-3 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-all text-sm"
                  >
                    Plan This Trip
                  </button>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-100 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Trending Destinations</h2>
              <p className="text-slate-600 max-w-lg">Handpicked by our AI based on popularity and value for money.</p>
            </div>
            <Link to="/explore" className="text-brand-600 font-bold flex items-center hover:underline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinations.map((dest, i) => (
              <FeaturedCard key={i} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-12 md:p-24 text-center">
            <div className="absolute inset-0 opacity-30">
              <img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
                alt="CTA" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/seed/travel-cta/1920/1080";
                }}
              />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to start your next journey?</h2>
              <p className="text-xl text-white/70 mb-12">Join thousands of travelers who plan their trips with AI Travel Planner.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/plan" className="w-full sm:w-auto bg-brand-600 text-white px-10 py-4 rounded-full font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20">
                  Plan My Trip
                </Link>
                <Link to="/explore" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
