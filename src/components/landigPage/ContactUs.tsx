"use client";
import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import CircularProgress from "../common/CircularProgress";

const ContactUs = () => {
  const [isThankYouShow, setIsThankYouShow] = useState(false);
  const [contactusForm, setContactusForm] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const [error, submitAction, isPending] = useActionState(
    async (_previousState: any, _formData: any) => {
      try {
        const { email, message, name } = contactusForm;
        if (email && message && name) {
          const response = await axios.post(
            "/api/users/contactUs",
            contactusForm
          );
          if (response.data.message.accepted) {
            setIsThankYouShow(true);
          }
        } else {
          toast.error("Please fill required data");
        }
      } catch (error: any) {
        toast.error(error.message);
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
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    name="name"
                    onChange={handleSetContactUsForm}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    onChange={handleSetContactUsForm}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    name="message"
                    onChange={handleSetContactUsForm}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
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
