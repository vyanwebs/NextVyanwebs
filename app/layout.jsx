import "@/index.css";
import { Montserrat } from "next/font/google";
import RootProviders from "@/RootProvider";
import Navbar from "@/components/Navbar/navbar";
import Footer from "@/components/Footer/footer";
import ScrollToTopInstant from "@/components/ScrolltoTopinstant";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Vyanwebs",
  description: "Vyanwebs corporate site migrated to Next.js",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <RootProviders>
          <Navbar />
          <ScrollToTopInstant />
          {children}
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}