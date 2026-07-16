import { Link } from 'react-router-dom';

import { LogoImage } from '@/assets';
import { ROUTE_PATHS } from '@/app/paths';

export function Logo() {
  return (
    <Link to={ROUTE_PATHS.main}>
      <img
        src={LogoImage}
        alt='Логотип'
      />
    </Link>
  );
}
