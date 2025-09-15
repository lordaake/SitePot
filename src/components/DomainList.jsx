// src/components/DomainList.jsx

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { domains, categories } from '../data/domains';
import DomainCard from './DomainCard';

function DomainList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const filteredDomains = useMemo(() => {
        let filtered = domains;
        if (selectedCategory !== 'All Categories') {
            filtered = filtered.filter(d => Array.isArray(d.category) ? d.category.includes(selectedCategory) : d.category === selectedCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.description.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        const xyz = filtered.filter(d => d.name.endsWith('.xyz')).sort((a, b) => a.name.localeCompare(b.name));
        const nonXyz = filtered.filter(d => !d.name.endsWith('.xyz')).sort((a, b) => a.name.localeCompare(b.name));
        return [...nonXyz, ...xyz];
    }, [searchTerm, selectedCategory]);

    return (
        <section id="domains" className="py-16">
            <h2 className="text-4xl font-bold text-neon-pink mb-8 border-b-2 border-yellow-400 inline-block pb-2">Explore Our Brew</h2>
            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center justify-between">
                <div className="relative w-full sm:w-2/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-green w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search for a domain spell..."
                        className="w-full pl-14 pr-4 py-3 bg-black/50 border border-neon-orange text-neon-orange rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-neon-green placeholder-neon-pink/70"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full sm:w-1/3">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-neon-green w-6 h-6" />
                    <select
                        className="appearance-none w-full pl-14 pr-4 py-3 bg-black/50 border border-neon-pink text-neon-pink rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-neon-orange"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map(category => (<option key={category} value={category}>{category}</option>))}
                    </select>
                </div>
            </div>
            <p className="text-yellow-300 mb-8 font-bold tracking-wider">{filteredDomains.length} enchanted domains found</p>
            {filteredDomains.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDomains.map(domain => (<DomainCard key={domain.name} domain={domain} />))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-2xl text-neon-orange font-semibold">No domains found matching your incantation.</p>
                </div>
            )}
        </section>
    );
}

export default DomainList;