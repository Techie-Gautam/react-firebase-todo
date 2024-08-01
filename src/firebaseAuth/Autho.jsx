import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const Autho = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const extractCurrentDocumen = await getDocs(q);
      const data = extractCurrentDocumen.docs[0].data();
      setUserInfo(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails()
    }
  }, [user, loading])

  return (
    <div>
      <h1>Auth Page</h1>
      {userInfo ? (
        <div>
             <p>username: {userInfo?.name}</p>
        </div>
      ): null}
    </div>
  );
};

export default Autho;
