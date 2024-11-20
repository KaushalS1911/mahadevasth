import PropTypes from 'prop-types';
import moment from 'moment';
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
import { useState } from 'react';
import { handleDoctypeLabel } from '../../_mock';
import Lightbox from 'src/components/lightbox/lightbox';
import { useLightBox } from 'src/components/lightbox';
// import Lightbox from '../../components/lightbox';
// import useLightBox from '../../components/lightbox/use-light-box';
// ----------------------------------------------------------------------
export default function UploadMillerTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onViewRow,
  onDeleteRow,
  index,
}) {
  const { type, image } = row;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  // const secondSlashIndex = object_url.indexOf("/", 8);
  // const firstPart = object_url.substring(0, secondSlashIndex);
  // const secondPart = object_url.substring(secondSlashIndex);
  // const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();
  function handleClose() {
    setOpen(false);
  }
  function handleViewDialog(url) {
    setImages([url]);
    popover.onClose();
    lightbox.onOpen(url);
  }

  const slides = images.map((img) => ({
    src: img,
  }));
  const lightbox = useLightBox(slides);
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
        <TableCell>
          {type === 'milling_unit_video' ? (
            <video
              // controls
              autoPlay
              src={image?.preview}
              style={{ mr: 2, height: 46, width: 46, cursor: 'pointer', borderRadius: '10px' }}
              variant="rounded"
              onClick={() => handleViewDialog(image?.preview)}
            />
          ) : (
            <Avatar
              alt={image?.preview}
              src={image?.preview}
              sx={{ mr: 2, height: 46, width: 46, cursor: 'pointer' }}
              variant="rounded"
              onClick={() => handleViewDialog(image?.preview)}
            />
          )}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(type)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {moment(new Date()).format('DD/MM/YYYY')}
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
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
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
UploadMillerTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
