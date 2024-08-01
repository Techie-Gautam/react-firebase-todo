import React, { useState } from "react";
import UnAuth from "./UnAuth";
import Autho from "./Autho";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Index = () => {
  const [user, loading, error ] = useAuthState(auth);

  const content = loading ? (
    <h1>Loading... Please Wait!</h1>
  ) : user ? (
    <Autho />
  ) : (
    <div>
      <UnAuth />
    </div>
  )

  return (
    <div>
      <h1>Firebase Auth</h1>
      {content}
    </div>
  );
};

export default Index;
