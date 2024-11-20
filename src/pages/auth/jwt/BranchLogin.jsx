import { Helmet } from 'react-helmet-async';
import JwtBranchLoginView from '../../../sections/auth/jwt/jwt-branch-login-view';


// ----------------------------------------------------------------------

export default function BranchLoginPage() {
  return (
    <>
      <Helmet>
        <title> NCCF CSP Portal: Branch Login</title>
      </Helmet>

      <JwtBranchLoginView />
    </>
  );
}
