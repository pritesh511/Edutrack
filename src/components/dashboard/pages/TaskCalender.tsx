"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Calendar, SlotInfo, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomTextField from "@/components/common/CustomTextField";
import {
  useDeleteEventMutation,
  useGetEventsQuery,
  usePostEventMutation,
} from "@/redux/query/calender";
import toast from "react-hot-toast";
import { transformYupErrorsIntoObject } from "@/helpers/helper";
import { eventSchema } from "@/utils/schema";
import { CalenderEvent } from "@/utils/types";
import CircularProgress from "@/components/common/CircularProgress";
import { addEvent } from "@/actions/calenderEvent";
import ServerCustomTextField from "@/components/common/ServerCustomTextField";

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { data } = useGetEventsQuery("");
  const [postEvent, { isLoading }] = usePostEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  // const [state, formAction, pending] = useActionState(addEvent, null);

  // console.log(state, pending);

  // useEffect(() => {
  //   if (state?.validationErrors) {
  //     setErrors(state?.validationErrors);
  //   } else if (state?.error) {
  //     toast.error(state.error);
  //   }

  //   console.log(state);
  // }, [state]);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({ ...newEvent, start: slotInfo.start, end: slotInfo.end });
    setIsDialogOpen(true);
  };

  const handleAddEvent = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      await eventSchema.validate(newEvent, { abortEarly: false });
      const { data, error } = await postEvent(newEvent);
      if (error) {
        toast.error((error as any)?.data.message);
      } else {
        toast.success(data.message);
        setNewEvent({ title: "", start: new Date(), end: new Date() });
        setIsDialogOpen(false);
      }
    } catch (validationsErrors: any) {
      if (validationsErrors.response?.data?.message) {
        toast.error(validationsErrors.response?.data?.message);
      } else {
        const errors = transformYupErrorsIntoObject(validationsErrors);
        setErrors(errors);
      }
    }
  };

  const handleDeleteEvent = async (event: CalenderEvent) => {
    try {
      const { data, error } = await deleteEvent(event._id);
      if (error) {
        toast.error((error as any)?.data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCloseEventModal = () => {
    setIsDialogOpen(false);
    setNewEvent({ title: "", start: new Date(), end: new Date() });
    setIsDialogOpen(false);
  };

  const handleClickInput = (name: string) => {
    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="h-full p-4">
      <Calendar
        localizer={localizer}
        events={data?.events}
        onSelectEvent={(event) => handleDeleteEvent(event)}
        onSelectSlot={handleSelectSlot}
        selectable
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 120px)" }}
        popup
      />

      {/* Dialog for Adding Events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleAddEvent}>
            <CustomTextField
              fieldName={"title"}
              label="Event Title"
              placeholder="Enter event title"
              value={newEvent.title}
              error={errors?.title}
              onChangeInput={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              onClickInput={() => handleClickInput("title")}
            />
            {/* <ServerCustomTextField
              label="Titke"
              fieldName="title"
              error={errors?.title}
              placeholder={"Enter event title"}
              onClickInput={() => handleClickInput("title")}
            /> */}
            <div className="flex justify-end space-x-2">
              <Button
                disabled={isLoading}
                variant="secondary"
                onClick={() => handleCloseEventModal()}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                // onClick={handleAddEvent}
                type="submit"
              >
                {isLoading ? <CircularProgress /> : "Add Event"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskCalendar;
