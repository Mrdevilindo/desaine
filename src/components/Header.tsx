import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu, Plus, RefreshCw, Search, Settings, User, X } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import GameCard from './GameCard';
import { useAuth } from '../context/AuthContext';
import BalanceModal from './BalanceModal';
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';

// Mock data for search results
const searchableGames = [
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
    price: '€5'
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
    price: '€5'
  }
];

const Header = () => {
  const { user, isAuthenticated, logout, refreshBalance } = useAuth();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof searchableGames>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = searchableGames.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    refreshBalance();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button 
            className="mr-3 md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md p-1">
              <span className="font-bold text-xl">G</span>
            </div>
            <span className="ml-2 font-bold text-xl hidden sm:block">GamingSoft</span>
          </Link>
        </div>

        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex relative mx-4 flex-1 max-w-md" ref={searchContainerRef}>
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            className="w-full bg-gray-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-20 max-h-[70vh] overflow-y-auto">
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-300 mb-2">Search Results</h3>
                <div className="grid grid-cols-2 gap-3">
                  {searchResults.map(game => (
                    <div key={game.id} className="col-span-1">
                      <GameCard 
                        image={game.image}
                        title={game.title}
                        provider={game.provider}
                        price={game.price}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {showSearchResults && searchResults.length === 0 && searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg z-20">
              <div className="p-4 text-center">
                <p className="text-gray-300">No games found for "{searchQuery}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Auth buttons or User info */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <>
              {/* Balance with refresh and deposit buttons */}
              <div className="hidden sm:flex items-center bg-gray-800 rounded-lg px-3 py-1.5 mr-2">
                <span className="text-gray-300 text-sm mr-2">Balance:</span>
                <span className="font-medium text-white">${user.balance.toFixed(2)}</span>
                <button
                  onClick={handleRefreshBalance}
                  className="ml-2 text-gray-400 hover:text-white p-1"
                  title="Refresh balance"
                >
                  <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={() => setShowBalanceModal(true)}
                  className="ml-1 text-gray-400 hover:text-white p-1"
                  title="Deposit funds"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              {/* User dropdown/menu */}
              <div className="relative group">
                <button className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 py-1.5">
                  <span className="hidden sm:block">{user.username}</span>
                  <User size={18} />
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1 bg-gray-800 rounded-lg shadow-lg z-20 w-40 hidden group-hover:block">
                  <div className="py-1">
                    <button 
                      onClick={() => setShowProfileModal(true)} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                    >
                      <User size={16} className="mr-2" /> Profile
                    </button>
                    <button 
                      onClick={() => setShowSettingsModal(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                    >
                      <Settings size={16} className="mr-2" /> Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <button 
                className="hidden sm:block px-4 py-1.5 rounded-md border border-gray-700 text-sm font-medium hover:bg-gray-800 transition-colors"
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </button>
              <button 
                className="px-4 py-1.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => setShowSignupModal(true)}
              >
                Sign up
              </button>
              <button 
                className="md:hidden"
                onClick={() => setShowLoginModal(true)}
              >
                <User size={24} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 px-4 py-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Mobile Balance (shown when logged in) */}
          {isAuthenticated && user && (
            <div className="flex items-center justify-between bg-gray-700 rounded-lg p-3 mb-3">
              <div>
                <span className="text-gray-300 text-sm">Balance</span>
                <p className="font-medium text-white">${user.balance.toFixed(2)}</p>
              </div>
              <div className="flex">
                <button
                  onClick={handleRefreshBalance}
                  className="text-gray-400 hover:text-white p-2"
                  title="Refresh balance"
                >
                  <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
                </button>
                <button
                  onClick={() => setShowBalanceModal(true)}
                  className="text-gray-400 hover:text-white p-2"
                  title="Deposit funds"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          )}
          
          {/* Mobile Search Results */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="mb-3 bg-gray-700 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Search Results</h3>
              <div className="grid grid-cols-2 gap-2">
                {searchResults.slice(0, 4).map(game => (
                  <div key={game.id} className="col-span-1">
                    <GameCard 
                      image={game.image}
                      title={game.title}
                      provider={game.provider}
                    />
                  </div>
                ))}
              </div>
              {searchResults.length > 4 && (
                <button className="text-indigo-400 text-sm font-medium mt-2 w-full text-center">
                  View all {searchResults.length} results
                </button>
              )}
            </div>
          )}
          
          <ul className="space-y-3">
            <li>
              <Link to="/" className="block py-2 font-medium text-white">Home</Link>
            </li>
            <li>
              <Link to="/games" className="block py-2 font-medium text-gray-300">Games</Link>
            </li>
            <li>
              <Link to="/live-casino" className="block py-2 font-medium text-gray-300">Live Casino</Link>
            </li>
            <li>
              <Link to="/promotions" className="block py-2 font-medium text-gray-300">Promotions</Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowProfileModal(true);
                    }}
                    className="block py-2 font-medium text-gray-300 w-full text-left"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setShowSettingsModal(true);
                    }}
                    className="block py-2 font-medium text-gray-300 w-full text-left"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left block py-2 font-medium text-red-400"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}

      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSwitchToSignup={() => {
        setShowLoginModal(false);
        setShowSignupModal(true);
      }} />
      
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} onSwitchToLogin={() => {
        setShowSignupModal(false);
        setShowLoginModal(true);
      }} />
      
      <BalanceModal isOpen={showBalanceModal} onClose={() => setShowBalanceModal(false)} />
      
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </header>
  );
};

export default Header;
