import React, { forwardRef } from 'react';
import { NavLinkProps, NavLink as BaseNavLink } from 'react-router-dom';

const NavLink = forwardRef((props: NavLinkProps, ref: React.Ref<HTMLAnchorElement>) => {
    const { to, children, ...rest } = props;
    return (
        <BaseNavLink ref={ref} to={to} {...rest} end>
            {children}
        </BaseNavLink>
    );
});
NavLink.displayName = 'NavLink';


export default NavLink;