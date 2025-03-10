import React from "react";
import icons from "@/constants/icons";
import Image from "next/image";

const SidebarHeader = () => {
  return (
    <div className=" w-fit justify-center flex  ">
      <Image
        src={icons.logosmall}
        alt="logo"
        width={50}
        height={50}
        className="object-scale-down  flex"
      />
    </div>
  );
};

export default SidebarHeader;
