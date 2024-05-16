'use client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from '../../ui/view/molecule/sheet/sheet';

type SideNavigationBarProps = {
  header: React.ReactNode;
};

export default function SideNavigationBar({ header }: SideNavigationBarProps) {
  return (
    <Sheet>
      <SheetTrigger className="h-6">
        <HamburgerMenuIcon className="w-6 h-6 text-white" />;
      </SheetTrigger>
      <SheetContent className="z-3">
        <SheetHeader>{header}</SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
