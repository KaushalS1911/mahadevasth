import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import moment from 'moment'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDoubleClick } from 'src/hooks/use-double-click';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { fData } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FileThumbnail from 'src/components/file-thumbnail';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import FileManagerShareDialog from './file-manager-share-dialog';
import FileManagerFileDetails from './file-manager-file-details';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useAuthContext } from '../../auth/hooks';
import MaxWidthDialog from '../overview/app/viewDocumentDialog';
import { handleDoctypeLabel } from '../../_mock';
import useLightBox from '../../components/lightbox/use-light-box';
import Lightbox from '../../components/lightbox';
// ----------------------------------------------------------------------
export default function FileManagerTableRow({ row, selected, onSelectRow, onDeleteRow, index }) {
  const { doc_type, object_url, uploaded_on } = row;
  const secondSlashIndex = object_url.indexOf('/', 8);
  // const firstPart = object_url.substring(0, secondSlashIndex);
  const secondPart = object_url.substring(secondSlashIndex);
  const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const [inviteEmail, setInviteEmail] = useState('');
  const router = useRouter();
  const details = useBoolean();
  const share = useBoolean();
  const confirm = useBoolean();
  const popover = usePopover();
  function handleViewDialog(url) {
    setImages([url]);
    popover.onClose()
    lightbox.onOpen(url)
  }

  const slides = images.map((img) => ({
    src: img,
  }));
  const lightbox = useLightBox(slides);

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);
  const handleClick = useDoubleClick({
    click: () => {
      details.onTrue();
    },
    doubleClick: () => console.info('DOUBLE CLICK'),
  });
  const handleCopy = useCallback(() => {
    enqueueSnackbar('Copied!');
    copy(row.url);
  }, [copy, enqueueSnackbar, row.url]);
  function handleClose() {
    setOpen(false);
  }
  const defaultStyles = {
    borderTop: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
  };
  return (
    <>
      <TableRow
        selected={selected}
        sx={{
          borderRadius: 2,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: theme.customShadows.z20,
            },
          },
          [`& .${tableCellClasses.root}`]: {
            ...defaultStyles,
          },
          ...(details.value && {
            [`& .${tableCellClasses.root}`]: {
              ...defaultStyles,
            },
          }),
        }}
      >
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index + 1}</TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* <FileThumbnail file={object_url} sx={{ width: 36, height: 36 }} /> */}
            <Avatar
              alt={'Document Image'}
              src={url}
              sx={{ mr: 2, height: '48px', width: '48px', cursor: 'pointer' }}
              variant="rounded"
              onClick={() => handleViewDialog(url)}
            />
          </Stack>
        </TableCell>
        <TableCell>
          <Typography
            noWrap
            variant="inherit"
            sx={{
              maxWidth: 360,
              cursor: 'pointer',
              ...(details.value && { fontWeight: 'fontWeightBold' }),
            }}
          >
            {handleDoctypeLabel(doc_type)}
          </Typography>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <ListItemText
            primary={moment(uploaded_on).format('DD/MM/YYYY')}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <Typography
            noWrap
            variant="inherit"
            sx={{
              maxWidth: 360,
              cursor: 'pointer',
              ...(details.value && { fontWeight: 'fontWeightBold' }),
            }}
          >
            completed
          </Typography>
        </TableCell>
        {/* <TableCell
          align="right"
          sx={{
            px: 1,
            whiteSpace: 'nowrap',
          }}
        >
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={() => handleViewDialog(url)}>
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    popover.onClose();*/}
        {/*    share.onTrue();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Iconify icon="solar:share-bold" />*/}
        {/*  Share*/}
        {/*</MenuItem>*/}
        {/*<Divider sx={{ borderStyle: 'dashed' }} />*/}
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
      {/* <FileManagerFileDetails
        item={row}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={onDeleteRow}
      /> */}
      {/* <FileManagerShareDialog
        open={share.value}
        shared={shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          share.onFalse();
          setInviteEmail('');
        }}
      /> */}
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
FileManagerTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};
