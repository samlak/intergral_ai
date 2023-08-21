import {
  Home,
  UserCog
} from "lucide-react"

const menuLinks = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: <Home className="mr-2 h-4 w-4" />
  },
  {
    name: "Profile",
    url: "/profile",
    icon: <UserCog className="mr-2 h-4 w-4" />
  },
];

export default menuLinks;