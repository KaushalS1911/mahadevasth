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
import { useBoolean } from 'src/hooks/use-boolean';
import { _roles, handleOrderTypes, PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import TableCell from '@mui/material/TableCell';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import moment from 'moment';
import { isAfter, isBetween } from '../../../utils/format-time';
import HeadQuickEditForm from '../head-order-quick-edit-form';
import HeadTableFiltersResult from '../head-table-filters-result';
import HeadTableToolbar from '../head-table-toolbar';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import Grid from '@mui/material/Unstable_Grid2';
import AnalyticsWidgetSummary from '../../overview/analytics/analytics-widget-summary';
import { LoadingScreen } from '../../../components/loading-screen';

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
  category: [],
  name: '',
  startDate: null,
  endDate: null,
  startDay: null,
  endDay: null,

};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

function HOList({ singleCode }) {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();
  const { vendor } = useAuthContext();

  const [tableData, setTableData] = useState([]);
const [loading,setLoading] = useState(false)
  const [filters, setFilters] = useState(defaultFilters);
  const commodityCount = {};
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [approve, setApprove] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  const [banch, setBanch] = useState([]);
  const [banchVal, setBanchVal] = useState('All');
  const [dataCSP, setDataCSP] = useState([]);
  const [branch, setBranch] = useState('All');
  const [b, setB] = useState([]);
  const dateError = isAfter(filters.startDate, filters.endDate);
  const dayError = isAfter(filters.startDay, filters.endDay);
  const [count, setCount] = useState([]);
  const getAllOrders = () => {
    const URL = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${banchVal}/order`;

    axios.get(URL).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err));
  };
  useEffect(() => {
    if (banchVal === 'All') {
      getOrders();
    } else {
      fetchData();
      getAllOrders();

    }

  }, [banchVal]);


  const getOrders = () => {
    setLoading(true)
    setBanchVal("All")
    setBranch("All")
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/order`)
      .then((res) => {
        setLoading(false)
        setTableData(res?.data?.data);
      }).catch((err) => {
      setLoading(false)
      console.log(err);
    });
  };

  useEffect(() => {

    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/branch`)
      .then((res) => {
        const fetchedData = res?.data?.data || [];
        const updatedData = [{ branch_name: 'All', csp_count: 1 }, ...fetchedData];
        setBanch(updatedData);
      }).catch((err) => console.log(err));

    // axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp/list`)
    //   .then((res) => {
    //     const fetchedData = res?.data?.data || [];
    //     const updatedData = [{ name: 'All', csp_code: 'All' }, ...fetchedData];
    //     setDataCSP(updatedData);
    //   }).catch((err) => console.log(err));
    // if (vendor) {
    getOrders();
    // }
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
    dateError,
  });

  // useEffect(() => {
  const fetchData = async () => {
    if (banchVal !== 'All') {
      setDataCSP([]);

      try {
        const res = await axios.get(
          `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${banchVal}/csp`,
        );

        let mapCsp = res.data.data.map((data) => ({
          name: data.name,
          csp_code: data.csp_code,
          order_count: data.order_count,
        }));

        const default1 = [{ name: 'All', csp_code: 'All', order_count: 1 }, ...mapCsp];
        setDataCSP(default1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


  // }, [banchVal]);

  const getCspOrder = (branch) => {

    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${branch}/orders`).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err));
  };
  useEffect(() => {
    if (branch === 'All') {
      getAllOrders();
    } else {
      getCspOrder(branch);
    }
  }, [branch]);


  const handleFilterCSP = useCallback(
    (event) => {
      setB(event.target.value);

      setBranch(event.target.value);

    },
    [branch],
  );
  const handleFilterBranch = useCallback(
    (event) => {
      setBanchVal(event.target.value);
      setBranch('All');
      // handleFilters('branch', event.target.value)
    },
    [branch],
  );
  const canReset = !isEqual(defaultFilters, filters) || (!!filters.startDate && !!filters.endDate) || (!!filters.startDay && !!filters.endDay);

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
    { label: 'accepted', count: 0 },
    { label: 'declined', count: 0 },
    { label: 'placed', count: 0 },
  ];

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


  const columns = [
    {
      field: 'seq_number',
      headerName: 'Sr No.',
      minWidth: 100,
      // renderCell: (params) => <Box>{params.row.id}</Box>, // You can use params.row.id directly
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
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
      minWidth: 50,
      // flex: 1, // This makes the column flexible
    },   {
      field: 'quantity_approved',
      headerName: 'Approved Quantity',
      minWidth: 100,
      flex: 1, // This makes the column flexible
    },
    {
      field: 'branch',
      headerName: 'Branch',
      minWidth: 100,
      flex: 1, // This makes the column flexible
    },
    {
      field: 'created_at',
      headerName: 'Date',
      minWidth: 150,
      flex: 1, // This makes the column flexible
      renderCell: (params) => moment(params.row.created_at).format('DD/MM/YYYY'),
    },
    {
      field: 'nccf_order_status',
      headerName: 'Intents Status',
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
            {params.row.nccf_order_status === 'accepted' ? 'Accepted' : params.row.nccf_order_status === 'declined' ? 'Declined' : 'Placed'}
          </Label>
        </TableCell>
      ),
    },
    {
      field: 'vendor1',
      headerName: 'Action',
      flex: 0.5,
      minWidth: 250,
      renderCell: (params) => <>
        <TableCell sx={{ px: 0, marginRight: 2 }}>
          <Button
            disabled={params.row.nccf_order_status === 'accepted' || params.row.nccf_order_status === 'declined'}
            variant="contained"
            onClick={() => {
              setCurrentData(params.row);
              setApprove(true);
              setOpen(true);
            }}
            sx={{ backgroundColor: 'green', width: 90 }}
          >
            <VerifiedIcon/> Approve
          </Button>
        </TableCell>
        <TableCell sx={{ px: 0 }}>
          <Button
            disabled={params.row.nccf_order_status === 'accepted' || params.row.nccf_order_status === 'declined'}
            onClick={() => {
              setCurrentData(params.row);
              setApprove(false);
              setOpen(true);
            }}
            variant="contained"
            sx={{ backgroundColor: 'red', width: 80 }}
          >
            <CancelIcon/> Reject
          </Button>
        </TableCell>
      </>,
    },

    // {
    //   type: 'actions',
    //   field: 'actions',
    //   headerName: ' ',
    //   align: 'right',
    //   headerAlign: 'right',
    //   width: 80,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:pen-bold" />}
    //       label="Edit"
    //       onClick={() => handleEditRow(params.row.id)} // Implement this function as needed
    //     />,
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:trash-bin-trash-bold" />}
    //       label="Delete"
    //       onClick={() => handleDeleteRow(params.row.id)} // Implement this function as needed
    //       sx={{ color: 'error.main' }}
    //     />,
    //   ],
    // },
  ];
  const color = ['primary', 'error', 'warning', 'error'];
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
      {loading ? <LoadingScreen /> :
      <><Container
        maxWidth={settings.themeStretch ? false : 'xl'}

      >
        <Grid container spacing={3}>

          {countsArray.map((data, ind) => (

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
        <CustomBreadcrumbs
          heading="Intent List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Intent',
              href: paths.dashboard.orders,
            },
            { name: 'List' },
          ]}

          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />
        <HeadQuickEditForm getAllDocument={getCspOrder} getOrder={getOrders} getAllBranch={getAllOrders} branch={banchVal} currentUser={currentData} open={open} setOpen={setOpen}
                           approve={approve} cspCode={branch}/>
        <Card
          sx={{
            height: dataFiltered?.length > 0 ? 'unset' : 700,
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
                    <FormControl
                      sx={{
                        flexShrink: 0,
                        width: { xs: 1, md: 200 },
                      }}
                    >
                      <InputLabel>Branch</InputLabel>

                      <Select
                        value={banchVal}
                        onChange={handleFilterBranch}
                        input={<OutlinedInput label="Branch"/>}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 240 },
                          },
                        }}

                      >
                        {banch.map((option) => (
                          <MenuItem key={option.branch_name} value={option.branch_name}
                                    disabled={option.csp_count == 0}>

                            {option.branch_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {banchVal !== 'All' && <FormControl
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

                      >
                        {dataCSP.map((option) => (
                          <MenuItem key={option.csp_code} value={option.csp_code} disabled={option.order_count == 0}>

                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>}

                    {canReset && (
                      <HeadTableFiltersResult
                        filters={filters}
                        onFilters={handleFilters}
                        onResetFilters={handleResetFilters}
                        results={dataFiltered.length}
                        sx={{ p: 2.5, pt: 0 }}
                      />
                    )}

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
                    <HeadTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles}
                                      branchOptions={['hello']} dateError={dateError} dayError={dayError}/>
                  </GridToolbarContainer>


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
      }
    </>
  );
};

function applyFilter({ inputData, filters, dateError, dayError }) {
  const { stock, publish, status, commodity, name, branch, startDate, endDate, startDay, endDay, category } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }
  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((product) => isBetween(product.created_at, startDate, endDate));
    }
  }
  if (!dayError) {
    if (startDay && endDay) {
      inputData = inputData.filter((product) => isBetween(product.created_at, startDay, endDay));
    }
  }
  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }
  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (category.length) {
    inputData = inputData.filter((user) => category.includes(user.category));
  }
  if (status !== 'all') {
    inputData = inputData.filter((user) => user.commodity === status);
  }

  if (commodity.length) {
    inputData = inputData.filter((user) => commodity.includes(user.nccf_order_status));
  }
  if (branch.length) {
    inputData = inputData.filter((user) => branch.includes(user.branch));
  }
  return inputData;
}

export default HOList;
