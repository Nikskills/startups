"use client";

import { useEffect, useRef, useState } from "react";
import { Startup } from "@/types/types";

const StartupDetails = ({
  startup,
}: {
  startup: Omit<Startup, "views">;
}) => {
  const { slug, title, description, author, category, image, pitch } = startup;

  const [views, setViews] = useState<number | null>(null);
  const hasIncremented = useRef(false); // Track if increment logic has already run

  useEffect(() => {
    const fetchViews = async () => {
      try {
        if (hasIncremented.current) return; // Prevent double increment
        hasIncremented.current = true;

        const res = await fetch(`http://localhost:3000/api/startups/${slug}/views`, {
          method: "POST", // Increment views and return the updated value
        });
        if (res.ok) {
          const data = await res.json();
          setViews(data.views); // Update the views dynamically
        }
      } catch (error) {
        console.error("Failed to fetch views:", error);
      }
    };

    fetchViews();
  }, [slug]);

  return (
    <div>
      <div className="pink-container">
        <div className="bg-black text-white p-6 mx-auto text-center text-5xl my-5">
          {title}
        </div>
        <div className="text-white">{description}</div>
      </div>
      <div>
        {image ? (
          <div className="flex justify-center">{image}</div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex w-full my-5">
        <div className="flex-1"></div>
        <div className="w-3/5 flex flex-row justify-between">
          <div className="py-1">Geschreven door: {author}</div>
          <div className="flex flex-row gap-5">
            <div className="bg-purple-300 px-2 py-1 rounded-lg">{category}</div>
            <div className="py-1">
              {views !== null ? `${views} views` : "Loading..."}
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex w-full my-5">
        <div className="flex-1"></div>
        <div className="w-3/5 flex flex-col gap-2">
          <p className="text-2xl font-bold">Pitch Details</p>
          <p className="text-xl">{pitch}</p>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default StartupDetails;
