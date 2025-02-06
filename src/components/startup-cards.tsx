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
import Image from "next/image";
export const StartupCard = (startup: Startup) => {
  const { slug, title, description, author, views, category, image} = startup;

  return (
      <div className="w-full max-w-2xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {image && (
                      <Image 
                          alt="img"
                          src={image}
                          fill
                          style={{ objectFit: 'cover' }}                      
                          />
              )}
              <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">{title}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                          <span>👁️ {views}</span>
                      </div>
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                      {description}
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">By</span>
                          <span className="font-medium">{author}</span>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {category}
                      </span>
                  </div>
              </CardContent>
              <CardFooter className="pt-4 border-t">
                  <Link href={`/startups/${slug}`} className="w-full">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white font-medium">
                          View Details
                      </Button>
                  </Link>
              </CardFooter>
          </Card>
      </div>
  );
};