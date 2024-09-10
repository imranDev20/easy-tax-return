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
          href: "/tax-returns",
          label: "Tax Returns",
          active: pathname.includes("/tax-returns"),
          icon: ShoppingCart,
          submenus: [],
        },              
      ],
    },

    
  ];
}
