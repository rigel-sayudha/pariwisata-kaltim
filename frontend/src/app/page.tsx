import Navbar from "@/components/Navbar";
import CarouselHero from "@/components/CarouselHero";
import Destinations from "@/components/Destinations";
import LatestNews from "@/components/LatestNews";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

async function getCarousels() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/carousels", { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getDestinations() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/destinations", { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getNews() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/news", { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const [carousels, destinations, news] = await Promise.all([
    getCarousels(),
    getDestinations(),
    getNews(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <CarouselHero items={carousels} />
      <Destinations items={destinations} />
      <LatestNews items={news} />
      <ContactSection />
      <Footer />
    </main>
  );
}
