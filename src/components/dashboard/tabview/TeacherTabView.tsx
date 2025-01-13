import Loader from "@/components/common/Loader";
import NoDataFound from "@/components/common/NoDataFound";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { renderOnConditionBase } from "@/helpers/helper";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import React, { useCallback, useState } from "react";
import AddTeacherDialog from "../dialogs/AddTeacherDialog";

const TeacherTabView = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Teachers</h1>
          <Button size={"lg"} onClick={() => setOpenModal(true)}>
            Add Teacher
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {renderOnConditionBase(
            false,
            <Loader />,
            <>
              {renderOnConditionBase(
                false,
                <NoDataFound />,
                <Card>
                  <CardContent className="p-6 flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center">
                      <Avatar className="h-[80px] w-[80px] rounded-md">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 flex flex-col gap-2">
                        <h4 className="text-xl font-semibold">
                          Pritesh Makasana
                        </h4>
                        <ul className="flex flex-row gap-4">
                          <li className="flex flex-row gap-2 items-center">
                            <h5 className="font-semibold">Graduation:</h5>
                            <div className="flex flex-row gap-2">
                              <Badge variant={"outline"}>M.COM</Badge>
                              <Badge variant={"outline"}>B.ED</Badge>
                            </div>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <h5 className="font-semibold">Subject:</h5>
                            <div className="flex flex-row gap-2">
                              <Badge variant={"outline"}>Hindi</Badge>
                              <Badge variant={"outline"}>English</Badge>
                              <Badge variant={"outline"}>Gujarati</Badge>
                            </div>
                          </li>
                          <li className="flex flex-row gap-2 items-center">
                            <h5 className="font-semibold">Total Experience:</h5>
                            <p className="text-gray-600">3 Year</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-row gap-2">
                      <Button size={"icon"}>
                        <FaEdit />
                      </Button>
                      <Button size={"icon"}>
                        <MdDelete />
                      </Button>
                      <Button size={"icon"}>
                        <IoEye />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </CardContent>
      <AddTeacherDialog open={openModal} onClose={handleCloseModal} />
    </Card>
  );
};

export default TeacherTabView;
