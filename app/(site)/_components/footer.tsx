import Link from "next/link";
import { FaFacebookSquare, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 pt-10 pb-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold text-blue-600">LOGO</h2>
            <p className="text-sm max-w-xs md:max-w-sm">
              Tax services that are customized to enhance your financial
              strategy and minimize tax liabilities. Trust us for tax
              preparation, planning, and filing needs to thrive in today&apos;s
              competitive market.
            </p>
            <div className="flex space-x-4 text-blue-600">
              <Link href="#" aria-label="Facebook">
                <FaFacebookSquare size={24} />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <FaLinkedinIn size={24} />
              </Link>
              <Link href="#" aria-label="YouTube">
                <FaYoutube size={24} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-lg mb-2">Office</h4>
              <p className="text-sm">
                House # 276, Lane # 04
                <br />
                DOHS Baridhara, Dhaka-1206
                <br />
                Bangladesh
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Working Hours</h4>
              <p className="text-sm">
                Sun-Thu: 9 AM - 6 PM
                <br />
                Saturday: 9 AM - 4 PM
                <br />
                Friday: Closed
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">Contact</h4>
              <p className="text-sm">
                support@etaxreturn.com.bd
                <br />
                +8801788994070
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-2">
                Individual Tax Return
              </h4>
              <p className="text-sm">
                (2024 - 2025)
                <br />
                (2023 - 2024)
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Firm Tax Return</h4>
              <p className="text-sm">
                (2024 - 2025)
                <br />
                (2023 - 2024)
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Company Tax Return</h4>
              <p className="text-sm">
                (2024 - 2025)
                <br />
                (2023 - 2024)
              </p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-sm text-gray-500 text-center">
          Copyright ©2024 eTaxReturn.com.bd All rights reserved
        </div>
      </div>
    </footer>
  );
}
