"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const attendanceData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Attendance Rate",
      data: [95, 93, 96, 94, 95],
      borderColor: "#2563eb",
      tension: 0.3,
    },
  ],
};

const performanceData = {
  labels: ["Science", "Math", "English", "History", "Arts"],
  datasets: [
    {
      label: "Average Score",
      data: [85, 78, 82, 88, 90],
      backgroundColor: "#2563eb",
    },
  ],
};

const DashboardChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={attendanceData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={performanceData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardChart;
