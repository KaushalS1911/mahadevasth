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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import {
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';
import { useAuthContext } from '../../auth/hooks';
import moment from 'moment';
import { handleCategoryTypes } from '../../_mock';

// ----------------------------------------------------------------------

export default function InventoryTableToolbar({
                                             filters,
                                             onFilters,
                                             //
                                             dateError,
                                             dayError,
                                             branchOptions,
                                           }) {
  const { vendor } = useAuthContext();
  const days = ['Today', 'Last 7 Day', 'Last Week', 'Last 15 Day', 'Last Month', 'Last Year'];
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [allCommodity,setAllCommodity] = useState([])
  const [day, setDay] = useState('');
useEffect(() => {
  axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`).then((res) => {
    setAllCommodity(res?.data?.data);
  });
},[])
  const handleFilterStartDate = useCallback(
    (newValue) => {
      // Check if newValue is null or undefined
      if (newValue === null || newValue === undefined) {
        onFilters('startDate', null);
        return;
      }

      // Convert newValue to moment object
      const date = moment(newValue);

      // Check if the date is valid
      if (date.isValid()) {
        // Use the format you want to store or send
        onFilters('startDate', date.toDate());
      } else {
        // Handle invalid date if necessary
        console.warn('Invalid date selected');
        // Optionally reset to null or handle it differently
        onFilters('startDate', null);
      }
    },
    [onFilters],
  );
  const handleFilterEndDate = useCallback(
    (newValue) => {
      // Check if newValue is null or undefined
      if (newValue === null || newValue === undefined) {
        onFilters('endDate', null);
        return;
      }

      // Convert newValue to moment object
      const date = moment(newValue);

      // Check if the date is valid
      if (date.isValid()) {
        // Use the format you want to store or send
        onFilters('endDate', date.toDate());
      } else {
        // Handle invalid date if necessary
        console.warn('Invalid date selected');
        // Optionally reset to null or handle it differently
        onFilters('endDate', null);
      }
    },
    [onFilters],
  );
  // const handleFilterEndDate = useCallback(
  //   (newValue) => {
  //     const d = newValue.toString()
  //     if(d !== "Invalid Date") {
  //       onFilters('endDate', newValue);
  //     }
  //
  //   },
  //   [onFilters],
  // );

  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onFilters('name', event.target.value);
    },
    [onFilters],
  );
  const handleFilterCommodity = useCallback(
    (event) => {
      onFilters(
        'commodity',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
    },
    [onFilters],
  );
  // const handleFilterDays = useCallback(
  //   (event) => {
  //
  //     console.log(event.target.value,"event");
  //         setDay(event.target.value);
  //
  //     const currentDate = new Date();
  //     const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6));
  //     const fifteenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 14));
  //     const monthDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
  //     const yearsDaysAgo = new Date(new Date().setDate(new Date().getDate() - 360));
  //
  //     if (event.target.value === 'Today') {
  //       onFilters('startDay', currentDate);
  //       onFilters('endDay', currentDate);
  //     }
  //     if (event.target.value === 'Last 7 Day') {
  //       onFilters('startDay', sevenDaysAgo);
  //       onFilters('endDay', currentDate);
  //
  //     }
  //     if (event.target.value === 'Last Week') {
  //       onFilters('startDay', sevenDaysAgo);
  //       onFilters('endDay', currentDate);
  //     }
  //     if (event.target.value === 'Last 15 Day') {
  //       onFilters('startDay', fifteenDaysAgo);
  //       onFilters('endDay', currentDate);
  //     }
  //     if (event.target.value === 'Last Month') {
  //       onFilters('startDay', monthDaysAgo);
  //       onFilters('endDay', currentDate);
  //     }
  //     if (event.target.value === 'Last Year') {
  //       onFilters('startDay', yearsDaysAgo);
  //       onFilters('endDay', currentDate);
  //     }
  //     // switch (event.target.value){
  //     //   case "Today" : {
  //     //   }
  //     //   case "Last 7 Day" :{
  //     //     onFilters('startDay', sevenDaysAgo)
  //     //     onFilters('endDay', currentDate)
  //     //
  //     //   }
  //     //   case "Last Week" :{
  //     //
  //     //   }
  //     //   case "Last 15 Day" :{
  //     //     onFilters('startDay', fifteenDaysAgo)
  //     //     onFilters('endDay', currentDate)
  //     //
  //     //   }
  //     //   case "Last Month" :{
  //     //     onFilters('startDay', monthDaysAgo)
  //     //     onFilters('endDay', currentDate)
  //     //
  //     //   }
  //     //   case "Last Year" :{
  //     //     onFilters('startDay', yearsDaysAgo)
  //     //     onFilters('endDay', currentDate)
  //     //
  //     //   }
  //     //   default : {
  //     //     "hello"
  //     //   }
  //     // }
  //
  //     // onFilters(
  //     //   'days',
  //     //   typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
  //     // );
  //   },
  //   [onFilters],
  // );
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
  const handleFilterCategory = useCallback(
    (event) => {
      onFilters(
        'category',
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
  const handleFilterStatus = useCallback(
    (event) => {
      onFilters(
        'status',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
      );
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
          width: '100%',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>

          {/*<DatePicker*/}
          {/*  label="Start date"*/}
          {/*  value={filters.startDate}*/}
          {/*  open={startDateOpen}*/}
          {/*  onClose={() => setStartDateOpen(false)}*/}
          {/*  onChange={handleFilterStartDate}*/}
          {/*  slotProps={{*/}
          {/*    textField: {*/}

          {/*      onClick: () => setStartDateOpen(true),*/}
          {/*      fullWidth: true,*/}
          {/*    },*/}
          {/*  }}*/}
          {/*  sx={{*/}
          {/*    maxWidth: { md: 200 },*/}
          {/*  }}*/}
          {/*/>*/}
          <DatePicker
            label="Start date"
            value={filters.startDate ? moment(filters.startDate).toDate() : null}
            open={startDateOpen}
            onClose={() => setStartDateOpen(false)}
            onChange={handleFilterStartDate}
            slotProps={{
              textField: {
                onClick: () => setStartDateOpen(true),
                fullWidth: true,
              },
            }}
            sx={{
              maxWidth: { md: 200 },
            }}
          />
          <DatePicker
            label="End date"
            value={filters.endDate}
            onChange={handleFilterEndDate}
            open={endDateOpen}
            slotProps={{
              textField: {
                onClick: () => setEndDateOpen(true),
                fullWidth: true,
                error: dateError,
                helperText: dateError && 'End date must be later than start date',
              },
            }}
            sx={{
              maxWidth: { md: 200 },
              [`& .${formHelperTextClasses.root}`]: {
                position: { md: 'absolute' },
                bottom: { md: -40 },
              },
            }}
          />
           <GridToolbarQuickFilter sx={{ width: '100% !important' }}/>
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
          {/*}*/}

          {/*<IconButton onClick={popover.onOpen}>*/}
          {/*  <Iconify icon="eva:more-vertical-fill" />*/}
          {/*</IconButton>*/}
        </Stack>
        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Commodity</InputLabel>

          <Select
            multiple
            value={filters.commodity}
            onChange={handleFilterCommodity}
            input={<OutlinedInput label="Commodity"/>}
            renderValue={(selected) => selected.map((value) =>value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {allCommodity.map((option) => (
              <MenuItem key={option?.commodity_name} value={option?.commodity_name}>
                <Checkbox disableRipple size="small" checked={filters.commodity.includes(option?.commodity_name)}/>
                {option?.commodity_name}
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
        {/*  <InputLabel>Status</InputLabel>*/}

        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={filters.commodity}*/}
        {/*    onChange={handleFilterCommodity}*/}
        {/*    input={<OutlinedInput label="Status"/>}*/}
        {/*    renderValue={(selected) => selected.map((value) => value).join(', ')}*/}
        {/*    MenuProps={{*/}
        {/*      PaperProps: {*/}
        {/*        sx: { maxHeight: 240 },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {['accepted', 'declined', 'placed'].map((option) => (*/}
        {/*      <MenuItem key={option} value={option}>*/}
        {/*        <Checkbox disableRipple size="small" checked={filters.commodity.includes(option)}/>*/}
        {/*        {option === 'accepted' ? 'Accepted' : option === 'declined' ? 'Declined' : 'Placed'}*/}
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
          <InputLabel>Filter by Day</InputLabel>

          <Select
            value={day}
            onChange={handleFilterDays}
            input={<OutlinedInput label="Filter By Day"/>}
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
        {/*<GridToolbarColumnsButton />*/}
        {/*<GridToolbarFilterButton />*/}
        {/*<GridToolbarExport />*/}

        {/*<FormControl*/}
        {/*  sx={{*/}
        {/*    flexShrink: 0,*/}
        {/*    width: { xs: 1, md: 200 },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <InputLabel>Status</InputLabel>*/}

        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={filters.status}*/}
        {/*    onChange={handleFilterStatus}*/}
        {/*    input={<OutlinedInput label="Status"/>}*/}
        {/*    renderValue={(selected) => selected.map((value) => value).join(', ')}*/}
        {/*    MenuProps={{*/}
        {/*      PaperProps: {*/}
        {/*        sx: { maxHeight: 240 },*/}
        {/*      },*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {['placed', 'declined', 'accepted'].map((option) => (*/}
        {/*      <MenuItem key={option} value={option}>*/}
        {/*        <Checkbox disableRipple size="small" checked={filters.status.includes(option)}/>*/}
        {/*        {option}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}

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

InventoryTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  roleOptions: PropTypes.array,
};
