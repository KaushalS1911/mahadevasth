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

import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const {commodity, created_at, quantity, index,nccf_order_status,quantity_approved} = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/*<TableCell padding="checkbox">*/}
        {/*  <Checkbox checked={selected} onClick={onSelectRow} />*/}
        {/*</TableCell>*/}

        {/*<TableCell sx={{ display: 'flex', alignItems: 'center' }}>*/}
        {/*  <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} />*/}

        {/*  <ListItemText*/}
        {/*    primary={name}*/}
        {/*    secondary={email}*/}
        {/*    primaryTypographyProps={{ typography: 'body2' }}*/}
        {/*    secondaryTypographyProps={{*/}
        {/*      component: 'span',*/}
        {/*      color: 'text.disabled',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</TableCell>*/}

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{commodity}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{quantity}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{quantity_approved}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{moment(created_at).format("DD/MM/YYYY")}</TableCell>

        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>*/}

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
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
             <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

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

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
