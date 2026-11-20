import * as PhosphorIcons from "@phosphor-icons/react";

export interface NavItem {
  id: string;
  label: string;
  count: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  external: boolean;
  icon: PhosphorIcons.Icon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "Selected Work", count: "04", href: "/#work" },
  { id: "about", label: "About Me", count: "", href: "/about" },
  { id: "playground", label: "Playground", count: "12", href: "/playground" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shravanisutar",
    external: true,
    icon: PhosphorIcons.LinkedinLogoIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/designft.shrav?mdxt=ZDNlZDc0MzIxNw==",
    external: true,
    icon: PhosphorIcons.InstagramLogoIcon,
  },
  {
    label: "Email",
    href: "mailto:digital.shravanisutar@gmail.com",
    external: true,
    icon: PhosphorIcons.EnvelopeIcon,
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1D8LmDQdgNLIhqxxLEuo_14XzhWxc4TtY/view?usp=sharing",
    external: true,
    icon: PhosphorIcons.FileCIcon,
  },
];
