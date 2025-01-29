"use client";
import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { getUserData } from "@/redux/slices/userSlice";

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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue={currentUser?.schoolName}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={currentUser?.email}
                    disabled={true}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    defaultValue="+91 8200309139"
                    disabled={true}
                  />
                </div>
                <Button type="submit" disabled={true}>
                  Save Changes
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
