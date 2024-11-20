import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';
import { handleFilterTypes } from '../../_mock';

// ----------------------------------------------------------------------

export default function CspTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}) {
  const handleRemoveKeyword = useCallback(() => {
    onFilters('name', '');
  }, [onFilters]);

  const handleRemoveStatus = useCallback(() => {
    onFilters('status', 'all');
  }, [onFilters]);

  const handleRemoveTypeoffirm = useCallback(
    (inputValue) => {
      const newValue = filters.type_of_firm.filter((item) => item !== inputValue);

      onFilters('type_of_firm', newValue);
    },
    [filters.type_of_firm, onFilters]
  );

  const handleRemoveState = useCallback(
    (inputValue) => {
      const newValue = filters.state.filter((item) => item !== inputValue);

      onFilters('state', newValue);
    },
    [filters.state, onFilters]
  );
  const handleRemoveCategory = useCallback(
    (inputValue) => {
      const newValue = filters.category.filter((item) => item !== inputValue);

      onFilters('category', newValue);
    },
    [filters.category, onFilters]
  );

  const handleRemoveBranch = useCallback(
    (inputValue) => {
      const newValue = filters.branch.filter((item) => item !== inputValue);

      onFilters('branch', newValue);
    },
    [filters.branch, onFilters]
  );const handleRemoveDistrict = useCallback(
    (inputValue) => {
      const newValue = filters.district.filter((item) => item !== inputValue);

      onFilters('district', newValue);
    },
    [filters.district, onFilters]
  );

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
          <Block label="Status:">
            <Chip size="small" label={handleFilterTypes(filters.status)} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {!!filters.type_of_firm.length && (
          <Block label="Type of firm:">
            {filters.type_of_firm.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveTypeoffirm(item)} />
            ))}
          </Block>
        )} {!!filters.category.length && (
          <Block label="Category:">
            {filters.category.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveCategory(item)} />
            ))}
          </Block>
        )}
        {!!filters.state.length && (
          <Block label="State:">
            {filters.state.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveState(item)} />
            ))}
          </Block>
        )}
        {!!filters.branch.length && (
          <Block label="Branch:">
            {filters.branch.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveBranch(item)} />
            ))}
          </Block>
        )}
        {!!filters.district.length && (
          <Block label="District:">
            {filters.district.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveDistrict(item)} />
            ))}
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

CspTableFiltersResult.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

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
