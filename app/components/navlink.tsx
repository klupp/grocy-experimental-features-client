'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    href: string;
    className?: string;
}

const NavLink = (props: Props) => {
    const pathname = usePathname();
    return (
        <Link href={props.href} className={clsx(
            "nav-link align-middle ps-3 rounded-0",
            {
              'fw-bolder border-start': pathname === props.href,
            },
            props.className
          )}>
            {props.children}
        </Link>
    )
}

export default NavLink