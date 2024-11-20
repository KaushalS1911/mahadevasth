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
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/api/product';
import { _roles, handleOrderTypes, PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import BranchTableToolbar from '../branch-table-toolbar';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
// import Label from '../../../components/label';
// import BranchTableFiltersResult from '../branch-table-filters-result';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import BranchTableFiltersResult from '../branch/branch-table-filters-result';
// import BranchTableToolbar from '../branch/branch-table-toolbar';
import Label from '../../components/label';
import { useAuthContext } from '../../auth/hooks';
import BranchTableToolbar from '../branch-order/branch-table-toolbar';
import Grid from '@mui/material/Unstable_Grid2';
import AnalyticsWidgetSummary from '../overview/analytics/analytics-widget-summary';

// import ProductTableFiltersResult from '../product-table-filters-result';
// import {
//   RenderCellStock,
//   RenderCellPrice,
//   RenderCellPublish,
//   RenderCellProduct,
//   RenderCellCreatedAt,
// } from '../product-table-row';
const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters = {
  publish: [],
  stock: [],
  commodity: [],
  status: 'all',
  branch: [],
  name: '',
  category:[]

};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

function Orders({singleCode}) {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();
  const {vendor} = useAuthContext()

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  // const { order, orderLoading } = useGetBranchOrder();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  const [dataCSP, setDataCSP] = useState([]);
  const [branch, setBranch] = useState([]);
  const [b, setB] = useState([]);

  useEffect(() => {
    const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${singleCode}/orders`;

    axios.get(URL).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err))
    // if (order.length) {
    //   setTableData(order);
    // }
  }, [singleCode,]);
  useEffect(() => {
    if (vendor) {
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/branch/${vendor?.branch}/csp/list`).then((res) => setDataCSP(res?.data?.data)).catch((err) => console.log(err));
    }
  }, []);
  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const handleFilterCSP = useCallback(
    (event) => {
      setB(event.target.value);

      setBranch(event.target.value);
      // getAllDocument(event.target.value.at(0))
      // onFilters(
      //   'type',
      //   typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      // );
    },
    [branch],
  );
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
  const countsArray = [
    { label: "accepted", count: 0 },
    { label: "declined", count: 0 },
    { label: "placed", count: 0 }
  ];
  const color = ["primary","error","warning","error"]
  countsArray.forEach(commodity => {
    commodity.count = dataFiltered.filter(item => item.nccf_order_status === commodity.label).length;
  });
  const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, { value: 'Bharat Aata', label: 'Bharat Aata' }, {
    value: 'Bharat Daal',
    label: 'Bharat Daal',
  }, { value: 'Bharat Rice', label: 'Bharat Rice' }];
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


  // const columns = [
  //   // {
  //   //   field: 'category',
  //   //   headerName: 'Category',
  //   //   filterable: false,
  //   // },
  //   {
  //     field: 'id',
  //     headerName: '#',
  //     width: 142,
  //     renderCell: (params) => <Box>{i+=1}</Box>,
  //   },
  //   {
  //     field: 'name',
  //     headerName: 'Name',
  //     flex: 1,
  //     minWidth: 250,
  //     hideable: false,
  //     // renderCell: (params) => <RenderCellProduct params={params} />,
  //   },
  //   {
  //     field: 'commodity',
  //     headerName: 'Commodity',
  //     width: 300,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //
  //   {
  //     field: 'quantity',
  //     headerName: 'Quantity',
  //     width: 200,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'branch',
  //     headerName: 'Branch',
  //     width: 300,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   }, {
  //     field: 'nccf_order_status',
  //     headerName: 'Status',
  //     width: 160,
  //     renderCell: (params) => <TableCell>
  //       <Label
  //         variant="soft"
  //         color={
  //           (params.row.nccf_order_status === 'accepted' && 'success') ||
  //           (params.row.nccf_order_status === 'placed' && 'warning') ||
  //           (params.row.nccf_order_status === 'declined' && 'error') ||
  //           'default'
  //         }
  //       >
  //         {params.row.nccf_order_status}
  //       </Label></TableCell>,
  //   },
  //   // {
  //   //   field: 'inventoryType',
  //   //   headerName: 'Stock',
  //   //   width: 160,
  //   //   type: 'singleSelect',
  //   //   valueOptions: PRODUCT_STOCK_OPTIONS,
  //   //   renderCell: (params) => <RenderCellStock params={params} />,
  //   // },
  //   // {
  //   //   field: 'price',
  //   //   headerName: 'Price',
  //   //   width: 140,
  //   //   editable: true,
  //   //   renderCell: (params) => <RenderCellPrice params={params} />,
  //   // },
  //   // {
  //   //   field: 'publish',
  //   //   headerName: 'Publish',
  //   //   width: 110,
  //   //   type: 'singleSelect',
  //   //   editable: true,
  //   //   valueOptions: PUBLISH_OPTIONS,
  //   //   renderCell: (params) => <RenderCellPublish params={params} />,
  //   // },
  //   {
  //     type: 'actions',
  //     field: 'actions',
  //     headerName: ' ',
  //     align: 'right',
  //     headerAlign: 'right',
  //     width: 80,
  //     sortable: false,
  //     filterable: false,
  //     disableColumnMenu: true,
  //     getActions: (params) => [
  //
  //       <GridActionsCellItem
  //         showInMenu
  //         icon={<Iconify icon="solar:pen-bold"/>}
  //         label="Edit"
  //         // onClick={() => handleEditRow(params.row.id)}
  //       />,
  //       <GridActionsCellItem
  //         showInMenu
  //         icon={<Iconify icon="solar:trash-bin-trash-bold"/>}
  //         label="Delete"
  //         // onClick={() => {
  //         //   handleDeleteRow(params.row.id);
  //         // }}
  //         sx={{ color: 'error.main' }}
  //       />,
  //     ],
  //   },
  // ];
  const columns = [
    {
      field: 'seq_number',
      headerName: 'Sr No.',
      minWidth: 100,
      // renderCell: (params) => <Box>{params.row.id}</Box>, // You can use params.row.id directly
    },
    {
      field: 'commodity',
      headerName: 'Commodity',
      minWidth: 150,
      flex: 1, // This makes the column flexible
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      minWidth: 100,
      flex: 1, // This makes the column flexible
    },
    {
      field: 'quantity_approved',
      headerName: 'Approved Quantity',
      minWidth: 100,
      flex: 1, // This makes the column flexible
    },
    {
      field: 'created_at',
      headerName: 'Date',
      minWidth: 150,
      flex: 1, // This makes the column flexible
      renderCell: (params) => moment(params.row.created_at).format("DD/MM/YYYY"),
    },
    {
      field: 'nccf_order_status',
      headerName: 'Status',
      minWidth: 100,
      flex: 1, // This makes the column flexible
      renderCell: (params) => (
        <TableCell>
          <Label
            variant="soft"
            color={
              (params.row.nccf_order_status === 'accepted' && 'success') ||
              (params.row.nccf_order_status === 'placed' && 'warning') ||
              (params.row.nccf_order_status === 'declined' && 'error') ||
              'default'
            }
          >
            {params.row.nccf_order_status}
          </Label>
        </TableCell>
      ),
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
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)} // Implement this function as needed
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)} // Implement this function as needed
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
        maxWidth={settings.themeStretch ? false : 'xl'}
        // sx={{
        //   flexGrow: 1,
        //   display: 'flex',
        //   flexDirection: 'column',
        // }}
      >
        <Grid container spacing={3}>

          {countsArray.map((data,ind) => (

            <Grid item xs={12} md={4} mb={5}>
              <AnalyticsWidgetSummary
                title={handleOrderTypes(data?.label)}
                // percent={0.2}
                total={data?.count == 0 ? '0' : data.count}
                color={color[ind]}
                chart={{
                  // colors: color[ind-1],
                  // series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          ))}
        </Grid>
        {/*<CustomBreadcrumbs*/}
        {/*  heading="Order List"*/}
        {/*  links={[*/}
        {/*    { name: 'Dashboard', href: paths.dashboard.root },*/}
        {/*    {*/}
        {/*      name: 'Order',*/}
        {/*      href: paths.dashboard.orders,*/}
        {/*    },*/}
        {/*    { name: 'List' },*/}
        {/*  ]}*/}
        {/*   action={*/}
        {/*  //   <Button*/}
        {/*  //     component={RouterLink}*/}
        {/*  //     href={paths.dashboard.product.new}*/}
        {/*  //     variant="contained"*/}
        {/*  //     startIcon={<Iconify icon="mingcute:add-line" />}*/}
        {/*  //   >*/}
        {/*  //     New Product*/}
        {/*  //   </Button>*/}
        {/*  // }*/}
        {/*//   sx={{*/}
        {/*//     mb: {*/}
        {/*//       xs: 3,*/}
        {/*//       md: 5,*/}
        {/*//     },*/}
        {/*//   }}*/}
        {/*// />*/}

        <Card
          sx={{
            height: dataFiltered?.length > 0 ? "unset" : 700,
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'Bharat Aata' && 'success') ||
                      (tab.value === 'Bharat Daal' && 'warning') ||
                      (tab.value === 'Bharat Rice' && 'error') ||
                      'default'
                    }
                  >
                    {['Bharat Aata', 'Bharat Rice', 'Bharat Daal'].includes(tab.value)
                      ? tableData.filter((user) => user.commodity === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <DataGrid
            // checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            // loading={orderLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            // onRowSelectionModelChange={(newSelectionModel) => {
            //   setSelectedRowIds(newSelectionModel);
            // }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    {/*<ProductTableToolbar*/}
                    {/*  filters={filters}*/}
                    {/*  onFilters={handleFilters}*/}
                    {/*  stockOptions={PRODUCT_STOCK_OPTIONS}*/}
                    {/*  publishOptions={PUBLISH_OPTIONS}*/}
                    {/*/>*/}
                    {!singleCode && <FormControl
                      sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 200 },
                      }}
                    >
                      <InputLabel>CSP</InputLabel>

                      <Select
                        value={branch}
                        onChange={handleFilterCSP}
                        input={<OutlinedInput label="CSP"/>}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 240 },
                          },
                        }}
                        // renderValue={(selected) => selected.join(', ')}
                      >
                        {dataCSP.map((option) => (
                          <MenuItem key={option.csp_code} value={option.csp_code}>
                            {/*<Checkbox*/}
                            {/*  disableRipple*/}
                            {/*  size="small"*/}
                            {/*  checked={branch.includes(option.csp_code)}*/}
                            {/*/>*/}
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>}
                    {canReset && (
                      <BranchTableFiltersResult
                        filters={filters}
                        onFilters={handleFilters}
                        onResetFilters={handleResetFilters}
                        results={dataFiltered.length}
                        sx={{ p: 2.5, pt: 0 }}
                      />
                    )}
                    {/*<GridToolbarQuickFilter />*/}
                    {/**/}
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
                      {/*<GridToolbarFilterButton/>*/}
                      <GridToolbarExport/>
                    </Stack>
                    <BranchTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles}
                                        branchOptions={['hello']}/>
                  </GridToolbarContainer>

                  {/*{canReset && (*/}
                  {/*  <ProductTableFiltersResult*/}
                  {/*    filters={filters}*/}
                  {/*    onFilters={handleFilters}*/}
                  {/*    onResetFilters={handleResetFilters}*/}
                  {/*    results={dataFiltered.length}*/}
                  {/*    sx={{ p: 2.5, pt: 0 }}*/}
                  {/*  />*/}
                  {/*)}*/}
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

function applyFilter({ inputData, filters }) {
  const { stock, publish, status, commodity, name, branch ,category} = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }
  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }


  if (status !== 'all') {
    inputData = inputData.filter((user) => user.commodity === status);
  }

  if (commodity.length) {
    inputData = inputData.filter((user) => commodity.includes(user.commodity));
  }
  if (branch.length) {
    inputData = inputData.filter((user) => branch.includes(user.branch));
  }
  if (category.length) {
    inputData = inputData.filter((user) => category.includes(user.category));
  }
  return inputData;
}

export default Orders;
