import { useState } from 'react';
import { ChevronRight, Clock, Filter, Flame, Gamepad, Search, Star, Trophy } from 'lucide-react';
import GameCard from '../components/GameCard';
import { useAuth } from '../context/AuthContext';

// Mock data for games
const allGames = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1595301820311-8c9c1f0e2904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lucky Lions',
    provider: 'Pragmatic Play',
    price: '€9',
    category: 'slots',
    isNew: false
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1586521995568-39abaa0c2311?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Viking Voyage',
    provider: 'Betsoft',
    price: '€5',
    category: 'slots',
    isNew: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1606325656330-8932449c3f3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    price: '€5',
    category: 'slots',
    isNew: false
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1592965022861-86d73889114b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Book of Dead',
    provider: 'Play\'n GO',
    price: '€10',
    category: 'slots',
    isNew: false
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Wolf Gold',
    provider: 'Pragmatic Play',
    price: '€5',
    category: 'slots',
    isNew: false
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1596838132330-30f5f28b348d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Gonzo\'s Quest',
    provider: 'NetEnt',
    price: '€5',
    category: 'slots',
    isNew: true
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1606336580598-9e7bb58aad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'VIP Blackjack',
    provider: 'Evolution Gaming',
    price: '€25',
    category: 'table',
    isNew: true
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1575500221017-4d7ed5023abd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lightning Roulette',
    provider: 'Evolution Gaming',
    price: '€20',
    category: 'table',
    isNew: false
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1613483187550-fd69021fc86c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Dream Catcher',
    provider: 'Evolution Gaming',
    price: '€15',
    category: 'table',
    isNew: false
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1583319772680-2d8f481a43a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Speed Baccarat',
    provider: 'Evolution Gaming',
    price: '€30',
    category: 'table',
    isNew: false
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1596838131307-5845ab6f6251?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    price: '€5',
    category: 'slots',
    isNew: false
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Mystic Forest',
    provider: 'Pragmatic Play',
    price: '€7',
    category: 'slots',
    isNew: true
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1568659358810-bdbdb4decb5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Immortal Romance',
    provider: 'Microgaming',
    price: '€5',
    category: 'slots',
    isNew: false
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Dragon Legend',
    provider: 'NetEnt',
    price: '€8',
    category: 'slots',
    isNew: false
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1596367407372-96cb88503db6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lucky Wheel',
    provider: 'Playtech',
    price: '€6',
    category: 'jackpot',
    isNew: false
  },
  {
    id: 16,
    image: 'https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Golden Empire',
    provider: 'Pragmatic Play',
    price: '€10',
    category: 'jackpot',
    isNew: true
  }
];

const categories = [
  { id: 'all', name: 'All Games', icon: <Gamepad size={18} /> },
  { id: 'slots', name: 'Slots', icon: <Flame size={18} /> },
  { id: 'table', name: 'Table Games', icon: <Star size={18} /> },
  { id: 'jackpot', name: 'Jackpots', icon: <Trophy size={18} /> },
  { id: 'new', name: 'New Games', icon: <Clock size={18} /> }
];

const providers = [
  'All Providers',
  'Pragmatic Play',
  'Evolution Gaming',
  'NetEnt',
  'Microgaming',
  'Playtech',
  'Betsoft',
  'Play\'n GO'
];

const Games = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProvider, setActiveProvider] = useState('All Providers');
  const [showFilters, setShowFilters] = useState(false);

  // Filter games based on category, search query, and provider
  const filteredGames = allGames.filter(game => {
    // Filter by category
    if (activeCategory === 'new' && !game.isNew) return false;
    if (activeCategory !== 'all' && activeCategory !== 'new' && game.category !== activeCategory) return false;
    
    // Filter by search query
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !game.provider.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by provider
    if (activeProvider !== 'All Providers' && game.provider !== activeProvider) return false;
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-4 pb-20 md:pb-4">
      {/* Welcome Message */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.username}!</h1>
        <p className="text-gray-400 mt-1">Explore our collection of games and have fun!</p>
      </div>

      {/* Category Filters */}
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
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search games or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-gray-800 text-white rounded-lg py-2 px-4 hover:bg-gray-700"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
          
          {showFilters && (
            <div className="absolute right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-10 w-48 p-3">
              <div className="mb-3">
                <h3 className="text-sm font-medium mb-2">Game Provider</h3>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {providers.map(provider => (
                    <button
                      key={provider}
                      className={`block w-full text-left px-2 py-1 text-sm rounded ${
                        activeProvider === provider ? 'bg-indigo-600/30 text-indigo-300' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        setActiveProvider(provider);
                        setShowFilters(false);
                      }}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {filteredGames.map(game => (
            <GameCard 
              key={game.id}
              image={game.image}
              title={game.title}
              provider={game.provider}
              price={game.price}
              isNew={game.isNew}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">No games found</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            We couldn't find any games matching your current filters. Try adjusting your search criteria.
          </p>
          <button 
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              setActiveProvider('All Providers');
            }}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Recently Played */}
      <div className="mt-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title flex items-center">
            <Clock className="text-indigo-400 mr-2" size={20} />
            <span>Recently Played</span>
          </h2>
          <a href="#" className="text-indigo-500 flex items-center text-sm font-medium">
            View All <ChevronRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {allGames.slice(0, 6).map(game => (
            <GameCard 
              key={game.id}
              image={game.image}
              title={game.title}
              provider={game.provider}
              price={game.price}
              isNew={game.isNew}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
