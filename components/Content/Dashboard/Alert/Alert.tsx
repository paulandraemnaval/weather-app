import React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";

type Alert = {
  headline: string;
  severity: string;
  urgency: string;
  areas: string;
  event: string;
  instruction: string;
};

type Props = {
  alerts: Alert[];
};

const severityLevels: Record<string, number> = {
  Extreme: 4,
  Severe: 3,
  Moderate: 2,
  Minor: 1,
};

const WeatherAlert: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const mostSevereAlert = alerts.reduce(
    (prev, current) =>
      severityLevels[current.severity] > severityLevels[prev.severity]
        ? current
        : prev,
    alerts[0]
  );

  // Set colors based on severity
  const isSevere = severityLevels[mostSevereAlert.severity] >= 3;
  const bgColor = isSevere
    ? "bg-red-500 text-white"
    : "bg-yellow-500 text-gray-900";
  const borderColor = isSevere ? "border-red-700" : "border-yellow-700";

  return (
    <div
      className={`sm:flex hidden  w-fit  p-4 border-l-8 ${borderColor} rounded-md shadow-lg ${bgColor} flex-col`}
    >
      <div className="flex items-center gap-3">
        {isSevere ? <ShieldAlert size={28} /> : <AlertTriangle size={28} />}
        <h2 className="text-lg font-bold">{mostSevereAlert.event}</h2>
      </div>
    </div>
  );
};

export default WeatherAlert;
