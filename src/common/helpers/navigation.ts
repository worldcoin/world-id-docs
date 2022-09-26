export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItems = {
  primary: Array<NavItem>;
  secondary: Array<NavItem>;
};

export const navItems: NavItems = {
  primary: [
    { label: "Docs", href: "/docs" },
    { label: "API", href: "/api-docs" },
    { label: "Examples", href: "/examples" },
  ],

  secondary: [
    {
      label: "Developer Portal",
      href: "https://developer.worldcoin.org/",
      external: true,
    },

    {
      label: "✨ Feedback",
      href: "/feedback",
    },
  ],
};
