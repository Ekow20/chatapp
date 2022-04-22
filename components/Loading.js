import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <CircularProgress />
      <h2 className="mt-2 text-2xl animate-ping"></h2>
    </div>
  );
};

export default Loading;
