import { Backdrop } from "@/components/backdrop";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stage } from "@/components/stage";
import { Stats } from "@/components/stats";
import { Bento } from "@/components/bento";
import { Steps } from "@/components/steps";
import { Privacy } from "@/components/privacy";
import { Downloads } from "@/components/downloads";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { homeData } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={homeData} />
      <Backdrop />
      <Nav />
      <main id="main">
        <Hero />
        <Stats />
        <Stage />
        <Bento />
        <Steps />
        <Privacy />
        <Downloads />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
