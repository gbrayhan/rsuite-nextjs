import React, { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps extends LinkProps {
    children: React.ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
    const { href, children, ...rest } = props;
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref legacyBehavior>
            <a ref={ref} {...rest} className={isActive ? 'active' : ''}>
                {children}
            </a>
        </Link>
    );
});
NavLink.displayName = 'NavLink';

export default NavLink;
