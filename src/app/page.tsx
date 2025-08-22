import { getLandingData } from "@/features/landing/data";
import { SiteHeader } from "@/components/core/site-header";
import { Hero } from "@/features/landing/hero";
import { Snowfall } from "@/components/core/snowfall";

export default async function Home() {
  const data = await getLandingData();
  return (
    <>
      <SiteHeader name={data.name} session={data.session} />
      <main>
        <Hero data={data} />
      </main>
      <Snowfall />
    </>
  );
}
