import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  // Authentication
  const auth = await onAuthenticateUser();
  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 403 || auth.status === 500) {
    return redirect(`/auth/sign-in`);
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
