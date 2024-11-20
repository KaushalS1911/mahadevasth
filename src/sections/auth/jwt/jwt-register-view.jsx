import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import img from '../../../assets/images/loginbgnew.png';
import RegistrationForm from './registration-page-view';

export default function JwtRegisterView() {
  const [selectedVendor, setSelectedVendor] = useState();

  const handleChange = (e) => {
    setSelectedVendor(e.target.value);
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
            height: '100%',
          }}
        >
          <Box sx={{ px: '20px', pt: '130px' }}>
            <Box p={5} pb={0}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: 'black' }}>
                  Select Category
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="vendor"
                  name="vendor"
                  value={selectedVendor}
                  onChange={handleChange}
                >
                  <FormControlLabel value="miller" control={<Radio />} label="Miller" />
                  <FormControlLabel value="distributor" control={<Radio />} label="Distributor" />
                  <FormControlLabel
                    value="miller_distributor"
                    control={<Radio />}
                    label="Miller + Distributor"
                  />
                  <FormControlLabel
                    value="society_cooperative"
                    control={<Radio />}
                    label="Society/Co-operative"
                  />
                  <FormControlLabel
                    value="modern_trade"
                    control={<Radio />}
                    label="Modern trade"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Box
                p={1}
                borderRadius="borderRadius"
                bgcolor="primary.main"
                color="white"
                className="subtal"
                sx={{ display: 'inline-block', borderRadius: '5px', mt: '10px' }}
              >
                <Typography variant="body1">
                  Online application for obtaining Provisional Permission for becoming a channel
                  sales partner
                </Typography>
              </Box>
            </Box>
            <Box p={3} pt={0} mt={5}>
              {selectedVendor && <RegistrationForm vendor_category={selectedVendor} />}

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
