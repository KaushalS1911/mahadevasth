import Container from '@mui/material/Container';
import {useSettingsContext} from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VideoNewEditForm from '../video-new-edit-form';
import {useParams} from 'react-router';
import {useGetSingleArticles} from '../../../api/article';

// ----------------------------------------------------------------------

export default function VideoEditView() {
  const settings = useSettingsContext();
  const {id} = useParams();
  const {singleArticle} = useGetSingleArticles(id)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Edit article`}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },

          {
            name: `Edit Article`,
          },
        ]}
        sx={{
          mb: {xs: 3, md: 5},
        }}
      />

      {singleArticle && <VideoNewEditForm singleArticle={singleArticle}/>}
    </Container>
  );
}
