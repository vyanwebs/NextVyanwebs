import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/navbar";
import Services from "../views/Home/services";
import Footer from "../components/Footer/footer";

const MainLayout = () => {
	return (
		<div className="min-h-screen">
			<Navbar />

			<Outlet />

			<Footer />
		</div>
	);
};

export default MainLayout;
