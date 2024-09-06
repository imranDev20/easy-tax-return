import Link from "next/link";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";

export default function Services() {
  return (
    <section className=" my-20">
      <div className=" max-w-6xl mx-auto">
        <p className="text-sm text-blue-600 font-semibold uppercase mb-2">
          Our Services
        </p>
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-8 ">
            We are rated #1 Online Tax Return <br /> Preparer in Bangladesh
          </h1>
          <div className="flex text-xl space-x-2">
            <MdOutlineArrowBack />
            <MdOutlineArrowForward />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6   shadow-lg bg-[#A8F1E5]/20">
              <div className="flex justify-center mb-4">icon</div>
              <h3 className="text-xl font-semibold mb-2">
                Individual Tax Return
              </h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula.
              </p>
              <a
                href="#"
                className="font-semibold underline underline-offset-8"
              >
                Explore Now
              </a>
            </div>

            <div className="p-6   shadow-lg bg-[#EBBDBD]/20">
              <div className="flex justify-center mb-4">icon </div>
              <h3 className="text-xl font-semibold mb-2">Firm Tax Return</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula.
              </p>
              <Link
                href="#"
                className="font-semibold underline underline-offset-8"
              >
                Explore Now
              </Link>
            </div>

            <div className="p-6  shadow-lg bg-[#F1EFA8]/20">
              <div className="flex justify-center mb-4">icon </div>
              <h3 className="text-xl font-semibold mb-2">Company Tax Return</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                commodo ligula.
              </p>
              <Link
                href="#"
                className="  font-semibold underline underline-offset-8  "
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
