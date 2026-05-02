"use client";

import React from "react";

const Loader = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0c0c1d] transition-opacity duration-700 ease-in-out">
			<div className="flex flex-col items-center space-y-4">
				<img
					src="/logo.png"
					alt="Vyanwebs Logo"
					width={80}
					height={80}
					className="object-contain"
				/>

				<h1 className="text-white text-4xl font-bold animate-pulse tracking-wider">
					Vyanwebs
				</h1>

				<div className="w-full px-4 text-center">
					<p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
						"Empower the world with code"
					</p>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Loader);