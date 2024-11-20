import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash/isEqual';

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
import { _roles, handleDoctypeLabel, handleOrderTypes, PRODUCT_STOCK_OPTIONS } from 'src/_mock';

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
import { Checkbox, Fab, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import Tabs from '@mui/material/Tabs';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import { isAfter, isBetween } from '../../../utils/format-time';
import Grid from '@mui/material/Unstable_Grid2';
import AnalyticsWidgetSummary from '../../overview/analytics/analytics-widget-summary';
import { LoadingScreen } from '../../../components/loading-screen';
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
const STATUS_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Registration Certificate', value: 'Registration_Certificate' },
  { label: 'Undertaking', value: 'undertaking' },
  { label: 'Audited Accounts', value: 'audited_accounts' },
  { label: 'Income Tax', value: 'income_tax' },
  { label: 'PAN', value: 'pan' },
  { label: 'GST', value: 'gst' },
  { label: 'Sale Registration', value: 'sale_registration' },
  { label: 'Industrial Licence', value: 'industrial_licence' },
  { label: 'Power Bills', value: 'power_bills' },
  { label: 'Pollution Certificates', value: 'pollution_certificates' },
  { label: 'Municipal Property Tax', value: 'municipal_property_tax' },
  { label: 'FSSAI License', value: 'FSSAI_license' },
  { label: 'Photographs of Unit', value: 'photographs_of_unit' },
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

function HeadList({ csp, document, miller, cspt, docu }) {
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const { vendor } = useAuthContext();
  const router = useRouter();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);
  const [loading,setLoading] = useState(false)
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
  const [branch, setBranch] = useState('All');
  const [b, setB] = useState([]);
  const [images, setImages] = useState([]);
  const [approve, setApprove] = useState(false);
  const [banch, setBanch] = useState([]);
  const [banchVal, setBanchVal] = useState('All');
  const color = ['primary', 'error', 'warning', 'error'];
  const popover = usePopover();
  let dataFiltered = applyFilter({
    inputData: tableData,
    // comparator: getComparator(table.order, table.orderBy),
    filters,
  });
  const dayError = isAfter(filters.startDay, filters.endDay);
  const cspCode = csp || vendor?.branch;
  const getCspDocument = (branch) => {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${branch}/documents`).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err));

  };
  useEffect(() => {
    if (!cspt) {

      if (banchVal === 'All') {
        getDocuments();
      } else {
        fetchData();
        getAllDocument(banchVal);

      }
    } else {
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${csp}/documents`).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err));
    }

  }, [banchVal]);
  const getDocuments = () => {
    csp ? getCspDocument(csp) : setLoading(true),
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/document`).then((res) => {
        setLoading(false)
        setTableData(res?.data?.data);
      }).catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };
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
          document_count: data.document_count,
        }));

        const default1 = [{ name: 'All', csp_code: 'All', document_count: 1 }, ...mapCsp];
        setDataCSP(default1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


  // }, [banchVal]);

  useEffect(() => {
    // if (vendor) {
    //   axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp/list`)
    //     .then((res) => {
    //       const fetchedData = res?.data?.data || [];
    //       const updatedData = [{ name: "All", csp_code: "All" }, ...fetchedData];
    //       setDataCSP(updatedData);
    //     }).catch((err) => console.log(err));
    //     getDocuments()
    // }
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/branch`)
      .then((res) => {
        const fetchedData = res?.data?.data || [];
        const updatedData = [{ branch_name: 'All', csp_count: 1 }, ...fetchedData];
        setBanch(updatedData);
      }).catch((err) => console.log(err));

  }, []);
  useEffect(() => {
    if (!cspt) {
      if (branch === 'All') {
        getAllDocument(banchVal);
      } else {
        getCspDocument(branch);
      }
    }
  }, [branch]);
  // useEffect(() => {
  //
  //   axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${vendor?.branch}/document`).then((res) => setTableData(res?.data?.data)).catch((err) => console.log(err));
  // }, [branch === 'All']);

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
  // useEffect(() => {
  //   if (b !== []) {
  //
  //     getAllDocument(b);
  //   } else {
  //     getAllDocument(cspCode);
  //   }
  // }, [b]);


  // useEffect(() => {
  //   dataFiltered?.map((data, index) => {
  //     setDataId((prevDataId) => [...prevDataId, { ...data, id: index + 1 }]);
  //   });
  // }, [tableData]);

  function getAllDocument(code) {
    // setLoading(true)
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/${code}/document`,
      )
      .then((res) => {
        setTableData(res?.data?.data);
        // setLoading(false)
      })
      .catch((err) => console.error(err));
  }


  const canReset = !isEqual(defaultFilters, filters) || (!!filters.startDay && !!filters.endDay);

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
  const countsArray = [
    { label: '1', count: 0 },
    { label: '0', count: 0 },
    { label: '', count: 0 },
  ];
  countsArray.forEach(commodity => {
    commodity.count = dataFiltered.filter(item => item.branch_approval_status === commodity.label).length;
  });
  const handleFilterBranch = useCallback(
    (event) => {
      setBanchVal(event.target.value);
      setBranch('All');
      // handleFilters('branch', event.target.value)
    },
    [branch],
  );
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
  //
  //       return (
  //         <Box py={1}>
  //           <Avatar
  //             alt={object_url}
  //             src={url}
  //             sx={{ mr: 2, height: 46, width: 46, cursor: 'pointer' }}
  //             variant="rounded"
  //             onClick={() => handleViewDialog(url)}
  //           />
  //         </Box>
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
  //
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
  //     width: 265,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'vendor1',
  //     headerName: 'Approve',
  //     renderCell: (params) => <TableCell sx={{ px: 0 }}>
  //       <Button
  //
  //         // role={undefined}
  //         variant="contained"
  //         onClick={() => {
  //           setCurrentData(params.row);
  //           setApprove(true);
  //           setOpen(true);
  //         }}
  //         sx={{ backgroundColor: 'green' }}
  //
  //       >
  //         <VerifiedIcon/> Approve
  //         {/*<VisuallyHiddenInput type="file" />*/}
  //       </Button>
  //
  //     </TableCell>,
  //     width: 120,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   {
  //     field: 'vendor',
  //     headerName: 'Reject',
  //     renderCell: (params) => <TableCell sx={{ px: 0 }}>
  //
  //       <Button
  //         onClick={() => {
  //           setCurrentData(params.row);
  //           setApprove(false);
  //           setOpen(true);
  //         }}
  //
  //         // role={undefined}
  //         variant="contained"
  //
  //         sx={{ backgroundColor: 'red' }}
  //
  //       >
  //         <CancelIcon/> Reject
  //         {/*<VisuallyHiddenInput type="file" />*/}
  //       </Button>
  //     </TableCell>,
  //     width: 120,
  //     // renderCell: (params) => <RenderCellCreatedAt params={params} />,
  //   },
  //   // {
  //   //   type: 'actions',
  //   //   field: 'actions',
  //   //   headerName: ' ',
  //   //   align: 'right',
  //   //   headerAlign: 'right',
  //   //   width: 80,
  //   //   sortable: false,
  //   //   filterable: false,
  //   //   disableColumnMenu: true,
  //   //   getActions: (params) => [
  //   //
  //   //     <GridActionsCellItem
  //   //       showInMenu
  //   //       icon={<Iconify icon="solar:pen-bold"/>}
  //   //       label="Edit"
  //   //       onClick={() => {
  //   //         setOpen(true);
  //   //         setCurrentData(params.row);
  //   //       }}
  //   //     />,
  //   //     <GridActionsCellItem
  //   //       showInMenu
  //   //       icon={<Iconify icon="solar:trash-bin-trash-bold"/>}
  //   //       label="Delete"
  //   //       // onClick={() => {
  //   //       //   handleDeleteRow(params.row.id);
  //   //       // }}
  //   //       sx={{ color: 'error.main' }}
  //   //     />,
  //   //   ],
  //   // },
  // ];
  const columns = [
    {
      field: 'seq_number',
      headerName: 'Sr No.',
      width: 90,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 220,
    },
    {
      field: 'object_url',
      headerName: 'Image',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const object_url = params?.row?.object_url;
        const secondSlashIndex = object_url?.indexOf('/', 8);
        const secondPart = object_url?.substring(secondSlashIndex);
        const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;

        return (
          <Box py={1}>
            <Avatar
              alt={object_url}
              src={url}
              sx={{ mr: 2, height: 46, width: 46, cursor: 'pointer' }}
              variant="rounded"
              onClick={() => handleViewDialog(url)}
            />
          </Box>
        );
      },
    },
    {
      field: 'doc_type',
      headerName: 'Type',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(params.row.doc_type)}</Box>,
    },
    {
      field: 'created_at',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <Box sx={{ whiteSpace: 'nowrap' }}>
        {moment(params.row.created_at).format('DD/MM/YYYY')}
      </Box>,
    },
    {
      field: 'branch_approval_status',
      headerName: 'Status',
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
          {params.row.branch_approval_status === '' ? 'Approval Pending' : params.row.branch_approval_status === '1' ? 'Approved' : 'Rejected'}
        </Label>
      </TableCell>,
    },
    {
      field: 'vendor1',
      headerName: 'Action',
      flex: 0.5,
      minWidth: 250,
      renderCell: (params) => <>
        <TableCell sx={{ px: 0, marginRight: 2 }}>
          <Button
            disabled={params.row.branch_approval_status === '1' || params.row.branch_approval_status === '0'}
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
            disabled={params.row.branch_approval_status === '1' || params.row.branch_approval_status === '0'}
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
    //   field: 'vendor',
    //   headerName: 'Reject',
    //   flex: 0.5,
    //   minWidth: 100,
    //   renderCell: (params) => <TableCell sx={{ px: 0 }}>
    //     <Button
    //       onClick={() => {
    //         setCurrentData(params.row);
    //         setApprove(false);
    //         setOpen(true);
    //       }}
    //       variant="contained"
    //       sx={{ backgroundColor: 'red',width:80 }}
    //     >
    //       <CancelIcon/> Reject
    //     </Button>
    //   </TableCell>,
    // },
  ];
  const handelDownload = () => {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${branch}/zip-file`).then((res) => console.log(res)).catch((err) => console.log(err));
  };

  const action = branch === 'All' ? '' :
    <a href={`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${branch}/zip-file`}>
      <Button
        // onClick={handelDownload}
        // component={RouterLink}
        // href={miller ? paths.dashboard.miller.document_upload : document ? paths.dashboard.distributor.document_upload : paths.dashboard.document.document_upload}
        variant="contained"
        startIcon={<Iconify icon="material-symbols:download-sharp"/>}
      >
        Download Documents
      </Button></a>;
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
      {
        loading ? <LoadingScreen /> :
      <><Container
        maxWidth={'xl'}

      >
        <Grid container spacing={3}>

          {countsArray.map((data, ind) => (

            <Grid item xs={12} md={4} mb={5}>
              <AnalyticsWidgetSummary
                title={data.label === '' ? 'Approval Pending' : data.label === '1' ? 'Approved' : 'Rejected'}
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
        <DocumentQuickEditForm getAllDocument={getCspDocument} getDocuments={getDocuments}
                               getBtanchDocument={getAllDocument} branch={banchVal} currentUser={currentData}
                               open={open} setOpen={setOpen} approve={approve} cspCode={branch}/>
        {!cspt && <CustomBreadcrumbs
          heading={'Documents'}
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'List',
              href: paths.dashboard.headCsp.csp_list,
            },

            {
              name: 'Document',
            },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}

        />
        }

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
                      (tab.value === 'Registration_Certificate' && 'success') ||
                      (tab.value === 'undertaking' && 'warning') ||
                      (tab.value === 'audited_accounts' && 'error') ||
                      (tab.value === 'income_tax' && 'info') ||
                      (tab.value === 'pan' && 'primary') ||
                      (tab.value === 'gst' && 'secondary') ||
                      (tab.value === 'sale_registration' && 'success') ||
                      (tab.value === 'industrial_licence' && 'warning') ||
                      (tab.value === 'power_bills' && 'error') ||
                      (tab.value === 'pollution_certificates' && 'info') ||
                      (tab.value === 'municipal_property_tax' && 'primary') ||
                      (tab.value === 'FSSAI_license' && 'secondary') ||
                      (tab.value === 'photographs_of_unit' && 'secondary') ||
                      'default'
                    }
                  >
                    {['Registration_Certificate', 'undertaking', 'audited_accounts', 'income_tax', 'pan', 'gst', 'sale_registration', 'industrial_licence', 'power_bills', 'pollution_certificates', 'municipal_property_tax', 'FSSAI_license', 'photographs_of_unit'].includes(tab.value)
                      ? tableData.filter((user) => user.doc_type === tab.value).length
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
                      direction={{ xs: 'column', md: 'row' }}
                      // alignItems="center"
                      justifyContent={csp ? 'flex-end' : 'space-between'}
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

                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {!cspt && <FormControl
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
                        </FormControl>}
                        {banchVal !== 'All' && <FormControl
                          sx={{
                            flexShrink: 0,
                            width: { xs: 1, md: 200 },
                            marginLeft: 1,
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
                              <MenuItem key={option.csp_code} value={option.csp_code}
                                        disabled={option.document_count == 0}>

                                {option.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>}
                        <Box sx={{ marginLeft: 2 }}>
                          {action}
                        </Box>
                      </Box>

                      <Box>
                        <GridToolbarColumnsButton/>
                        {/*<GridToolbarFilterButton/>*/}
                        <GridToolbarExport/>
                      </Box>
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
      }

    </>
  );
};

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
    inputData = inputData.filter((user) => user.doc_type === status);
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

export default HeadList;
