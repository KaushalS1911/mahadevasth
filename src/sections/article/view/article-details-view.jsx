import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import ArticleNewEditForm from '../article-new-edit-form';
import { useParams } from 'react-router';
import { useGetSingleArticles } from '../../../api/article';
import ArticleViewDetails from '../article-view-details';

// ----------------------------------------------------------------------

export default function ArticleDetailsView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  const {singleArticle} = useGetSingleArticles(id)
  console.log(id,"id");
  console.log("singleArticle",singleArticle);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`View article`}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },

          {
            name: `View Article`,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {singleArticle && <ArticleViewDetails singleArticle={singleArticle} />}
    </Container>
  );
}
