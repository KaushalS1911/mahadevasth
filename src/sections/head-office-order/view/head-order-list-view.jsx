import isEqual from 'lodash/isEqual';
import React, { useState, useCallback, useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { _roles, _userList, ORDER_STATUS_OPTIONS, USER_STATUS_OPTIONS } from 'src/_mock';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { DOCUMENTS } from 'src/_mock/_document';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
// import DistributorTableRow from '../distributor-table-row';
// import DistributorTableToolbar from '../distributor-table-toolbar';
// import DistributorTableFiltersResult from '../distributor-table-filters-result';
import { LoadingScreen } from '../../../components/loading-screen';
import { Box } from '@mui/system';
import BranchTableToolbar from '../branch-table-toolbar';
import BranchTableFiltersResult from '../branch-table-filters-result';
import BranchTableRow from '../branch-table-row';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from '../../overview/app/app-widget-summary';
import UserListView from '../../../pages/user/view/user-list-view';
import { useGetBranchOrder, useGetBranchOrderCount } from '../../../api/branch-order';

// ----------------------------------------------------------------------

// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr No', width: 88,align:"center" },
  { id: 'name', label: 'Name', },
  { id: 'commodity', label: 'Commodity' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'branch', label: 'Branch' },
  { id: 'nccf_order_status', label: 'Status' },
   { id: '', label: '', width: 20 },
];
const defaultFilters = {
  name: '',
  commodity: [],
  status: 'all',
  branch:[]

};

// ----------------------------------------------------------------------
export default function HeadOrderListView() {
const STATUS_OPTIONS = [{ value: 'all', label: 'All' },{value: "accepted",label: "Accepted"}, {value: "placed",label:"Placed"},{value:"declined",label:"Declined"}];
  const { vendor } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loading,setLoading] = useState(false)
  const {order,orderLoading} = useGetBranchOrder()
  const {orderCount} = useGetBranchOrderCount()
  useEffect(() => {
    fetchStates();
  }, [tableData]);
  useEffect(() => {
    if(order){
    setTableData(order)
         }
  }, [order]);


  const table = useTable();
  const settings = useSettingsContext();
  const router = useRouter();
  const confirm = useBoolean();
  const [filters, setFilters] = useState(defaultFilters);
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });



  function fetchStates() {
    dataFiltered?.map((data) => {

      setBranchOptions((item) =>
      {
        if (!item.includes(data.branch)) {
          return [...item, data.branch];
        } else {
          return item;
        }
      });

    });
  }




  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 56 + 20;
  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      enqueueSnackbar('Delete success!');
      setTableData(deleteRow);
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    enqueueSnackbar('Delete success!');
    setTableData(deleteRows);
    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, enqueueSnackbar, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (code) => {
      router.push(paths.dashboard.distributor.distributor_document_view(code));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );
  const handleDistributor = (code) =>{
    router.push(paths.dashboard.distributor.distributor_view(code));

  }


  return (
    <>
      {orderLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            backgroundColor: "white"
          }}
        >


          <LoadingScreen sx={{ margin: 'auto' }}/>
        </Box>
      ) :
        (<>
          <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Grid container spacing={3} mb={2}>
              <Grid xs={12} md={2.4}>
                <AppWidgetSummary
                  title="Total Orders"
                  total={orderCount?.total_orders || '0'}

                />
              </Grid>
              <Grid xs={12} md={2.4}>
                <AppWidgetSummary
                  title="Completed Orders"
                  total={orderCount?.completed_orders ? orderCount?.completed_orders : '0'}

                />
              </Grid>

              <Grid xs={12} md={2.4}>
                <AppWidgetSummary
                  title="Declined Orders"
                  total={orderCount?.declined_orders || '0'}

                />
              </Grid>

              <Grid xs={12} md={2.4}>
                <AppWidgetSummary
                  title="Placed Orders"
                  total={orderCount?.placed_orders || '0'}

                />
              </Grid>

              <Grid xs={12} md={2.4}>
                <AppWidgetSummary
                  title="Accepted Orders"
                  total={orderCount?.accepted_orders || '0'}

                />
              </Grid>

            </Grid>
          </Container>
          <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <CustomBreadcrumbs
              heading="Order list"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Order', href: paths.dashboard.orders },
                { name: 'List' },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
            <Card>
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
                          (tab.value === 'accepted' && 'success') ||
                          (tab.value === 'placed' && 'warning') ||
                          (tab.value === 'declined' && 'error') ||
                          'default'
                        }
                      >
                        {['accepted', 'declined', 'placed'].includes(tab.value)
                          ? tableData.filter((user) => user.nccf_order_status === tab.value).length
                          : tableData.length}
                      </Label>
                    }
                  />
                ))}
              </Tabs>

              <BranchTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles}  branchOptions={branchOptions} />

              {canReset && (
                <BranchTableFiltersResult
                  filters={filters}
                  onFilters={handleFilters}
                  onResetFilters={handleResetFilters}
                  results={dataFiltered.length}
                  sx={{ p: 2.5, pt: 0 }}
                />
              )}

              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <TableSelectedAction
                  dense={true}
                  numSelected={table.selected.length}
                  rowCount={dataFiltered.length}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                  action={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={confirm.onTrue}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </Tooltip>
                  }
                />

                <Scrollbar>
                  <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                    <TableHeadCustom
                      order={table.order}
                      orderBy={table.orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={dataFiltered.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          dataFiltered.map((row) => row.id)
                        )
                      }
                    />
                    <TableBody>
                      {dataFiltered
                        ?.slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        ?.map((row, index) => (
                          <BranchTableRow
                            key={row.id}
                            index={index}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onViewRow={() => handleViewRow(row.csp_code)}
                            onEditRow={() => handleEditRow(row.id)}
                            onView={() => handleDistributor(row.csp_code)}
                          />
                        ))}
                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                      />
                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={dataFiltered.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
                dense={true}
                onChangeDense={table.onChangeDense}
              />
            </Card>
          </Container>

          <ConfirmDialog
            open={confirm.value}
            onClose={confirm.onFalse}
            title="Delete"
            content={
              <>
                Are you sure want to delete <strong>{table.selected.length}</strong> items?
              </>
            }
            action={
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  handleDeleteRows();
                  confirm.onFalse();
                }}
              >
                Delete
              </Button>
            }
          />
      </>)}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, commodity,branch } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }


  if (status !== 'all') {
    inputData = inputData.filter((user) => user.nccf_order_status === status);
  }

  if (commodity.length) {
    inputData = inputData.filter((user) => commodity.includes(user.commodity));
  }
  if (branch.length) {
    inputData = inputData.filter((user) => branch.includes(user.branch));
  }
  return inputData;
}
