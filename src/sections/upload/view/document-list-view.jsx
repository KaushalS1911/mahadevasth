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
import DocumentTableRow from '../document-table-row';
import DocumentTableToolbar from '../document-table-toolbar';
import DocumentTableFiltersResult from '../document-table-filters-result';
import { DOCUMENTS } from 'src/_mock/_document';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import { Box } from '@mui/system';
import { LoadingScreen } from '../../../components/loading-screen';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const TABLE_HEAD = [
  { id: 'srNo', label: 'Sr No', width: 100 },
  { id: 'object_url', label: 'Document Image', width: 180 },
  { id: 'doc_type', label: 'Document Type', width: 180 },
  { id: 'uploaded_on', label: 'Date', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 100 },
];
const defaultFilters = {
  name: '',
  role: [],
  type: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function DocumentListView({ csp, document, miller ,cspt}) {
  const { vendor } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tab = [
    { value: 'all', label: 'All' },
    { value: 'Aadhar', label: 'Aadhar' },
    { value: 'pan_number', label: 'PAN' },
    { value: 'gst_number', label: 'GST' },
    { value: 'certificates', label: 'Certificates' },
  ];
  useEffect(() => {
    getAllDocument();
  }, [csp]);
  function getAllDocument() {
    setLoading(true);
    const cspCode = csp || vendor?.csp_code;

    if (cspCode) {
      axios
        .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${cspCode}/documents`)
        .then((res) => {
          setTableData(res?.data?.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
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

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage,
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
    [table],
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
    [dataInPage.length, enqueueSnackbar, table, tableData],
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
    [router],
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.document.document_view);
    },
    [router],
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters],
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
            backgroundColor: 'white',
          }}
        >


          <LoadingScreen sx={{ margin: 'auto' }}/>
        </Box>
      ) : (<>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>

          <CustomBreadcrumbs
            heading={miller ? 'Miller Documents' : cspt ? "CSP Documents" : `Distributor Documents`}
            links={[
              {
                name: 'Dashboard',
                href: paths.dashboard.root,
              },
              {
                name: miller ? 'Miller List' : cspt ? "CSP List"  : 'Distributor List',
                href: miller ? paths.dashboard.miller.miller_list : cspt ? paths.dashboard.csp.csp_list :paths.dashboard.distributor.distributor_list,
              },

              {
                name: miller ? `Miller Documents` : cspt ? 'CSP Document' : `Distributor Documents`,
              },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
            action={
              (dataFiltered?.length == 0 && !cspt) &&
              <Button
                component={RouterLink}
                href={miller ? paths.dashboard.miller.document_upload : paths.dashboard.distributor.document_upload}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line"/>}

              >
                Upload Document
              </Button>
            }
          />
          <Card>

            <DocumentTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles} document={document}/>

            {canReset && (
              <DocumentTableFiltersResult
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
                    dataFiltered.map((row) => row.id),
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold"/>
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
                        dataFiltered.map((row) => row.id),
                      )
                    }
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage,
                      )
                      .map((row, index) => (
                        <DocumentTableRow
                          key={row.id}
                          index={index}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                    />
                    <TableNoData notFound={notFound}/>
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
      </>)
      }
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(
  {
    inputData, comparator, filters,
  },
) {
  const { name, status, role, type } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.doc_type.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.doc_type === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }
  if (type.length) {
    inputData = inputData.filter((user) => type.includes(user.doc_type));
  }

  return inputData;
}
