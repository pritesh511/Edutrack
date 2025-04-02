"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setCurrentUser } from "@/redux/slices/userSlice";
import CustomTextField from "@/components/custom/CustomTextField";
import CustomTextarea from "@/components/custom/CustomTextarea";
import toast from "react-hot-toast";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { schoolProfileSettingSchema } from "@/utils/schema";
import fetch from "@/helpers/axios/axiosInstance";
import CircularProgress from "@/components/common/CircularProgress";

interface AccountSettingForm {
  schoolName: string;
  schoolOwnerName: string;
  email: string;
  mobileNo: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
}

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUserData);
  const [accountSettingForm, setAccountSettingForm] =
    useState<AccountSettingForm>({
      schoolName: "",
      schoolOwnerName: "",
      email: "",
      mobileNo: "",
      address: "",
      city: "",
      district: "",
      pincode: "",
    });
  const [errors, setErrors] = useState<any>({});
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleChangeData = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = event.target;

    setAccountSettingForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetch.get("/api/users/currentUser");
      dispatch(setCurrentUser(response.data.user));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setAccountSettingForm({
        schoolName: currentUser.schoolName,
        schoolOwnerName: currentUser.schoolOwnerName,
        email: currentUser.email,
        mobileNo: currentUser.mobileNo,
        address: currentUser.address,
        city: currentUser.city,
        district: currentUser.district,
        pincode: currentUser.pincode,
      });
    }
  }, [currentUser]);

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await schoolProfileSettingSchema.validate(accountSettingForm, {
        abortEarly: false,
      });
      setIsFormLoading(true);

      const { data } = await fetch.put(
        `/api/users?userId=${currentUser?._id}`,
        accountSettingForm
      );

      toast.success(data.message);
      getCurrentUser();
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        const errors = transformYupErrorsIntoObject(error);
        setErrors(errors);
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center gap-6 mb-8">
        {currentUser && (
          <Avatar className="h-20 w-20">
            <AvatarImage src={"abcd"} />
            <AvatarFallback className="uppercase bg-blue-500 text-white text-2xl">
              {currentUser.schoolName[0]}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <h1 className="text-3xl font-bold">{currentUser?.schoolName}</h1>
          <p className="text-muted-foreground">{currentUser?.role}</p>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Manage your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-semibold">School Name</Label>
                  <p className="text-sm">{currentUser?.schoolName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">School Owner Name</Label>
                  <p className="text-sm">
                    {currentUser?.schoolOwnerName || "---"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Email</Label>
                  <p className="text-sm">{currentUser?.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Phone Number</Label>
                  <p className="text-sm">
                    {`${currentUser?.mobileNo}` || "---"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Address</Label>
                  <p className="text-sm">
                    {`${currentUser?.address}` || "---"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">City</Label>
                  <p className="text-sm">{`${currentUser?.city}` || "---"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">District</Label>
                  <p className="text-sm">
                    {`${currentUser?.district}` || "---"}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Pincode</Label>
                  <p className="text-sm">
                    {`${currentUser?.pincode}` || "---"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your account information and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4" onSubmit={handleSubmitForm}>
                <CustomTextField
                  label="School Name*"
                  fieldName="schoolName"
                  placeholder="School Name"
                  value={accountSettingForm.schoolName}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.schoolName}
                  onClickInput={() => handleClickInput("schoolName")}
                />
                <CustomTextField
                  label="School Owner Name*"
                  fieldName="schoolOwnerName"
                  placeholder="Owner Name"
                  value={accountSettingForm.schoolOwnerName}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.schoolOwnerName}
                  onClickInput={() => handleClickInput("schoolOwnerName")}
                />
                <CustomTextField
                  label="Email*"
                  fieldName="email"
                  placeholder="Email"
                  value={accountSettingForm.email}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.email}
                  onClickInput={() => handleClickInput("email")}
                />
                <CustomTextField
                  label="Mobile No*"
                  fieldName="mobileNo"
                  placeholder="Mobile No"
                  value={accountSettingForm.mobileNo}
                  type="number"
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.mobileNo}
                  onClickInput={() => handleClickInput("mobileNo")}
                />
                <CustomTextarea
                  label="Address*"
                  fieldName="address"
                  value={accountSettingForm.address}
                  handleChange={(event) => handleChangeData(event)}
                  placeholder="Address"
                  error={errors?.address}
                  onClick={() => handleClickInput("address")}
                />
                <CustomTextField
                  label="City*"
                  fieldName="city"
                  placeholder="City"
                  value={accountSettingForm.city}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.city}
                  onClickInput={() => handleClickInput("city")}
                />
                <CustomTextField
                  label="District*"
                  fieldName="district"
                  placeholder="District"
                  value={accountSettingForm.district}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.district}
                  onClickInput={() => handleClickInput("district")}
                />
                <CustomTextField
                  label="Pincode*"
                  fieldName="pincode"
                  placeholder="Pincode Number"
                  value={accountSettingForm.pincode}
                  onChangeInput={(event) => handleChangeData(event)}
                  error={errors?.pincode}
                  onClickInput={() => handleClickInput("pincode")}
                />
                <Button type="submit">
                  {isFormLoading ? <CircularProgress /> : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
