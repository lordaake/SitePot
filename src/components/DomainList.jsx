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
        <section id="domains" className="py-16 bg-lepre-light-gray rounded-lg shadow-lepre-soft-shadow md:p-8 mt-8">
            <h2 className="text-4xl font-bold text-black mb-8 border-b-2 border-lepre-green pb-2 text-center md:text-left">
                Explore Our Collection
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center justify-between">
                <div className="relative w-full sm:w-2/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-lepre-green w-6 h-6" />
                    <input
                        type="text"
                        placeholder="Search for a domain..."
                        className="w-full pl-14 pr-4 py-3 bg-lepre-white border border-lepre-gold text-lepre-text-primary rounded-lg shadow-lepre-soft-shadow focus:outline-none focus:ring-2 focus:ring-lepre-green placeholder-lepre-text-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative w-full sm:w-1/3">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-lepre-green w-6 h-6" />
                    <select
                        className="appearance-none w-full pl-14 pr-4 py-3 bg-lepre-white border border-lepre-gold text-lepre-text-primary rounded-lg shadow-lepre-soft-shadow focus:outline-none focus:ring-2 focus:ring-lepre-green"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All Categories">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <p className="text-lepre-text-secondary mb-8 font-bold tracking-wider">{filteredDomains.length} domains found</p>
            {filteredDomains.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDomains.map((domain) => (
                        <DomainCard key={domain.name} domain={domain} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-2xl text-lepre-text-secondary font-semibold">No domains found matching your criteria.</p>
                </div>
            )}
        </section>

    );
}

export default DomainList;

