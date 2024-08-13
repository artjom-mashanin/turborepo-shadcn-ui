import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

type Props = {
  hasText?: boolean;
};

export const NavLogo = ({ hasText = false }: Props) => {
  return (
    <NavLink to="/">
      <Logo hasText={hasText} />
    </NavLink>
  );
};
