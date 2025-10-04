import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stories = [
  {
    id: 1,
    name: "John Doe",
    story: "Thanks to the education program, I was able to return to school and complete my studies.",
    image: "/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    story: "The youth development program helped me discover my passion for art and gave me the confidence to pursue it.",
    image: "/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Michael Johnson",
    story: "Through the vocational training program, I learned valuable skills that helped me secure a stable job.",
    image: "/testimonial3.jpg"
  }
];

export default function ImpactStories() {
  return (
    <section id="impact-stories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle className="text-xl">{story.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{story.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}