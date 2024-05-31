import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  // si no existe usuario enviarlo al inicio
  if (!session?.user) {
    redirect("/");
  }
  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
