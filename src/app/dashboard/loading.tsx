import React from "react";
import LoadingImg from "/public/assets/loading.gif";
import Image from "next/image";

const DashboardLoading = () => {
  return (
    <div className="flex flex-row items-center justify-center">
      <Image
        src={LoadingImg}
        className="mx-auto"
        alt="LoadingImg"
        width={100}
        height={100}
        objectFit="cover"
      />
    </div>
  );
};

export default DashboardLoading;
