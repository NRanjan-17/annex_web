import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Stage } from "@/components/stage";
import { Bento } from "@/components/bento";
import { Steps } from "@/components/steps";
import { Privacy } from "@/components/privacy";
import { Downloads } from "@/components/downloads";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Stage />
        <Bento />
        <Steps />
        <Privacy />
        <Downloads />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
