import React from 'react';
import { useSettingsContext } from '../../../components/settings';
import { useAuthContext } from '../../../auth/hooks';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { paths } from '../../../routes/paths';
import DistributorNewEditForm from '../distributor-new-edit-form';
import { useGetDistributor } from '../../../api/vendor';
import { useParams } from 'react-router';
import UploadListView from '../../../pages/dashboard/upload-document';
import { DocumentListView } from '../../upload/view';
import DistributorDocumentView from './distributor-document-view';


function SingleDistributorView(props) {
const {id} = useParams()
  const settings = useSettingsContext();
  const {distributor} = useGetDistributor(id)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

      <CustomBreadcrumbs
        heading={`Distributor view`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Distributor List',
            href: paths.dashboard.distributor.distributor_list,
          },

          {
            name: `Distributor`,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DistributorNewEditForm distributor={distributor}  />
<DistributorDocumentView />

    </Container>
  );
}

export default SingleDistributorView;
