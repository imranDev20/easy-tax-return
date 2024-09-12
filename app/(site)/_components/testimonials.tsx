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
    name: "Jane Smith",
    location: "Australia",
    rating: 4,
    text: "The tax return process was smooth and efficient. The team was very helpful in guiding me through the complexities. I'm satisfied with the service.",
    avatar: AvatarOne,
  },
  {
    id: 3,
    name: "John Doe",
    location: "United States",
    rating: 5,
    text: "Exceptional service! They made filing my taxes a breeze. Their expertise saved me both time and money. Highly recommended!",
    avatar: AvatarOne,
  },
];

const Testimonials: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20"
      id="testimonials"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <div className="lg:col-span-3 lg:pr-8">
          <h4 className="text-sm text-primary font-medium uppercase mb-2 text-center lg:text-left">
            TESTIMONIALS
          </h4>
          <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold mb-4 md:mb-6 leading-tight font-serif text-center lg:text-left">
            Our client&apos;s reviews inspired us the most to improve our
            services
          </h2>
          <div className="overflow-hidden mt-6 md:mt-10" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="flex justify-center lg:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 fill-current ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm md:text-base text-center lg:text-left">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center justify-center lg:justify-start mt-4">
                    <Image
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white object-cover mr-2"
                      src={testimonial.avatar}
                      alt={`Client ${testimonial.name}`}
                    />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 px-4 md:px-10 mt-8 lg:mt-0">
          <div className="relative w-full pt-[100%] md:pt-[125%] rounded-t-full overflow-hidden">
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
export default Testimonials;
