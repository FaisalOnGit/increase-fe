import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { AboutPKM } from "@/components/landing/AboutPKM";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Categories } from "@/components/landing/Categories";
import { Testimonials } from "@/components/landing/Testimonials";
import { DeadlineBanner } from "@/components/landing/DeadlineBanner";
import { FAQ } from "@/components/landing/FAQ";
import { CTABanner } from "@/components/landing/CTABanner";
import { Footer } from "@/components/landing/Footer";

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <div id="home">
        <Hero />
      </div>
      <AboutPKM />
      <Features />
      <div id="panduan">
        <HowItWorks />
      </div>
      <Categories />
      {/* <DashboardPreview /> */}
      <Testimonials />
      <DeadlineBanner />
      <div id="faq">
        <FAQ />
      </div>
      <CTABanner />
      <Footer />
    </div>
  );
};
