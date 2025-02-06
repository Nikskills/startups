import { notFound } from "next/navigation";
import { Startup } from "@/types/types";
import StartupDetails from "@/components/StartupDetails";
import { Separator } from "@/components/ui/separator";
import PopularPosts from "@/components/Popular";

async function getStartup(slug: string): Promise<Omit<Startup, "views"> | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/startups/${slug}`, {
      cache: "force-cache",
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const StartupDetailsPage = async ({ params }: { params: { slug: string } }) => {
    const slug = (await params).slug
    const startup = await getStartup(slug);
    if (!startup) notFound();

    return (
        <>
            <StartupDetails startup={startup} />
            <Separator className="my-10"/>
            <PopularPosts />
        </>
    );
};

export default StartupDetailsPage;
