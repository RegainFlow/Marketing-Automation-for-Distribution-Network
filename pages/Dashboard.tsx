import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { PiUsersDuotone, PiEnvelopeSimpleOpenDuotone, PiVideoCameraDuotone, PiCurrencyDollarDuotone } from 'react-icons/pi';
import StatsCard from '../components/StatsCard';

const data = [
  { name: 'Jan', customers: 400, sales: 2400 },
  { name: 'Feb', customers: 300, sales: 1398 },
  { name: 'Mar', customers: 200, sales: 9800 },
  { name: 'Apr', customers: 278, sales: 3908 },
  { name: 'May', customers: 189, sales: 4800 },
  { name: 'Jun', customers: 239, sales: 3800 },
  { name: 'Jul', customers: 349, sales: 4300 },
];

const segmentData = [
  { name: 'Active', value: 65, color: 'var(--color-success)' },
  { name: 'Dormant', value: 25, color: 'var(--color-warning)' },
  { name: 'New', value: 10, color: 'var(--color-primary)' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          metric={{ label: 'Total Customers', value: '1,284', change: 12.5, trend: 'up' }}
          icon={<PiUsersDuotone size={64} />}
        />
        <StatsCard 
          metric={{ label: 'Monthly Revenue', value: '$42.5k', change: 8.2, trend: 'up' }}
          icon={<PiCurrencyDollarDuotone size={64} />}
        />
        <StatsCard 
          metric={{ label: 'Emails Sent', value: '3,429', change: -2.4, trend: 'down' }}
          icon={<PiEnvelopeSimpleOpenDuotone size={64} />}
        />
        <StatsCard 
          metric={{ label: 'Scripts Generated', value: '56', change: 0, trend: 'neutral' }}
          icon={<PiVideoCameraDuotone size={64} />}
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Revenue Overview</h2>
            <select className="bg-bg-primary border border-white/10 rounded-lg px-3 py-1 text-sm text-text-secondary focus:border-primary outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-tertiary)" 
                  tick={{fill: 'var(--color-text-secondary)', fontSize: 12}}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="var(--color-text-tertiary)" 
                  tick={{fill: 'var(--color-text-secondary)', fontSize: 12}}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-bg-secondary)', 
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                  }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Segmentation */}
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="text-lg font-bold text-white mb-6">Customer Segmentation</h2>
          <div className="space-y-6">
            {segmentData.map((item) => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">{item.name}</span>
                  <span className="text-white font-mono">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${item.value}%`, 
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/5">
            <h3 className="text-sm font-bold text-white mb-2">Next Actions</h3>
            <button className="w-full py-2 px-4 rounded-lg border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
              <PiEnvelopeSimpleOpenDuotone />
              Target Dormant Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;