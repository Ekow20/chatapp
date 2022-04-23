import React from "react";
import { Button } from "@material-ui/core";
import Head from "next/head";

const Login = ({ signIn }) => {
  return (
    <div className="bg-sky-200 flex justify-center items-center h-screen ">
      <Head>
        <title>Login</title>
      </Head>
      <div
        className=" bg-slate-50 w-[90vw] sm:w-3/5 h-3/5 shadow-lg flex 
      flex-col justify-center items-center "
      >
        <h2 className="text-5xl mb-6 text-gray-900">G - Chat</h2>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            signIn();
          }}
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
