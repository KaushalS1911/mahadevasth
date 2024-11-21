import { Helmet } from 'react-helmet-async';

import JwtHeadOfficeLoginView from '../../../sections/auth/jwt/jwt-head-office-login-view';
import { JwtLoginView } from '../../../sections/auth/jwt';

// ----------------------------------------------------------------------

export default function HeadOfficeLoginPage() {
  return (
    <>
      <Helmet>
        <title> Mahadevasth: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
