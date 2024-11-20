import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';
import { handleCategoryTypes, handleDoctypeLabel, handleFilterTypes } from '../../_mock';
import { shortDateLabel } from '../../components/custom-date-range-picker';

// ----------------------------------------------------------------------

export default function DocumentTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}) {

  const shortDayLabel = shortDateLabel(filters.startDay, filters.endDay);
  const handleRemoveKeyword = useCallback(() => {
    onFilters('name', '');
  }, [onFilters]);

  const handleRemoveCategory = useCallback(
    (inputValue) => {
      const newValue = filters.category.filter((item) => item !== inputValue);

      onFilters('category', newValue);
    },
    [filters.category, onFilters]
  );
  const handleRemoveDay = useCallback(() => {
    onFilters('startDay', null);
    onFilters('endDay', null);
  }, [onFilters]);
  const handleRemoveStatus = useCallback(() => {
    onFilters('status', 'all');
  }, [onFilters]);

  const handleRemoveRole = useCallback(
    (inputValue) => {
      const newValue = filters.role.filter((item) => item !== inputValue);

      onFilters('role', newValue);
    },
    [filters.role, onFilters]
  );
  const handleRemoveType = useCallback(
    (inputValue) => {
      const newValue = filters.type.filter((item) => item !== inputValue);

      onFilters('type', newValue);
    },
    [filters.type, onFilters]
  );
  const handleRemoveDocument = useCallback(
    (inputValue) => {
      const newValue = filters.document.filter((item) => item !== inputValue);

      onFilters('document', newValue);
    },
    [filters.document, onFilters]
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
          <Block label="Type:">
            <Chip size="small" label={handleDoctypeLabel(filters.status)} onDelete={handleRemoveStatus} />
          </Block>
        )}
        {!!filters.document.length && (
          <Block label="Status:">
            {filters.document.map((option) => (
              <Chip key={option} label={option == '1' ? 'Approved' : option == '0' ? 'Rejected' : 'Approval Pending'} size="small" onDelete={() => handleRemoveDocument(option)} />
            ))}
          </Block>
        )}
        {filters.startDay && filters.endDay && (
          <Block label="Day:">
            <Chip size="small" label={shortDayLabel} onDelete={handleRemoveDay} />
          </Block>
        )}
        {!!filters.role.length && (
          <Block label="Role:">
            {filters.role.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveRole(item)} />
            ))}
          </Block>
        )}
        {!!filters.type.length && (
          <Block label="Type:">
            {filters.type.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveType(item)} />
            ))}
          </Block>
        )}
        {!!filters.category.length && (
          <Block label="Category:">
            {filters.category.map((item) => (
              <Chip key={item} label={handleCategoryTypes(item)} size="small" onDelete={() => handleRemoveCategory(item)} />
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

DocumentTableFiltersResult.propTypes = {
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
