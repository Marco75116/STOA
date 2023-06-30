import React, { FC, useCallback, useMemo, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { FITokens } from "../../utils/types/swap.types";
import { getFloor } from "../../utils/helpers/global.helper";

const COLORS = ["#394A46", "#F0C9DC", "#FFECF5"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="gray"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={"black"}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={"black"}>
        {payload.value}$
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

type PieChartComponentProps = {
  balancesFi: FITokens;
};

const PieChartComponent: FC<PieChartComponentProps> = ({ balancesFi }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: any) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const holdings = useMemo(() => {
    return [
      {
        name: "USDFI",
        value: getFloor(balancesFi.USDFI, 1),
      },
      {
        name: "ETHFI",
        value: getFloor(balancesFi.ETHFI, 1),
      },
      {
        name: "BTCFI",
        value: getFloor(balancesFi.BTCFI, 1),
      },
    ];
  }, [balancesFi]);

  return (
    <PieChart width={220} height={220}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={holdings}
        cx={105}
        cy={105}
        innerRadius={60}
        outerRadius={105}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {holdings.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
