import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Startup } from "@/types/types";
export const StartupCard = (startup: Startup) => {
    const { title, description, author, views, category, image} = startup;
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{author}</p>
          <p>{views}</p>
          <p>{image}</p>
        </CardContent>
        <CardFooter>
          <p>{category}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
