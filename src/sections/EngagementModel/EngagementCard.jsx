"use client";

import React, { useState } from "react";
import Image from "next/image";

const EngagementCard = ({ id, title, img, desc }) => {
	const [imageError, setImageError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	return (
		<div
			className="card relative rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between
                 bg-white/5 backdrop-blur-sm border border-white/20 
                 transition-all duration-300 h-full
                 hover:scale-105 hover:z-10 hover:border-blue-400/50
                 active:scale-98 sm:active:scale-100"
		>
			{/* ID */}
			<h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-3 sm:mb-4">
				{id}
			</h3>

			{/* Image Container - Responsive height */}
			<div className="relative w-full overflow-hidden rounded-lg mb-4 sm:mb-5 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
				<div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3]">
					{img && !imageError ? (
						<>
							<Image
								src={img}
								alt={title}
								fill
								className={`object-cover transition-transform duration-500 hover:scale-105 rounded-lg ${isLoading ? "opacity-0" : "opacity-100"
									}`}
								onLoad={() => setIsLoading(false)}
								onError={() => {
									setIsLoading(false);
									setImageError(true);
								}}
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
								priority={false}
							/>
							{/* Loading skeleton */}
							{isLoading && (
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-lg" />
							)}
						</>
					) : (
						<div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center rounded-lg">
							<svg
								className="w-12 h-12 sm:w-16 sm:h-16 text-white/30"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
					)}
				</div>
			</div>

			{/* Title */}
			<h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white line-clamp-2">
				{title}
			</h3>

			{/* Description */}
			<p className="text-gray-300 text-sm sm:text-base grow line-clamp-3 sm:line-clamp-4">
				{desc}
			</p>

			{/* Button */}
			<button
				className="mt-4 sm:mt-5 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-between
                   bg-blue-600 text-white hover:bg-blue-700 
                   transition-all duration-300 group w-full sm:w-auto
                   text-sm sm:text-base"
			>
				<span>Know More</span>
				<svg
					className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
					/>
				</svg>
			</button>

			<style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        /* Mobile touch feedback */
        @media (max-width: 640px) {
          .card:active {
            transform: scale(0.98);
          }
        }
        
        /* Ensure images load properly on mobile */
        @media (max-width: 768px) {
          .card :global(img) {
            min-height: 160px;
            object-fit: cover;
          }
        }
      `}</style>
		</div>
	);
};

export default React.memo(EngagementCard);