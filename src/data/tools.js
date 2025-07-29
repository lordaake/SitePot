// src/data/tools.js
import pickaxeLogo from '../assets/pickaxe-logo.webp';
import aiagentLogo from '../assets/1740505172578-logo.png';

export const toolsData = [
    {
        id: 'pickaxe',
        href: 'https://pickaxe.co/?utm_campaign=AFFILIATE_KVDVZDO',
        logo: { type: 'image', src: pickaxeLogo, alt: 'Pickaxe.co logo' },
        category: 'No-Code Builder',
        categoryColor: 'bg-green-500',
        title: 'Pickaxe.co',
        subtitle: 'Build & Monetize AI Tools in Minutes',
        description:
            'Transform your expertise into profitable AI tools with drag-and-drop simplicity. No coding required – just upload your data and start earning.',
        features: [
            { icon: 'Wand2', text: 'Drag-and-drop prompt builder' },
            { icon: 'CreditCard', text: 'Built-in Stripe checkout' },
            { icon: 'Globe', text: 'One-click domains & white-label' },
        ],
        pricing: [
            { plan: 'Free', price: '$0/mo', note: '20% revenue share' },
            { plan: 'Pro', price: '$29/mo', note: '10% revenue share' },
        ],
        testimonial: {
            rating: 4.5,
            text: '"It was like moving from an old flip phone to my first iPhone"',
            source: '4.1/5 on AppSumo',
        },
        cta: 'Try Pickaxe.co',
    },
    {
        id: 'buildthatidea',
        href: 'https://buildthatidea.com/?via=build-now',
        logo: { type: 'icon', icon: 'Lightbulb', color: 'bg-blue-600' },
        category: 'AI Agent Builder',
        categoryColor: 'bg-purple-500',
        title: 'BuildThatIdea.com',
        subtitle: 'Launch an AI Agent in 60 Seconds',
        description:
            'Lightning-fast platform for creating GPT-based chat agents with built-in monetization. From idea to revenue in under a minute.',
        features: [
            { icon: 'Brain', text: 'Multiple LLMs (OpenAI, Claude)' },
            { icon: 'FileText', text: 'Upload PDFs, Docs, Notion' },
            { icon: 'CreditCard', text: 'Built-in Stripe + crypto checkout' },
        ],
        pricing: [
            { plan: 'Starter', price: '$19/mo', note: '1M tokens' },
            { plan: 'Pro', price: '$49/mo', note: '5M tokens' },
        ],
        testimonial: {
            icon: 'Rocket',
            text: '"Create custom AI applications in just a minute or two"',
            source: 'User hit $1k MRR in a week',
        },
        cta: 'Launch on BuildThatIdea',
    },
    {
        id: 'relayapp',
        href: 'https://www.relay.app/?via=buildit',
        logo: { type: 'icon', icon: 'Cog', color: 'bg-purple-600' },
        category: 'Automation Platform',
        categoryColor: 'bg-orange-500',
        title: 'Relay.app',
        subtitle: 'Human-in-the-Loop Automation',
        description:
            'Merge AI automation with human oversight. Perfect for workflows that need both speed and human judgment for critical decisions.',
        features: [
            { icon: 'Eye', text: 'Visual builder (simpler than Zapier)' },
            { icon: 'Puzzle', text: '100+ integrations (Gmail, Notion)' },
            { icon: 'ShieldCheck', text: 'SOC 2 compliant, GDPR-ready' },
        ],
        pricing: [
            { plan: 'Free', price: '$0/mo', note: '200 steps' },
            { plan: 'Pro', price: '$19/mo', note: '5,000+ steps' },
        ],
        testimonial: {
            rating: 5,
            text: '"Easy to use with a clean interface. Perfect for automating repetitive tasks with minimal setup."',
            source: '4.7/5 on G2 (60+ reviews)',
        },
        cta: 'Automate with Relay.app',
    }, // <-- comma added here
    {
        id: 'closebot',
        href: 'https://app.closebot.com/a?fpr=buildit',
        logo: { type: 'icon', icon: 'Bot', color: 'bg-cyan-600' },
        category: 'Customer Service Agent',
        categoryColor: 'bg-cyan-500',
        title: 'CloseBot.ai',
        subtitle: 'Automate Sales & Support Conversations',
        description:
            'An AI-powered agent designed to handle customer service inquiries, qualify leads, and automate sales conversations 24/7, freeing up your team for high-value tasks.',
        features: [
            { icon: 'MessagesSquare', text: '24/7 automated customer support' },
            { icon: 'UserCheck', text: 'Intelligent lead qualification & routing' },
            { icon: 'Zap', text: 'Seamless CRM & helpdesk integrations' },
        ],
        pricing: [
            { plan: 'Varies', price: 'Custom', note: 'Based on usage' },
            { plan: 'Demo', price: 'Available', note: 'Request a demo' },
        ],
        testimonial: {
            icon: 'TrendingUp',
            text: '"Leverage AI to close more deals and increase support efficiency."',
            source: 'Listed under "Customer Service Agents"[2]',
        },
        cta: 'Automate with CloseBot',
    }

];