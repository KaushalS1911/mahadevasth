import React from 'react';
import { useSettingsContext } from '../../../components/settings';
import { useAuthContext } from '../../../auth/hooks';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { paths } from '../../../routes/paths';
import { useGetDistributor } from '../../../api/vendor';
import { useParams } from 'react-router';
import UploadListView from '../../../pages/dashboard/upload-document';
import { DocumentListView } from '../../upload/view';
import MillerNewEditForm from '../miller-new-edit-form';
import MillerDocumentView from './miller-document-view';


function SingleMillerView(props) {
const {id} = useParams()
  const settings = useSettingsContext();
  const {distributor} = useGetDistributor(id)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>

      <CustomBreadcrumbs
        heading={`Miller view`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Miller List',
            href: paths.dashboard.miller.miller_list,
          },

          {
            name: `Miller`,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MillerNewEditForm miller={distributor}  />
      <MillerDocumentView />

    </Container>
  );
}

export default SingleMillerView;
