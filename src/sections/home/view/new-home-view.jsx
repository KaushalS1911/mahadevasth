import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Stack,
  CardContent,
  Card,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import footerImage from '../../../assets/home/people-on-hill.webp';
import clouds from '../../../assets/home/clouds.webp';
import startFromTheHomePage from '../../../assets/home/Person_at_desk_worrying_about_bills_5fb2799564.webp';
import GetExpertAdvice from '../../../assets/home/Hand_holding_a_tablet_showing_a_Good_Thinking_page_d8283b4667.webp';
import takeselfassessment from '../../../assets/home/Person_using_laptop_to_do_self_assessment_60457968d2.webp';
import findtherighthelpforyou from '../../../assets/home/Phone_with_text_boxes_coming_out_from_it_b133244e7b.webp';
import assessments1 from '../../../assets/home/Person_meditating_next_to_dog_924ce099c4.webp';
import assessments2 from '../../../assets/home/Person_sleeping_on_sofa_fdaab4ea73.webp';
import assessments3 from '../../../assets/home/Low_mood_tile_Person_sat_on_armchair_making_phone_call_79b1155315.webp';
import assessments4 from '../../../assets/home/Stress_tile_image_person_in_yoga_pose_0a21572392.webp';
import img1 from 'src/assets/home/Person_on_beanbag_using_tablet_and_wearing_headphones_ed8a9026bb.webp';
import img2 from 'src/assets/home/Multi_faith_image_9011784dec.webp';
import img3 from 'src/assets/home/Parents_or_carers_and_child_798c433a8d.webp';
import img4 from 'src/assets/home/Employees_553d7f4384.webp';
import sliderimg1 from '../../../assets/home/Person_sitting_on_sofa_with_london_skyline_in_window_c9f23641f7 (1).webp';
import sliderimg2 from 'src/assets/home/Faith_home_page_aac3fc6171.webp';
import sliderimg3 from 'src/assets/home/Employees_553d7f4384.webp';
import sliderimg4 from 'src/assets/home/OG_Image_a7bd58e917.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import { useTheme } from '@mui/system';

const NewHomeView = () => {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-in-out',
    });
    // AOS.refresh()
  }, []);

  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const assessments = [
    {
      title: 'Anxiety',
      description: 'Feeling anxious, can\'t switch off or your thoughts are racing?',
      bgColor: '#F3EBFA',
      image: assessments1,
    },
    {
      title: 'Sleep',
      description: 'Having trouble sleeping?',
      bgColor: '#EAF4FA',
      image: assessments2,
    },
    {
      title: 'Stress',
      description: 'Feeling overwhelmed by stress?',
      bgColor: '#FEF3E8',
      image: assessments3,
    },
    {
      title: 'Well-being',
      description: 'Looking to improve your overall well-being?',
      bgColor: '#FAEAEA',
      image: assessments4,
    },
  ];
  const slides = [
    {
      title: 'Mental Health in London',
      description:
        'Good Thinking supports Londoners to look after their mental health and wellbeing in a way that works for them. Since its launch in 2017, more than half a million people have used our digital service to tackle anxiety, stress, low mood, sleep problems, and other concerns.',
      image: sliderimg1,
    },
    {
      title: 'Good Thinking marks 7 years',
      description:
        '1 November marked 7 years since the launch of Good Thinking. Since going live in 2017, the service has supported over 800,000 Londoners to manage their mental health and wellbeing.',
      image: sliderimg2,
    },
    {
      title: 'Support your employees',
      description:
        'We know it can be time-consuming to find good quality free resources that support your employee wellbeing strategy. Good Thinking have created a toolkit to help employers create a safe and supportive workplace in these challenging times.',
      image: sliderimg3,
    },
    {
      title: 'Digital mental wellbeing for London',
      description:
        'Good Thinking supports Londoners to look after their mental health and wellbeing in a way that works for them. Since its launch in 2017, more than 750,000 people have used our digital service to tackle anxiety, stress, low mood, sleep problems, and other concerns.',
      image: sliderimg4,
    },
  ];
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box
      sx={{
        backgroundColor: '#FAF7F2',
        mt: { xs: '56px', sm: '64px' },
        overflowX: 'hidden',
      }}
    >
      <Container sx={{ mt: 5 }} maxWidth={'xl'}>
        <Grid container>
          <Swiper navigation={isMdUp} modules={[Navigation]} className='mySwiper'>
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Grid
                  container
                  alignItems='center'
                  justifyContent='center'
                  sx={{ p: 4 }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='left'
                    textAlign='left'
                    data-aos='fade-right'
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '2rem', sm: '3rem' },
                        lineHeight: 1.2,
                        color: '#333',
                        mb: 2,
                        pl: { lg: 10 },
                      }}
                    >
                      {slide.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.1rem', sm: '1.4rem' },
                        lineHeight: '1.6',
                        mb: 3,
                        color: '#555',
                        maxWidth: { md: '650px' },
                        pl: { lg: 10 },
                      }}
                    >
                      {slide.description}
                    </Typography>
                    <Box sx={{ pl: { lg: 10 } }}>
                      <Button
                        variant='contained'
                        sx={{
                          backgroundColor: '#667C53',
                          color: '#fff',
                          width: { xs: '100%', sm: '210px' },
                          mb: { xs: 2, md: 0 },
                          padding: '14px 16px',
                          borderRadius: '56px',
                          fontSize: '17px',
                          textTransform: 'capitalize',
                          '&:hover': {
                            backgroundColor: '#5A6D48',
                          },
                        }}
                      >
                        Read more
                      </Button>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    data-aos='fade-left'
                  >
                    <Box
                      sx={{
                        borderRadius: 4,
                        width: '500px',
                      }}
                    >
                      <img
                        src={slide.image}
                        alt='Mental Health Illustration'
                        style={{ height: 'auto', width: '100%', borderRadius: '8px' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
          <style jsx>{`
            .swiper-button-prev,
            .swiper-button-next {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background-color: #F6EBD1;
              color: #695042;
              border-radius: 50%;
              padding: 20px;
              z-index: 10;
            }

            .swiper-button-prev {
              left: 0%;
            }

            .swiper-button-next {
              right: 0%;
            }

            .swiper-button-prev:hover,
            .swiper-button-next:hover {
              border: 1px solid orange;
            }

            .swiper-button-next::after,
            .swiper-button-prev::after {
              font-size: 20px;
              font-weight: bold;
            }
          `}</style>
        </Grid>
        <Box
          sx={{
            paddingBottom: 4,
            mt: '100px',
            mb: '50px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: 6,
            }}
          >
            <Typography
              data-aos='fade-right'
              variant='h4'
              sx={{
                fontWeight: 'bold',
                color: '#3E2723',
                width: { xs: '100%', md: '45%' },
                marginBottom: { xs: 2, md: 0 },
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
              }}
            >
              I'm looking for support for…
            </Typography>

            <Typography
              data-aos='fade-left'
              sx={{
                color: '#5C4935',
                fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                lineHeight: 1.8,
                width: { xs: '100%', md: '50%' },
              }}
            >
              Good Thinking supports Londoners to look after their mental health and
              wellbeing in a way that works for them. Good Thinking supports Londoners
              to look after their...
            </Typography>
          </Box>

          <Box
            data-aos='fade-up'
            sx={{
              backgroundColor: '#F6EDD6',
              padding: 4,
              marginBottom: 6,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              borderRadius: '20px',
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                marginBottom: { xs: 2, md: 0 },
              }}
            >
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                  color: '#3E2723',
                  marginBottom: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.6rem' },
                }}
              >
                Young people
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: '#5C4935',
                  fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
                }}
              >
                We invite young people to guide and review our content – so you can be
                sure we'll help with the issues that really matter to you...
              </Typography>
            </Box>

            <Box
              component='img'
              src={img1}
              alt='Young person illustration'
              sx={{
                width: { xs: '100%', md: '35%' },
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
            />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4} data-aos='fade-up'>
              <Card
                sx={{
                  backgroundColor: '#F6EDD6',
                  borderRadius: '12px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 3,
                  '&:hover': {
                    backgroundColor: '#F7EAC6',
                    border: '1px solid #D4C49E',
                  },
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  }}
                >
                  Faith & belief communities
                </Typography>
                <Box
                  component='img'
                  src={img2}
                  alt='Faith communities illustration'
                  sx={{
                    width: '100%',
                    height: '100px',
                    maxWidth: '120px',
                    objectFit: 'cover',
                    marginBottom: 2,
                    borderRadius: '8px',
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={4} data-aos='fade-up'>
              <Card
                sx={{
                  backgroundColor: '#F6EDD6',
                  borderRadius: '12px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 3,
                  '&:hover': {
                    backgroundColor: '#F7EAC6',
                    border: '1px solid #D4C49E',
                  },
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                  }}
                >
                  Parents & carers
                </Typography>
                <Box
                  component='img'
                  src={img3}
                  alt='Parents and carers illustration'
                  sx={{
                    width: '100%',
                    height: '100px',
                    maxWidth: '120px',
                    objectFit: 'cover',
                    marginBottom: 2,
                    borderRadius: '8px',
                  }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={4} data-aos='fade-up'>
              <Card
                sx={{
                  backgroundColor: '#F6EDD6',
                  borderRadius: '12px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 3,
                  '&:hover': {
                    backgroundColor: '#F7EAC6',
                    border: '1px solid #D4C49E',
                  },
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2' },
                  }}
                >
                  Employers & employees
                </Typography>
                <Box
                  component='img'
                  src={img4}
                  alt='Employers and employees illustration'
                  sx={{
                    width: '100%',
                    height: '100px',
                    maxWidth: '120px',
                    objectFit: 'cover',
                    marginBottom: 2,
                    borderRadius: '8px',
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: { xs: '2rem', sm: '2.6rem' } }} fontWeight='bold' color='#2a2926' gutterBottom
                      data-aos='fade-down'>
            How to use the Good Thinking service
          </Typography>
          <Typography
            data-aos='fade-up'
            variant='subtitle1'
            color='#6c6c6c'
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto', fontSize: { xs: '1.2rem', sm: '1.4rem' } }}
          >
            In this short guide, we’ll take you through the various Good Thinking
            resources and suggest five ways you can access them.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }} // Column for small screens, row for larger screens
            justifyContent='center'
            spacing={2}
            sx={{
              mb: 4,
              alignItems: 'center', // Center align in column layout
            }}
          >
            {[
              { id: 'home', label: 'Start from the home page' },
              { id: 'expertAdvice', label: 'Get expert advice' },
              { id: 'selfAssessment', label: 'Take a self-assessment' },
              { id: 'Findtherighthelpforyou', label: 'Find the right help for you' },
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                variant={activeTab === tab.id ? 'contained' : 'outlined'}
                sx={{
                  borderRadius: '30px',
                  width: { xs: '100%', sm: 'auto' },
                  py: 1.5,
                  backgroundColor: activeTab === tab.id ? '#56723f' : '',
                  border: '1px solid black',
                  color: activeTab === tab.id ? 'white' : '#2a2926',
                  fontSize: { xs: '14px', sm: '16px' },
                  '&:hover': {
                    backgroundColor: activeTab === tab.id ? '#3e582b' : '#f5f5f5',
                  },
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Stack>
          <Box>
            {activeTab === 'home' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 4,
                }}
              >
                <Box data-aos="fade-right" sx={{ flex: 1, minWidth: { xs: '100%', md: '50%' } }}>
                  {[
                    {
                      title: 'Audience',
                      description:
                        'Young people, Parents and carers, Employers and employees, Faith and belief communities.',
                    },
                    {
                      title: 'Mental health concern',
                      description: 'Sleep, Anxiety, Low mood, Stress.',
                    },
                    {
                      title: 'Type of content',
                      description: 'Free apps, Podcasts, blogs and videos, How to guides, Workbooks.',
                    },
                  ].map((item, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <List
                        sx={{
                          pl: 2,
                          '& li': {
                            position: 'relative',
                            paddingLeft: '20px',
                            '&::before': {
                              content: "'•'",
                              position: 'absolute',
                              left: 0,
                              color: 'orange',
                              fontSize: '3rem',
                            },
                          },
                        }}
                      >
                        <ListItem>
                          <Typography
                            fontWeight="bold"
                            color="#2a2926"
                            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                          >
                            {item.title}
                          </Typography>
                        </ListItem>
                      </List>
                      <Typography
                        color="#6c6c6c"
                        sx={{
                          pl: 3,
                          textAlign: 'start',
                          fontSize: { xs: '1.1rem', sm: '1.4rem' },
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box
                  data-aos="fade-left"
                  sx={{
                    width: { xs: '100%', md: 450 },
                    maxWidth: '100%',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={startFromTheHomePage}
                    alt="Mental Health Illustration"
                    style={{ height: 'auto', width: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Box>
            )}

            {activeTab === 'expertAdvice' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign:'start',
                  flexWrap: 'wrap',
                  gap: 4,
                }}
              >
                <Box
                  data-aos="fade-right"
                  sx={{ flex: 1, minWidth: { xs: '100%', md: '50%' } }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#2a2926"
                    sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, mb: 2 }}
                  >
                    Get expert advice from Good Thinking
                  </Typography>
                  <Typography
                    color="#6c6c6c"
                    sx={{
                      maxWidth: 680,
                      fontSize: { xs: '1.1rem', sm: '1.4rem' },
                    }}
                  >
                    The Good Thinking team has created a broad range of advice in collaboration with
                    clinical and subject-area experts, designed to support Londoners with everyday mental health challenges. Explore our guides for tips and resources.
                  </Typography>
                </Box>
                <Box
                  data-aos="fade-left"
                  sx={{
                    width: { xs: '100%', md: 450 },
                    maxWidth: '100%',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={GetExpertAdvice}
                    alt="Mental Health Illustration"
                    style={{ height: 'auto', width: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Box>
            )}

            {activeTab === 'selfAssessment' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 4,
                }}
              >
                <Box data-aos="fade-right" sx={{ flex: 1, minWidth: { xs: '100%', md: '50%' } }}>
                  <Grid container spacing={4} alignItems="start" textAlign="start">
                    <Grid item xs={12} md={6} mt={3}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 'bold',
                          mb: 2,
                          fontSize: { xs: '1.5rem', sm: '2rem' },
                        }}
                      >
                        Use the Good Thinking self-assessment tool
                      </Typography>
                      <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
                        Our in-depth, clinically validated self-assessments are a thorough assessment of both your mental and physical wellbeing. They may seem quite ‘medical’ because they are based on the types of questions a doctor or a psychologist might ask you.
                      </Typography>
                      <List>
                        {[
                          'Each self-assessment takes around 20 minutes to complete',
                          'Answer questions about yourself or someone you may be concerned about',
                          'You’ll get a personalised list of recommended actions to take forward',
                        ].map((text, index) => (
                          <ListItem
                            key={index}
                            sx={{
                              alignItems: 'flex-start',
                            }}
                          >
                            <ListItemIcon>
                              <CircleIcon
                                sx={{
                                  color: '#FF9800',
                                  fontSize: { xs: '1rem', sm: '1.1rem' },
                                  mt: 0.5,
                                }}
                              />
                            </ListItemIcon>
                            {text}
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          borderRadius: '30px',
                          backgroundColor: '#3e582b',
                          color: '#fff',
                          mt: 2,
                          width: { xs: '100%', sm: 'auto' },
                        }}
                      >
                        Take a self-assessment
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        data-aos="fade-left"
                        width="100%"
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Box
                          sx={{
                            borderRadius: 4,
                            width: '450px',
                          }}
                        >
                          <img
                            src={takeselfassessment}
                            alt="Mental Health Illustration"
                            style={{
                              height: 'auto',
                              width: '100%',
                              borderRadius: '8px',
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            )}

            {activeTab === 'Findtherighthelpforyou' && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 4,
                  px: { xs: 2, md: 4 },
                }}
              >
                <Grid container spacing={4} alignItems="center" textAlign="start">
                  <Grid item xs={12} sm={12} md={6}>
                    <Box data-aos="fade-right">
                      <Typography
                        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                        fontWeight="bold"
                        gutterBottom
                      >
                        Find the right help for you
                      </Typography>
                      <Typography
                        color="textSecondary"
                        paragraph
                        sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem' } }}
                      >
                        Tell us what you're looking for help with and who you're looking for help for and you’ll then receive personalised recommendations for apps and other resources to meet your needs.
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          borderRadius: 8,
                          textTransform: 'none',
                          backgroundColor: '#3E582B',
                          mt: 2,
                          '&:hover': { backgroundColor: '#6F8A6E' },
                          width: '100%',
                          maxWidth: 300,
                        }}
                      >
                        Find the right help for you
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Box
                      data-aos="fade-left"
                      sx={{
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '450px',
                        }}
                      >
                        <img
                          src={findtherighthelpforyou}
                          alt="Mental Health Illustration"
                          style={{
                            height: 'auto',
                            width: '100%',
                            borderRadius: '8px',
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>

        </Box>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant='h3' sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '2rem', sm: '3rem' } }}>
            Choose self-assessment
          </Typography>
          <Grid container spacing={4}>
            {assessments.map((assessment, index) => (
              <Grid item xs={12} sm={6} md={6} key={index} data-aos='fade-up'>
                <Card
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: assessment.bgColor,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Typography
                      variant='overline'
                      sx={{
                        display: 'block',
                        color: '#6C757D',
                        fontSize: 14,
                        mb: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        p: 1,
                      }}
                    >
                      SELF-ASSESSMENT
                    </Typography>
                  </Box>
                  <Box
                    component='img'
                    src={assessment.image}
                    alt={assessment.title}
                    sx={{
                      width: '50%', // Adjust image size
                      maxHeight: '120px',
                      objectFit: 'contain',
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>

                    <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                      {assessment.title}
                    </Typography>
                    <Typography variant='body2' sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem' } }}
                                color='text.secondary'>
                      {assessment.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
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
          overflow: 'hidden',
        }}
      >
        {/* Cloud Decorations */}
        <Box data-aos='fade-down'
             component='img'
             src={clouds}
             alt='clouds'
             sx={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: 'auto',
               opacity: 0.1,
               py: 2,
             }}
        />
        <Typography variant='h3' fontWeight='bold' gutterBottom data-aos='fade-up'
                    sx={{ fontSize: { xs: '2rem', sm: '2.6rem' } }}>
          Subscribe to our newsletter
        </Typography>
        <Typography data-aos='fade-up' variant='body1' color='textSecondary'
                    sx={{ fontSize: { xs: '1.1rem', sm: '1.4rem' }, mb: 3, px: 2 }}>
          Stay tuned and subscribe to our newsletter. Get the latest tips and
          resources for Londoners.
        </Typography>
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
          }}
        >
          Subscribe
        </Button>
        <Box
          component='img'
          src={footerImage}
          alt='illustration'
          sx={{
            width: '100%',
            height: 'auto',
            mt: 4,
          }}
        />
      </Box>
    </Box>
  );
};

export default NewHomeView;
