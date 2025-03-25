import { ChevronRight, Flame } from 'lucide-react';
import GameCarousel from '../components/GameCarousel';
import GameCard from '../components/GameCard';

// Mock data
const featuredGames = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Aztec Gold',
    description: 'Adventure through ancient temples'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611254666450-5574e69e24de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Sweet Bonanza',
    description: 'Candy-themed excitement'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Dragon Legend',
    description: 'Mythical creatures and big rewards'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1596367407372-96cb88503db6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lucky Wheel',
    description: 'Spin to win amazing prizes'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Golden Empire',
    description: 'Rule an ancient wealthy kingdom'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Mystic Forest',
    description: 'Explore enchanted woodlands'
  }
];

const popularGames = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1595301820311-8c9c1f0e2904?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lucky Lions',
    provider: 'Pragmatic Play',
    price: '€9'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1586521995568-39abaa0c2311?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Viking Voyage',
    provider: 'Betsoft',
    price: '€5',
    isNew: true
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1606325656330-8932449c3f3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Gates of Olympus',
    provider: 'Pragmatic Play',
    price: '€5'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1592965022861-86d73889114b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Book of Dead',
    provider: 'Play\'n GO',
    price: '€10'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Wolf Gold',
    provider: 'Pragmatic Play',
    price: '€5'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1596838132330-30f5f28b348d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Gonzo\'s Quest',
    provider: 'NetEnt',
    price: '€5',
    isNew: true
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1596838131307-5845ab6f6251?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Sweet Bonanza',
    provider: 'Pragmatic Play',
    price: '€5'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1568659358810-bdbdb4decb5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Immortal Romance',
    provider: 'Microgaming',
    price: '€5'
  }
];

const liveCasinoGames = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1606336580598-9e7bb58aad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'VIP Blackjack',
    provider: 'Evolution Gaming',
    isNew: true
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1575500221017-4d7ed5023abd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Lightning Roulette',
    provider: 'Evolution Gaming'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1613483187550-fd69021fc86c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Dream Catcher',
    provider: 'Evolution Gaming'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583319772680-2d8f481a43a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    title: 'Speed Baccarat',
    provider: 'Evolution Gaming',
    isNew: true
  }
];

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-4 pb-20 md:pb-4">
      {/* Welcome Banner */}
      <div className="relative w-full rounded-xl overflow-hidden mb-8">
        <img 
          src="https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
          alt="Welcome to GamingSoft" 
          className="w-full h-48 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/60 flex flex-col justify-center px-6 md:px-12">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">Welcome Bonus</h1>
          <p className="text-lg md:text-2xl text-white mb-4">100% up to €500 + 200 Free Spins</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md inline-block md:w-auto w-full">
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Featured Games Carousel */}
      <GameCarousel items={featuredGames} title="Welcome to GamingSoft" />

      {/* Popular Games Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title flex items-center">
            <Flame className="text-red-500 mr-2" size={20} />
            <span>Popular Games</span>
          </h2>
          <a href="#" className="text-indigo-500 flex items-center text-sm font-medium">
            View All <ChevronRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {popularGames.slice(0, 6).map(game => (
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

      {/* Live Casino Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Live Casino</h2>
          <a href="#" className="text-indigo-500 flex items-center text-sm font-medium">
            View All <ChevronRight size={16} />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {liveCasinoGames.map(game => (
            <GameCard 
              key={game.id}
              image={game.image}
              title={game.title}
              provider={game.provider}
              isNew={game.isNew}
            />
          ))}
        </div>
      </div>

      {/* Promotions Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Daily Challenges</h2>
            <p className="text-white/90">Complete tasks and win amazing prizes every day!</p>
          </div>
          <button className="bg-white text-indigo-600 font-medium py-2 px-6 rounded-md w-full md:w-auto">
            View Challenges
          </button>
        </div>
      </div>

      {/* Game Providers */}
      <div className="mb-8">
        <h2 className="section-title mb-4">Our Game Providers</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <div key={item} className="bg-gray-800 rounded-md flex items-center justify-center p-4 h-16">
              <div className="w-full h-6 bg-gray-700 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
