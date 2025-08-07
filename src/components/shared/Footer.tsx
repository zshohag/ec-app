"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-4 mb-2 ">
            <Link href="/" className="flex items-center gap-2">
              {/* Logo Image */}

              <div className="h-10 w-auto flex-shrink-0">
                <Image
                  src="/images/updateLogo.png"
                  alt="MOSHIUR TAMIM LLC"
                  width={150}
                  height={60}
                  className="h-full w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>
          <p className="text-sm">
            Your one-stop destination for the latest premium products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Email: info@moshiurtamim.com</li>
            <li>Phone: +1 (808) 720-6730</li>
            <li>Location: Honolulu, HI</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Moshiur Tamim LLC. All rights reserved.
      </div>
    </footer>
  );
}
