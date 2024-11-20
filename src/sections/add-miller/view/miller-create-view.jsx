import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import MillerNewEditForm from '../miller-new-edit-form';
import { useAuthContext } from 'src/auth/hooks';

// import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function MillerCreateView() {
  const settings = useSettingsContext();
  const { vendor } = useAuthContext();
  const { mil_dis_sub_roles } = vendor;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Create a new ${
          mil_dis_sub_roles === 'own_distribution_rent_mill'
            ? 'Distributor '
            : 'Miller '
        }`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },

          {
            name: `New ${
              mil_dis_sub_roles === 'own_distribution_rent_mill'
                ? 'Distributor '
                : 'Miller '
            }`,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MillerNewEditForm />
    </Container>
  );
}
