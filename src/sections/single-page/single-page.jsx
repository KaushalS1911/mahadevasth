import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import img from 'src/assets/home/Person_on_beanbag_using_tablet_and_wearing_headphones_ed8a9026bb.webp';
import { Link } from 'react-router-dom';
import Iconify from '../../components/iconify';
import img1 from 'src/assets/home/Person_on_beanbag_using_tablet_and_wearing_headphones_ed8a9026bb.webp';
import img2 from 'src/assets/home/Bereavemment_0b2bd9d7da.webp';
import img3 from 'src/assets/home/Students_in_lecture_theatre_9962f8ae4c.webp';
import img4 from 'src/assets/home/Different_faiths_9957f47dab.webp';
import img5 from 'src/assets/home/Employees_553d7f4384.webp';
import img6 from 'src/assets/home/Children_and_teacher_in_classroom_380b93f178.webp';
import { useParams } from 'react-router';


const SinglePage = () => {
  const { name } = useParams();
  const allContant = [
    {
      name: 'young-people',
      title: 'Young people',
      subTitle1: 'Feeling anxious? Stressed out? Not sleeping properly? Good Thinking is here to help boost your mental wellbeing.',
      subTitle2: 'As you grow up, you experience physical changes and various pressures, such as exams and bullying, that can have an impact on your mental health. On Good Thinking you\'ll find lots of helpful digital resources, including free NHS-approved apps and top tips to help you get through the tough times. Working closely with organisations like Partnership for Young London, we invite young people to guide and review our content so you can be sure we’ll help with the issues that really matter to you.',
      subTitle3: 'We hope you find Good Thinking useful – if so, please tell your friends about us.',
      image: img1,
    }, {
      name: 'Someone-who-is-grieving',
      title: 'Bereavement',
      subTitle1: 'It can be really painful to lose someone you care about so Good Thinking has created this guidance to help you cope with your own grief and support other people through bereavement.',
      subTitle2: 'There is no right or wrong way to feel when a relative or friend dies. Bereavement and grief affect people in different ways – you might experience shock, numbness, anxiety, sadness, anger, exhaustion and even guilt – but there are things you can do to help you come to terms with your loss and to support those around you.',
      // subTitle3: 'We hope you find Good Thinking useful – if so, please tell your friends about us.',
      image: img2,
    }, {
      name: 'students',
      title: 'Students',
      subTitle1: 'At college or university in London? Good Thinking\'s advice and support helps you to stay mentally healthy while you’re studying.',
      subTitle2: 'College or university can be an exciting time but it can also be nerve-racking and challenging to adapt to your new lifestyle. Whether you’re worried about starting a new course, feeling the pressure to get good exam results or stressed about money or finding a job, our message for you is simple: it’s OK to not feel OK.',
      subTitle3: 'On this page, you\'ll find guides, apps, podcasts and links to useful resources to help you to stay mentally healthy and make the most of your student experience.',
      image: img3,
    }, {
      name: 'faith&belief-communities',
      title: 'Faith & belief communities',
      subTitle1: 'In recognition of London being the most religiously diverse region of England, Good Thinking has collaborated with members of eight faith and belief communities to develop bespoke wellbeing resources.',
      subTitle2: 'Londoners have told Good Thinking that there is no ‘one size fits all’ solution when it comes to their health – they want information and support that reflects how they live and what their values are.',
      subTitle3: 'So, over the last few years, we’ve worked with a diverse range of faith and belief communities across London to co-create tailored wellbeing content. This includes collaborating with local councils, GPs, faith leaders, charities and community organisations.',
      image: img4,
    }, {
      name: 'employers-and-employees',
      title: 'Employers and employees',
      subTitle1: 'Feeling anxious? Stressed out? Not sleeping properly? Good Thinking is here to help boost your mental wellbeing.',
      subTitle2: 'As you grow up, you experience physical changes and various pressures, such as exams and bullying, that can have an impact on your mental health. On Good Thinking you\'ll find lots of helpful digital resources, including free NHS-approved apps and top tips to help you get through the tough times. Working closely with organisations like Partnership for Young London, we invite young people to guide and review our content so you can be sure we’ll help with the issues that really matter to you.',
      subTitle3: 'We hope you find Good Thinking useful – if so, please tell your friends about us.',
      image: img5,
    }, {
      name: 'education-professionals',
      title: 'Education professionals',
      subTitle1: 'Looking for new ways to support your employees’ wellbeing? We\'ve created an employer toolkit to support you in raising awareness of the free, personalised advice, and NHS-approved apps and resources available through Good Thinking to help promote positive mental health and wellbeing in the workplace.',
      subTitle2: 'Stress, anxiety and burnout are common problems in the workplace. The mental health charity, Mind, reports that 1 in 6 UK workers are experiencing mental health problems and, with current pressures from the cost of living crisis, the need to provide support for employees is now more critical than ever. ',
      subTitle3: 'We know it can be time-consuming to find good quality free resources that support your employee wellbeing strategy, so as London’s digital mental wellbeing service, Good Thinking have created a toolkit to help employers create a safe and supportive workplace in these challenging times. ',
      image: img6,
    },
  ];

  const cotant = allContant.find((item) => item.name === name);
  console.log(cotant, '00000');

  return (
    <Box
      sx={{
        backgroundColor: '#FAF7F2',
        mt: { xs: '56px', sm: '64px' },
        overflowX: 'hidden',
        minHeight: '70vh',
      }}
    >
      <Container maxWidth={'xl'}>
        <Box px={3}>
          <Typography
            sx={{
              fontSize: '1.1rem',
              my: 5,
              display: 'flex', // Flexbox for horizontal alignment
              alignItems: 'center', // Vertical alignment
            }}
          >
            <Link to="/" underline="none" style={{ color: '#3E2723' ,marginTop:'6.5px'}}>
              <Iconify icon="ic:round-home" />
            </Link>
            <Iconify icon="material-symbols:keyboard-arrow-right" />
            <Typography component="span" sx={{ color: '#3E2723' }}>
              {cotant.title}
            </Typography>
          </Typography>


          {/* Last Reviewed Date */}
          <Typography
            sx={{
              fontSize: '0.8rem',
              color: '#3E2723',
              fontWeight: 500,
              mt: 10,
            }}
          >
            LAST REVIEWED 16 SEPTEMBER 2024
          </Typography>
          <Box>
            <Grid container spacing={4} alignItems='center'>
              {/* Text Content */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem' },
                    color: '#3E2723',
                    mb: 2,
                  }}
                >
                  {cotant.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    mb: 3,
                    lineHeight: '1.6',
                    maxWidth: '691px',
                  }}
                >
                  {cotant.subTitle1}
                </Typography>
              </Grid>

              {/* Illustration */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: '380px',
                      height: 'auto', // Allow height to be automatic
                      aspectRatio: '380 / 260', // Maintain aspect ratio
                    }}
                  >
                    <img
                      src={cotant.image}
                      alt="Illustration"
                      style={{
                        width: '100%',
                        height: '100%', // Ensure the image fills the container
                        objectFit: 'contain', // Adjusts the image to fit without cropping
                      }}
                    />
                  </Box>
                </Box>
              </Grid>

            </Grid>
          </Box>
          {/* Share Icon */}
          {/*<Box*/}
          {/*  sx={{*/}
          {/*    display: 'flex',*/}
          {/*    alignItems: 'center',*/}
          {/*    justifyContent: 'center',*/}
          {/*    mt: 4,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <IconButton*/}
          {/*    sx={{*/}
          {/*      backgroundColor: '#f8e5be',*/}
          {/*      p: 1,*/}
          {/*      borderRadius: '50%',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <ShareIcon />*/}
          {/*  </IconButton>*/}
          {/*</Box>*/}

          {/* Description */}
          <Typography
            sx={{
              mt: 3,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              lineHeight: '1.8',
              color: '#3E2723',
              fontWeight: 400,

            }}
          >
            {cotant.subTitle2}
          </Typography>

          {
            cotant.subTitle3 &&
            <Typography
              sx={{
                mt: 2,
                fontSize: { xs: '1rem', sm: '1.2rem' },
                lineHeight: '1.8',
                color: '#3E2723',
                fontWeight: 400,
              }}
            >
              {cotant.subTitle3}

            </Typography>
          }
        </Box>
      </Container>
    </Box>
  );
};

export default SinglePage;
