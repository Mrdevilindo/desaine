import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeHelp, ChevronRight, CircleHelp, FileText, Gift, Globe, History, Languages, LogOut, Mail, MessageSquare, Moon, Shield, Sun, User, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import ProfileModal from '../components/ProfileModal';
import SettingsModal from '../components/SettingsModal';

const More = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('dark');
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="container mx-auto px-4 py-4 pb-20 md:pb-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">More Options</h1>
        <p className="text-gray-400 mt-1">Settings, help, and additional features</p>
      </div>
      
      {/* User Account Section (if logged in) */}
      {isAuthenticated && user ? (
        <div className="bg-gray-800 rounded-xl mb-6 overflow-hidden">
          <div className="p-4 bg-indigo-600/20 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-3">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&q=80" 
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold">{user.username}</h2>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700">
            <button 
              onClick={() => setShowProfileModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <User size={20} className="text-indigo-400 mr-3" />
                <span>My Profile</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
            
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Shield size={20} className="text-indigo-400 mr-3" />
                <span>Account Settings</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
            
            <Link 
              to="/wallet"
              className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <Wallet size={20} className="text-indigo-400 mr-3" />
                <span>My Wallet</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Link>
            
            <Link 
              to="/history"
              className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <History size={20} className="text-indigo-400 mr-3" />
                <span>Game History</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 text-red-400 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl p-6 mb-6 text-center">
          <User size={40} className="text-gray-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold mb-2">Account Access</h2>
          <p className="text-gray-400 mb-4">Log in or create an account to access all features</p>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="flex-1 border border-gray-700 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
      
      {/* Theme Selection */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h2 className="font-bold mb-3">Theme</h2>
        <div className="grid grid-cols-2 gap-3">
          <button 
            className={`p-4 rounded-lg flex flex-col items-center justify-center ${activeTheme === 'light' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setActiveTheme('light')}
          >
            <Sun size={24} className="mb-2" />
            <span>Light</span>
          </button>
          
          <button 
            className={`p-4 rounded-lg flex flex-col items-center justify-center ${activeTheme === 'dark' ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setActiveTheme('dark')}
          >
            <Moon size={24} className="mb-2" />
            <span>Dark</span>
          </button>
        </div>
      </div>
      
      {/* Language Selection */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h2 className="font-bold mb-3">Language</h2>
        <div className="flex items-center p-3 bg-gray-700 rounded-lg">
          <Globe size={20} className="text-gray-400 mr-2" />
          <select
            className="bg-transparent text-white w-full focus:outline-none"
          >
            <option value="english">English</option>
            <option value="spanish">Español</option>
            <option value="french">Français</option>
            <option value="german">Deutsch</option>
            <option value="italian">Italiano</option>
          </select>
        </div>
      </div>
      
      {/* Additional Features */}
      <div className="bg-gray-800 rounded-xl mb-6 overflow-hidden">
        <h2 className="font-bold p-4">Features</h2>
        
        <div className="divide-y divide-gray-700">
          <Link 
            to="/promotions"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Gift size={20} className="text-purple-400 mr-3" />
              <span>Promotions & Bonuses</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/vip"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <BadgeHelp size={20} className="text-yellow-400 mr-3" />
              <span>VIP Program</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/refer"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Mail size={20} className="text-green-400 mr-3" />
              <span>Refer a Friend</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
        </div>
      </div>
      
      {/* Help & Support */}
      <div className="bg-gray-800 rounded-xl mb-6 overflow-hidden">
        <h2 className="font-bold p-4">Help & Support</h2>
        
        <div className="divide-y divide-gray-700">
          <Link 
            to="/faq"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <CircleHelp size={20} className="text-indigo-400 mr-3" />
              <span>FAQ</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/contact"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <MessageSquare size={20} className="text-indigo-400 mr-3" />
              <span>Contact Support</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/responsible-gaming"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <Shield size={20} className="text-indigo-400 mr-3" />
              <span>Responsible Gaming</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
        </div>
      </div>
      
      {/* Legal */}
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <h2 className="font-bold p-4">Legal</h2>
        
        <div className="divide-y divide-gray-700">
          <Link 
            to="/terms"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <FileText size={20} className="text-gray-400 mr-3" />
              <span>Terms & Conditions</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/privacy"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <FileText size={20} className="text-gray-400 mr-3" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
          
          <Link 
            to="/about"
            className="flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <CircleHelp size={20} className="text-gray-400 mr-3" />
              <span>About Us</span>
            </div>
            <ChevronRight size={18} className="text-gray-500" />
          </Link>
        </div>
      </div>
      
      {/* Version Info */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>GamingSoft v1.0.0</p>
      </div>
      
      {/* Modals */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSwitchToSignup={() => {
        setShowLoginModal(false);
        setShowSignupModal(true);
      }} />
      
      <SignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} onSwitchToLogin={() => {
        setShowSignupModal(false);
        setShowLoginModal(true);
      }} />
      
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
    </div>
  );
};

export default More;
