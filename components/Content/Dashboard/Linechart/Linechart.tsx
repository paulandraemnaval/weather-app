"use client";

import {
  Line,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,
} from "recharts";

interface LineChartProps {
  data: { hour: string; value: number }[];
  unit: string;
}

const CustomTooltip = ({
  payload,
  unit,
}: {
  active?: boolean;
  payload?: any[];
  unit?: string;
}) => {
  if (payload && payload.length) {
    const { hour, value } = payload[0].payload;
    return (
      <div className="bg-white p-2 rounded shadow-md border border-gray-300 text-gray-700 text-sm">
        <strong>{hour}</strong>: {value} {unit}
      </div>
    );
  }
  return null;
};

const LineChartComponent = ({ data, unit }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDFDFD" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#FDFDFD" stopOpacity={0} />
          </linearGradient>
        </defs>

        <Tooltip content={<CustomTooltip unit={unit} />} />

        <YAxis
          domain={[
            (dataMin: number) => Math.min(dataMin),
            (dataMax: number) => Math.ceil(dataMax),
          ]}
          tick={{ fill: "#000000", fontSize: 12 }}
          tickFormatter={(value) => `${value} ${unit}`}
          hide={true}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#FCFCF7"
          strokeWidth={3}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#FCFCF7"
          fill="url(#temperatureGradient)"
          baseValue={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
