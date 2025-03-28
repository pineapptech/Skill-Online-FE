import { redirect } from "next/navigation";

const SuperAdminDefaultPage = () => {
  redirect("/super-admin/view-users");
};

export default SuperAdminDefaultPage;
