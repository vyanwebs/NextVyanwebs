"use client";
import React from "react";

const Loader = () => {
	return (
		<div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#0a0a0f] transition-opacity duration-700 ease-in-out">
			<div className="flex flex-col items-center space-y-6">

				{/* Single wrapper — dono ek saath spin honge */}
				<div className="relative w-20 h-20 md:w-24 md:h-24 animate-spin" style={{ animationDuration: "1.2s" }}>

					{/* Ring */}
					<div className="absolute inset-[-10px] rounded-full border-4 border-blue-500 border-t-transparent" />

					{/* Logo */}
					<img
						src="/logo.png"
						alt="Vyanwebs Logo"
						className="w-full h-full object-contain rounded-full bg-[#0a0a0f] z-10"
					/>
				</div>

				{/* Title */}
				<h1 className="text-white text-4xl font-bold animate-pulse tracking-wider">
					Vyan<span className="text-blue-500">webs</span>
				</h1>

				{/* Tagline */}
				<p className="text-blue-400/70 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wide text-center px-4">
					"Empower the world with code"
				</p>
			</div>
		</div>
	);
};

export default React.memo(Loader);