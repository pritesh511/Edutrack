"use client";
import DynamicForm, {
  FormFieldConfig,
} from "@/components/common/form/CommonForm";
import Loader from "@/components/common/common/Loader";
import NoDataFound from "@/components/common/common/NoDataFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { renderOnConditionBase } from "@/helpers/helper";
import React from "react";

const formConfig: FormFieldConfig[] = [
  {
    id: "name",
    name: "name",
    label: "Full Name",
    type: "string",
    validate: true,
    placeholder: "Enter your name",
    errorMessage: "Name is required",
  },
  {
    id: "age",
    name: "age",
    label: "Age",
    type: "number",
    validate: true,
    placeholder: "Enter your age",
    errorMessage: "Age is required",
  },
  {
    id: "bio",
    name: "bio",
    label: "Biography",
    type: "textarea",
    validate: true,
    placeholder: "Tell us about yourself",
    errorMessage: "Bio is required",
  },
  {
    id: "country",
    name: "country",
    label: "Country",
    type: "select",
    validate: true,
    placeholder: "Select your country",
    errorMessage: "Country is required",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
    ],
  },
  {
    id: "subscribe",
    name: "subscribe",
    label: "Subscribe to newsletter",
    type: "checkbox",
  },
  {
    id: "experiences",
    name: "experiences",
    label: "Work Experiences",
    type: "array",
    validate: true,
    subfields: [
      {
        id: "company",
        name: "company",
        label: "Company Name",
        type: "string",
        validate: true,
        errorMessage: "Company name is required",
      },
      {
        id: "years",
        name: "years",
        label: "Years of Experience",
        type: "number",
        validate: true,
        errorMessage: "Years is required",
      },
    ],
  },
];

const Competition = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Competition</h1>
          <Button size={"lg"}>Add Competition</Button>
        </div>
        <div className="flex flex-col gap-4">
          {renderOnConditionBase(
            false,
            <Loader />,
            <>
              {renderOnConditionBase(
                false,
                <NoDataFound />,
                <>
                  {/* {data?.groups.map((group) => (
                    <Link
                      href={`/dashboard/chat/${group._id}`}
                      key={group._id}
                      className="p-4 border rounded-lg shadow-sm transition duration-300 flex flex-row items-center justify-between hover:shadow-md"
                    >
                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {group.groupName}
                        </h2>
                        <div className="mt-4">
                          <AvatarGroup users={getAvtarprops(group.members)} />
                        </div>
                      </div>
                      {renderOnConditionBase(
                        currentUser?.role === "admin",
                        <div className="flex flex-row gap-2">
                          <Button
                            size={"icon"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsEditGroup(group);
                              setIsOpen(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size={"icon"}
                            variant="destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteGroup(group._id);
                            }}
                          >
                            <MdDelete />
                          </Button>
                        </div>,
                        <></>
                      )}
                    </Link>
                  ))} */}
                  <h1>HEllo</h1>
                </>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Competition;
