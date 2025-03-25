import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, House, Menu, Trophy, Wallet } from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className={`mobile-nav-item flex flex-col items-center justify-center w-full h-full ${location.pathname === '/' ? 'active' : ''}`}>
          <House size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link to="/games" className={`mobile-nav-item flex flex-col items-center justify-center w-full h-full ${location.pathname === '/games' ? 'active' : ''}`}>
          <Gamepad2 size={20} />
          <span className="text-xs mt-1">Games</span>
        </Link>
        
        <Link to="/promotions" className={`mobile-nav-item flex flex-col items-center justify-center w-full h-full ${location.pathname === '/promotions' ? 'active' : ''}`}>
          <Trophy size={20} />
          <span className="text-xs mt-1">Promos</span>
        </Link>
        
        <Link to="/wallet" className={`mobile-nav-item flex flex-col items-center justify-center w-full h-full ${location.pathname === '/wallet' ? 'active' : ''}`}>
          <Wallet size={20} />
          <span className="text-xs mt-1">Wallet</span>
        </Link>
        
        <Link to="/more" className={`mobile-nav-item flex flex-col items-center justify-center w-full h-full ${location.pathname === '/more' ? 'active' : ''}`}>
          <Menu size={20} />
          <span className="text-xs mt-1">More</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavbar;
