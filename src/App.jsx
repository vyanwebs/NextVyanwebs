import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../src/layout/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import ScrolltoTopinstant from "./components/ScrolltoTopinstant";
import Loader from "./views/Loader/Loader";
import { ScrollTrigger } from "gsap/all";

// Lazy loader
const Home = lazy(() => import("./views/Home/Home"));
const WorkPage = lazy(() => import("./views/WorkPage"));
const Career = lazy(() => import("./views/Career/Career"));
const JobDetails = lazy(() => import("./views/Career/JobDetails/JobDetails"));
const Contact = lazy(() => import("./views/Contact/Contact"));
const About = lazy(() => import("./views/About/About"));
const ServicePage = lazy(() => import("./views/ServicePage"));
const ServiceDetails = lazy(() =>
	import("./views/Services/ServiceDetails/ServiceDetails")
);
const Projects = lazy(() => import("./sections/Work/Project/Projects"));
const TermPrivacyMain = lazy(() =>
	import("./components/Footer/termandconditions/TermsAndConditions")
);
const PrivacyAndPolicy = lazy(() =>
	import("./components/Footer/PrivacyPolicy/PrivacyAndPolicy")
);

function App() {
	useEffect(() => {
  window.onload = () => ScrollTrigger.refresh();
}, []);
	return (
		<div className="min-h-screen">
			<ScrolltoTopinstant />
			<ScrollToTop />
			{/* <Suspense fallback={<div className="text-center mt-20">Loading...</div>}> */}
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="home" element={<Home />} />
						<Route path="services" element={<ServicePage />} />
						<Route path="services/:slug" element={<ServiceDetails />} />
						<Route path="about" element={<About />} />
						<Route path="work" element={<WorkPage />} />
						<Route path="careers" element={<Career />} />
						<Route path="careers/:slug" element={<JobDetails />} />
						<Route path="contact" element={<Contact />} />
						<Route path="contact/terms" element={<TermPrivacyMain />} />
						<Route path="contact/privacys" element={<PrivacyAndPolicy />} />
						<Route path="work/:slug" element={<Projects />} />
					</Route>
					<Route path="*" element={<div>Page Not Found</div>} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
