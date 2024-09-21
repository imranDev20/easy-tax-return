import { Toaster } from "@/components/ui/toaster";
import Footer from "./_components/footer";
import Header from "./_components/header";
import { EdgeStoreProvider } from "@/lib/edgestore";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <EdgeStoreProvider>
        <Header />
        <main>{props.children}</main>
        <Toaster />
        <Footer />
      </EdgeStoreProvider>
    </>
  );
}
