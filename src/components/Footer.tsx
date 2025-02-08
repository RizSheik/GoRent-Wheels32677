"use client";

import React from "react";
import Container from "./Container";
import { footerData } from "@/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-bgLight py-5">
      <Container className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {footerData.map((section) => (
          <div key={section._id}>
            <h3 className="text-darkViolet/90 text-lg font-semibold mb-3">
              {section.title}
            </h3>
            <div className="flex flex-col gap-0.5">
              {section.listItem?.[0]?.listData?.map((link) => (
                <Link
                  href="/"
                  key={link}
                  className="py-1 text-black font-medium hover:text-darkViolet duration-300 ease-in-out"
                >
                  {link}
                </Link>
              )) || (
                <p className="text-gray-500">No links available</p>
              )}
            </div>
          </div>
        ))}
      </Container>
      <div className="text-center text-sm text-gray-500 mt-5">
        &copy; {new Date().getFullYear()} GoRent Wheels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;