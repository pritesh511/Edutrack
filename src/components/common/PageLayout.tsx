import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { renderOnConditionBase } from "@/helpers/helper";
import Loader from "./Loader";
import NoDataFound from "./NoDataFound";

interface Props {
  headerTitle: string;
  headerButtonText: string;
  onButtonClick: () => void;
  isDataLoading: boolean;
  isNoData: boolean;
  children: React.ReactNode;
}

const PageLayout = (props: Props) => {
  const {
    onButtonClick,
    headerTitle,
    isDataLoading,
    headerButtonText,
    isNoData,
    children,
  } = props;
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{headerTitle}</h1>
          <Button onClick={onButtonClick} size={"lg"}>
            {headerButtonText}
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {renderOnConditionBase(
            isDataLoading,
            <Loader />,
            <>
              {renderOnConditionBase(
                isNoData,
                <NoDataFound />,
                <>{children}</>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageLayout;
