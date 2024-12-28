import React from "react";

interface Props {
  params: {
    id: string | number;
  };
}

const Student = (props: any) => {
  const { params } = props;
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <p className="text-3xl">Student with id - {params.id} </p>
    </div>
  );
};

export default Student;
