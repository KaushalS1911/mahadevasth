import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Button, CircularProgress, Backdrop } from '@mui/material';
import axios from 'axios';
import { SingleFilePreview, Upload } from 'src/components/upload';
import { Helmet } from 'react-helmet-async';
import { enqueueSnackbar } from 'notistack';
import { paths } from 'src/routes/paths';
import imageCompression from 'browser-image-compression';
import { UploadDocumentListView } from 'src/sections/add-upload/view';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { handleDoctypeLabel } from '../../_mock';

const validationSchema = yup.object().shape({
  doc_type: yup.string().required('Document type is required'),
});

function DistributorDocument({ documentLabel }) {
  const [tableData, setTableData] = useState([]);
  const [docs, setDocs] = useState('');
  const [selectedRole, setSelectedRole] = useState(true);
  const [disName, setDisName] = useState({});
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultValues = useMemo(
    () => ({
      doc_type: '',
      csp_code: '',
      csp: '',
    }),
    [],
  );
  const single = documentLabel.find((data) => data.code == disName);
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value ? false : true);
    setDisName(event.target.value);
  };
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getAllDocument();
  }, [single]);


  function getAllDocument() {

    if (single) {
      axios
        .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${single.code}/documents`)
        .then((res) => setTableData(res?.data?.data))
        .catch((err) => console.error(err));
    }
  }

  // console.log(tableData,"hello");

  const { handleSubmit, control, setValue, watch, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!files[0]?.preview) {
      enqueueSnackbar('Please Select Image', { variant: 'error' });
      return false;
    }
    const payload = {
      type: data.doc_type,
      image: files[0],
      id: Date.now(),
      csp: data.csp,
    };

    setSelected((prevSelected) => [...prevSelected, payload]);
    setFiles([]);

    const formData = new FormData();
    formData.append('doc_type', data.doc_type);
    formData.append('csp_code', data?.csp);

    for (let file of files) {
      try {
        formData.append('file', file);
      } catch (error) {
        console.error('Error compressing file:', error);
        formData.append('file', file);
      }
    }
  });


  const docTypeOption = [
    { label: 'Registration Certificate', key: 'registration_certificate' },
    { label: 'Undertaking', key: 'undertaking' },
    { label: 'Audited Accounts', key: 'audited_accounts' },
    { label: 'Income Tax', key: 'income_tax' },
    { label: 'PAN', key: 'pan' },
    { label: 'GST', key: 'gst' },
    { label: 'Sale Registration', key: 'sale_registration' },
    { label: 'Industrial Licence', key: 'industrial_licence' },
    { label: 'Power Bills', key: 'power_bills' },
    { label: 'Pollution Certificates', key: 'pollution_certificates' },
    { label: 'Municipal Property Tax', key: 'municipal_property_tax' },
    { label: 'FSSAI License', key: 'FSSAI_license' },
    { label: 'Photographs of Unit', key: 'photographs_of_unit' },
  ];

  useEffect(() => {
    files[0]?.preview ? onSubmit() : null;
  },[files])
  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          }),
        ),
      ]);
    },
    [files],
  );

  const handleAllSubmit = async (data) => {

    const filteredData = tableData?.filter((item) => item.doc_type == docs);

    if (filteredData.length > 0) {
      if (filteredData[0].doc_type !== 'photographs_of_unit' && filteredData.length >= 2) {
        // enqueueSnackbar(`${handleDoctypeLabel(filteredData[0]?.doc_type)} upload limit exceed. (If you want to upload more document of ${handleDoctypeLabel(filteredData[0]?.doc_type)}, then remove existing ${handleDoctypeLabel(filteredData[0]?.doc_type)}.)`, { variant: 'error' });
        enqueueSnackbar(
          <Box sx={{p:"5px"}}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
              {` ${handleDoctypeLabel(filteredData[0]?.doc_type)} upload limit exceed`}
            </Typography>
            <Typography variant="body2">
              {`If you want to upload more document of ${handleDoctypeLabel(filteredData[0]?.doc_type)}, then remove existing ${handleDoctypeLabel(filteredData[0]?.doc_type)} document.`}
            </Typography>
          </Box>,
          {
            variant: 'error',
            autoHideDuration: 3000,
          }
        );
        return;
      }

    }

    setLoading(true);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };

    try {
      const formDataList = await Promise.all(
        data.map(async (value) => {
          const formData = new FormData();
          if (value?.image) {
            const compressedFile = await imageCompression(value.image, options);
            formData.append('file', compressedFile);
          }
          formData.append('doc_type', value?.type);
          formData.append('csp_code', value?.csp);
          return formData;
        }),
      );

      const responses = await Promise.all(
        formDataList.map((formData) =>
          axios.post(
            'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/upload_document',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          ),
        ),
      );

      if (responses) {
        enqueueSnackbar('Your Document Uploaded');
        setSelected([]);
        setFiles([]);
        reset(defaultValues);
        // router.push(paths.dashboard.distributor.distributor_list); // Uncomment if needed
      } else {
        enqueueSnackbar('Failed to Upload', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      enqueueSnackbar('Failed to Upload', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = selected.filter((row) => row.id !== id);
      enqueueSnackbar('Delete success!');
      setSelected(deleteRow);
    },
    [enqueueSnackbar, selected],
  );
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const renderDetails = (
    <>
      <Helmet>
        <title>Dashboard | Upload Documents</title>
      </Helmet>

      <Container>
        <CustomBreadcrumbs
          heading={`Upload document`}
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },

            {
              name: `Upload document`,
            },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack>


              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                  md: 'repeat(3, 1fr)',
                }}
                sx={{ mt: 3 }}
              >
                <Controller
                  name="csp"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel>Select distributor</InputLabel>
                      <Select {...field} label="Select distributor" onChange={(event) => {
                        field.onChange(event);
                        handleRoleChange(event);
                      }}>
                        {documentLabel?.map((option) => (
                          <MenuItem key={option.name} value={option.code}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <Typography variant="caption" color="error">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="doc_type"
                  disabled={selectedRole}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error}>
                      <InputLabel>Document Type</InputLabel>
                      <Select {...field} label="Document Type" onChange={(event) => {
                        field.onChange(event);
                        setDocs(event.target.value);
                      }}>
                        {docTypeOption.map((option) => (
                          <MenuItem key={option.key} value={option.key}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <Typography variant="caption" color="error">
                          {fieldState.error.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ position: 'relative' }}>
                <Upload
                  sx={{
                    height: '100px',
                    width: '100px',
                    position: 'absolute',
                    right: '0%',
                    zIndex: '200',
                    opacity: '0',
                  }}
                  accept={{
                    'image/jpeg': [],
                    'image/jpg': [],
                    'image/png': [],
                  }}
                  disabled={(selected.length >= 5 || selectedRole)}
                  multiple
                  onDrop={handleDropMultiFile}
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}>
                  <Button style={{ cursor: 'pointer', maxWidth: '200px' }} disabled={selectedRole} variant="contained">
                    Choose File
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </>
  );
  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={() => setLoading(false)}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          {/*<LoadingScreen sx={{ margin: 'auto' }}/>*/}
        </Box>
      ) : (
        <>

          <Box
            sx={{
              mt: 0,
              width: 1,
              height: 320,
              borderRadius: 2,
            }}
          >
            <FormProvider methods={methods} onSubmit={onSubmit}>
              {renderDetails}
            </FormProvider>
            {selected[0]?.type && (
              <UploadDocumentListView
                data={selected}
                // container={container}
                handleDeleteRow={handleDeleteRow}
                handleAllSubmit={handleAllSubmit}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default DistributorDocument;
