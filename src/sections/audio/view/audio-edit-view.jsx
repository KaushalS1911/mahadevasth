import Container from '@mui/material/Container';
import {useSettingsContext} from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import AudioNewEditForm from '../audio-new-edit-form';
import {useParams} from 'react-router';
import {useGetSingleArticles} from '../../../api/article';

// ----------------------------------------------------------------------

export default function AudioEditView() {
  const settings = useSettingsContext();
  const {id} = useParams();
  const {singleArticle} = useGetSingleArticles(id)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Edit Audio`}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },

          {
            name: `Edit Audio`,
          },
        ]}
        sx={{
          mb: {xs: 3, md: 5},
        }}
      />

      {singleArticle && <AudioNewEditForm singleArticle={singleArticle}/>}
    </Container>
  );
}
