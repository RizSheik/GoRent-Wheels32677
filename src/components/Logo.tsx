import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/" className="group block">
      <h1
        className={twMerge(
          "text-2xl font-bold uppercase text-lightViolet hover:text-darkViolet transition-colors duration-300 relative",
          className
        )}
      >
        GoRent Wheels
        <span className="absolute w-full h-[2px] bg-darkViolet left-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </h1>
    </Link>
  );
};

export default Logo;