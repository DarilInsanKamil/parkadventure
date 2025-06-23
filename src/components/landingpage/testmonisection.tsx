"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { phudu } from "@/lib/utils";
import { Star } from "lucide-react";

type Testimonials = {
  id_testimonial: number;
  name: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  avatar_url: string;
};

const TestimoniSection = () => {
  const [testimoni, setTestimoni] = useState<Testimonials[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const response = await fetch("/api/testimonials");
        if (!response.ok) {
          throw new Error("Failed to fetch testimoni");
        }
        const data = await response.json();
        setTestimoni(data);
      } catch (error) {
        console.error("Error fetching testimoni:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h1
        className={`${phudu.className} text-center text-5xl font-extrabold mb-10`}
      >
        Testimoni
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-5 items-center">
          {testimoni.slice(0, 3).map((res, idx: number) => (
            <Card key={idx} className="w-full">
              <CardContent>
                <div className="mb-1">{renderRating(res.rating)}</div>
                <p>{res.content}</p>
              </CardContent>
              <CardHeader>
                <div className="flex gap-2 items-center">
                  {res.avatar_url ? (
                    <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                      <img
                        src={res.avatar_url}
                        alt={res.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                      {res.name.charAt(0)}
                    </div>
                  )}
                  <p>{res.name}</p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimoniSection;
