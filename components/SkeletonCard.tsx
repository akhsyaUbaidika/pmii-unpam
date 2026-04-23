export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="animate-pulse">

                {/* IMAGE */}
                <div className="h-44 w-full bg-gray-300" />

                {/* TEXT */}
                <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>

            </div>
        </div>
    );
}