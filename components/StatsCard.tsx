import React from 'react';
import { PiTrendUp, PiTrendDown, PiMinus } from 'react-icons/pi';
import { KPIMetric } from '../types';

interface StatsCardProps {
  metric: KPIMetric;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ metric, icon }) => {
  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-primary-alpha50 transition-all duration-300">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary transform group-hover:scale-110 duration-500">
        {icon}
      </div>
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <h3 className="text-text-secondary text-sm font-medium tracking-wide uppercase">{metric.label}</h3>
        
        <div className="mt-4">
          <div className="text-3xl font-bold text-white font-primary tracking-tight">{metric.value}</div>
          
          <div className="flex items-center mt-2 gap-2">
            <span className={`
              flex items-center text-xs font-bold px-2 py-0.5 rounded-full
              ${metric.trend === 'up' ? 'text-success bg-success/10' : 
                metric.trend === 'down' ? 'text-error bg-error/10' : 'text-text-secondary bg-white/5'}
            `}>
              {metric.trend === 'up' && <PiTrendUp className="mr-1" />}
              {metric.trend === 'down' && <PiTrendDown className="mr-1" />}
              {metric.trend === 'neutral' && <PiMinus className="mr-1" />}
              {Math.abs(metric.change)}%
            </span>
            <span className="text-xs text-text-tertiary">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;