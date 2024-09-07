import testimonialsImg1 from "@/public/testimonials-img1.jpg";
import testimonialsImg2 from "@/public/testimonials-img2.jpg";
import testimonialsImg3 from "@/public/testimonials-img3.jpg";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ralph Edwards",
      location: "New Zealand",
      image: testimonialsImg1,
      review:
        "I have received excellent customer service at all times. It is true that the staff has had a bug that I had to solve by hand, but in general the attention has been impeccable. I recommend it!",
      rating: 5,
    },
    {
      name: "Courtney Henry",
      location: "Brazil",
      image: testimonialsImg2,
      review:
        "I must say the theme is awesome. If somebody bought it just have in mind to correctly configure it and to contact support if facing a problem; support is fast and reliable. Thanks e-taxbd!",
      rating: 5,
    },
    {
      name: "Darrell Steward",
      location: "Japan",
      image: testimonialsImg3,
      review:
        "I have received excellent customer service at all times. It is true that the staff has had a bug that I had to solve by hand, but in general the attention has been impeccable. I recommend it!",
      rating: 5,
    },
  ];
  return (
    <section className="  my-20 bg-white">
      <div className="  text-center">
        <h3 className="text-blue-600 font-semibold text-sm mb-1">
          TESTIMONIALS
        </h3>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Our client&apos;s reviews inspired us the <br /> most to improve our
          services
        </h2>

        <div className="flex items-center justify-evenly">
          <button className="text-xl">
            <MdOutlineArrowBack />
          </button>

          <div className="flex   overflow-x-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-72 p-6  ">
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-center text-gray-600 mb-6">
                  {testimonial.review}
                </p>
                <div className="flex flex-col items-center  ">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="text-xl">
            <MdOutlineArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
}
