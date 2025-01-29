"use client";
import React from "react";

interface Props {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

const CustomStepper = (props: Props) => {
  const { totalSteps, currentStep, className } = props;
  return (
    <div
      className={`flex items-center justify-between w-full px-2 ` + className}
    >
      {Array(totalSteps)
        .fill(1)
        .map((step, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className={`h-7 w-7 rounded-full  flex items-center justify-center text-sm ${
                  step + index <= currentStep
                    ? "bg-primary text-white"
                    : "bg-white shadow-md text-gray-600"
                }`}
              >
                {step + index}
              </div>
              {totalSteps > step + index && (
                <div
                  className={`flex-1 h-[2px] mx-2 ${
                    step + index < currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default CustomStepper;
