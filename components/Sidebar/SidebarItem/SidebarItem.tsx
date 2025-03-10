"use client";
import React, { forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useGlobalContext } from "@/Context/GlobalProvider";

interface Props {
  image: StaticImageData;
  name: string;
}

const SidebarItem = forwardRef<HTMLDivElement, Props>(
  ({ name, image }, ref) => {
    const { menu, setMenu } = useGlobalContext();

    const handleClick = () => {
      setMenu(name);
    };

    return (
      <div
        ref={ref}
        data-name={name}
        className={`relative px-2 py-4 w-full flex items-center gap-2 cursor-pointer transition-all duration-300 ${
          menu === name ? "text-gray-800" : "text-gray-400"
        }`}
        onClick={handleClick}
      >
        <Image
          src={image}
          alt="icon"
          width={35}
          height={35}
          className="object-cover"
        />
        <p className="lg:flex hidden font-poppins font-medium text-sm">
          {name}
        </p>
      </div>
    );
  }
);

SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
