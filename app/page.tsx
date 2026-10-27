import { Backdrop } from "@/components/backdrop";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { LaunchFilm } from "@/components/launch-film";
import { Stage } from "@/components/stage";
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
        <LaunchFilm />
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
