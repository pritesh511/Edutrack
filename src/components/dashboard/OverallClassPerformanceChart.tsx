"use client";
import React, { useEffect, useState } from "react";
// import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
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
import { useLazyGetStudentsQuery } from "@/redux/query/student";

interface ChartData {
  standard: string;
  student_count: number;
  fill: string;
}

export default function OverallClassPerformanceChart() {
  const [chartData, setChartData] = useState<Array<ChartData>>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({});
  const [trigger, { data }] = useLazyGetStudentsQuery();

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.student_count, 0);
  }, [data, chartData]);

  useEffect(() => {
    trigger({});
  }, []);

  useEffect(() => {
    processStudents();
  }, [data]);

  function processStudents() {
    if (data?.data.students) {
      const counts: any = {};
      const order: any = [];

      data?.data.students.forEach((student) => {
        const stdName = student.standard.standard;
        const key = stdName.toLowerCase().replace(" ", "_");
        if (!counts[key]) {
          counts[key] = 0;
          order.push(key);
        }
        counts[key]++;
      });

      const chartData = order.map((key: string) => ({
        standard: key,
        student_count: counts[key],
        fill: `var(--color-${key})`,
      }));

      const chartConfig: any = {};

      order.forEach((key: string, index: number) => {
        const stdName = key.replace("_", " ").replace("std", "Std");
        chartConfig[key] = {
          label: stdName,
          color: `hsl(var(--chart-${index + 1}))`,
        };
      });

      setChartConfig(chartConfig);
      setChartData(chartData);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Classes Per Student</CardTitle>
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
              dataKey="student_count"
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
                          Students
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
