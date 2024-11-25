import isEqual from 'lodash/isEqual';
import React, { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { _roles } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import ArticleTableFiltersResult from '../article-table-filters-result';
import ArticleTableToolbar from '../article-table-toolbar';
import { useGetArticles } from '../../../api/article';
import { Box } from '@mui/material';


const defaultFilters = {
  name: '',
  type_of_firm: [],
  state: [],
  branch: [],
  district: [],
  category: [],
  status: 'all',

};

const HIDE_COLUMNS = {
  category: true,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

function ArticleListView() {
  const { enqueueSnackbar } = useSnackbar();
  const { articles, articleLoading, mutate } = useGetArticles();
  const confirmRows = useBoolean();
  const { vendor } = useAuthContext();
  const router = useRouter();

  const settings = useSettingsContext();
const [category,setCategory] = useState([])
  const [tableData, setTableData] = useState(articles || []);
  const [deleteId, setDeleteId] = useState(null);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  useEffect(() => {
    if (articles?.length > 0) {
      setTableData(articles);
    }
  }, [articles]);
  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });


  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id) => {
      axios.delete(`https://interactapiverse.com/mahadevasth/shape/articles/${id}`).then((res) => {
        if (res?.data?.status == '200') {
          enqueueSnackbar('Article deleted successfully');
          mutate();
        }
      }).catch((err) => enqueueSnackbar('Something want wrong!', { variant: 'error' }));

    },
    [enqueueSnackbar, tableData],
  );

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.article.edit(id));
    },
    [router],
  );
  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.article.view(id));
    },
    [router],
  );
  useEffect(() => {
    fetchCategory()
  },[dataFiltered])
  function fetchCategory() {
    dataFiltered?.map((data) => {
      setCategory((item) => {
        if (!item.includes(data.category)) {
          return [...item, data.category];
        } else {
          return item;
        }
      });
    });
  }

  const columns = [
    {
      field: 'id',
      headerName: '#',
      minWidth: 44,
      align: 'center',
      headerAlign: 'center',
    },

    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 160,
    },
    {
      field: 'article',
      headerName: 'Article',
      flex: 1,
      minWidth: 472,
      renderCell: (params) => (
        <Box
          sx={{
            height: 'auto',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
            '&:hover': {
              whiteSpace: 'normal',
              overflow: 'visible',
            },
          }}
          dangerouslySetInnerHTML={{ __html: params.row.article }}
        />
      ),
    },

    {
      field: 'tags',
      headerName: 'Tags',
      flex: 1,
      minWidth: 372,
      renderCell: (params) => {
        const pa = params?.row?.tags;

        let parsedTags;
        try {
          parsedTags = typeof pa === 'string' ? JSON.parse(pa) : pa;
        } catch (error) {
          console.error('Error parsing tags:', error);
          return null;
        }

        return (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {parsedTags?.map((option, index) => (
              <Box
                key={index}
                sx={{
                  padding: '4px 8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                }}
              >
                {option}
              </Box>
            ))}
          </Box>
        );
      },
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon='mdi:eye' />}
          label='View'
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon='solar:pen-bold' />}
          label='Edit'
          onClick={() => handleEditRow(params.row.id)}
        />,

        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon='solar:trash-bin-trash-bold' />}
          label='Delete'
          onClick={() => {
            confirmRows.onTrue();
            setDeleteId(params?.row?.id);
          }}
          sx={{ color: 'error.main' }}
        />,

      ],
    },


  ];
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters],
  );
  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Container
        maxWidth={'xl'}

      >
        <CustomBreadcrumbs
          heading='Article List'
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Article',
              href: paths.dashboard.article.list,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.article.new}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Article
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        <Card
          sx={{
            height: dataFiltered?.length > 0 ? 'unset' : 700,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >

          <DataGrid
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={articleLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction='row'
                      alignItems='center'
                      justifyContent='flex-end'
                    >
                      {!!selectedRowIds.length && (
                        <Button
                          size='small'
                          color='error'
                          startIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds.length})
                        </Button>
                      )}

                      <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarExport />
                    </Stack>
                    <ArticleTableToolbar category={category} filters={filters} onFilters={handleFilters} roleOptions={_roles} />
                    {canReset && (
                      <ArticleTableFiltersResult
                        filters={filters}
                        onFilters={handleFilters}
                        onResetFilters={handleResetFilters}
                        results={dataFiltered.length}
                        sx={{ p: 2.5, pt: 0 }}
                      />
                    )}

                  </GridToolbarContainer>
                </>
              ),
              noRowsOverlay: () => <EmptyContent title='No Data' />,
              noResultsOverlay: () => <EmptyContent title='No results found' />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                py: '13px',
              },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title='Delete'
        content={
          <>
            Are you sure want to delete article?
          </>
        }
        action={
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleDeleteRow(deleteId);
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, type_of_firm, state, branch, district,category } = filters;


  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.doc_type === status);
  }
  if (category.length) {
    inputData = inputData.filter((user) => category.includes(user.category));
  }

  if (type_of_firm.length) {
    inputData = inputData.filter((user) => type_of_firm.includes(user.type_of_firm));
  }
  if (state.length) {
    inputData = inputData.filter((user) => state.includes(user.state));
  }
  if (branch.length) {
    inputData = inputData.filter((user) => branch.includes(user.branch));
  }
  if (district.length) {
    inputData = inputData.filter((user) => district.includes(user.district));
  }

  return inputData;
}

export default ArticleListView;
