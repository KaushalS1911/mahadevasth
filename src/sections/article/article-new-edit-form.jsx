import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete, RHFEditor } from 'src/components/hook-form';

import axios from 'axios';
import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { useAuthContext } from '../../auth/hooks';
import { useResponsive } from '../../hooks/use-responsive';
import { LoadingScreen } from '../../components/loading-screen';
import { Chip } from '@mui/material';
import { useGetCategories } from '../../api/category';

export default function ArticleNewEditForm({ singleArticle }) {
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { vendor } = useAuthContext();
  const router = useRouter();
  const { categories } = useGetCategories();
  useEffect(() => {
    if(categories){
    setCategoryList(categories?.map((data) => data.category))

    }
  }, [categories]);
  const [loading, setLoading] = useState(false);

  const mdUp = useResponsive('up', 'md');
  const NewProductSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    title: Yup.string().required('Title is required'),
    article: Yup.string().required('Article is required'),
    tags: Yup.array()
      .min(1, 'Tags is required')
      .max(5, 'You can only add up to 5 tags.')
      .test('tags-length', 'Each tag must be at least 4 characters long', (tags) =>
        Array.isArray(tags) ? tags.every((tag) => tag.length >= 4) : false
      ),
  });

    const a = categories?.find((tem) => tem?.id == singleArticle?.category)
  const defaultValues = useMemo(() => {
    console.log(a?.category,"a");
    return {
      category: `${a?.category}` || 'Fall Asleep',
      article: singleArticle?.article || '',
      title: singleArticle?.title || '',
      tags: typeof singleArticle?.tags === 'string' ? JSON.parse(singleArticle?.tags) : [] || [],
    };
  }, [singleArticle,a]);

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const a = categories.find((tem) => tem?.category == data.category)
      const payload = {
        article: data.article,
        category: a.id,
        tags: data.tags,
        title: data.title,
        counsellor_code: vendor?.counsellor_code,
      };
      singleArticle?.id
        ? axios
          .put(`https://interactapiverse.com/mahadevasth/shape/articles/${singleArticle?.id}`, payload)
          .then((res) => {
            if (res?.data?.status === '200') {
              enqueueSnackbar('Article updated successfully');
              setLoading(false);
              router.push(paths.dashboard.article.list);
            }
          })
        : axios
          .post(`https://interactapiverse.com/mahadevasth/shape/articles/upload`, payload)
          .then((res) => {
            if (res?.data?.status === '200') {
              enqueueSnackbar('Article added successfully');
              setLoading(false);
              router.push(paths.dashboard.article.list);
            }
          });
    } catch (err) {
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

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            Article Details
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Category, article, tags, image...
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={8}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name='title' label='Title' />
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
                options={categoryList}
                getOptionLabel={(option) => option}
              />

              <RHFAutocomplete
                name='tags'
                label='Tags'
                placeholder='Add tags and press Enter'
                multiple
                freeSolo
                options={[]}
                getOptionLabel={(option) => option}
                renderTags={(selected = [], getTagProps) =>
                  Array.isArray(selected)
                    ? selected?.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        size='small'
                        color='info'
                        variant='soft'
                      />
                    ))
                    : null
                }
              />
            </Box>
            <RHFEditor simple name='article'/>
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
      ) : (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {renderProperties}
            <Grid xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </>
  );
}

ArticleNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
