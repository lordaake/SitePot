import DomainCard from "./DomainCard";
function DomainGrid({ domains }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map(domain => <DomainCard key={domain.name} domain={domain} />)}
        </div>
    );
}
export default DomainGrid;