import Container from '@mui/material/Container';
import {useSettingsContext} from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import AudioNewEditForm from '../audio-new-edit-form';
import {useParams} from 'react-router';
import {useGetSingleArticles} from '../../../api/article';

// ----------------------------------------------------------------------

export default function AudioCreateView() {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`Upload a new audio`}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },

          {
            name: `New Audio`,
          },
        ]}
        sx={{
          mb: {xs: 3, md: 5},
        }}
      />

      <AudioNewEditForm/>
    </Container>
  );
}
