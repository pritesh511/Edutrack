"use client";
import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import CircularProgress from "../common/CircularProgress";
import CustomTextField from "../common/CustomTextField";
import CustomTextarea from "../common/CustomTextarea";
import { contactUsSchema } from "@/utils/schema";
import { transformYupErrorsIntoObject } from "@/helpers/helper";

const ContactUs = () => {
  const [isThankYouShow, setIsThankYouShow] = useState(false);
  const [contactusForm, setContactusForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleSetContactUsForm = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setContactusForm({
      ...contactusForm,
      [name]: value,
    });
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: any, _formData: any) => {
      try {
        await contactUsSchema.validate(contactusForm, { abortEarly: false });

        const response = await axios.post(
          "/api/users/contactUs",
          contactusForm
        );
        if (response.data.message.accepted) {
          setIsThankYouShow(true);
        }
      } catch (validationsErrors: any) {
        if (validationsErrors.response?.data.message) {
          toast.error(validationsErrors.response.data.message);
        } else {
          const errors = transformYupErrorsIntoObject(validationsErrors);
          setErrors(errors);
        }
      }
    },
    null
  );

  if (isThankYouShow) {
    return (
      <div className="mx-auto my-12 text-center max-w-96 p-6 bg-green-500 text-white rounded-lg">
        Thank you for your intresting in our tool. <br /> Our Management will
        contact you soon.
      </div>
    );
  } else {
    return (
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <Card className="max-w-xl mx-auto">
            <CardHeader className="text-center">
              <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
            </CardHeader>
            <CardContent>
              <form action={submitAction} className="space-y-4">
                <CustomTextField
                  label="Name*"
                  fieldName="name"
                  placeholder="Enter your name"
                  value={contactusForm.name}
                  onChangeInput={(event) => handleSetContactUsForm(event)}
                  error={errors?.name}
                  onClickInput={() => handleClickInput("name")}
                />
                <CustomTextField
                  label="Email*"
                  fieldName="email"
                  placeholder="Enter your email"
                  value={contactusForm.email}
                  onChangeInput={(event) => handleSetContactUsForm(event)}
                  error={errors?.email}
                  onClickInput={() => handleClickInput("email")}
                />
                <CustomTextarea
                  label="Message*"
                  value={contactusForm.message}
                  handleChange={(event) => handleSetContactUsForm(event)}
                  placeholder={"Please enter message"}
                  fieldName={"message"}
                  error={errors?.message}
                  onClick={() => handleClickInput("message")}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                >
                  {isPending ? <CircularProgress /> : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
};

export default ContactUs;
