import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
// import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom ,TablePaginationCustom, getComparator, useTable} from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { applyFilter } from 'src/layouts/common/searchbar/utils';
import { Avatar } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppNewInvoice({ title, subheader, tableData, tableLabels, ...other }) {
  const table = useTable();

  const dataFiltered = applyFilter({
    inputData: tableData || [],
    comparator: getComparator(table.order, table.orderBy),
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 680 }}>
            <TableHeadCustom headLabel={tableLabels} />


            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                ).map((row,index) => (
                  <AppNewInvoiceRow index={index} key={row.id} row={row} />
                ))}
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
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}

AppNewInvoice.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function AppNewInvoiceRow({ row ,index}) {

  const popover = usePopover();

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };
console.log("Row : ",row)
  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{row?.doc_type}</TableCell>

        <TableCell>
          {/* <img src={row?.object_url} alt="" /> */}
          <Avatar
            alt={row.object_url}
            src={row.object_url}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />
        </TableCell>

        {/*<TableCell align="right" sx={{ pr: 1 }}>*/}
        {/*  <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>*/}
        {/*    <Iconify icon="eva:more-vertical-fill" />*/}
        {/*  </IconButton>*/}
        {/*</TableCell>*/}
      </TableRow>

      {/*<CustomPopover*/}
      {/*  open={popover.open}*/}
      {/*  onClose={popover.onClose}*/}
      {/*  arrow="right-top"*/}
      {/*  sx={{ width: 160 }}*/}
      {/*>*/}
      {/*  <MenuItem onClick={handleDownload}>*/}
      {/*    <Iconify icon="eva:cloud-download-fill" />*/}
      {/*    Download*/}
      {/*  </MenuItem>*/}

      {/*  <MenuItem onClick={handlePrint}>*/}
      {/*    <Iconify icon="solar:printer-minimalistic-bold" />*/}
      {/*    Print*/}
      {/*  </MenuItem>*/}

      {/*  <MenuItem onClick={handleShare}>*/}
      {/*    <Iconify icon="solar:share-bold" />*/}
      {/*    Share*/}
      {/*  </MenuItem>*/}

      {/*  <Divider sx={{ borderStyle: 'dashed' }} />*/}

      {/*  <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>*/}
      {/*    <Iconify icon="solar:trash-bin-trash-bold" />*/}
      {/*    Delete*/}
      {/*  </MenuItem>*/}
      {/*</CustomPopover>*/}
    </>
  );
}

AppNewInvoiceRow.propTypes = {
  row: PropTypes.object,
};
