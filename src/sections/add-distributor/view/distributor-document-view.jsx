import React from 'react';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { paths } from '../../../routes/paths';
import { Container } from '@mui/system';
import { useParams } from 'react-router';
import { useGetDistributor } from '../../../api/vendor';
import { DocumentListView } from '../../upload/view';
import { Grid, Typography } from '@mui/material';
import { useResponsive } from '../../../hooks/use-responsive';
import { useSettingsContext } from '../../../components/settings';
import DocumentList from '../../upload/view/list';

function DistributorDocumentView(props) {
  const {id} = useParams()
  const mdUp = useResponsive('up', 'md');
  const settings  = useSettingsContext()
  const {distributor} = useGetDistributor(id)
  const table = (
    <>
            {/*<Grid xs={12} md={12}>*/}
        {/*<DocumentListView  csp={distributor?.csp_code} document={true}/>*/}
        <DocumentList  csp={distributor?.csp_code} document={true}/>
      {/*</Grid>*/}
    </>
  );
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>


        {table}
        </Container>
    </>
  );
}

export default DistributorDocumentView;
