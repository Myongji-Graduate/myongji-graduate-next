import clsx from "clsx";
import Link from "next/link";
import React from "react";

type NavLinkProps = {
  icon: React.ElementType;
  href: string;
  selected: boolean;
}

export default function NavLink({ children, icon, href, selected }: React.PropsWithChildren<NavLinkProps>) {
  const LinkIcon = icon;
  return (
    <Link
    href={href}
    className={clsx(
      'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
      {
        'bg-sky-100 text-blue-600': selected,
      },
    )}
  >
    <LinkIcon className="w-6" />
    <p className="hidden md:block">{children}</p>
  </Link>
  );
}