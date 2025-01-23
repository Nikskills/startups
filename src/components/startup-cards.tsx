import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Startup } from "@/types/types";
import { Button } from "./ui/button";
import Link from "next/link";
export const StartupCard = (startup: Startup) => {
    const { slug, title, description, author, views, category, image} = startup;
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{author}</p>
          <p>{views}</p>
          <p>{image}</p>
          <p>{category}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/startups/${slug}`}><Button className="font-bold">Details</Button></Link>
        </CardFooter>
      </Card>
    </div>
  );
};
