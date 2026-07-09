import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import WeddingDetails from "@/components/WeddingDetails";
import Schedule from "@/components/Schedule";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import OutfitInspo from "@/components/OutfitInspo";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <OurStory />
        <WeddingDetails />
        <Schedule />
        <Countdown />
        <Gallery />
        <OutfitInspo />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}
