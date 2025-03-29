const ReviewCard = ({ reviews }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid layout for two cards per row */}
            {reviews.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-3">
                    <p className="text-gray-500">No reviews available</p>
                </div>
            ) : (
                reviews.map((review, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-3 relative">
                        {/* Author Avatar */}
                        {review.author_details?.avatar_path && (
                            <img
                                src={
                                    review.author_details.avatar_path.startsWith('/http')
                                        ? review.author_details.avatar_path.substring(1) // Remove leading slash for external URLs
                                        : `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}` // TMDB avatar URL
                                }
                                alt={`${review.author}'s avatar`}
                                className="w-10 h-10 rounded-full absolute top-3 right-3 border border-gray-300"
                            />
                        )}
                        {/* Author Name */}
                        <div className="flex items-center mb-2">
                            <div className="text-sm font-bold text-gray-700">
                                {review.author || "Anonymous"}
                            </div>
                        </div>
                        {/* Review Content */}
                        <div className="prose max-w-none text-sm">
                            <p className="text-gray-600">{review.content || "No content available"}</p>
                        </div>
                        {/* Rating */}
                        <div className="mt-2 flex items-center">
                            <p className="text-yellow-500 font-bold mr-1">
                                <span className="text-gray-500 text-xs">Rating: </span>
                                ★ {review.author_details?.rating || "N/A"} /10
                            </p>
                        </div>
                        <div className="mt-2 flex items-center">
                            <p className="text-grey text-sm mr-1">
                                <span className="text-gray-500 text-xs">created at: </span>
                                 {review.created_at} 
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ReviewCard;