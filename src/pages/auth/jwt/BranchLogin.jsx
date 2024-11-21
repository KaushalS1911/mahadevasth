import { Helmet } from 'react-helmet-async';
import JwtBranchLoginView from '../../../sections/auth/jwt/jwt-branch-login-view';
import { JwtLoginView } from '../../../sections/auth/jwt';


// ----------------------------------------------------------------------

export default function BranchLoginPage() {
  return (
    <>
      <Helmet>
        <title> Mahadevasth: Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
