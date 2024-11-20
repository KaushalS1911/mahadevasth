import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';
import { handleCategoryTypes, handleFilterTypes } from '../../_mock';
import { shortDateLabel } from '../../components/custom-date-range-picker';

// ----------------------------------------------------------------------

export default function InventoryTableFiltersResult({
                                                 filters,
                                                 onFilters,
                                                 //
                                                 onResetFilters,
                                                 //
                                                 results,
                                                 ...other
                                               }) {

  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);
  const shortDayLabel = shortDateLabel(filters.startDay, filters.endDay);
  const handleRemoveKeyword = useCallback(() => {
    onFilters('name', '');
  }, [onFilters]);


  const handleRemoveDate = useCallback(() => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  }, [onFilters]);
  const handleRemoveDay = useCallback(() => {
    onFilters('startDay', null);
    onFilters('endDay', null);
  }, [onFilters]);
  const handleRemoveCategory = useCallback(
    (inputValue) => {
      const newValue = filters.category.filter((item) => item !== inputValue);

      onFilters('category', newValue);
    },
    [filters.category, onFilters]
  );
  const handleRemoveCommodity = useCallback(
    (inputValue) => {
      const newValue = filters.commodity.filter((item) => item !== inputValue);

      onFilters('commodity', newValue);
    },
    [filters.commodity, onFilters]
  );
  const handleRemoveBranch = useCallback(
    (inputValue) => {
      const newValue = filters.branch.filter((item) => item !== inputValue);

      onFilters('branch', newValue);
    },
    [filters.branch, onFilters]
  );
  // const handleRemoveStatus = useCallback(
  //   (inputValue) => {
  //     const newValue = filters.status.filter((item) => item !== inputValue);
  //
  //     onFilters('status', newValue);
  //   },
  //   [filters.status, onFilters]
  // );
  const handleRemoveStatus = useCallback(() => {
    onFilters('status', 'all');
  }, [onFilters]);


  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== 'all' && (
          <Block label="Commodity:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )}
        {filters.startDate && filters.endDate && (
          <Block label="Date:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )}
        {filters.startDay && filters.endDay && (
          <Block label="Day:">
            <Chip size="small" label={shortDayLabel} onDelete={handleRemoveDay} />
          </Block>
        )}
        {!!filters.commodity.length && (
          <Block label="Commodity:">
            {filters.commodity.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveCommodity(item)} />
            ))}
          </Block>
        )}
        {/*{!!filters.commodity.length && (*/}
        {/*  <Block label="Status:">*/}
        {/*    {filters.commodity.map((item) => (*/}
        {/*      <Chip key={item} label={item === 'accepted' ? 'Accepted' : item === 'declined' ? 'Declined' : 'Placed'} size="small" onDelete={() => handleRemoveCommodity(item)} />*/}
        {/*    ))}*/}
        {/*  </Block>*/}
        {/*)}*/}
        {/*{!!filters.status.length && (*/}
        {/*  <Block label="status:">*/}
        {/*    {filters.status.map((item) => (*/}
        {/*      <Chip key={item} label={item} size="small" onDelete={() => handleRemoveCommodity(item)} />*/}
        {/*    ))}*/}
        {/*  </Block>*/}
        {/*)}*/}
        {!!filters.branch.length && (
          <Block label="Branch:">
            {/*{filters.branch.map((item) => (*/}
            <Chip key={filters.branch} label={filters.branch} size="small" onDelete={() => handleRemoveBranch(branch)} />
            {/*)}*/}
          </Block>
        )}

        {!!filters.name && (
          <Block label="Keyword:">
            <Chip label={filters.name} size="small" onDelete={handleRemoveKeyword} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

InventoryTableFiltersResult.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};
function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
