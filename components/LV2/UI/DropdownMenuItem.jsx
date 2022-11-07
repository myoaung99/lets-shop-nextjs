import { Menu } from "@headlessui/react";
import Link from "next/link";
import React from "react";

const DropdownMenuItem = ({ children, href, ...rest }) => {
  return (
    <Menu.Item className="dropdown-item">
      <Link href={href} {...rest}>
        {children}
      </Link>
    </Menu.Item>
  );
};

export default DropdownMenuItem;
