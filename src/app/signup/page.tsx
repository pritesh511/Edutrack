"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CircularProgress from "@/components/common/CircularProgress";
import CustomTextField from "@/components/custom/CustomTextField";
import {
  renderOnConditionBase,
  transformYupErrorsIntoObject,
} from "@/helpers/helper";
import {
  schoolBasicInfoSchema,
  schoolAddressInfoSchema,
  schoolAccountInfoSchema,
} from "@/utils/schema";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import CustomStepper from "@/components/custom/CustomStepper";
import CustomTextarea from "@/components/custom/CustomTextarea";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupForm {
  schoolName: string;
  schoolOwnerName: string;
  email: string;
  mobileNo: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
  password: string;
  confirm_password: string;
}

const SignPage = () => {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState<SignupForm>({
    schoolName: "",
    schoolOwnerName: "",
    email: "",
    mobileNo: "",
    address: "",
    city: "",
    district: "",
    pincode: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChangeData = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = event.target;

    setSchoolData((prev) => ({
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

  const handleSignup = async () => {
    try {
      await schoolAccountInfoSchema.validate(schoolData, { abortEarly: false });

      setLoading(true);
      const postUser = await axios.post("/api/users", schoolData);
      toast.success(postUser.data.message);
      setSchoolData({
        schoolName: "",
        schoolOwnerName: "",
        email: "",
        mobileNo: "",
        address: "",
        city: "",
        district: "",
        pincode: "",
        password: "",
        confirm_password: "",
      });
      router.push("/login");
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        const errors = transformYupErrorsIntoObject(error);
        setErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const schoolBasiInfo = () => {
    return (
      <div className="flex flex-col gap-2">
        <CustomTextField
          label="School Name*"
          fieldName="schoolName"
          placeholder="School Name"
          value={schoolData.schoolName}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.schoolName}
          onClickInput={() => handleClickInput("schoolName")}
        />
        <CustomTextField
          label="School Owner Name*"
          fieldName="schoolOwnerName"
          placeholder="Owner Name"
          value={schoolData.schoolOwnerName}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.schoolOwnerName}
          onClickInput={() => handleClickInput("schoolOwnerName")}
        />
        <CustomTextField
          label="Email*"
          fieldName="email"
          placeholder="Email"
          value={schoolData.email}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.email}
          onClickInput={() => handleClickInput("email")}
        />
        <CustomTextField
          label="Mobile No*"
          fieldName="mobileNo"
          placeholder="Mobile No"
          value={schoolData.mobileNo}
          type="number"
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.mobileNo}
          onClickInput={() => handleClickInput("mobileNo")}
        />
      </div>
    );
  };

  const schoolAddressInfo = () => {
    return (
      <div className="flex flex-col gap-2">
        <CustomTextarea
          label="Address*"
          fieldName="address"
          value={schoolData.address}
          handleChange={(event) => handleChangeData(event)}
          placeholder="Address"
          error={errors?.address}
          onClick={() => handleClickInput("address")}
        />
        <CustomTextField
          label="City*"
          fieldName="city"
          placeholder="City"
          value={schoolData.city}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.city}
          onClickInput={() => handleClickInput("city")}
        />
        <CustomTextField
          label="District*"
          fieldName="district"
          placeholder="District"
          value={schoolData.district}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.district}
          onClickInput={() => handleClickInput("district")}
        />
        <CustomTextField
          label="Pincode*"
          fieldName="pincode"
          placeholder="Pincode Number"
          value={schoolData.pincode}
          onChangeInput={(event) => handleChangeData(event)}
          error={errors?.pincode}
          onClickInput={() => handleClickInput("pincode")}
        />
      </div>
    );
  };

  const schoolAccountInfo = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative">
          <CustomTextField
            label="Password*"
            fieldName="password"
            placeholder="Enter your password"
            value={schoolData.password}
            type={isShowPassword ? "text" : "password"}
            onChangeInput={(event) => handleChangeData(event)}
            error={errors?.password}
            onClickInput={() => handleClickInput("password")}
          />
          <div
            className="absolute right-3 top-9 cursor-pointer p-1"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            {renderOnConditionBase(
              isShowPassword,
              <FaEye className="opacity-25" />,
              <FaEyeSlash className="opacity-25" />
            )}
          </div>
        </div>
        <div className="relative">
          <CustomTextField
            label="Confirm Password*"
            fieldName="confirm_password"
            placeholder="Enter Confirm password"
            value={schoolData.confirm_password}
            type={isShowConfirmPassword ? "text" : "password"}
            onChangeInput={(event) => handleChangeData(event)}
            error={errors?.confirm_password}
            onClickInput={() => handleClickInput("confirm_password")}
          />
          <div
            className="absolute right-3 top-9 cursor-pointer p-1"
            onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
          >
            {renderOnConditionBase(
              isShowConfirmPassword,
              <FaEye className="opacity-25" />,
              <FaEyeSlash className="opacity-25" />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return schoolBasiInfo();
      case 2:
        return schoolAddressInfo();
      case 3:
        return schoolAccountInfo();
    }
  };

  const hanndleNextStep = async () => {
    let schema;
    if (currentStep == 1) {
      schema = schoolBasicInfoSchema;
    } else if (currentStep === 2) {
      schema = schoolAddressInfoSchema;
    } else {
      schema = schoolAccountInfoSchema;
    }
    try {
      await schema?.validate(schoolData, { abortEarly: false });

      setCurrentStep((prevStep) => prevStep + 1);
    } catch (error: any) {
      const errors = transformYupErrorsIntoObject(error);
      console.log(errors);
      setErrors(errors);
    }
  };

  const handleBackStep = () => {
    setErrors({});
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      <div className="md:block hidden w-full max-h-screen">
        <Image
          src={"/assets/authImage.jpg"}
          alt="auth-image"
          className="h-full w-full"
          objectFit="cover"
          width={400}
          height={400}
        />
      </div>
      <div className="flex w-full items-center justify-center p-8 overflow-auto max-h-screen">
        <div className="flex flex-col items-center justify-between w-full max-w-lg">
          <CustomStepper
            totalSteps={3}
            currentStep={currentStep}
            className="mb-4"
          />
          <Card className="w-full p-4 shadow-lg">
            <CardHeader className="p-0 text-xl text-center font-semibold">
              {currentStep == 1 && "School Basic Info"}
              {currentStep == 2 && "School Address Info"}
              {currentStep == 3 && "School Account Info"}
            </CardHeader>
            <CardContent className="p-4">{renderStepContent()}</CardContent>
            <CardFooter className="flex flex-col p-4 pt-0">
              <div className="w-full flex justify-end items-center gap-2">
                {currentStep > 1 && (
                  <Button variant={"outline"} onClick={() => handleBackStep()}>
                    Back
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button onClick={() => hanndleNextStep()}>Next</Button>
                )}
                {currentStep == 3 && (
                  <Button onClick={handleSignup} disabled={loading}>
                    {loading ? <CircularProgress /> : "Submit"}
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Already have an account?
                <Link href="/login" className="text-blue-600 underline ml-1">
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
