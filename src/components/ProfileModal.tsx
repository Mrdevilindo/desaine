import { useState } from 'react';
import { Camera, Check, Squircle, Mail, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'statistics'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || '');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80');

  if (!isOpen || !user) return null;

  const handleSaveProfile = () => {
    // In a real app, save to backend
    // For now, just exit edit mode
    setIsEditing(false);
  };

  const handleAvatarUpload = () => {
    // In a real app, this would open a file picker
    // For demo, just show alert
    alert('File upload would open here');
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-gray-800 rounded-xl max-w-2xl w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">My Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 p-6 bg-gray-900 flex flex-col items-center">
            <div className="relative group mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-700">
                <img 
                  src={avatarUrl} 
                  alt={user.username} 
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700"
              >
                <Camera size={16} />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold">{user.username}</h3>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            
            <div className="flex w-full">
              <button
                className={`flex-1 py-2 px-4 font-medium text-center rounded-l-lg ${
                  activeTab === 'profile' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`flex-1 py-2 px-4 font-medium text-center rounded-r-lg ${
                  activeTab === 'statistics' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setActiveTab('statistics')}
              >
                Stats
              </button>
            </div>
            
            <div className="mt-6 w-full">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Member since</span>
                  <span className="text-white text-sm">May 2023</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span className="flex items-center text-green-400 text-sm">
                    <Check size={14} className="mr-1" /> Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Account type</span>
                  <span className="text-white text-sm">Standard</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3 p-6">
            {activeTab === 'profile' ? (
              <>
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      <Squircle size={16} className="mr-1" /> Edit
                    </button>
                  ) : (
                    <button 
                      onClick={handleSaveProfile}
                      className="flex items-center text-green-400 hover:text-green-300 text-sm"
                    >
                      <Check size={16} className="mr-1" /> Save
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    ) : (
                      <div className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center">
                          <User size={18} className="text-gray-400 mr-2" />
                          <span>{user.username}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <div className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-2" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Notifications</label>
                    <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Account Statistics</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-400">{user.balance.toFixed(2)}</div>
                    <div className="text-sm text-gray-400">Current Balance</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">7</div>
                    <div className="text-sm text-gray-400">Active Days</div>
                  </div>
                </div>
                
                <h4 className="text-md font-medium mb-3">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Logged in</p>
                      <p className="text-xs text-gray-400">From Chrome on Windows</p>
                    </div>
                    <div className="text-xs text-gray-400">Just now</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Played Lucky Lions</p>
                      <p className="text-xs text-gray-400">Game session: 15 minutes</p>
                    </div>
                    <div className="text-xs text-gray-400">2 hours ago</div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Deposit completed</p>
                      <p className="text-xs text-gray-400">$100.00 added to balance</p>
                    </div>
                    <div className="text-xs text-gray-400">Yesterday</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
