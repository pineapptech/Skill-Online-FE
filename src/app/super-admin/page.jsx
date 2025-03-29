import { redirect } from "next/navigation";

const SuperAdminDefaultPage = () => {
  redirect("/super-admin/single-users");
};

export default SuperAdminDefaultPage;
