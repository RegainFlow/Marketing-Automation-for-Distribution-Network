import React from 'react';
import { PiPlusDuotone, PiTagDuotone } from 'react-icons/pi';
import { Product } from '../types';

const products: Product[] = [
  { 
    id: '1', 
    name: 'Spark® Energy', 
    category: 'Energy', 
    price: 54.99, 
    sku: 'A1022', 
    description: 'Vitamin & Amino Acid Supplement',
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  { 
    id: '2', 
    name: 'Rehydrate', 
    category: 'Hydration', 
    price: 32.99, 
    sku: 'H4002', 
    description: 'Electrolyte Replacement Drink Mix',
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  { 
    id: '3', 
    name: 'Catalyst™', 
    category: 'Amino Acids', 
    price: 39.99, 
    sku: 'C1001', 
    description: 'Amino Acid Supplement',
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  { 
    id: '4', 
    name: 'MNS® Delta', 
    category: 'Weight Management', 
    price: 68.99, 
    sku: 'M2020', 
    description: 'Comprehensive Weight Management System',
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  { 
    id: '5', 
    name: 'O2 Gold®', 
    category: 'Performance', 
    price: 29.99, 
    sku: 'O5005', 
    description: 'Oxygen Delivery Support',
    imageUrl: 'https://picsum.photos/400/300?random=5'
  },
];

const Products: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
           <button className="px-4 py-2 rounded-lg bg-bg-tertiary text-text-secondary border border-transparent hover:text-white hover:border-white/10 text-sm">
             All Products
           </button>
           <button className="px-4 py-2 rounded-lg bg-transparent text-text-secondary border border-transparent hover:text-white hover:bg-white/5 text-sm">
             Energy
           </button>
           <button className="px-4 py-2 rounded-lg bg-transparent text-text-secondary border border-transparent hover:text-white hover:bg-white/5 text-sm">
             Weight Management
           </button>
        </div>
        
        <button className="bg-primary text-bg-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-primary-light transition-colors">
          <PiPlusDuotone />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="glass-card rounded-2xl overflow-hidden group hover:translate-y-[-5px] transition-transform duration-300">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                <PiTagDuotone className="text-primary" />
                {product.category}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white leading-tight">{product.name}</h3>
                <span className="font-mono text-primary font-bold">${product.price}</span>
              </div>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center text-xs text-text-tertiary border-t border-white/5 pt-3">
                <span>SKU: {product.sku}</span>
                <button className="text-primary hover:text-white transition-colors uppercase font-bold tracking-wider">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;