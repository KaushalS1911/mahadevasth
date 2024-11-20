import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useEffect, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import axios from 'axios';
import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { useAuthContext } from '../../auth/hooks';
import { useResponsive } from '../../hooks/use-responsive';
import { DocumentListView } from '../upload/view';
import { LoadingScreen } from '../../components/loading-screen';
import { Upload } from '../../components/upload';
import { Chip } from '@mui/material';
// ----------------------------------------------------------------------

export default function ArticleNewEditForm({ miller }) {
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const router = useRouter();
  const { vendor } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const mdUp = useResponsive('up', 'md');
  const NewProductSchema = Yup.object().shape({
    category: Yup.string().required('category is required'),
    article: Yup.string().required('Article is required'),
    tags: Yup.string().required('Tags is required'),
  });

  const defaultValues = useMemo(
    () => ({
      category: miller?.category || '',
      article: miller?.article || '',
      tags: miller?.tags || '',
    })
      [miller],
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const formdata = new FormData()
      formdata.append("article",data.article)
      formdata.append("category",data.category)
      formdata.append("tags",keywords)
      formdata.append("counsellor_code",keywords)
      formdata.append("image",files[0])
      axios
        .post(`https://interactapiverse.com/mahadevasth/shape/articles/upload`, data)
        .then((res) => {
          if (res?.data?.status == '201') {
            enqueueSnackbar('Article added successfully');
            setLoading(false);
            router.push(paths.dashboard.article.list);
          }
        });
    } catch (err) {
      console.log(err);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      setLoading(false);
    }
  });
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

  const handleRemoveFile = (inputFile) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleDeleteChip = (chipToDelete) => {
    setKeywords((keywords) => keywords.filter((chip) => chip !== chipToDelete));
  };
  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Article
            Details
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Category,article,tags,image...
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display='grid'
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFAutocomplete
                name='category'
                label='Category'
                placeholder='Choose Category'
                fullWidth
                options={['Dry', 'Wet', 'Both']}
                getOptionLabel={(option) => option}
              />

              <RHFTextField name='article' multiline
                            rows={4} label='Article' />

              <RHFTextField name='tags' label='Tags' onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  if (watch("tags") && !keywords.includes(watch("tags"))) {
                    setKeywords([...keywords, values.keywords]);
                    setValue("tags",'')
                  }

                  event.preventDefault();
                }
              }}
                            placeholder='Add tags and press Enter'
                            InputProps={{
                              startAdornment: (
                                <Stack direction='row' spacing={1} sx={{ marginRight: 1 }}>
                                  {keywords.map((chip, index) => (
                                    <Chip
                                      key={index}
                                      label={chip}
                                      onDelete={() => handleDeleteChip(chip)}
                                    />
                                  ))}
                                </Stack>
                              ),
                            }} />
            </Box>
            <Typography variant='subtitle2'>Upload Your Image</Typography>

            <Upload
              multiple={false}
              accept={{
                'image/jpeg': [],
                'image/jpg': [],
                'image/png': [],
              }}
              thumbnail={true}
              files={files}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveFile}
              onUpload={onSubmit}
            />
          </Stack>
        </Card>
      </Grid>
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
            backgroundColor: 'white',
          }}
        >


          <LoadingScreen sx={{ margin: 'auto' }} />
        </Box>
      ) : (<FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderProperties}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button variant='contained' type='submit'>Submit</Button>
            </Box>
          </Grid>

        </Grid>
      </FormProvider>)}

    </>
  );
}

ArticleNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
