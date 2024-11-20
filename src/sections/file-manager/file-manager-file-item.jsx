import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import moment from 'moment'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import TextMaxLine from 'src/components/text-max-line';
import FileThumbnail from 'src/components/file-thumbnail';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import FileManagerShareDialog from './file-manager-share-dialog';
import FileManagerFileDetails from './file-manager-file-details';
import MaxWidthDialog from '../overview/app/viewDocumentDialog';
import { handleDoctypeLabel } from '../../_mock';
import useLightBox from '../../components/lightbox/use-light-box';
import Lightbox from '../../components/lightbox';
// ----------------------------------------------------------------------
export default function FileManagerFileItem({ file, selected, onSelect, onDelete, sx, ...other }) {
  const secondSlashIndex = file.object_url.indexOf("/", 8);
  // const firstPart = object_url.substring(0, secondSlashIndex);
  const secondPart = file.object_url.substring(secondSlashIndex);
  const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();
  const [inviteEmail, setInviteEmail] = useState('');
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const checkbox = useBoolean();
  const share = useBoolean();
  const confirm = useBoolean();
  const details = useBoolean();
  // const favorite = useBoolean(file.isFavorited);
  const popover = usePopover();
  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);
  const handleCopy = useCallback(() => {
    enqueueSnackbar('Copied!');
    copy(file.url);
  }, [copy, enqueueSnackbar, file.url]);


  function handleViewDialog(url) {
    popover.onClose();
    setImages([url]);
    lightbox.onOpen(url)
  }

  const slides = images.map((img) => ({
    src: img,
  }));
  const lightbox = useLightBox(slides);


  function handleClose() {
    setOpen(false)
  }
  // const renderIcon =
  //   (checkbox.value || selected) && onSelect ? (
  //     <Checkbox
  //       size="medium"
  //       checked={selected}
  //       onClick={onSelect}
  //       icon={<Iconify icon="eva:radio-button-off-fill" />}
  //       checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
  //       sx={{ p: 0.75 }}
  //     />
  //   ) : (
  //     <FileThumbnail file={file.type} sx={{ width: 36, height: 36 }} />
  //   );
  const renderAction = (
    <Stack direction="row" alignItems="center" sx={{ top: 8, right: 8, position: 'absolute' }}>
      {/* <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorite.value}
        onChange={favorite.onToggle}
      /> */}
      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );
  const renderText = (
    <>
      <Avatar
        alt={file.object_url}
        src={url}
        sx={{ mr: 2, height: '60px', width: '60px' }}
        variant="rounded"
        onClick={() => handleViewDialog(url)}
      />
      <TextMaxLine
        persistent
        variant="subtitle2"
        onClick={details.onTrue}
        sx={{ width: 1, mt: 2 }}
      >
        {handleDoctypeLabel(file.doc_type)}
      </TextMaxLine>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          maxWidth: 0.99,
          whiteSpace: 'nowrap',
          typography: 'caption',
          color: 'text.disabled',
        }}
      >
        <Typography noWrap component="span" variant="caption">
          {moment(file.uploaded_on).format('DD/MM/YYYY')}
        </Typography>
      </Stack>
      <TextMaxLine
        persistent
        variant="subtitle2"
        onClick={details.onTrue}
        sx={{ width: 1, mt: 1 }}
      >
        completed
      </TextMaxLine>
    </>
  );
  const renderAvatar = (
    <AvatarGroup
      max={3}
      sx={{
        mt: 1,
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 24,
          height: 24,
          '&:first-of-type': {
            fontSize: 12,
          },
        },
      }}
    >
      {file.shared?.map((person) => (
        <Avatar key={person.id} alt={person.name} src={person.avatarUrl} />
      ))}
    </AvatarGroup>
  );
  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        alignItems="flex-start"
        sx={{
          p: 2.5,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          ...((checkbox.value || selected) && {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        {...other}
      >
        {/* <Box onMouseEnter={checkbox.onTrue} onMouseLeave={checkbox.onFalse}>
          {renderIcon}
        </Box> */}
        {renderText}
        {/* {renderAvatar} */}
        {/* {renderAction} */}
      </Stack>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() =>
            handleViewDialog(url)
          }
        >
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
        item={file}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={() => {
          details.onFalse();
          onDelete();
        }}
      /> */}
      <FileManagerShareDialog
        open={share.value}
        shared={file.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          share.onFalse();
          setInviteEmail('');
        }}
      />
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
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
FileManagerFileItem.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  sx: PropTypes.object,
};









