import { useState } from 'react';
import { Bell, Check, Eye, EyeOff, Globe, CircleHelp, Lock, LogOut, Moon, Shield, Sun, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'account' | 'appearance' | 'privacy' | 'help'>('account');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('english');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate and send to backend
    // For demo purposes, just show success message
    if (newPassword === confirmPassword && currentPassword) {
      setPasswordChangeSuccess(true);
      setTimeout(() => {
        setPasswordChangeSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  const menuItems = [
    { id: 'account', label: 'Account', icon: <User size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Moon size={20} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={20} /> },
    { id: 'help', label: 'Help & Support', icon: <CircleHelp size={20} /> }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-gray-800 rounded-xl max-w-4xl w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Settings Menu */}
          <div className="w-full md:w-1/4 bg-gray-900 p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                    activeSection === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-4 border-t border-gray-700">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 rounded-lg text-left text-red-400 hover:bg-gray-700"
              >
                <LogOut size={20} className="mr-3" />
                Log Out
              </button>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="w-full md:w-3/4 p-6">
            {activeSection === 'account' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Personal Information</h4>
                  <div className="bg-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-400">Username</p>
                        <p>{user.username}</p>
                      </div>
                      <button className="text-indigo-400 text-sm">Change</button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p>{user.email}</p>
                      </div>
                      <button className="text-indigo-400 text-sm">Change</button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Change Password</h4>
                  {passwordChangeSuccess && (
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 flex items-start mb-4">
                      <Check size={18} className="text-green-400 mr-2 mt-0.5" />
                      <span className="text-green-300">Password changed successfully!</span>
                    </div>
                  )}
                  <form onSubmit={handlePasswordChange} className="bg-gray-700 rounded-lg p-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-gray-600 text-white rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-gray-600 text-white rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-gray-400"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-600 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {activeSection === 'appearance' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Theme</h4>
                  <div className="bg-gray-700 rounded-lg p-4 grid grid-cols-2 gap-3">
                    <button 
                      className={`p-4 rounded-lg flex flex-col items-center justify-center ${theme === 'light' ? 'bg-indigo-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                      onClick={() => setTheme('light')}
                    >
                      <Sun size={24} className="mb-2" />
                      <span>Light</span>
                    </button>
                    
                    <button 
                      className={`p-4 rounded-lg flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-600 hover:bg-gray-500'}`}
                      onClick={() => setTheme('dark')}
                    >
                      <Moon size={24} className="mb-2" />
                      <span>Dark</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Language</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center">
                      <Globe size={20} className="text-gray-400 mr-2" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-600 text-white rounded-lg py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Español</option>
                        <option value="french">Français</option>
                        <option value="german">Deutsch</option>
                        <option value="italian">Italiano</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'privacy' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Notifications</h4>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={18} className="text-gray-400 mr-2" />
                        <span>Email Notifications</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={18} className="text-gray-400 mr-2" />
                        <span>Marketing Emails</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={18} className="text-gray-400 mr-2" />
                        <span>SMS Notifications</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Security</h4>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock size={18} className="text-gray-400 mr-2" />
                        <span>Two-Factor Authentication</span>
                      </div>
                      <button className="text-indigo-400 text-sm">Enable</button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield size={18} className="text-gray-400 mr-2" />
                        <span>Session Management</span>
                      </div>
                      <button className="text-indigo-400 text-sm">View</button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Privacy</h4>
                  <div className="bg-gray-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye size={18} className="text-gray-400 mr-2" />
                        <span>Profile Visibility</span>
                      </div>
                      <select 
                        className="bg-gray-600 text-white text-sm rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="private"
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'help' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium mb-2">Frequently Asked Questions</h4>
                  <div className="bg-gray-700 rounded-lg divide-y divide-gray-600">
                    <div className="p-4">
                      <h5 className="font-medium mb-2">How can I change my password?</h5>
                      <p className="text-sm text-gray-300">You can change your password in Account Settings. Make sure to use a strong, unique password.</p>
                    </div>
                    
                    <div className="p-4">
                      <h5 className="font-medium mb-2">How do I deposit funds?</h5>
                      <p className="text-sm text-gray-300">Click on the + button next to your balance in the header to open the deposit modal.</p>
                    </div>
                    
                    <div className="p-4">
                      <h5 className="font-medium mb-2">What payment methods are accepted?</h5>
                      <p className="text-sm text-gray-300">We accept major credit/debit cards, e-wallets, bank transfers, and cryptocurrency.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-2">Contact Support</h4>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-4">Need help with something specific? Our support team is here to help you.</p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
