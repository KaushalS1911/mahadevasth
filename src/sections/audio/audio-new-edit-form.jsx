import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useMemo, useState, useCallback} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useSnackbar} from 'src/components/snackbar';
import FormProvider, {RHFTextField, RHFAutocomplete} from 'src/components/hook-form';

import axios from 'axios';
import {paths} from '../../routes/paths';
import {useRouter} from '../../routes/hooks';
import {useAuthContext} from '../../auth/hooks';
import {useResponsive} from '../../hooks/use-responsive';
import {LoadingScreen} from '../../components/loading-screen';
import {Upload} from '../../components/upload';
import {Chip} from '@mui/material';
// ----------------------------------------------------------------------

export default function AudioNewEditForm({singleArticle}) {
  const {enqueueSnackbar} = useSnackbar();
  const [files, setFiles] = useState([]);
  const {vendor} = useAuthContext()
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const mdUp = useResponsive('up', 'md');
  const NewProductSchema = Yup.object().shape({
    category: Yup.string().required('category is required'),
    article: Yup.string().required('Article is required'),
    tags: Yup.array().required('Tags is required').max(5, "You can only add up to 5 tags."),
  });

  const defaultValues = useMemo(() => {
    return {
      category: singleArticle?.category || '',
      article: singleArticle?.article || '',
      tags: typeof singleArticle?.tags === 'string' ? JSON.parse(singleArticle?.tags) : [] || [],
    };
  }, [singleArticle]);


  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {reset, watch, setValue, handleSubmit, formState: {isSubmitting}} = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        article: data.article,
        category: data.category,
        tags: data.tags,
        counsellor_code: vendor?.counsellor_code,
      };
      singleArticle?.id ? axios
        .put(`https://interactapiverse.com/mahadevasth/shape/articles/${singleArticle?.id}`, payload)
        .then((res) => {
          if (res?.data?.status == '200') {
            enqueueSnackbar('Article updated successfully');
            setLoading(false);
            router.push(paths.dashboard.article.list);
          }
        }) : axios
        .post(`https://interactapiverse.com/mahadevasth/shape/articles/upload`, payload)
        .then((res) => {
          if (res?.data?.status == '200') {
            enqueueSnackbar('Article added successfully');
            setLoading(false);
            router.push(paths.dashboard.article.list);
          }
        });
    } catch (err) {
      enqueueSnackbar('Something went wrong', {variant: 'error'});
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

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant='h6' sx={{mb: 0.5}}>
            Audio
            Details
          </Typography>
          <Typography variant='body2' sx={{color: 'text.secondary'}}>
            Category,article,tags,image...
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Card>
          <Stack spacing={3} sx={{p: 3}}>
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
                options={['Mental Health', "Therapy"]}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name="tags"
                label="Tags"
                placeholder="Add tags and press Enter"
                multiple
                freeSolo
                options={[]}
                getOptionLabel={(option) => option}
                renderTags={(selected = [], getTagProps) =>
                  Array.isArray(selected)
                    ? selected.map((option, index) => (
                      <Chip
                        {...getTagProps({index})}
                        key={option}
                        label={option}
                        size="small"
                        color="info"
                        variant="soft"
                      />
                    ))
                    : null
                }
              />
            </Box>

            <RHFTextField name='article' multiline rows={4} label='Audio'/>
            {/*<Typography variant='subtitle2'>Upload Your Image</Typography>*/}

            {/*<Upload*/}
            {/*  multiple={false}*/}
            {/*  accept={{*/}
            {/*    'image/jpeg': [],*/}
            {/*    'image/jpg': [],*/}
            {/*    'image/png': [],*/}
            {/*  }}*/}
            {/*  thumbnail={true}*/}
            {/*  files={files}*/}
            {/*  onDrop={handleDropMultiFile}*/}
            {/*  onRemove={handleRemoveFile}*/}
            {/*  onUpload={onSubmit}*/}
            {/*/>*/}
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


          <LoadingScreen sx={{margin: 'auto'}}/>
        </Box>
      ) : (<FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          {renderProperties}
          <Grid xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
              <Button variant='contained' type='submit'>Submit</Button>
            </Box>
          </Grid>

        </Grid>
      </FormProvider>)}

    </>
  );
}

AudioNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
