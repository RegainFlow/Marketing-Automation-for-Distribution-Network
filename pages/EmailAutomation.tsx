import React, { useState } from 'react';
import { PiPaperPlaneRightDuotone, PiUserDuotone, PiMagnifyingGlassDuotone, PiDotsThreeOutlineVerticalDuotone, PiSpinnerGapDuotone, PiCheckCircleDuotone } from 'react-icons/pi';
import { Customer } from '../types';

const initialCustomers: Customer[] = [
  { id: '1', name: 'Alice Freeman', email: 'alice@example.com', status: 'Active', lastOrderDate: '2023-10-20', totalVolume: 1200 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Dormant', lastOrderDate: '2023-05-15', totalVolume: 450 },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', status: 'New', lastOrderDate: '2023-10-22', totalVolume: 120 },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'Active', lastOrderDate: '2023-10-18', totalVolume: 3400 },
];

const EmailAutomation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'dormant' | 'levelup'>('new');
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isCompleted, setIsCompleted] = useState(false);

  // Filter customers logic
  const getFilteredCustomers = () => {
    return customers.filter(c => {
      if (activeTab === 'new') return c.status === 'New' || c.status === 'Sent';
      if (activeTab === 'dormant') return c.status === 'Dormant' || c.status === 'Sent';
      return true;
    });
  };

  const handleRunCampaign = () => {
    // Immediate state update (No async timeout)
    const targetStatus = activeTab === 'new' ? 'New' : activeTab === 'dormant' ? 'Dormant' : 'Active';
    
    setCustomers(prev => prev.map(c => 
      (c.status === targetStatus) ? { ...c, status: 'Sent' } : c
    ));
    setIsCompleted(true);
    
    // Reset completed flag after a moment just for UI feedback reset, but purely client side state
    setTimeout(() => setIsCompleted(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex bg-bg-tertiary p-1 rounded-xl">
          {(['new', 'dormant', 'levelup'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-2 rounded-lg text-sm font-bold transition-all
                ${activeTab === tab 
                  ? 'bg-primary text-bg-primary shadow-glow' 
                  : 'text-text-secondary hover:text-white'}
              `}
            >
              {tab === 'new' && 'New Customers'}
              {tab === 'dormant' && 'Dormant Win-back'}
              {tab === 'levelup' && 'Level Up'}
            </button>
          ))}
        </div>
        
        <button 
          onClick={handleRunCampaign}
          className={`
            neon-border-focus flex items-center gap-2 border px-6 py-2.5 rounded-lg transition-all
            ${isCompleted 
              ? 'bg-success/10 border-success/30 text-success' 
              : 'bg-primary-alpha15 text-primary border-primary hover:shadow-glow'}
          `}
        >
          {isCompleted ? (
            <>
              <PiCheckCircleDuotone size={20} />
              <span className="font-bold">Sent!</span>
            </>
          ) : (
            <>
              <PiPaperPlaneRightDuotone size={20} />
              <span className="font-bold">Run Campaign</span>
            </>
          )}
        </button>
      </div>

      {/* Campaign Info */}
      <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primary">
        <h3 className="text-lg font-bold text-white mb-2">
          {activeTab === 'new' && 'New Customer Welcome Series'}
          {activeTab === 'dormant' && 'We Miss You - Re-engagement'}
          {activeTab === 'levelup' && 'Distributor Upgrade Opportunity'}
        </h3>
        <p className="text-text-secondary max-w-3xl">
          {activeTab === 'new' && 'Automatically sends a welcome email with product usage tips 3 days after first order.'}
          {activeTab === 'dormant' && 'Targets customers who haven\'t ordered in 90 days with a special incentive.'}
          {activeTab === 'levelup' && 'Identifies high-volume retail customers and suggests converting to distributor status.'}
        </p>
      </div>

      {/* Customer List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h4 className="font-bold text-white flex items-center gap-2">
            <PiUserDuotone />
            Eligible Recipients
          </h4>
          <div className="relative">
            <PiMagnifyingGlassDuotone className="absolute left-3 top-2.5 text-text-tertiary" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-2 bg-bg-primary/50 border border-white/10 rounded-lg text-sm text-white focus:border-primary outline-none w-64"
            />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-white/5 text-text-secondary text-xs uppercase font-medium">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Last Order</th>
              <th className="py-3 px-6">Total Vol</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-3 px-6">
                  <div>
                    <div className="font-medium text-white">{customer.name}</div>
                    <div className="text-xs text-text-tertiary">{customer.email}</div>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <span className={`
                    px-2 py-0.5 rounded text-xs font-bold border flex items-center w-fit gap-1
                    ${customer.status === 'Active' ? 'bg-success/10 text-success border-success/20' : ''}
                    ${customer.status === 'Dormant' ? 'bg-warning/10 text-warning border-warning/20' : ''}
                    ${customer.status === 'New' ? 'bg-info/10 text-info border-info/20' : ''}
                    ${customer.status === 'Queued' ? 'bg-text-secondary/10 text-text-secondary border-text-secondary/20' : ''}
                    ${customer.status === 'Sending...' ? 'bg-primary/10 text-primary border-primary/20' : ''}
                    ${customer.status === 'Sent' ? 'bg-success/10 text-success border-success/20' : ''}
                  `}>
                    {customer.status === 'Sending...' && <PiSpinnerGapDuotone className="animate-spin" />}
                    {customer.status === 'Sent' && <PiCheckCircleDuotone />}
                    {customer.status}
                  </span>
                </td>
                <td className="py-3 px-6 text-text-secondary">{customer.lastOrderDate}</td>
                <td className="py-3 px-6 font-mono text-white">${customer.totalVolume}</td>
                <td className="py-3 px-6 text-right">
                  <button className="p-2 hover:bg-white/10 rounded text-text-secondary hover:text-white">
                    <PiDotsThreeOutlineVerticalDuotone />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailAutomation;