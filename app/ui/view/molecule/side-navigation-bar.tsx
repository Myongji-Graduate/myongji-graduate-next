'use client';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './sheet/sheet';

export default function SideNavigationBar() {
  return (
    <Sheet>
      <SheetTrigger className="h-6">
        <HamburgerMenuIcon className="w-6 h-6 text-white" />;
      </SheetTrigger>
      <SheetContent className="z-3">
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
