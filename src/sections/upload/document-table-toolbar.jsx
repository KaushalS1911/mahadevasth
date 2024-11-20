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
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import { handleCategoryTypes } from '../../_mock';

// ----------------------------------------------------------------------

export default function DocumentTableToolbar({
  filters,
  onFilters,
  vendorData,
  setB,
  getAllDocument,
  //
  document,
  roleOptions,
}) {
  const {vendor} = useAuthContext()
  const [day, setDay] = useState('');
  const days = ['Today', 'Last 7 Day', 'Last Week', 'Last 15 Day', 'Last Month', 'Last Year'];
  const [fil,setfil] = useState(filters)

  const typeOptions =[
    { label: 'Registration Certificate', key: 'registration_certificate' },
    { label: 'Undertaking', key: 'undertaking' },
    { label: 'Audited Accounts', key: 'audited_accounts' },
    { label: 'Income Tax', key: 'income_tax' },
    { label: 'PAN', key: 'pan' },
    { label: 'GST', key: 'gst' },
    { label: 'Sale Registration', key: 'sale_registration' },
    { label: 'Industrial Licence', key: 'industrial_licence' },
    { label: 'Power Bills', key: 'power_bills' },
    { label: 'Pollution Certificates', key: 'pollution_certificates' },
    { label: 'Municipal Property Tax', key: 'municipal_property_tax' },
    { label: 'FSSAI License', key: 'FSSAI_license' },
    { label: 'Photographs of Unit', key: 'photographs_of_unit' }
  ]
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterType = useCallback(
    (event) => {
      onFilters(
        'type',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );
  const handleFilterStatus = useCallback(
    (event) => {
      onFilters(
        'document',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
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


        {vendor ? <GridToolbarQuickFilter sx={{ width: "100% !important" }}/> :
          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
              fullWidth
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }}/>
                  </InputAdornment>
                ),
              }}
            />

            {/*<IconButton onClick={popover.onOpen}>*/}
            {/*  <Iconify icon="eva:more-vertical-fill" />*/}
            {/*</IconButton>*/}
          </Stack>
        }
        {(vendor?.category == "branch" || vendor?.category == "head_office") && <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Category</InputLabel>

          <Select
            multiple
            value={filters.category}
            onChange={handleFilterCategory}
            input={<OutlinedInput label="Category"/>}
            renderValue={(selected) => selected.map((value) =>handleCategoryTypes(value) ).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {['distributor', 'miller', 'miller_distributor',"society_cooperative"].map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.category.includes(option)}/>
                {handleCategoryTypes(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
        {(vendor?.category == "head_office" || vendor?.category == "branch") ? "" : <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Type</InputLabel>

          <Select
            multiple
            value={filters.type}
            onChange={handleFilterType}
            input={<OutlinedInput label="Type"/>}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {typeOptions.map((option) => (
              <MenuItem key={option} value={option.key}>
                <Checkbox disableRipple size="small" checked={filters.type.includes(option.key)}/>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
        {(vendor?.category === "head_office" || vendor?.category === "branch") && <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            multiple
            value={filters.document}
            onChange={handleFilterStatus}
            input={<OutlinedInput label="Status"/>}
            renderValue={(selected) =>
              selected
                .map((value) => value == '1' ? 'Approved' : value == '0' ? 'Rejected' : 'Approval Pending')
                .join(', ')
            }
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {["","0","1"].map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.document.includes(option)}/>
                {option == '1' ? 'Approved' : option == '0' ? 'Rejected' : 'Approval Pending'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>}
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Filter By Day</InputLabel>

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
        {/*{vendorData && <FormControl*/}
        {/*  sx={{*/}
        {/*    flexShrink: 0,*/}
        {/*    width: { xs: 1, md: 200 },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <InputLabel>CSP</InputLabel>*/}

        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={branch}*/}
        {/*    onChange={handleFilterCSP}*/}
        {/*    input={<OutlinedInput label="Type"/>}*/}
        {/*    // renderValue={(selected) => selected.map((value) => value).join(', ')}*/}
        {/*    MenuProps={{*/}
        {/*      PaperProps: {*/}
        {/*        sx: { maxHeight: 240 },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {data.map((option) => (*/}
        {/*      <MenuItem key={option} value={option?.csp_code}>*/}
        {/*        <Checkbox disableRipple size="small" checked={branch?.includes(option?.csp_code)}/>*/}
        {/*        {option?.name}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>}*/}
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
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

DocumentTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  roleOptions: PropTypes.array,
};
