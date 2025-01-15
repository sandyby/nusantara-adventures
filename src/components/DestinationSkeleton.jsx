const DestinationSkeleton = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-slate-200" />
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="h-6 w-1/3 bg-slate-200 rounded" />
                    <div className="h-6 w-12 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-5/6 bg-slate-200 rounded" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-16 bg-slate-200 rounded-full" />
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-8 w-24 bg-slate-200 rounded" />
                    <div className="h-10 w-24 bg-slate-200 rounded-lg" />
                </div>
            </div>
        </div>
    );
};

export default DestinationSkeleton; 