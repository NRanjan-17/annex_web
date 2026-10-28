import { Backdrop } from "@/components/backdrop";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stage } from "@/components/stage";
import { StreamBlock } from "@/components/stream-block";
import { Bento } from "@/components/bento";
import { Steps } from "@/components/steps";
import { Privacy } from "@/components/privacy";
import { Downloads } from "@/components/downloads";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Backdrop />
      <Nav />
      <main id="main">
        <Hero />
        <StreamBlock />
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
