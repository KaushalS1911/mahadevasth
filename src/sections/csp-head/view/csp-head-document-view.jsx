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
import { useGetCSP } from '../../../api/branch-csp';

import HeadList from '../../upload/view/head-list';
import CspList from '../../upload/view/csp-list';

function CspHeadDocumentView() {
  const {id} = useParams()
  const mdUp = useResponsive('up', 'md');
  const settings  = useSettingsContext()
  const { csp } = useGetCSP();
  const distributor = csp?.find((data) => data.csp_code === id )
  const table = (
    <>
            <Grid item xs={12} md={12}>
              {/*<CspList csp={distributor?.csp_code} cspt={true} route={true}/>*/}
             <HeadList csp={id} cspt={true}/>
      </Grid>
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

export default CspHeadDocumentView;
