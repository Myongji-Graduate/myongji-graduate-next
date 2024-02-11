'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import NavLink from '@/app/components/view/atom/nav-link';
import { usePathname } from 'next/navigation';


const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function DashboardNavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <NavLink
            key={link.name}
            href={link.href}
            icon={link.icon}
            selected={pathname === link.href}
          >
            {link.name}
          </NavLink>
        );
      })}
    </>
  );
}
