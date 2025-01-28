"use client";
import React from "react";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Label, Pie, PieChart } from "recharts";

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
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.performance, 0);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes Overall Performance</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <div className="px-6 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="performance"
              nameKey="standard"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Performance
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
