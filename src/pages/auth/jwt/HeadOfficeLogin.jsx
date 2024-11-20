import { Helmet } from 'react-helmet-async';

import JwtHeadOfficeLoginView from '../../../sections/auth/jwt/jwt-head-office-login-view';

// ----------------------------------------------------------------------

export default function HeadOfficeLoginPage() {
  return (
    <>
      <Helmet>
        <title> NCCF CSP Portal: Head Office Login</title>
      </Helmet>

      <JwtHeadOfficeLoginView />
    </>
  );
}
