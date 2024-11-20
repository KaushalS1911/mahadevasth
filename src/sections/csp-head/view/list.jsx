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
import { _roles, PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetBranchOrder } from '../../../api/branch-order';
// import BranchTableToolbar from '../branch-table-toolbar';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Label from '../../../components/label';
import TableCell from '@mui/material/TableCell';
import { useAuthContext } from '../../../auth/hooks';
import axios from 'axios';
import CspTableToolbar from '../csp-head-table-toolbar';
import CspTableFiltersResult from '../csp-head-table-filters-result';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Box } from '@mui/system';
import { isAfter, isBetween } from '../../../utils/format-time';

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const defaultFilters = {
  name: '',
  type_of_firm: [],
  state: [],
  branch: [],
  district: [],
  category: [],
  status: 'all',
  csp:[],
  startDay: null,
  endDay: null,

};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

function CspHeadListView(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { vendor } = useAuthContext();
  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  const [banch, setBanch] = useState([]);
  const [banchVal, setBanchVal] = useState('All');
  const dayError = isAfter(filters.startDay, filters.endDay);
  useEffect(() => {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/branch`)
      .then((res) => {
        const fetchedData = res?.data?.data || [];
        const updatedData = [{ branch_name: 'All',csp_count:1 }, ...fetchedData];
        setBanch(updatedData);
      }).catch((err) => console.log(err));
    // if (csp?.length) {
// axios.get("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp")
//   .then((res) => (res.data.data).map((data,index) => setTableData((pdata) => [...pdata ,{...data,id:index+1}])))
//   .catch((err) => console.log(err))


    // }
  }, []);
  useEffect(() => {
    if (banchVal === 'All') {
      setTableData([]);
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp`)
        .then((res) => (res.data.data).map((data, index) => setTableData((pdata) => [...pdata, {
          ...data,
          id: index + 1,
        }])))
        .catch((err) => console.log(err));
    } else {
      getAllCSP(banchVal);

    }

  }, [banchVal]);

  function getAllCSP(code) {
    // setLoading(true)
    setTableData([]);
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${code}/csp`,
      )
      .then((res) =>  setTableData(res.data.data))
      .catch((err) => console.error(err));
  }


  useEffect(() => {
    fetchStates();
  }, [tableData]);

  const handleFilterBranch = useCallback(
    (event) => {
      setBanchVal(event.target.value);
      // handleFilters('branch', event.target.value)
    },
    [banch],
  );
  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  function fetchStates() {
    dataFiltered?.map((data) => {
      setStateOptions((item) => {
        if (data.state !== "" && !item.includes(data.state)) {
          return [...item, data.state];
        } else {
          return item;
        }
      });
      setBranchOptions((item) => {
        if (data.branch !== "" && !item.includes(data.branch)) {
          return [...item, data.branch];
        } else {
          return item;
        }
      });
      setDistrictOptions((item) => {
        if (data.district !== "" && !item.includes(data.district)) {
          return [...item, data.district];
        } else {
          return item;
        }
      });
    });
  }

  const canReset = !isEqual(defaultFilters, filters)  || (!!filters.startDay && !!filters.endDay);

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
  const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, { value: 'miller', label: 'Miller' }, {
    value: 'distributor',
    label: 'Distributor',
  }, { value: 'society_cooperative', label: 'Society' }, {
    value: 'miller_distributor',
    label: 'Miller & Distributor',
  }];
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
    (code) => {
      router.push(paths.dashboard.headCsp.csp_document_view(code));
    },
    [router],
  );
  const handleDistributor = (code) => {
    router.push(paths.dashboard.headCsp.csp_view(code));

  };
  // const handleViewRow = useCallback(
  //   (id) => {
  //     // router.push(paths.dashboard.product.details(id));
  //   },
  //   [router]
  // );

  // const columns = [
  //   // {
  //   //   field: 'category',
  //   //   headerName: 'Category',
  //   //   filterable: false,
  //   // },
  //   {
  //     field: 'id',
  //     headerName: '#',
  //     align: 'center',
  //     headerAlign: 'center',
  //     width: 10,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'name',
  //     headerName: 'Name',
  //     flex: 1,
  //     // width: 220,
  //     minWidth: 106,
  //     hideable: false,
  //     renderCell: (params) => <TableCell sx={{ fontWeight:"bold",cursor:"pointer",px:"0"}} onClick={() => handleDistributor(params.row.csp_code)} >{params.row.name}</TableCell>,
  //   },
  //   // {
  //   //   field: 'category',
  //   //   headerName: 'Category',
  //   //   width: 200,
  //   //   // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   // },
  //
  //   {
  //     field: 'type_of_firm',
  //     headerName: 'Type Of Firm',
  //     width: 150,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'contact_person',
  //     headerName: 'Contact Person',
  //     width: 160,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'phone_number',
  //     headerName: 'Contact',
  //     width: 150,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     width: 160,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'address',
  //     headerName: 'Address',
  //     width: 240,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'csp_status',
  //     headerName: 'Status',
  //     renderCell: (params) => (
  //       <TableCell sx={{px:0}}>
  //         <Label
  //           variant="soft"
  //           color={
  //             (params.row.csp_status === '0' && 'success') ||
  //             (params.row.csp_status === '1' && 'warning') ||
  //             // (params.row.branch_approval_status === 'declined' && 'error') ||
  //             'default'
  //           }
  //         >
  //           {params.row.csp_status === "0" ? "Approved" : "Approval Pending"}
  //         </Label>
  //       </TableCell>
  //     ),
  //     width: 150,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
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
  //     // type: 'actions',
  //     field: 'actions',
  //     headerName: ' ',
  //     align: 'right',
  //     headerAlign: 'right',
  //     width: 100,
  //     sortable: false,
  //     filterable: false,
  //     disableColumnMenu: true,
  //     renderCell: (params) => <Button variant={"contained"} sx={{backgroundColor:params.row.document_count === 0 ? "gray" : "Green"}} onClick={() => handleViewRow(params.row.csp_code)} disabled={params.row.document_count === 0}>View</Button>
  //     // getActions: (params) => [
  //     //
  //     //   <GridActionsCellItem
  //     //     showInMenu
  //     //     icon={<Iconify icon="solar:eye-bold" />}
  //     //     label="View Documents"
  //     //     onClick={() => handleViewRow(params.row.csp_code)}
  //     //   />,
  //     //   // <GridActionsCellItem
  //     //   //   showInMenu
  //     //   //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
  //     //   //   label="Delete"
  //     //   //   onClick={() => {
  //     //   //     handleDeleteRow(params.row.id);
  //     //   //   }}
  //     //   //   sx={{ color: 'error.main' }}
  //     //   // />,
  //     // ],
  //   },
  // ];

  const columns = [
    {
      field: 'seq_number',
      headerName: 'Sr No.',
      align: 'center',
      headerAlign: 'center',
      width: 70,
      // Optional: Add a minWidth if needed
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      hideable: false,
      renderCell: (params) => (
        <TableCell sx={{ fontWeight: 'bold', cursor: 'pointer', px: '0' }}
                   onClick={() => handleDistributor(params.row.csp_code)}>
          {params.row.name}
        </TableCell>
      ),
    },
    {
      field: 'type_of_firm',
      headerName: 'Type Of Firm',
      minWidth: 220,
      // width: 150,
    },
    {
      field: 'contact_person',
      headerName: 'Contact Person',
      // width: 120,
      minWidth: 220,
    },
    {
      field: 'phone_number',
      headerName: 'Contact',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      // width: 160,
      minWidth: 200,
    },
    // {
    //   field: 'address',
    //   headerName: 'Address',
    //   width: 240,
    //   flex: 1,
    //   minWidth: 240,
    // },
    {
      field: 'order_count',
      headerName: 'Intents',
      // width: 40,
      // flex: 1,
      minWidth: 100,
    },
    {
      field: 'branch_approval_status',
      headerName: 'Status',
      minWidth: 180,
      renderCell: (params) => (
        <TableCell sx={{ px: 0 }}>
          <Label
            variant="soft"
            color={
              (params.row.branch_approval_status === '1' && 'success') ||
              (params.row.branch_approval_status === '' && 'warning') ||
              (params.row.branch_approval_status === '0' && 'error') ||
              'default'
            }
          >
            {params.row.branch_approval_status === '1' ? 'Approved':params.row.branch_approval_status === '0' ? 'Declined' : 'Approval Pending'}
          </Label>
        </TableCell>
      ),
      width: 150,
    },
    {
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{ backgroundColor: params.row.document_count === 0 ? 'gray' : 'green' }}
          onClick={() => handleViewRow(params.row.csp_code)}
          disabled={params.row.document_count === 0}
        >
          Document
        </Button>
      ),
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
          heading="CSP List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'CSP',
              href: paths.dashboard.headCsp.csp_list,
            },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={paths.dashboard.product.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New Product
          //   </Button>
          // }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        <Card
          sx={{
            // height: canReset ? 740 : 650 ,
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
                      (tab.value === 'miller' && 'success') ||
                      (tab.value === 'distributor' && 'warning') ||
                      (tab.value === 'miller_distributor' && 'error') ||
                      (tab.value === 'society_cooperative' && 'info') ||
                      'default'
                    }
                  >
                    {['miller', 'distributor', 'miller_distributor', 'society_cooperative'].includes(tab.value)
                      ? tableData.filter((user) => user.category === tab.value).length
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
            // loading={cspLoading}
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
                    {/*<GridToolbarQuickFilter />*/}
                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
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
                            <MenuItem key={option.branch_name} value={option.branch_name} disabled={option.csp_count == 0}>

                              {option.branch_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

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
                      <Box>

                        <GridToolbarColumnsButton/>
                        {/*<GridToolbarFilterButton />*/}
                        <GridToolbarExport/>
                      </Box>
                    </Stack>
                    <CspTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles}
                                     stateOptions={stateOptions} branchOptions={branchOptions}
                                     districtOptions={districtOptions}/>
                    {canReset && (
                      <CspTableFiltersResult
                        filters={filters}
                        onFilters={handleFilters}
                        onResetFilters={handleResetFilters}
                        results={dataFiltered.length}
                        sx={{ p: 2.5, pt: 0 }}
                      />
                    )}
                    {/*<GridToolbarQuickFilter />*/}
                    {/**/}

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

function applyFilter({ inputData, comparator, filters,dayError }) {
  const { name, status, type_of_firm, state, branch, district, category,csp, startDay, endDay } = filters;

  // const stabilizedThis = inputData?.map((el, index) => [el, index]);
  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });
  //
  // inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.category === status);
  }

  if (type_of_firm.length) {
    inputData = inputData.filter((user) => type_of_firm.includes(user.type_of_firm));
  }
  if (csp.length) {
    inputData = inputData.filter((user) => csp.includes(user.branch_approval_status === "0" ? "Declined": user.branch_approval_status === "1" ? "Approved" : "Approval Pending"));
  }
  if (!dayError) {
    if (startDay && endDay) {
      inputData = inputData.filter((product) => isBetween(product.created_at, startDay, endDay));
    }
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
  if (category.length) {
    inputData = inputData.filter((user) => category.includes(user.category));
  }

  return inputData;
}

export default CspHeadListView;
