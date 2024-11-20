import isEqual from 'lodash/isEqual';
import { useState, useCallback, useEffect } from 'react';
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
import { _roles, _userList, USER_STATUS_OPTIONS } from 'src/_mock';
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
import MillerTableToolbar from '../miller-table-toolbar';
import MillerTableFiltersResult from '../miller-table-filters-result';
import MillerTableRow from '../miller-table-row';
import { Box } from '@mui/system';
import { LoadingScreen } from '../../../components/loading-screen';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr No', width: 88,align:"center" },
  { id: 'name', label: 'Name', width: 100 },
  { id: 'category', label: 'Category', width: 100 },
  { id: 'type_of_firm', label: 'Type of firm', width: 100 },
  { id: 'contact_person', label: 'Contact person', width: 100 },
  { id: 'phone', label: 'Phone', width: 100 },
  { id: 'email', label: 'Email', width: 100 },
  { id: 'address', label: 'Address', width: 100 },
  { id: '', label: '', width: 20},
];
const defaultFilters = {
  name: '',
  type_of_firm: [],
  state:[],
  branch:[],
  district:[],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function MillerListView() {
  const { vendor } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    fetchStates();
  }, [tableData]);
  useEffect(() => {
    getAllDocument();
  }, []);
  function getAllDocument() {
    setLoading(true)
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/sub_mil_dist`
      )
      .then((res) => {
        setTableData(res?.data?.data);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }

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
      setStateOptions((item) => {
        if (!item.includes(data.state)) {
          return [...item, data.state];
        } else {
          return item;
        }
      });
      setBranchOptions((item) =>
      {
        if (!item.includes(data.branch)) {
          return [...item, data.branch];
        } else {
          return item;
        }
      });
      setDistrictOptions((item) => {
        if (!item.includes(data.district)) {
          return [...item, data.district];
        } else {
          return item;
        }
      });
    });
  }
  const handleMiller = (code) =>{
    router.push(paths.dashboard.miller.miller_view(code));

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
    (csp) => {
      router.push(paths.dashboard.miller.miller_document_view(csp));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <>
      {loading ? (
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
      ) : (<>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <CustomBreadcrumbs
            heading="Miller list"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'miller', href: paths.dashboard.miller },
              { name: 'List' },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
          <Card>


            <MillerTableToolbar  filters={filters} onFilters={handleFilters} roleOptions={_roles} stateOptions={stateOptions} branchOptions={branchOptions} districtOptions={districtOptions} />

            {canReset && (
              <MillerTableFiltersResult
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
                        <MillerTableRow
                          key={row.id}
                          index={index}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onViewRow={() => handleViewRow(row.csp_code)}
                          onEditRow={() => handleEditRow(row.id)}
                          onView={() => handleMiller(row.csp_code)}
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
  const { name, status, type_of_firm ,state,branch,district} = filters;

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
    inputData = inputData.filter((user) => user.doc_type === status);
  }

  if (type_of_firm.length) {
    inputData = inputData.filter((user) => type_of_firm.includes(user.type_of_firm));
  } if (state.length) {
    inputData = inputData.filter((user) => state.includes(user.state));
  } if (branch.length) {
    inputData = inputData.filter((user) => branch.includes(user.branch));
  } if (district.length) {
    inputData = inputData.filter((user) => district.includes(user.district));
  }

  return inputData;
}
