import { useState } from 'react';
import { CircleHelp, CreditCard, DollarSign, Landmark, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BalanceModal = ({ isOpen, onClose }: BalanceModalProps) => {
  const { user, updateBalance } = useAuth();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [withdrawMethod, setWithdrawMethod] = useState('bankTransfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    // For withdraw, check if user has enough balance
    if (activeTab === 'withdraw' && numAmount > user.balance) {
      setError('Insufficient balance for this withdrawal');
      return;
    }

    // Process transaction
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        if (activeTab === 'deposit') {
          // For deposit, add the amount
          updateBalance(numAmount);
          setTransactionMessage('Your deposit has been processed successfully.');
        } else {
          // For withdraw, subtract the amount
          updateBalance(-numAmount);
          setTransactionMessage('Your withdrawal has been processed successfully.');
        }
        
        // Show success message
        setTransactionComplete(true);
        setAmount('');
        setIsProcessing(false);
        
        // Close the modal after a delay
        setTimeout(() => {
          setTransactionComplete(false);
          onClose();
        }, 2000);
      } catch (error) {
        setError('Transaction failed. Please try again.');
        setIsProcessing(false);
      }
    }, 1500);
  };
  
  const quickAmounts = [10, 25, 50, 100, 200, 500];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-gray-800 rounded-xl max-w-4xl w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Manage Balance</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
          {/* Left Column: Deposit/Withdraw Form */}
          <div className="p-6">
            <div className="flex items-center mb-6">
              <button
                className={`flex-1 py-2 font-medium rounded-l-lg ${activeTab === 'deposit' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                onClick={() => setActiveTab('deposit')}
              >
                Deposit
              </button>
              <button
                className={`flex-1 py-2 font-medium rounded-r-lg ${activeTab === 'withdraw' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                onClick={() => setActiveTab('withdraw')}
              >
                Withdraw
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
            
            {transactionComplete ? (
              <div className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Transaction Complete!</h3>
                <p className="text-gray-300">
                  {transactionMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Current Balance */}
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-1">Current Balance</div>
                  <div className="text-2xl font-bold">${user.balance.toFixed(2)}</div>
                </div>
                
                {/* Amount */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Amount to {activeTab}</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => {
                        // Only allow numbers and decimal point
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        setAmount(value);
                      }}
                      className="w-full bg-gray-700 text-white rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter amount"
                    />
                    <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  </div>
                  
                  {/* Quick amount buttons */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {quickAmounts.map(amt => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt.toString())}
                        className="bg-gray-700 hover:bg-gray-600 text-white rounded py-1 px-2 text-sm"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Payment/Withdrawal Method */}
                {activeTab === 'deposit' ? (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer border border-transparent hover:border-indigo-500">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="creditCard"
                          checked={paymentMethod === 'creditCard'}
                          onChange={() => setPaymentMethod('creditCard')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                        />
                        <CreditCard className="ml-3 mr-2 text-gray-400" size={20} />
                        <span className="text-gray-200">Credit/Debit Card</span>
                      </label>
                      
                      <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer border border-transparent hover:border-indigo-500">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="eWallet"
                          checked={paymentMethod === 'eWallet'}
                          onChange={() => setPaymentMethod('eWallet')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                        />
                        <svg className="ml-3 mr-2 text-gray-400 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
                          <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-200">E-Wallet</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Withdrawal Method</label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer border border-transparent hover:border-indigo-500">
                        <input
                          type="radio"
                          name="withdrawMethod"
                          value="bankTransfer"
                          checked={withdrawMethod === 'bankTransfer'}
                          onChange={() => setWithdrawMethod('bankTransfer')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                        />
                        <Landmark className="ml-3 mr-2 text-gray-400" size={20} />
                        <span className="text-gray-200">Bank Transfer</span>
                      </label>
                      
                      <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer border border-transparent hover:border-indigo-500">
                        <input
                          type="radio"
                          name="withdrawMethod"
                          value="eWallet"
                          checked={withdrawMethod === 'eWallet'}
                          onChange={() => setWithdrawMethod('eWallet')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500"
                        />
                        <svg className="ml-3 mr-2 text-gray-400 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
                          <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" strokeWidth="2" />
                        </svg>
                        <span className="text-gray-200">E-Wallet</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing || !amount}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `${activeTab === 'deposit' ? 'Deposit' : 'Withdraw'} Funds`}
                </button>
              </form>
            )}
          </div>
          
          {/* Right Column: FAQs */}
          <div className="bg-gray-900 p-6">
            <div className="flex items-center mb-4">
              <CircleHelp className="text-indigo-400 mr-2" size={20} />
              <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">What payment methods are accepted?</h4>
                <p className="text-sm text-gray-400">We accept major credit/debit cards, e-wallets, bank transfers, and cryptocurrency.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How long do deposits take?</h4>
                <p className="text-sm text-gray-400">Most deposits are processed instantly. Bank transfers may take 1-3 business days.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Is there a minimum deposit amount?</h4>
                <p className="text-sm text-gray-400">Yes, the minimum deposit amount is $10.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How do I withdraw my winnings?</h4>
                <p className="text-sm text-gray-400">Go to the Withdraw tab, select your preferred withdrawal method, and enter the amount.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">How long do withdrawals take to process?</h4>
                <p className="text-sm text-gray-400">Withdrawal processing times vary by method: E-wallets (24-48 hours), Bank transfers (3-5 business days).</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Are there any fees for deposits or withdrawals?</h4>
                <p className="text-sm text-gray-400">We don't charge any fees for deposits. Withdrawal fees may vary depending on the payment method.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">I'm having issues with my transaction</h4>
                <p className="text-sm text-gray-400">Please contact our <a href="#" className="text-indigo-400 hover:text-indigo-300">customer support team</a> for assistance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceModal;
