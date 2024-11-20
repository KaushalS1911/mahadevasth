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
// import DocumentQuickEditForm from './document-quick-edit-form';
import { useState } from 'react';
import MaxWidthDialog from '../overview/app/viewDocumentDialog';
import { handleDoctypeLabel } from '../../_mock';
import Lightbox from '../../components/lightbox';
import useLightBox from '../../components/lightbox/use-light-box';
// ----------------------------------------------------------------------
export default function ArticleTableRow({ row, selected, onEditRow, onSelectRow, onViewRow,onDeleteRow, index ,onView}) {
  const { name,category, type_of_firm, contact_person, phone_number, email, address} = row;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([])
  // const firstPart = object_url.substring(0, secondSlashIndex);
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
        <TableCell sx={{ whiteSpace: 'nowrap' }} align={"center"}>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap',fontWeight:"bold",cursor:"pointer" }} onClick={onView}>{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{category}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{type_of_firm}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{contact_person}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone_number}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{address}</TableCell>


         <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>

         <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/*<DocumentQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />*/}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        // sx={{ width: 140 }}
      >
        <MenuItem onClick={() => onViewRow()}>
          <Iconify icon="solar:eye-bold" />
          View Documents
        </MenuItem>
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    onEditRow();*/}
        {/*    popover.onClose();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Iconify icon="solar:pen-bold" />*/}
        {/*  Edit*/}
        {/*</MenuItem>*/}
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    confirm.onTrue();*/}
        {/*    popover.onClose();*/}
        {/*  }}*/}
        {/*  sx={{ color: 'error.main' }}*/}
        {/*>*/}
        {/*  <Iconify icon="solar:trash-bin-trash-bold" />*/}
        {/*  Delete*/}
        {/*</MenuItem>*/}
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
ArticleTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
