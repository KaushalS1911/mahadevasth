import isEqual from 'lodash/isEqual';
import React, { useState, useEffect, useCallback } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';

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
import { _roles, handleDoctypeLabel, PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import Label from '../../../components/label';
import { useGetCSP } from '../../../api/branch-csp';
import TableCell from '@mui/material/TableCell';
import axios from 'axios';
import { useAuthContext } from '../../../auth/hooks';
import DocumentTableToolbar from '../document-table-toolbar';
import DocumentTableFiltersResult from '../document-table-filters-result';
import moment from 'moment';
import Avatar from '@mui/material/Avatar';
import { getComparator } from '../../../components/table';
import { Box } from '@mui/system';
import Lightbox from '../../../components/lightbox';
import useLightBox from '../../../components/lightbox/use-light-box';
import { usePopover } from '../../../components/custom-popover';
import DocumentQuickEditForm from '../document-quick-edit-form';
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { isAfter, isBetween } from '../../../utils/format-time';
// import BranchTableFiltersResult from '../branch-table-filters-result';

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
  name: '',
  role: [],
  type: [],
  status: 'all',
  startDay: null,
  endDay: null,
  document: [],
  category: [],

};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

function DocumentList({ csp, document, miller, cspt, docu }) {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const { vendor } = useAuthContext();
  const router = useRouter();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);
  const [dataId, setDataId] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [dataCSP, setDataCSP] = useState([]);
  const [branch, setBranch] = useState([]);
  const [images, setImages] = useState([]);
  const [b, setB] = useState([]);
  const popover = usePopover();
  let dataFiltered = applyFilter({
    inputData: tableData,
    // comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  useEffect(() => {
    if (vendor) {
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/branch/${vendor?.branch}/csp/list`).then((res) => setDataCSP(res?.data?.data)).catch((err) => console.log(err));
    }
  }, []);
  const dayError = isAfter(filters.startDay, filters.endDay);

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
  const cspCode = csp || vendor?.csp_code;
  useEffect(() => {
    if (cspCode) {
      getAllDocument(cspCode);

    }
  }, [cspCode]);


  // useEffect(() => {
  //   dataFiltered?.map((data, index) => {
  //     setDataId((prevDataId) => [...prevDataId, { ...data, id: index + 1 }]);
  //   });
  // }, [tableData]);

  function getAllDocument(code) {
    // setLoading(true)

    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${code}/documents`,
      )
      .then((res) => {
        setTableData(res?.data?.data);
        // setLoading(false)
      })
      .catch((err) => console.error(err));
  }


  const canReset = !isEqual(defaultFilters, filters)|| (!!filters.startDay && !!filters.endDay);

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
  const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, { value: '', label: 'Approval Pending' }, {
    value: '1',
    label: 'Approved',
  }, { value: '0', label: 'Rejected' }];
  const slides = images.map((img) => ({
    src: img,
  }));
  const lightbox = useLightBox(slides);

  function handleViewDialog(url) {
    setImages([url]);
    popover.onClose();
    lightbox.onOpen(url);
  }

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
      router.push(paths.dashboard.distributor.distributor_document_view(code));
    },
    [router],
  );
  const handleDistributor = (code) => {
    router.push(paths.dashboard.distributor.distributor_view(code));

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
  //     width: 142,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'object_url',
  //     headerName: 'Document Image',
  //     flex: 1,
  //     minWidth: 236,
  //     hideable: false,
  //     renderCell: (params) => {
  //       const object_url = params?.row?.object_url;
  //       const secondSlashIndex = object_url?.indexOf('/', 8);
  //       const secondPart = object_url?.substring(secondSlashIndex);
  //       const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  //       return (
  //       <>
  //
  //         <Box py={1} onClick={() => handleViewDialog(url)}>
  //
  //           <Avatar
  //             alt={object_url}
  //             src={url}
  //             sx={{ mr: 2, height: 46, width: 46, cursor: 'pointer' }}
  //             variant="rounded"
  //           />
  //         </Box>
  //       </>
  //       );
  //     },
  //   },
  //   {
  //     field: 'doc_type',
  //     headerName: 'Document Type',
  //     width: 300,
  //     renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(params.row.doc_type)}</Box>,
  //   },
  //
  //   {
  //     field: 'uploaded_on',
  //     headerName: 'Date',
  //     width: 300,
  //     renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>
  //       {moment(params.row.uploaded_on).format('DD/MM/YYYY')}
  //     </Box>,
  //   },
  //   // {
  //   //   field: 'status',
  //   //   headerName: 'Status',
  //   //   width: 160,
  //   //   renderCell: (params) => <Box>
  //   //     <Label
  //   //       variant="soft"
  //   //       color={'success'
  //   //         // (params.row.nccf_order_status === 'accepted' && 'success') ||
  //   //         // (params.row.nccf_order_status === 'placed' && 'warning') ||
  //   //         // (params.row.nccf_order_status === 'declined' && 'error') ||
  //   //         // 'default'
  //   //       }
  //   //     >
  //   //       {/*{params.row.nccf_order_status}*/}
  //   //       Completed
  //   //     </Label></Box>,
  //   // },
  //   {
  //     field: 'branch_approval_status',
  //     headerName: 'Status',
  //     renderCell: (params) => <TableCell sx={{ px: 0 }}>
  //       <Label
  //         variant="soft"
  //         color={
  //           (params.row.branch_approval_status === '1' && 'success') ||
  //           (params.row.branch_approval_status === '0' && 'warning') ||
  //           // (params.row.branch_approval_status === 'declined' && 'error') ||
  //           'default'
  //         }
  //       >
  //         {params.row.branch_approval_status === '0' ? 'Approval Pending' : 'Approved'}
  //       </Label></TableCell>,
  //     width: 250,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //
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
  //         onClick={() => {
  //           setOpen(true);
  //           setCurrentData(params.row);
  //         }}
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
      width: 120,
      minWidth: 80,
    },
    {
      field: 'object_url',
      headerName: 'Document Image',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const object_url = params?.row?.object_url;
        const secondSlashIndex = object_url?.indexOf('/', 8);
        const secondPart = object_url?.substring(secondSlashIndex);
        const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
        return (
          <Box py={1} onClick={() => handleViewDialog(url)}>
            <Avatar
              alt={object_url}
              src={url}
              sx={{ mr: 2, height: { xs: 36, sm: 46 }, width: { xs: 36, sm: 46 }, cursor: 'pointer' }}
              variant="rounded"
            />
          </Box>
        );
      },
    },
    {
      field: 'doc_type',
      headerName: 'Document Type',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(params.row.doc_type)}</Box>,
    },
    {
      field: 'uploaded_on',
      headerName: 'Date',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>
        {moment(params.row.uploaded_on).format('DD/MM/YYYY')}
      </Box>,
    },
    {
      field: 'branch_approval_status',
      headerName: 'Branch Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <TableCell sx={{ px: 0 }}>
        <Label
          variant="soft"
          color={
            (params.row.branch_approval_status === '1' && 'success') ||
            (params.row.branch_approval_status === '' && 'warning') ||
            'error'
          }
        >
          {params.row.branch_approval_status === '' ? 'Approval Pending' :params.row.branch_approval_status === '1' ? 'Approved' : "Rejected"}
        </Label>
      </TableCell>,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 100,
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => {
            setOpen(true);
            setCurrentData(params.row);
          }}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
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

        <DocumentQuickEditForm currentUser={currentData} open={open} setOpen={setOpen}/>
        <CustomBreadcrumbs
          heading={miller ? 'Miller Documents' : cspt ? 'CSP Documents' : document ? `Distributor Documents` : 'Documents'}
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: miller ? 'Miller List' : cspt ? 'CSP List' : document ? 'Distributor List' :'Document List',
              href: miller ? paths.dashboard.miller.miller_list : cspt ? paths.dashboard.csp.csp_list : document ? paths.dashboard.distributor.distributor_list : paths.dashboard.document.document_list,
            },

            {
              name: miller ? `Miller Documents` : cspt ? 'CSP Document' : document ?  `Distributor Documents` : 'List'           },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            (vendor?.category !== 'branch' && !cspt) &&
            <Button
              component={RouterLink}
              href={miller ? paths.dashboard.miller.document_upload : document ? paths.dashboard.distributor.document_upload : paths.dashboard.document.document_upload}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line"/>}

            >
              Upload Document
            </Button>
          }
        />

        <Card
          sx={{
            height: dataFiltered?.length > 0 ? 'unset' : 700,
            // height: dataId?.length > 0 ? 'unset' : 700,
            // flexGrow: { md: 1 },
            // display: { md: 'flex' },
            // flexDirection: { md: 'column' },
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
                      (tab.value === '1' && 'success') ||
                      (tab.value === '' && 'warning') ||
                      (tab.value === '0' && 'error') ||
                      'default'
                    }
                  >
                    {['1', '0', ''].includes(tab.value)
                      ? tableData.filter((user) => user.branch_approval_status === tab.value).length
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
                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction={'row'}
                      // alignItems="center"
                      justifyContent={'flex-end'}
                    >
                      {/*{!!selectedRowIds.length && (*/}
                      {/*  <Button*/}
                      {/*    size="small"*/}
                      {/*    color="error"*/}
                      {/*    startIcon={<Iconify icon="solar:trash-bin-trash-bold"/>}*/}
                      {/*    onClick={confirmRows.onTrue}*/}
                      {/*  >*/}
                      {/*    Delete ({selectedRowIds.length})*/}
                      {/*  </Button>*/}
                      {/*)}*/}


                      <Box> <GridToolbarColumnsButton/>
                        {/*<GridToolbarFilterButton/>*/}
                        <GridToolbarExport/></Box>
                    </Stack>
                    <DocumentTableToolbar filters={filters} onFilters={handleFilters} roleOptions={_roles}
                                          getAllDocument={getAllDocument}
                                          vendorData={vendor?.category === 'branch' ? true : false} setB={setB}
                                          document={document} dayError={dayError}/>
                    {canReset && (
                      <DocumentTableFiltersResult
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
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
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

function applyFilter(
  {
    inputData, filters, dayError,
  },
) {
  const { name, status, role, type, startDay, endDay, document, category } = filters;


  if (name) {
    inputData = inputData.filter(
      (user) => user.doc_type.toLowerCase().indexOf(name.toLowerCase()) !== -1,
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.branch_approval_status === status);
  }
  if (!dayError) {
    if (startDay && endDay) {
      inputData = inputData.filter((product) => isBetween(product.created_at, startDay, endDay));
    }
  }
  if (role?.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }
  if (document?.length) {
    inputData = inputData.filter((user) => document.includes(user.branch_approval_status));
  }
  if (type.length) {
    inputData = inputData.filter((user) => type.includes(user.doc_type));
  }
  if (category.length) {
    inputData = inputData.filter((user) => category.includes(user.category));
  }


  return inputData;
}

export default DocumentList;
