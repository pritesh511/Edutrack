"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GoUnverified } from "react-icons/go";
import { IoBookSharp, IoPeople } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { useGetDashboardDataQuery } from "@/redux/query/dashboard";
import DashboardChart from "../DashboardChart";
import { useGetEventsQuery } from "@/redux/query/calender";
import CustomTableHead from "@/components/common/custom/CustomTableHead";
import { renderOnConditionBase } from "@/helpers/helper";
import CustomTableRow from "@/components/common/custom/CustomTableRow";
import CustomTableCell from "@/components/common/custom/CustomTableCell";
import { Loader } from "lucide-react";
import moment from "moment";
import CustomTable from "@/components/common/custom/CustomTable";
import OverallClassPerformanceChart from "../OverallClassPerformanceChart";
import { fetchDashboardData } from "@/actions/calenderEvent";

const DashboardTabView = () => {
  // const dashboardData = fetchDashboardData();
  // console.log(dashboardData);
  const { data } = useGetDashboardDataQuery("");
  const { data: eventData, isLoading } = useGetEventsQuery("");

  const EventTableHeader = () => {
    const headers = ["Name", "Start", "End"];
    return (
      <>
        {headers.map((head) => (
          <CustomTableHead key={head} headeName={head} size="sm" />
        ))}
      </>
    );
  };

  const EventTableBody = () => {
    return (
      <>
        {renderOnConditionBase(
          isLoading,
          <CustomTableRow>
            <CustomTableCell
              colSpan={7}
              cellName={<Loader />}
              className="text-center text-lg font-semibold"
            />
          </CustomTableRow>,
          <>
            {renderOnConditionBase(
              eventData?.events?.length == 0,
              <CustomTableRow>
                <CustomTableCell
                  colSpan={7}
                  cellName={"No Data Found"}
                  className="text-center text-lg font-semibold"
                />
              </CustomTableRow>,
              <>
                {eventData?.events?.map((event) => {
                  return (
                    <CustomTableRow key={event.title}>
                      <CustomTableCell cellName={event.title} size="sm" />
                      <CustomTableCell
                        cellName={moment(event.start).format("DD/MM/YYYY")}
                      />
                      <CustomTableCell
                        cellName={moment(event.end).format("DD/MM/YYYY")}
                      />
                    </CustomTableRow>
                  );
                })}
              </>
            )}
          </>
        )}
      </>
    );
  };

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
            <p className="text-green-500 text-sm mt-2">
              Total number of students
            </p>
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
            <p className="text-green-500 text-sm mt-2">
              Total number of subjects
            </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <CardTitle className="mb-4">Classes Per Student</CardTitle>
            <CustomTable
              tableHeader={<EventTableHeader />}
              tableBody={<EventTableBody />}
            />
          </CardContent>
        </Card>
        <OverallClassPerformanceChart />
      </div>
      <DashboardChart />
    </div>
  );
};

export default DashboardTabView;
