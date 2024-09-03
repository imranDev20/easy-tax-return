import Footer from "./_components/footer";

export default function SiteLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
