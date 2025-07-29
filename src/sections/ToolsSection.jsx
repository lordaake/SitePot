// src/sections/ToolsSection.jsx (updated for better dark mode colors)
import React from 'react';
import { toolsData } from '../data/tools';
import ToolCard from '../components/ToolCard';


const ToolsSection = React.forwardRef((props, ref) => (
    <section id="tools" ref={ref} className="py-20 bg-gray-50 dark:bg-indigo-950"> {/* Creative dark: indigo instead of black */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-indigo-100 mb-4">Recommended AI Tools</h2> {/* Light indigo for text */}
                <p className="text-lg text-gray-600 dark:text-indigo-300 max-w-3xl mx-auto"> {/* Soft indigo */}
                    A curated collection of AI-powered tools to help you automate workflows, build smarter solutions, and grow your business efficiently.
                </p>
            </div>
            {/* Changed lg:grid-cols-3 to lg:grid-cols-4 to allow 4 cards on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {toolsData.map((tool) => (
                    <ToolCard key={tool.id} {...tool} />
                ))}
            </div>
        </div>
    </section>
));


ToolsSection.displayName = 'ToolsSection';


export default ToolsSection;
