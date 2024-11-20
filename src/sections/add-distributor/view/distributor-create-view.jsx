import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useAuthContext } from 'src/auth/hooks';
import DistributorNewEditForm from '../distributor-new-edit-form';

// import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function DistributorCreateView() {
  const settings = useSettingsContext();
  const { vendor } = useAuthContext();
  const { mil_dis_sub_roles } = vendor;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Create a new Distributor`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },

          {
            name: `New Distributor`,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DistributorNewEditForm />
    </Container>
  );
}
