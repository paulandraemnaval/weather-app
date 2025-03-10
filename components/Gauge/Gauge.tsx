import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

interface TooltipInfo {
  label: string;
  description: (value: number) => string;
}

interface CircularGaugeProps {
  value: number;
  max?: number;
  min?: number;
  color?: string;
  icon: StaticImageData;
  tooltipInfo: TooltipInfo;
  title: string;
}

const CircularGauge = ({
  value,
  max = 100,
  min = 0,
  color = "#3498db",
  icon,
  tooltipInfo,
  title,
}: CircularGaugeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const progress = ((normalizedValue - min) / (max - min)) * circumference;

  return (
    <div className="flex items-center justify-center flex-col ">
      <div
        className="relative flex items-center justify-center w-[80px] h-[80px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg className="absolute w-full h-full " viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="rgba(224, 224, 224, 0.3)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={Number(circumference - progress) || undefined}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className="transition-all duration-500 ease-out "
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image src={icon} alt="icon" width={30} height={30} />
        </div>

        {isHovered && (
          <div className="absolute lg:block hidden w-[200px] lg:right-[110%] lg:bottom-0 bg-white border-white/10 border backdrop-blur-lg text-slate-700 text-sm p-2 rounded-md shadow-lg z-50">
            <p className="font-semibold">{tooltipInfo.label}</p>
            <p className="text-xs mt-1">
              {tooltipInfo.description(normalizedValue)}
            </p>
          </div>
        )}
      </div>
      <p className="text-center lg:hidden flex text-white text-sm font-semibold">
        {title}
      </p>
    </div>
  );
};

export default CircularGauge;
