import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import footerImage from 'src/assets/home/people-on-hill.webp';
import clouds from 'src/assets/home/clouds.webp';


const MainFooter = () => {
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor:"#FAF7F2",
    }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 4,
          borderRadius: 4,
          position: 'relative',
        }}
      >
        {/* Cloud Decorations */}
        <Box
          data-aos='fade-down'
          component='img'
          src={clouds}
          alt='Clouds background'
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            opacity: 0.1,
          }}
        />

        {/* Title */}
        <Typography
          variant='h3'
          fontWeight='bold'
          gutterBottom
          data-aos='fade-up'
          sx={{
            fontSize: { xs: '2rem', sm: '2.6rem' },
            zIndex: 1,
          }}
        >
          Subscribe to our newsletter
        </Typography>

        {/* Description */}
        <Typography
          data-aos='fade-up'
          variant='body1'
          color='textSecondary'
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.4rem' },
            mb: 3,
            px: 2,
            zIndex: 1,
          }}
        >
          Stay tuned and subscribe to our newsletter. Get the latest tips and
          resources for individuals.
        </Typography>

        {/* Subscribe Button */}
        <Button
          variant='contained'
          color='success'
          sx={{
            backgroundColor: '#5A735A',
            color: '#fff',
            '&:hover': { backgroundColor: '#6F8A6E' },
            borderRadius: '20px',
            px: 4,
            py: 1.5,
            zIndex: 1,
          }}
        >
          Subscribe
        </Button>

        {/* Footer Illustration */}
        <Box
          component='img'
          src={footerImage}
          alt='Illustration'
          sx={{
            width: '100%',
            height: 'auto',
            mt: 4,
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default MainFooter;
