import AboutUs from "./_components/about-us";
import ContactCTA from "./_components/contact-cta";
import Hero from "./_components/hero";
import Services from "./_components/services";
import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
