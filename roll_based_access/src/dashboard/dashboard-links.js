import { ROLE_TYPE } from "../utils/RoleType";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/user",
    type: ROLE_TYPE.user,
    icon: "VscDashboard",
  },
];
