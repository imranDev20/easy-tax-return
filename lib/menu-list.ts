import {
  Cog,
  LayoutGrid,
  ShoppingCart,
  Users
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          active: pathname === "/admin",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },

    {
      groupLabel: "Management",
      menus: [
        {
          href: "/tax-return",
          label: "Tax Return",
          active: pathname.includes("/tax-return"),
          icon: ShoppingCart,
          submenus: [],
        },
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
       
      ],
    },

    {
      groupLabel: "Configuration",
      menus: [
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Cog,
          submenus: [],
        },
      ],
    },
  ];
}
