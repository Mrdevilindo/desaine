import { useState } from 'react';
import { Calendar, Gift, Info, Trophy, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock promotion data
const promotionsData = {
  welcome: [
    {
      id: 1,
      title: "100% Welcome Bonus",
      description: "Get a 100% match on your first deposit up to $500 plus 200 free spins!",
      image: "https://images.unsplash.com/photo-1550036808-19d4bd62e721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "2023-12-31",
      isNew: true,
      code: "WELCOME100"
    },
    {
      id: 2,
      title: "Free Spins Package",
      description: "Start your gaming journey with 50 free spins, no deposit required!",
      image: "https://images.unsplash.com/photo-1564473185935-58113cba1e80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "2023-12-31",
      isNew: false,
      code: "SPIN50"
    }
  ],
  daily: [
    {
      id: 3,
      title: "Daily Cashback",
      description: "Get 10% cashback on all your losses, credited daily to your account!",
      image: "https://images.unsplash.com/photo-1587652242458-aac28afa7151?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "Ongoing",
      isNew: false,
      code: "DAILY10"
    },
    {
      id: 4,
      title: "Monday Reload",
      description: "Start your week with a 50% reload bonus up to $100 every Monday!",
      image: "https://images.unsplash.com/photo-1611323603023-bb4b85c90381?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "Ongoing",
      isNew: true,
      code: "MONDAY50"
    },
    {
      id: 5,
      title: "Weekend Spins",
      description: "Get 20 free spins on our featured slot every Saturday and Sunday!",
      image: "https://images.unsplash.com/photo-1560520859-5ce20ff9d90f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "Ongoing",
      isNew: false,
      code: "WEEKEND20"
    }
  ],
  tournament: [
    {
      id: 6,
      title: "Weekly Slots Tournament",
      description: "Compete for a share of the $10,000 prize pool in our weekly slots tournament!",
      image: "https://images.unsplash.com/photo-1560131914-2e469a0e8607?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "Every Sunday",
      isNew: false,
      code: null
    },
    {
      id: 7,
      title: "High Roller Battle",
      description: "Exclusive tournament for high rollers with a $50,000 guaranteed prize pool!",
      image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      validUntil: "Last Friday of the month",
      isNew: true,
      code: null
    }
  ]
};

type PromoCategory = 'welcome' | 'daily' | 'tournament';

const Promotions = () => {
  const { isAuthenticated } = useAuth();
  const [activeCategory, setActiveCategory] = useState<PromoCategory>('welcome');
  const [showPromoDetails, setShowPromoDetails] = useState<number | null>(null);
  
  const handleClaimPromo = (promoId: number) => {
    if (!isAuthenticated) {
      // Show login modal or redirect to login page
      alert('Please log in to claim this promotion');
      return;
    }
    
    // In a real app, this would make an API call to claim the promotion
    alert(`Promotion claimed! The bonus will be credited to your account.`);
  };

  const categories = [
    { id: 'welcome', name: 'Welcome', icon: <Gift size={18} /> },
    { id: 'daily', name: 'Daily', icon: <Calendar size={18} /> },
    { id: 'tournament', name: 'Tournaments', icon: <Trophy size={18} /> }
  ];

  const PromotionDetailsModal = ({ promoId }: { promoId: number }) => {
    const allPromos = [...promotionsData.welcome, ...promotionsData.daily, ...promotionsData.tournament];
    const promo = allPromos.find(p => p.id === promoId);
    
    if (!promo) return null;
    
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowPromoDetails(null)}>
        <div className="bg-gray-800 rounded-xl max-w-md w-full overflow-hidden shadow-xl" onClick={e => e.stopPropagation()}>
          <div className="relative">
            <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
            <button 
              onClick={() => setShowPromoDetails(null)}
              className="absolute top-2 right-2 bg-black/50 rounded-full p-1 text-white"
            >
              <X size={24} />
            </button>
            {promo.isNew && (
              <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </div>
            )}
          </div>
          
          <div className="p-5">
            <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
            <p className="text-gray-300 mb-4">{promo.description}</p>
            
            <div className="bg-gray-700 rounded-lg p-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Valid Until:</span>
                <span className="text-white">{promo.validUntil}</span>
              </div>
              {promo.code && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Promo Code:</span>
                  <span className="font-mono bg-gray-600 px-2 py-0.5 rounded text-indigo-300">{promo.code}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleClaimPromo(promo.id)} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
              >
                Claim Promotion
              </button>
              
              <div className="text-xs text-gray-400 flex items-start">
                <Info size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                <p>Terms and conditions apply. Please gamble responsibly and be aware of the wagering requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-4 pb-20 md:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Promotions & Bonuses</h1>
        <p className="text-gray-400 mt-1">Check out our latest offers and boost your gaming experience!</p>
      </div>
      
      {/* Category Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`flex items-center whitespace-nowrap px-4 py-2 rounded-full border ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(category.id as PromoCategory)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotionsData[activeCategory].map(promo => (
          <div key={promo.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
            <div className="relative">
              <img src={promo.image} alt={promo.title} className="w-full h-36 object-cover" />
              {promo.isNew && (
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{promo.description}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>Valid until: {promo.validUntil}</span>
                </div>
                {promo.code && <span className="font-mono">Code: {promo.code}</span>}
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowPromoDetails(promo.id)}
                  className="flex-1 border border-gray-600 hover:border-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Details
                </button>
                <button 
                  onClick={() => handleClaimPromo(promo.id)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State */}
      {promotionsData[activeCategory].length === 0 && (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Gift size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">No promotions available</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            There are currently no active promotions in this category. Please check back later or explore other categories.
          </p>
        </div>
      )}
      
      {/* Promotion details modal */}
      {showPromoDetails !== null && <PromotionDetailsModal promoId={showPromoDetails} />}
      
      {/* Terms and Conditions Section */}
      <div className="mt-8 bg-gray-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold mb-3">General Terms & Conditions</h3>
        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
          <li>All promotions are subject to our general terms and conditions.</li>
          <li>Unless stated otherwise, all bonuses have a 35x wagering requirement.</li>
          <li>Promotions cannot be combined unless explicitly stated.</li>
          <li>GamingSoft reserves the right to modify or cancel any promotion at any time.</li>
          <li>Players must be 18+ to participate in any promotion.</li>
        </ul>
      </div>
    </div>
  );
};

export default Promotions;
