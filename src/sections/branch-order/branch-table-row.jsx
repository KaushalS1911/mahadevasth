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
import { useState } from 'react';
import MaxWidthDialog from '../overview/app/viewDocumentDialog';
import { handleDoctypeLabel } from '../../_mock';

// ----------------------------------------------------------------------
export default function BranchTableRow({ row, selected, onEditRow, onSelectRow, onViewRow,onDeleteRow, index,onView }) {
  const { name,commodity,branch, nccf_order_status, quantity, } = row;

  // const firstPart = object_url.substring(0, secondSlashIndex);
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();

const status = "completed"
  return (
    <>
      <TableRow hover selected={selected}>
        {/*<TableCell padding="checkbox" sx={{ width: '100px' }}>*/}
        {/*  <Checkbox checked={selected} onClick={onSelectRow} />*/}
        {/*</TableCell>*/}
        <TableCell sx={{ whiteSpace: 'nowrap',textAlign:"center" }}>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap'}} >{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{commodity}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{quantity}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{branch}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (nccf_order_status === 'accepted' && 'success') ||
              (nccf_order_status === 'placed' && 'warning') ||
              (nccf_order_status === 'declined' && 'error') ||
              'default'
            }
          >
            {nccf_order_status}
          </Label></TableCell>
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>

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

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

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
BranchTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
