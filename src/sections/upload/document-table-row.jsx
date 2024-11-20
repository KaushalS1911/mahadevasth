import PropTypes from 'prop-types';
import moment from 'moment'
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import DocumentQuickEditForm from './document-quick-edit-form';
import { useState } from 'react';
import MaxWidthDialog from '../overview/app/viewDocumentDialog';
import { handleDoctypeLabel } from '../../_mock';
import Lightbox from '../../components/lightbox';
import useLightBox from '../../components/lightbox/use-light-box';
// ----------------------------------------------------------------------
export default function DocumentTableRow({ row, selected, onEditRow, onSelectRow, onViewRow,onDeleteRow, index }) {
  const { doc_type, object_url, uploaded_on } = row;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([])
  // const firstPart = object_url.substring(0, secondSlashIndex);
  const secondSlashIndex = object_url.indexOf("/", 8);
  const secondPart = object_url.substring(secondSlashIndex);
  const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();
  function handleClose() {
    setOpen(false)
  }

  function handleViewDialog(url) {
    setImages([url]);
    popover.onClose()
    lightbox.onOpen(url)
  }

  const slides = images.map((img) => ({
    src: img,
  }));
  const lightbox = useLightBox(slides);
const status = "completed"
  return (
    <>
      <TableRow hover selected={selected}>
        {/*<TableCell padding="checkbox" sx={{ width: '100px' }}>*/}
        {/*  <Checkbox checked={selected} onClick={onSelectRow} />*/}
        {/*</TableCell>*/}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
        <TableCell>
          <Avatar
            alt={object_url}
            src={url}
            sx={{ mr: 2, height: 46, width: 46,cursor:"pointer" }}
            variant="rounded"
            onClick={() => handleViewDialog(url)}
          />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(doc_type)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {moment(uploaded_on).format('DD/MM/YYYY')}
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'completed' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'declined' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>completed</TableCell> */}
        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}> */}
        {/*<Tooltip title="Quick Edit" placement="top" arrow>*/}
        {/*  <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>*/}
        {/*    <Iconify icon="solar:pen-bold" />*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
        {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>
      <DocumentQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {/*<MenuItem onClick={() => handleViewDialog(url)}>*/}
        {/*  <Iconify icon="solar:eye-bold" />*/}
        {/*  View*/}
        {/*</MenuItem>*/}
        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        onGetCurrentIndex={(index) => lightbox.setSelected(index)}
      />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
DocumentTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
