import { useState, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, Clock, DollarSign, Filter, Plus, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BalanceModal from '../components/BalanceModal';

// Mock transaction data
const generateTransactions = (count: number) => {
  const types = ['deposit', 'withdraw', 'bonus', 'win', 'loss'];
  const methods = ['Credit Card', 'Bank Transfer', 'E-Wallet', 'Crypto'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const isPositive = ['deposit', 'bonus', 'win'].includes(type);
    const amount = parseFloat((Math.random() * 500 + 10).toFixed(2));
    
    return {
      id: `tx-${Date.now()}-${i}`,
      type,
      amount: isPositive ? amount : -amount,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: Math.random() > 0.1 ? 'completed' : 'pending',
      method: methods[Math.floor(Math.random() * methods.length)]
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const Wallet = () => {
  const { user, isAuthenticated, refreshBalance } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Generate mock transaction data
    setTransactions(generateTransactions(15));
  }, []);

  const handleRefreshBalance = () => {
    setIsRefreshing(true);
    refreshBalance();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const filteredTransactions = transactions.filter(tx => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'deposits' && tx.type === 'deposit') return true;
    if (activeFilter === 'withdrawals' && tx.type === 'withdraw') return true;
    if (activeFilter === 'bonuses' && tx.type === 'bonus') return true;
    if (activeFilter === 'wins' && (tx.type === 'win' || tx.type === 'loss')) return true;
    return false;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8 text-center">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-8">
          <WalletIcon size={48} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-2xl font-bold mb-2">Wallet Access</h2>
          <p className="text-gray-400 mb-6">You need to be logged in to access your wallet. Please log in or create an account to continue.</p>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 pb-20 md:pb-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Wallet</h1>
        <p className="text-gray-400 mt-1">Manage your funds and view transaction history</p>
      </div>
      
      {/* Balance Card */}
      <div className="bg-gray-800 rounded-xl p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-gray-400 text-sm mb-1">Current Balance</h2>
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold">${user?.balance.toFixed(2)}</span>
              <button
                onClick={handleRefreshBalance}
                className="ml-2 text-gray-400 hover:text-white p-1"
                title="Refresh balance"
              >
                <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowBalanceModal(true)}
              className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 md:px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <Plus size={18} className="mr-1" /> Deposit
            </button>
            <button
              onClick={() => {
                setShowBalanceModal(true);
                // In a full implementation, we would set the active tab to 'withdraw' here
                // For now, this will be handled inside the BalanceModal component
              }}
              className="flex-1 md:flex-none bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 md:px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <ArrowUpRight size={18} className="mr-1" /> Withdraw
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-gray-400">Total Deposits</h3>
            <ArrowDownLeft size={16} className="text-green-400" />
          </div>
          <p className="text-lg font-bold">$1,250.00</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-gray-400">Total Withdrawals</h3>
            <ArrowUpRight size={16} className="text-red-400" />
          </div>
          <p className="text-lg font-bold">$750.00</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-gray-400">Pending</h3>
            <Clock size={16} className="text-yellow-400" />
          </div>
          <p className="text-lg font-bold">$0.00</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm text-gray-400">Bonuses</h3>
            <DollarSign size={16} className="text-indigo-400" />
          </div>
          <p className="text-lg font-bold">$50.00</p>
        </div>
      </div>
      
      {/* Transaction History */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Transaction History</h2>
          <button className="text-sm text-indigo-400 flex items-center">
            <Filter size={14} className="mr-1" /> Filter
          </button>
        </div>
        
        {/* Transaction Filters */}
        <div className="flex overflow-x-auto pb-2 mb-4">
          <button 
            className={`mr-2 whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Transactions
          </button>
          <button 
            className={`mr-2 whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'deposits' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('deposits')}
          >
            Deposits
          </button>
          <button 
            className={`mr-2 whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'withdrawals' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('withdrawals')}
          >
            Withdrawals
          </button>
          <button 
            className={`mr-2 whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'bonuses' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('bonuses')}
          >
            Bonuses
          </button>
          <button 
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm ${
              activeFilter === 'wins' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveFilter('wins')}
          >
            Game Results
          </button>
        </div>
        
        {/* Transactions List */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {filteredTransactions.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {filteredTransactions.map(tx => (
                <div key={tx.id} className="p-4 hover:bg-gray-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">
                          {tx.type === 'deposit' && 'Deposit'}
                          {tx.type === 'withdraw' && 'Withdrawal'}
                          {tx.type === 'bonus' && 'Bonus Credit'}
                          {tx.type === 'win' && 'Game Win'}
                          {tx.type === 'loss' && 'Game Loss'}
                        </p>
                        <div className="flex text-xs text-gray-400">
                          <span>{formatDate(tx.date)}</span>
                          <span className="mx-1">•</span>
                          <span>{formatTime(tx.date)}</span>
                          {tx.method && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{tx.method}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        tx.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {tx.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-400">No transactions found matching your filter.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Balance Modal */}
      <BalanceModal isOpen={showBalanceModal} onClose={() => setShowBalanceModal(false)} />
    </div>
  );
};

export default Wallet;
