import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/api/product';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductTableToolbar from '../branch-table-toolbar';
import ProductTableFiltersResult from '../branch-table-filters-result';
import {
  // RenderCellStock,
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../branch-table-row';
import { useAuthContext } from '../../../auth/hooks';
import axios from 'axios';
import BranchTableFiltersResult from '../branch-table-filters-result';
import BranchTableToolbar from '../branch-table-toolbar';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

const data1 = [
  {
    name: 'Nike Air Force 1 NDESTRUKT',
    category: 'Accessories',
    coverUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg',
    createdAt: '2024-07-03T01:37:31.204Z',
    inventoryType: 'out of stock',
    price: 83.74,
    publish: 'draft',
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  },
  {
    name: 'Foundations Matte Flip Flop',
    category: "Shose",
    coverUrl:"https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg",
    createdAt: "2024-07-02T00:37:31.204Z",
    inventoryType: "in stock",
    price: 97.14,
    publish: "published",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
  },
  {
    name: "Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear",
    category:"Apparel",
    coverUrl:"https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg",
    createdAt: "2024-06-30T23:37:31.204Z",
    inventoryType:"low stock",
    price:68.71 ,
    publish: "published",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
  },
  {
    name: "Boston Soft Footbed Sandal",
    category: "Apparel",
    coverUrl:"https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg",
    createdAt: "2024-06-28T21:37:31.204Z",
    inventoryType:"low stock",
    price: 52.17,
    publish: "published",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
  },
];
// ----------------------------------------------------------------------

export default function BranchListView() {
  const { enqueueSnackbar } = useSnackbar();
  const {vendor} = useAuthContext()
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (vendor.csp_code) {
      fetchAllOrders();
    }
  }, [vendor]);
  function fetchAllOrders() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor.csp_code}/orders`).then((res) => {
      setOrderList(res.data?.data);
    });
  }
  const confirmRows = useBoolean();

  const router = useRouter();
  const login_type = localStorage.getItem("login_type")
  const settings = useSettingsContext();

  const { products, productsLoading } = useGetProducts();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (data1) {
      setTableData(data1);
    }
  }, [data1]);

  const dataFiltered = applyFilter({
    inputData: orderList,
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
      const deleteRow = tableData.filter((row) => row.id !== id);

      enqueueSnackbar('Delete success!');

      setTableData(deleteRow);
    },
    [enqueueSnackbar, tableData],
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !selectedRowIds.includes(row.id));

    enqueueSnackbar('Delete success!');

    setTableData(deleteRows);
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      // router.push(paths.dashboard.product.edit(id));
    },
    [router],
  );

  const handleViewRow = useCallback(
    (id) => {
      // router.push(paths.dashboard.product.details(id));
    },
    [router],
  );

  const columns = [
    // {
    //   field: 'category',
    //   headerName: 'Category',
    //   filterable: false,
    // },
    {
      field: 'commodity',
      headerName: 'Product',
      flex: 1,
      minWidth: 260,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params}/>,
    },
    {
      field: 'created_at',
      headerName: 'Create at',
      width: 260,
      renderCell: (params) => <RenderCellCreatedAt params={params}/>,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 260,
      // type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <ListItemText
        disableTypography
        primary={params.row.quantity}
      />
    },
    {
      field: 'nccf_order_status',
      headerName: 'Status',
      width: 110,
      // type: 'singleSelect',
      editable: true,
      valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params}/>,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold"/>}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold"/>}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold"/>}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="Orders"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Branch',
              href: paths.dashboard.product.root,
            },
            { name: 'Orders' },
          ]}
          action= {login_type !== "head-office" && (
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line"/>}
            >
              New Order
            </Button>
          )}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        <Card
          sx={{
            height: { xs: 800, md: 2 },
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <BranchTableToolbar
                      filters={filters}
                      onFilters={handleFilters}
                      stockOptions={PRODUCT_STOCK_OPTIONS}
                      publishOptions={PUBLISH_OPTIONS}
                    />

                    <GridToolbarQuickFilter/>

                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      {!!selectedRowIds.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds.length})
                        </Button>
                      )}

                      <GridToolbarColumnsButton/>
                      <GridToolbarFilterButton/>
                      <GridToolbarExport/>
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <BranchTableFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered.length}
                      sx={{ p: 2.5, pt: 0 }}
                    />
                  )}
                </>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data"/>,
              noResultsOverlay: () => <EmptyContent title="No results found"/>,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
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

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
