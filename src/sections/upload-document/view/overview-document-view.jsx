import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useSettingsContext } from 'src/components/settings';

import axios from 'axios';
import { useAuthContext } from 'src/auth/hooks';
import AppNewInvoice from '../document-new-invoice';
import { Button } from '@mui/material';
import { paths } from 'src/routes/paths';
import UploadDocument from 'src/pages/dashboard/addUploadDocument';

// ----------------------------------------------------------------------

export default function OverviewDocumentView({ vendorCode }) {
  const { vendor } = useAuthContext();
  const settings = useSettingsContext();

  const orderList = [
    {
      doc_type: 'Certificates',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/certificates/certificates_2024-05-24_17-46-34.jpg',
      object_url:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/5e/15/80/caption.jpg?w=300&h=300&s=1',
    },
    {
      doc_type: 'Pan Number',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/pan_number/pan_number_2024-05-24_19-02-25.jpg',
      object_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s',
    },
    {
      doc_type: 'Certificates',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/certificates/certificates_2024-05-24_17-46-34.jpg',
      object_url:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/5e/15/80/caption.jpg?w=300&h=300&s=1',
    },
    {
      doc_type: 'Pan Number',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/pan_number/pan_number_2024-05-24_19-02-25.jpg',
      object_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s',
    },
    {
      doc_type: 'Certificates',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/certificates/certificates_2024-05-24_17-46-34.jpg',
      object_url:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/5e/15/80/caption.jpg?w=300&h=300&s=1',
    },
    {
      doc_type: 'Pan Number',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/pan_number/pan_number_2024-05-24_19-02-25.jpg',
      object_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s',
    },
    {
      doc_type: 'Certificates',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/certificates/certificates_2024-05-24_17-46-34.jpg',
      object_url:
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/5e/15/80/caption.jpg?w=300&h=300&s=1',
    },
    {
      doc_type: 'Pan Number',
      // object_url:
      //   'https://nccf-csp.s3.ap-south-1.amazonaws.com/U1P069S85_Karnataka/pan_number/pan_number_2024-05-24_19-02-25.jpg',
      object_url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s',
    },
  ];

  // useEffect(() => {
  //   if (vendor.csp_code) {
  //     fetchAllDocument();
  //   }
  // }, [vendor]);

  // function fetchAllDocument() {
  //   axios
  //     .get(
  //       `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor.csp_code}/documents`
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       setOrderList(res.data?.data);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // 'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/U1P069S85_Karnataka/documents'

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <AppNewInvoice
            title="Document List"
            tableData={orderList}
            tableLabels={[
              { id: 'srNo', label: 'Sr No' },
              { id: 'type', label: 'Document Type' },
              { id: 'object_url', label: 'Document Image' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
