"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import Image from "next/image";
import TestimonialImage from "@/public/testimonials-person.png";
import AvatarOne from "@/public/testimonials-img1.jpg";

const testimonials = [
  {
    id: 1,
    name: "Ralph Edwards",
    location: "New Zealand",
    rating: 5,
    text: "I have received excellent customer service at all times. It is true that the staff has had a bug that I had to solve by hand, but in general the attention has been impeccable. I recommend it",
    avatar: AvatarOne,
  },
  {
    id: 2,
    name: "Ralph Edwards",
    location: "New Zealand",
    rating: 5,
    text: "I have received excellent customer service at all times. It is true that the staff has had a bug that I had to solve by hand, but in general the attention has been impeccable. I recommend it",
    avatar: AvatarOne,
  },
  // Add more testimonials here
];

const TestimonialCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-20" id="testimonials">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 lg:pr-8">
          <h4 className="text-sm text-primary font-medium uppercase mb-2">
            TESTIMONIALS
          </h4>
          <h2 className="text-3xl md:text-[2.5rem] font-bold mb-6 leading-tight font-serif">
            Our client&apos;s reviews inspired us the most to improve our
            services
          </h2>
          <div className="overflow-hidden mt-10" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 fill-current ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700">{testimonial.text}</p>

                  <div className="flex items-center mb-4 mt-4">
                    <Image
                      className="w-16 h-16 rounded-full border-2 border-white object-cover mr-2"
                      src={AvatarOne}
                      alt={`Client ${testimonial.name}`}
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 px-10">
          <div className="relative min-h-[500px] rounded-t-full overflow-hidden">
            <Image
              src={TestimonialImage}
              fill
              alt="Testimonial"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
