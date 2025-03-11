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

const MobileAlert: React.FC<Props> = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  const mostSevereAlert = alerts.reduce(
    (prev, current) =>
      severityLevels[current.severity] > severityLevels[prev.severity]
        ? current
        : prev,
    alerts[0]
  );

  const isSevere = severityLevels[mostSevereAlert.severity] >= 3;
  const bgColor = isSevere
    ? "bg-red-600 text-white"
    : "bg-yellow-500 text-gray-900";
  const borderColor = isSevere ? "border-red-800" : "border-yellow-700";

  return (
    <div
      className={` p-3 border-l-4 ${borderColor} rounded-md shadow-md ${bgColor} flex items-start gap-3 animate-slide-up h-fit w-fit sm:hidden`}
    >
      {isSevere ? <ShieldAlert size={20} /> : <AlertTriangle size={20} />}

      <div className="flex-1">
        <h2 className="text-sm font-bold">{mostSevereAlert.event}</h2>
      </div>
    </div>
  );
};

export default MobileAlert;
