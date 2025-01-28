"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { standard: "std_4", performance: 100, fill: "var(--color-std_4)" },
  { standard: "std_1", performance: 200, fill: "var(--color-std_1)" },
  { standard: "std_5", performance: 145, fill: "var(--color-std_5)" },
  { standard: "std_6", performance: 160, fill: "var(--color-std_6)" },
  { standard: "std_8", performance: 170, fill: "var(--color-std_8)" },
];

const chartConfig = {
  std_4: {
    label: "Std 4",
    color: "hsl(var(--chart-1))",
  },
  std_1: {
    label: "Std 1",
    color: "hsl(var(--chart-2))",
  },
  std_5: {
    label: "Std 5",
    color: "hsl(var(--chart-3))",
  },
  std_6: {
    label: "Std 6",
    color: "hsl(var(--chart-4))",
  },
  std_8: {
    label: "Std 8",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function OverallClassPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes Overall Performance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <div className="px-6 pb-6">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="standard"
              type="category"
              tickLine={false}
              tickMargin={10}
              className="h-3"
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="performance" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="performance" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
