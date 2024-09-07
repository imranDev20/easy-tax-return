import Link from "next/link";
import { FaFacebookSquare, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 pt-20 pb-10 border-t">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-blue-600">LOGO</h2>
          <p className="text-sm  w-72">
            Tax services that are customized to enhance your financial strategy
            and minimize tax liabilities. Trust us for tax preparation,
            planning, and filing needs to thrive in today&apos;s competitive
            market.
          </p>
          <div className="flex space-x-4 text-blue-600">
            <Link href="#">
              <FaFacebookSquare />
            </Link>
            <Link href="#">
              <FaLinkedinIn />
            </Link>
            <Link href="#">
              <FaYoutube />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-lg">Office</h4>
            <p className="text-sm">
              House # 276, Lane # 04
              <br />
              DOHS Baridhara, Dhaka-1206
              <br />
              Bangladesh
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Working Hours</h4>
            <p className="text-sm">
              Sun-Thu: 9 AM - 6 PM
              <br />
              Saturday: 9 AM - 4 PM
              <br />
              Friday: Closed
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Contact</h4>
            <p className="text-sm">
              support@etaxreturn.com.bd
              <br />
              +8801788994070
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Individual Tax Return</h4>
            <p className="text-sm">
              (2024 - 2025)
              <br />
              (2023 - 2024)
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Firm Tax Return</h4>
            <p className="text-sm">
              (2024 - 2025)
              <br />
              (2023 - 2024)
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg">Company Tax Return</h4>
            <p className="text-sm">
              (2024 - 2025)
              <br />
              (2023 - 2024)
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2   mt-10 pt-6 pl-20  text-sm text-gray-500">
        Copyright ©2024 eTaxReturn.com.bd All rights reserved
      </div>
    </footer>
  );
}
