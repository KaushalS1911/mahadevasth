import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import axios from 'axios';
import { handleCategoryTypes } from '../../_mock';
import { useAuthContext } from '../../auth/hooks';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

export default function CspTableToolbar({
                                                  filters,
                                                  onFilters,
                                                  //
                                                  stateOptions,
                                                  branchOptions,
                                                  districtOptions,
                                                  roleOptions,
                                                }) {


  const popover = usePopover();
  const days = ['Today', 'Last 7 Day', 'Last Week', 'Last 15 Day', 'Last Month', 'Last Year'];
  const [day, setDay] = useState('');
const {vendor} = useAuthContext()
  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters],
  );
  const handleFilterTypeofFirm = useCallback(
    (event) => {
      onFilters(
        'type_of_firm',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  ); const handleFilterCSP = useCallback(
    (event) => {
      onFilters(
        'csp',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );
  const handleFilterState = useCallback(
    (event) => {
      onFilters(
        'state',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );
  const handleFilterBranch = useCallback(
    (event) => {
      onFilters(
        'branch',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );
  const handleFilterDistrict = useCallback(
    (event) => {
      onFilters(
        'district',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );
  const handleFilterCategory = useCallback(
    (event) => {
      onFilters(
        'category',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );

  const dayManage = (day) => {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6));
    const fifteenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 14));
    const monthDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
    const yearsDaysAgo = new Date(new Date(new Date().setDate(new Date().getDate() - 360)));

    if (day === 'Today') {
      onFilters('startDay', currentDate);
      onFilters('endDay', currentDate);
    }
    if (day === 'Last 7 Day') {
      onFilters('startDay', sevenDaysAgo);
      onFilters('endDay', currentDate);

    }
    if (day === 'Last Week') {
      onFilters('startDay', sevenDaysAgo);
      onFilters('endDay', currentDate);
    }
    if (day === 'Last 15 Day') {
      onFilters('startDay', fifteenDaysAgo);
      onFilters('endDay', currentDate);
    }
    if (day === 'Last Month') {
      onFilters('startDay', monthDaysAgo);
      onFilters('endDay', currentDate);
    }
    if (day === 'Last Year') {
      onFilters('startDay', yearsDaysAgo);
      onFilters('endDay', currentDate);
    }
  };
  useEffect(() => {
    if (day !== '') {
      dayManage(day);
    }

  },[day])


  const handleFilterDays = useCallback(
    (event) => {


      setDay(event.target.value);
    },
    [onFilters],
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: 2.5,
          width:"100%"
        }}
      >
         <GridToolbarQuickFilter sx={{ width: "100% !important" }}/>
        {/*<Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>*/}
        {/*  <TextField*/}
        {/*    fullWidth*/}
        {/*    value={filters.name}*/}
        {/*    onChange={handleFilterName}*/}
        {/*    placeholder="Search..."*/}
        {/*    InputProps={{*/}
        {/*      startAdornment: (*/}
        {/*        <InputAdornment position="start">*/}
        {/*          <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }}/>*/}
        {/*        </InputAdornment>*/}
        {/*      ),*/}
        {/*    }}*/}
        {/*  />*/}

        {/*  /!*<IconButton onClick={popover.onOpen}>*!/*/}
        {/*  /!*  <Iconify icon="eva:more-vertical-fill" />*!/*/}
        {/*  /!*</IconButton>*!/*/}
        {/*</Stack>}*/}
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Type of firm</InputLabel>

          <Select
            multiple
            value={filters.type_of_firm}
            onChange={handleFilterTypeofFirm}
            input={<OutlinedInput label="Type of firm"/>}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {['Partnership', 'Proprietary ', 'LLP', 'Public Limited', 'Other'].map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.type_of_firm.includes(option)}/>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Approval Status</InputLabel>

          <Select
            multiple
            value={filters.csp}
            onChange={handleFilterCSP}
            input={<OutlinedInput label="Approval Status"/>}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {[{name:"Approved",value: "1"},{name:"Declined",value: '0' },{name:"Approval Pending",value: ""}].map((option) => (
              <MenuItem key={option} value={option.name}>
                <Checkbox disableRipple size="small" checked={filters.csp.includes(option.name)}/>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Filter by Day</InputLabel>

          <Select
            value={day}
            onChange={handleFilterDays}
            input={<OutlinedInput label="Filter by Day"/>}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
            // renderValue={(selected) => selected.join(', ')}
          >
            {days.map((option) => (
              <MenuItem key={option} value={option}>
                {/*<Checkbox*/}
                {/*  disableRipple*/}
                {/*  size="small"*/}
                {/*  checked={branch.includes(option)}*/}
                {/*/>*/}
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*<FormControl*/}
        {/*  sx={{*/}
        {/*    flexShrink: 0,*/}
        {/*    width: { xs: 1, md: 200 },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <InputLabel>Category</InputLabel>*/}

        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={filters.category}*/}
        {/*    onChange={handleFilterCategory}*/}
        {/*    input={<OutlinedInput label="Category"/>}*/}
        {/*    renderValue={(selected) => selected.map((value) => value).join(', ')}*/}
        {/*    MenuProps={{*/}
        {/*      PaperProps: {*/}
        {/*        sx: { maxHeight: 240 },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {['society_cooperative', 'miller', 'disributor', 'miller_distributor'].map((option) => (*/}
        {/*      <MenuItem key={option} value={option}>*/}
        {/*        <Checkbox disableRipple size="small" checked={filters.category.includes(option)}/>*/}
        {/*        {handleCategoryTypes(option)}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>State</InputLabel>

          <Select
            multiple
            value={filters.state}
            onChange={handleFilterState}
            input={<OutlinedInput label="State"/>}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {stateOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.state.includes(option)}/>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*<FormControl*/}
        {/*  sx={{*/}
        {/*    flexShrink: 0,*/}
        {/*    width: { xs: 1, md: 200 },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <InputLabel>Branch</InputLabel>*/}

        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={filters.branch}*/}
        {/*    onChange={handleFilterBranch}*/}
        {/*    input={<OutlinedInput label="Branch"/>}*/}
        {/*    renderValue={(selected) => selected.map((value) => value).join(', ')}*/}
        {/*    MenuProps={{*/}
        {/*      PaperProps: {*/}
        {/*        sx: { maxHeight: 240 },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {branchOptions?.map((option) => (*/}
        {/*      <MenuItem key={option} value={option}>*/}
        {/*        <Checkbox disableRipple size="small" checked={filters.branch.includes(option)}/>*/}
        {/*        {option}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>District</InputLabel>

          <Select
            multiple
            value={filters.district}
            onChange={handleFilterDistrict}
            input={<OutlinedInput label="District"/>}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {districtOptions?.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.district.includes(option)}/>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold"/>
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold"/>
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold"/>
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

CspTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  roleOptions: PropTypes.array,
};
