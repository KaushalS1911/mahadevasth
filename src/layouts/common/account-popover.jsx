import {m} from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import {alpha} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import {paths} from 'src/routes/paths';
import {useRouter} from 'src/routes/hooks';

import {useMockedUser} from 'src/hooks/use-mocked-user';

import {useAuthContext} from 'src/auth/hooks';

import {varHover} from 'src/components/animate';
import {useSnackbar} from 'src/components/snackbar';
import CustomPopover, {usePopover} from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Profile',
    linkTo: paths.dashboard.user.profile,
  }, {
    label: 'Update Password',
    linkTo: paths.dashboard.updatePassword,
  }, {
    label: 'Settings',
    linkTo: paths.dashboard.user.account,
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const {user} = useMockedUser();
  const {vendor} = useAuthContext();
  const {enqueueSnackbar} = useSnackbar();

  const popover = usePopover();

  const handleLogout = () => {
    try {
      popover.onClose();
      sessionStorage.clear();
      router.push('/admin');
      router.reload();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', {variant: 'error'});
    }
  };

  const handleClickItem = (path) => {
    popover.onClose();
    router.push(path);
  };

  function labelName(data) {
    switch (data) {
      case 'society_cooperative': {
        return 'Society/Co-operative';
        break;
      }
      case 'miller_distributor': {
        return 'Miller + Distributor';
        break;
      }
      case 'distributor': {
        return 'Distributor';
        break;
      }
      case 'miller': {
        return 'Miller';
        break;
      }
      case 'branch': {
        return 'Branch';
        break;
      }
      case 'head_office': {
        return 'Head Office ';
        break;
      }
      default: {
        return data;
      }
    }
  }

  function labelNameSociety(data) {
    switch (data) {
      case 'own_distribution_rent_mill': {
        return 'Own Distribution & Rent Mill';
        break;
      }
      case 'own_distribution_own_mill': {
        return 'Own Mill and Distribution';
        break;
      }
      case 'cooperative_rent_mill': {
        return 'Co-operative (Rent Mill)';
        break;
      }

      default: {
        return data;
      }
    }
  }

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={vendor?.name}
          alt={vendor?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {vendor?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{width: 200, p: 0}}>
        <Box sx={{p: 2, pb: 1.5}}>
          <Typography variant="subtitle2" noWrap>
            {vendor?.name}
          </Typography>

          <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
            {labelName(vendor?.category)}
          </Typography>

          <Typography variant="body2" sx={{color: 'text.secondary'}} noWrap>
            {labelNameSociety(vendor?.mil_dis_sub_roles)}
          </Typography>
        </Box>

        <Divider sx={{borderStyle: 'dashed'}}/>

        <Stack sx={{p: 1}}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{borderStyle: 'dashed'}}/>

        <MenuItem
          onClick={handleLogout}
          sx={{m: 1, fontWeight: 'fontWeightBold', color: 'error.main'}}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
