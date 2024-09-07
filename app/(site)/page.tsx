import AboutUs from "./_components/about-us";
import ContactCTA from "./_components/contact-cta";
import Hero from "./_components/hero";
import TaxTimeline from "./_components/tax-timeline";
import Testimonials from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TaxTimeline />
      <AboutUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
