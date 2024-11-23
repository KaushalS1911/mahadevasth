import Container from '@mui/material/Container';
import {useSettingsContext} from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import VideoNewEditForm from '../video-new-edit-form';
import {useParams} from 'react-router';
import {useGetSingleArticles} from '../../../api/article';

// ----------------------------------------------------------------------

export default function VideoCreateView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Upload a new Video`}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },

          {
            name: `New Video`,
          },
        ]}
        sx={{
          mb: {xs: 3, md: 5},
        }}
      />

      <VideoNewEditForm/>
    </Container>
  );
}
