import React, { FC } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { HistoryYiedAsset } from "../../utils/types/swap.types";

type GraphProps = {
  historyData?: HistoryYiedAsset[];
};

const GraphTooltip = ({ active, payload }: any) => {
  if (!active) return null;
  if (!payload) return null;
  if (payload[0] === undefined) return null;

  return (
    <div className=" rounded bg-bgCardNavbar p-2 text-black">
      <div>Day : {payload[0].payload.day}</div>
      <div>Amount : {Number(payload[0].payload.amount).toFixed(9)}</div>
    </div>
  );
};

const Graph: FC<GraphProps> = ({ historyData }) => {
  return (
    <ResponsiveContainer width={"100%"} height={200}>
      <AreaChart data={historyData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F0C9DC" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#F0C9DC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip content={<GraphTooltip />} />
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontal={true}
        />
        <XAxis dataKey="day" />
        <YAxis ticks={[]} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#F0C9DC"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Graph;
