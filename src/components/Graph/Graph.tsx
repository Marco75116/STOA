import React, { PureComponent } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 200000,
    pv: 200000,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 250000,
    pv: 280000,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 300000,
    pv: 330000,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 400000,
    pv: 480000,
    amt: 2000,
  },
  {
    name: "May",
    uv: 400000,
    pv: 480000,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 422000,
    pv: 440000,
    amt: 2500,
  },
  {
    name: "Aug",
    uv: 422000,
    pv: 440000,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 422000,
    pv: 440000,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 420000,
    pv: 440000,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 422000,
    pv: 440000,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 422000,
    pv: 440000,
    amt: 2100,
  },
];

export default class Graph extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={"100%"} height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis ticks={[200000, 400000, 600000, 800000]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
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
  }
}
