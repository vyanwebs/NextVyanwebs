"use client";

import React from "react";
import Image from "next/image";

const EngagementCard = ({ id, title, img, desc }) => {
	return (
		<div
			className="card relative rounded-2xl p-6 flex flex-col justify-between
                 bg-transparent border border-white/30 
                 backdrop-blur-none shadow-none
                 transition-all duration-300
                 hover:scale-105 hover:z-10"
		>
			{/* ID */}
			<h3 className="text-2xl font-bold text-blue-400 mb-4">{id}</h3>

			{/* Image */}
			<div className="relative w-full h-56 overflow-hidden rounded-lg mb-5">
				<Image
					src={img || "/fallback.png"}
					alt={title}
					fill
					className="object-cover transition-transform duration-500 hover:scale-105 rounded-lg"
				/>
			</div>

			{/* Title */}
			<h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>

			{/* Description */}
			<p className="text-gray-200 text-sm grow">{desc}</p>

			{/* Button */}
			<button
				className="mt-5 px-4 py-2 rounded-lg flex items-center justify-between
                   bg-blue-500 text-white hover:bg-blue-600 transition-all"
			>
				<span>Know More</span>
				<svg
					className="ml-2"
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.5"
						d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"
					/>
				</svg>
			</button>
		</div>
	);
};

export default React.memo(EngagementCard);