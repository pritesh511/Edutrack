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
import { GoUnverified } from "react-icons/go";
import { IoBookSharp, IoPeople } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { useGetDashboardDataQuery } from "@/redux/query/dashboard";

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

const DashboardTabView = () => {
  const { data } = useGetDashboardDataQuery("");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Total Students</h3>
              <IoPeople style={{ width: 24, height: 24 }} color="#2563eb" />
            </div>
            <p className="text-2xl font-bold mt-2">{data?.students.length}</p>
            <p className="text-green-500 text-sm mt-2">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Subjects</h3>
              <GoUnverified
                style={{ width: 24, height: 24 }}
                color="rgb(34 197 94)"
              />
            </div>
            <p className="text-2xl font-bold mt-2">{data?.subjects.length}</p>
            <p className="text-green-500 text-sm mt-2">95.6% attendance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Teachers</h3>
              <BsPersonWorkspace
                style={{ width: 24, height: 24 }}
                color="rgb(168 85 247)"
              />
            </div>
            <p className="text-2xl font-bold mt-2">{data?.teachers.length}</p>
            <p className="text-purple-500 text-sm mt-2">Full staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500">Classes</h3>
              <IoBookSharp
                style={{ width: 24, height: 24 }}
                color="rgb(239 68 68)"
              />
            </div>
            <p className="text-2xl font-bold mt-2">{data?.standards.length}</p>
            <p className="text-red-500 text-sm mt-2">Active classes</p>
          </CardContent>
        </Card>
      </div>

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
    </div>
  );
};

export default DashboardTabView;
