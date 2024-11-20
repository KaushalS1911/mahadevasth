import React, { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
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
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';
import {
  Container,
  Card,
  Table,
  TableBody,
  TableContainer,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { _commodities, _orderStatus, _roles, USER_STATUS_OPTIONS } from 'src/_mock';
import isEqual from 'lodash/isEqual';
import AppDialog from 'src/sections/overview/app/app-dialog';
import EditOrderDialog from '../../../sections/overview/app/edit-order-dialog';
import { useAuthContext } from '../../../auth/hooks';
import axios from 'axios';
// ----------------------------------------------------------------------
const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr No', width: 100 },
  { id: 'commodity', label: 'Commodity', width: 200 },
  { id: 'quantity', label: 'Quantity', width: 200 },
  { id: 'quantity_approved', label: 'Approved Quantity', width: 200 },
  { id: 'created_at', label: 'Date', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];
const defaultFilters = {
  name: '',
  commodity: [],
  order_status: [],
  status: 'all',
};
// ----------------------------------------------------------------------
export default function UserListView({ tableData ,fetchAllOrdersDemo}) {
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const router = useRouter();
  const confirm = useBoolean();
  const table = useTable();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(0);
  const [commodities, setCommodities] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [edit,setEdit] = useState({});
  const {vendor} = useAuthContext()
useEffect(() => {
  fetchCommodities()
},[])
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  function fetchCommodities() {
    axios
      .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity/${vendor?.category}`)
      .then((res) => {
        setCommodities(res.data?.data);
      });
  }
  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 56 : 76;
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
    (row) => {
      setEditDialogOpen(row?.id)
      setEdit(row)
      // console.log(id);
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleAddOrder = useCallback(
    (newOrder) => {
      setTableData((prevData) => [...prevData, newOrder]);
    },
    [enqueueSnackbar]
  );
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xxl'}>
        {vendor?.nccf_branch_status !== "1"  &&   <Card sx={{ mb: 2, p: 1.5, color: '#b71d18', backgroundColor: '#FFE4DE' }}>
          { vendor?.nccf_branch_status == "" ? 'Account approval is pending from the Branch,You can place the orders after account approval' : 'Account is declined from the Branch..\n' +
            'You can\'t place the orders after account declined'
          }
        </Card>}
        <CustomBreadcrumbs
          heading="Intent"
          links={[{ name: '' }]}
          action={
            <Button
              disabled={vendor?.nccf_branch_status == "1" ? false : true}
              component={RouterLink}
              // href={paths.dashboard.orders}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => {
                setDialogOpen(true)
              }}
            >
              Add Intent
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <UserTableToolbar filters={filters} onFilters={handleFilters} commodityOptions={commodities} orderStatusOptions={_orderStatus}/>
          {canReset && (
            <UserTableFiltersResult
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
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <UserTableRow
                        key={row.id}
                        row={{ ...row, index }}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />
                  <TableNoData isNotFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
            <TablePaginationCustom
              count={dataFiltered.length}
              page={table.page}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onRowsPerPageChange={table.onChangeRowsPerPage}
              dense={table.dense}
              onChangeDense={table.onChangeDense}
            />
          </TableContainer>
        </Card>
      </Container>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure you want to delete?"
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

      <AppDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} editId={edit} fetchAllOrdersDemo={fetchAllOrdersDemo} commodities={commodities}/>
      <EditOrderDialog editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} editData={edit} dataFiltered={dataFiltered} commodities={commodities} fetchAllOrdersDemo={fetchAllOrdersDemo}/>
    </>
  );
}
// ----------------------------------------------------------------------
function applyFilter({ inputData, comparator, filters }) {
  const { name, status, commodity, order_status } = filters;
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);
  if (name) {
    inputData = inputData.filter((user) =>
      user.commodity.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }
  if (commodity.length) {
    inputData = inputData.filter((user) => commodity.includes(user.commodity));
  }
  if (order_status.length) {
    inputData = inputData.filter((user) => order_status.includes(user.nccf_order_status));
  }
  return inputData;
}
