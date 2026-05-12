"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, Power2 } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import toggleIcon from "../../assets/hamburger.png";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);
	const linksRef = useRef([]);
	const headingRef = useRef([]);
	const logoRef = useRef(null);
	const pathname = usePathname();
	const router = useRouter();
	const heading = "VYANWEBS".split("");

	const toggleMenu = () => setOpen((prev) => !prev);

	const handleNavClick = (path) => {
		router.push(path);
		setOpen(false);
	};

	const handleHomeClick = () => {
		router.push("/");
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && open) toggleMenu();
		};
		const handleClickOutside = (e) => {
			if (open && menuRef.current && !menuRef.current.contains(e.target)) {
				toggleMenu();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open]);

	useGSAP(
		() => {
			if (open) {
				gsap.set(menuRef.current, { display: "flex", pointerEvents: "auto" });
				const tl = gsap.timeline({ defaults: { ease: Power2.easeOut } });
				tl.fromTo(
					menuRef.current,
					{ autoAlpha: 0, scale: 0.98, filter: "blur(6px)" },
					{ autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.45 }
				).fromTo(
					linksRef.current.filter(Boolean),
					{ x: -24, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
					"<+0.1"
				);
				document.body.style.overflow = "hidden";
			} else {
				const tl = gsap.timeline({ defaults: { ease: Power2.easeIn } });
				tl.to(linksRef.current.filter(Boolean), {
					x: -16,
					opacity: 0,
					duration: 0.25,
					stagger: 0.05,
				}).to(
					menuRef.current,
					{
						autoAlpha: 0,
						scale: 0.985,
						filter: "blur(4px)",
						duration: 0.3,
						onComplete: () => {
							gsap.set(menuRef.current, {
								display: "none",
								pointerEvents: "none",
							});
							document.body.style.overflow = "auto";
						},
					},
					"<"
				);
			}
		},
		{ dependencies: [open], scope: menuRef }
	);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Initial animation for heading letters
			gsap.from(headingRef.current, {
				x: -30,
				opacity: 0,
				duration: 0.9,
				stagger: 0.08,
				ease: Power2.easeOut,
			});

			// Set initial state for logo
			gsap.set(logoRef.current, { opacity: 0, scale: 0.9 });

			// ScrollTrigger animation - hide letters and show logo on scroll
			const trigger = ScrollTrigger.create({
				trigger: logoRef.current,
				start: "top top",
				end: "+=120",
				onEnter: () => {
					gsap.to(headingRef.current, {
						x: 48,
						opacity: 0,
						duration: 0.3,
						stagger: 0.05,
						ease: Power2.easeOut,
						onComplete: () => {
							gsap.to(logoRef.current, {
								opacity: 1,
								scale: 1,
								duration: 0.28,
								ease: Power2.easeOut,
							});
						},
					});
				},
				onLeaveBack: () => {
					gsap.to(logoRef.current, {
						opacity: 0,
						scale: 0.9,
						duration: 0.25,
						ease: Power2.easeOut,
						onComplete: () => {
							gsap.to(headingRef.current, {
								x: 0,
								opacity: 1,
								duration: 0.35,
								stagger: 0.05,
								ease: Power2.easeOut,
							});
						},
					});
				},
			});

			return () => trigger.kill();
		});

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		setOpen(false);
		document.body.style.overflow = "auto";
	}, [pathname]);

	const navLinks = [
		{ label: "Home", path: "/" },
		{ label: "Services", path: "/services" },
		{ label: "About", path: "/about" },
		{ label: "Our Work", path: "/work" },
		{ label: "Careers", path: "/careers" },
		{ label: "Contact", path: "/contact" },
	];

	const filteredLinks = navLinks.filter((link) => link.path !== pathname);

	return (
		<header className="fixed top-8 w-full z-[10000]">
			<div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-6 py-4 relative z-[10001]">
				{/* Logo + Vyanwebs text with animation - CLICKABLE - NOW INLINE */}
				<button
					onClick={handleHomeClick}
					className="flex items-center gap-2 cursor-pointer group focus:outline-none"
					aria-label="Go to home"
				>
					<div
						ref={logoRef}
						className="hidden md:block opacity-0 scale-90 transition-all duration-300"
					>
						<img
							src="/logo.png"
							alt="Vyanwebs Logo"
							width={50}
							height={50}
							className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
						/>
					</div>
					<h1 className="text-2xl md:text-4xl font-bold text-white flex space-x-0.5 transition-transform duration-300 group-hover:scale-105">
						{heading.map((letter, i) => (
							<span
								key={i}
								ref={(el) => (headingRef.current[i] = el)}
								className="inline-block"
							>
								{letter === " " ? "\u00A0" : letter}
							</span>
						))}
					</h1>
				</button>

				{/* Desktop nav buttons */}
				<div className="hidden md:flex items-center pr-10 space-x-4 md:space-x-6 text-white text-base md:text-xl font-semibold">
					<button
						onClick={() => router.push("/contact")}
						className="px-3 md:px-4 py-1 md:py-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-300"
					>
						{"Let's Talk"}
					</button>

					{/* Toggle Button with Custom Image */}
					<button
						onClick={toggleMenu}
						className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110"
						aria-label="Toggle menu"
					>
						<Image
							src={toggleIcon}
							alt="Menu Toggle"
							width={24}
							height={24}
							className={`object-contain transition-all duration-300 brightness-0 invert ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"
								}`}
							priority
						/>
					</button>
				</div>

				{/* Mobile menu toggle */}
				<button
					onClick={toggleMenu}
					className="md:hidden relative w-5 h-5 flex items-center justify-center focus:outline-none transition-transform duration-300 hover:scale-110"
					aria-label="Toggle menu"
				>
					<Image
						src={toggleIcon}
						alt="Menu Toggle"
						width={20}
						height={20}
						className={`object-contain transition-all duration-300 brightness-0 invert ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"
							}`}
						priority
					/>
				</button>
			</div>

			{/* Full screen menu overlay */}
			<div
				ref={menuRef}
				className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col md:flex-row justify-between md:items-start z-[9998] opacity-0 pointer-events-none p-6 md:p-12"
			>
				<nav className="group flex flex-col items-start space-y-4 md:space-y-6 text-3xl sm:text-4xl md:text-6xl font-bold text-white pointer-events-auto md:ml-64 mt-20 sm:mt-24 md:mt-32">
					{filteredLinks.map((link, i) => (
						<button
							key={link.label}
							onClick={() => handleNavClick(link.path)}
							className="cursor-pointer group text-left transition-transform duration-300 ease-out will-change-transform hover:translate-x-3 md:hover:translate-x-5"
						>
							<span
								ref={(el) => (linksRef.current[i] = el)}
								className="relative z-10 block group-hover:text-gray-600 hover:text-white transition-colors duration-500"
							>
								{link.label}
							</span>
						</button>
					))}
				</nav>

				<div className="absolute bottom-10 sm:bottom-6 right-6 text-left text-white text-sm sm:text-base md:text-lg max-w-[90%] sm:max-w-[85%] md:max-w-sm pointer-events-auto">
					<div className="mb-8">
						<a
							href="tel:+919111721315"
							className="mb-2 block underline decoration-blue-500 underline-offset-8 text-blue-400 hover:text-blue-300 transition-colors"
						>
							📞 +91 9111721315
						</a>

						<a
							href="mailto:info@vyanwebs.com"
							className="mb-2 block underline decoration-blue-500 underline-offset-8 text-blue-400 hover:text-blue-300 transition-colors"
						>
							✉️ info@vyanwebs.com
						</a>
						<a
							href="https://wa.me/918829796669"
							target="_blank"
							rel="noopener noreferrer"
							className="mb-2 block underline decoration-blue-500 underline-offset-8 text-blue-400 hover:text-blue-300 transition-colors"
						>
							💬 WhatsApp
						</a>
					</div>

					<div className="space-y-6">
						<div>
							<p>
								<strong>N - Friends Colony, Ring Road</strong>
								<br />
								Bangali Square, Above the SBI Bank,
								<br />
								Indore, M.P. - 452001
							</p>
						</div>

						<div>
							<p>
								<strong className="text-base md:text-lg">
									2nd Floor, Corporate Park
								</strong>
								<br />
								Goregaon East
								<br />
								Mumbai - 400063
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;