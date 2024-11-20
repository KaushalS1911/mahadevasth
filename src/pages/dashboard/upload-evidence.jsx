import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Button, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { SingleFilePreview, Upload } from 'src/components/upload';
import { Helmet } from 'react-helmet-async';
import { enqueueSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { UploadDocumentListView } from 'src/sections/add-upload/view';
import FileThumbnail from 'src/components/file-thumbnail';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { error } from 'src/theme/palette';
import { useAuthContext } from 'src/auth/hooks';
import { LoadingScreen } from 'src/components/loading-screen';
import imageCompression from 'browser-image-compression';
import { handleDoctypeLabel } from '../../_mock';

const validationSchema = yup.object().shape({
  doc_type: yup.string().required('Document type is required'),
});

export default function UploadDocument() {
  const settings = useSettingsContext();
  const router = useRouter();
  const [docs, setDocs] = useState('');
  const { vendor } = useAuthContext();
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [branch, setBranch] = useState([]);
  const [b, setB] = useState([]);
  const [dataCSP, setDataCSP] = useState([]);
  const [validate,setValidate] = useState([])
  const defaultValues = useMemo(
    () => ({
      doc_type: '',
      csp_code: '',
    }),
    []
  );
  useEffect(() => {
    if (vendor) {
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/branch/${vendor?.branch}/csp/list`).then((res) => setDataCSP(res?.data?.data)).catch((err) => console.log(err));
    }
    getAllDocument();
  }, [vendor?.csp_code]);
  useEffect(() => {
    getAllDocument();
    setValidate([...tableData,...selected])
  }, [selected]);

  function getAllDocument() {

    if (vendor?.csp_code) {
      axios
        .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/documents`)
        .then((res) => setTableData(res?.data?.data))
        .catch((err) => console.error(err));
    }
  }
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, control, setValue, watch } = methods;

  const docType = watch('doc_type');

  const onSubmit = handleSubmit(async (data) => {
    if (!files[0]?.preview) {
      enqueueSnackbar('Please Select Image', { variant: 'error' });
      return false;
    }
    const payload = {
      type: data.doc_type,
      image: files[0],
      id: Date.now(),
    };

    setSelected((prevSelected) => [...prevSelected, payload]);
    setFiles([]);

    const formData = new FormData();
    formData.append('doc_type', data.doc_type);
    formData.append('csp_code', vendor);


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
    { label: 'Milling Unit Photo', key: 'milling_unit_photo' },
    { label: 'Milling Unit Video', key: 'milling_unit_video' },
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
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };
  const handleAllSubmit = async (data) => {
    const filteredData = validate?.filter((item) => item.doc_type === docs || item.type === docs);

    if (filteredData.length >= 5) {
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
          const compressedFile = await imageCompression(value?.image, options);
          formData.append('file', value?.image);
          formData.append('doc_type', value?.type);
          formData.append('csp_code', vendor?.csp_code);
          return formData;
        })
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
            }
          )
        )
      );

      if (responses) {
        enqueueSnackbar('Your Document Uploaded');
        router.push(paths.dashboard.document.document_list);
        setBranch([])
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
    [enqueueSnackbar, selected]
  );
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  const handleFilterCSP = useCallback(
    (event) => {
      setB(event.target.value);

      setBranch(event.target.value);
      // getAllDocument(event.target.value.at(0))
      // onFilters(
      //   'type',
      //   typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      // );
    },
    [branch],
  );

  const renderDetails = (
    <>
      <Helmet>
        <title>Dashboard | Upload Evidence</title>
      </Helmet>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              {vendor?.category === "branch" && <FormControl
                sx={{
                  flexShrink: 0,
                  // width: { xs: 1, md: 200 },

                }}
              >
                <InputLabel>CSP</InputLabel>

                <Select
                  value={branch}
                  onChange={handleFilterCSP}
                  input={<OutlinedInput label="Type"/>}
                  MenuProps={{
                    PaperProps: {
                      sx: { maxHeight: 240 },
                    },
                  }}
                  // renderValue={(selected) => selected.join(', ')}
                >
                  {dataCSP.map((option) => (
                    <MenuItem key={option.csp_code} value={option.csp_code}>
                      {/*<Checkbox*/}
                      {/*  disableRipple*/}
                      {/*  size="small"*/}
                      {/*  checked={branch.includes(option.csp_code)}*/}
                      {/*/>*/}
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>}
              <Controller
                name="doc_type"
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>Document Type</InputLabel>
                    <Select {...field} label="Document Type" disabled={selected.length >= 5} onChange={(event) => {
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
                accept={docType === "milling_unit_photo" ? {
                  'image/jpeg': [],
                  'image/jpg': [],
                  'image/png': [],
                }: {
                  'video/mp4': [],
                  'video/avi': [],
                  'video/mkv': [],
                  'video/mov': [],
                }}
                disabled={selected.length >= 5}
                multiple
                onDrop={handleDropMultiFile}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}>
                <Button style={{ cursor: 'pointer', maxWidth: '200px' }} variant="contained">
                  Choose File
                </Button>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Card>
    </>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        {loading ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
          >
            <LoadingScreen sx={{ margin: 'auto' }} />
          </Box>
        ) : (
          <>
            <Typography variant="h4">Upload Evidence</Typography>
            <Box
              sx={{
                mt: 5,
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
                  handleDeleteRow={handleDeleteRow}
                  handleAllSubmit={handleAllSubmit}
                />
              )}
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
