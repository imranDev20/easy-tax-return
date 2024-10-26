import { Toaster } from "@/components/ui/toaster";
import Footer from "./_components/footer";
import Header from "./_components/header";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Toaster />
      <Footer />
    </>
  );
}
