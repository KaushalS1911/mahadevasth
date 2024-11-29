import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import Header from './header';
import Footer from './footer';
import MainFooter from './main-footer';

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const pathname = usePathname();

  const homePage = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!homePage && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      <MainFooter/>
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
