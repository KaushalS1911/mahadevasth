import React, {useEffect} from "react";
import {Box, Button, Typography, Container, Grid, Stack, CardContent, Card, ListItem, List} from "@mui/material";
import footerImage from "../../../assets/home/people-on-hill.webp"
import clouds from "../../../assets/home/clouds.webp"
import tree from "../../../assets/home/People_sat_in_a_group_on_grass_next_to_tree_c6f0cdc28b__2_-removebg-preview.png"
import heroImage from "../../../assets/home/Person_sitting_on_sofa_with_london_skyline_in_window_c9f23641f7 (1).webp"
import assessments1 from "../../../assets/home/Person_meditating_next_to_dog_924ce099c4.webp"
import assessments2 from "../../../assets/home/Person_sleeping_on_sofa_fdaab4ea73.webp"
import assessments3 from "../../../assets/home/Low_mood_tile_Person_sat_on_armchair_making_phone_call_79b1155315.webp"
import assessments4 from "../../../assets/home/Stress_tile_image_person_in_yoga_pose_0a21572392.webp"
import img1 from 'src/assets/home/Person_on_beanbag_using_tablet_and_wearing_headphones_ed8a9026bb.webp';
import img2 from 'src/assets/home/Multi_faith_image_9011784dec.webp';
import img3 from 'src/assets/home/Parents_or_carers_and_child_798c433a8d.webp';
import img4 from 'src/assets/home/Employees_553d7f4384.webp';
import AOS from "aos";
import 'aos/dist/aos.css';

const NewHomeView = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-in-out',
    });
    // AOS.refresh()
  }, []);
  const assessments = [
    {
      title: "Anxiety",
      description: "Feeling anxious, can't switch off or your thoughts are racing?",
      bgColor: "#F3EBFA",
      image: assessments1,
    },
    {
      title: "Sleep",
      description: "Having trouble sleeping?",
      bgColor: "#EAF4FA",
      image: assessments2,
    },
    {
      title: "Stress",
      description: "Feeling overwhelmed by stress?",
      bgColor: "#FEF3E8",
      image: assessments3,
    },
    {
      title: "Well-being",
      description: "Looking to improve your overall well-being?",
      bgColor: "#FAEAEA",
      image: assessments4,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#FAF7F2",
        mt: {xs: "56px", sm: "64px"},
        overflowX: "hidden", // Prevent horizontal overflow
      }}
    >
      <Container sx={{mt: 5}} maxWidth={'xl'}>
        <Grid container spacing={4} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} md={6}  data-aos="fade-right">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: {xs: "1.8rem", sm: "2rem", md: "3rem"},
                lineHeight: 1.2,
                color: "#333",
                textAlign: {xs: "center", md: "left"}, // Center text on smaller screens
                mb: 2,
              }}
            >
              Mental Health <br/> in London
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: {xs: "1rem", sm: "1.1rem"},
                lineHeight: "1.6",
                mb: 4,
                color: "#555",
                maxWidth: {md: "450px"},
                mx: {xs: "auto", md: "unset"},
                textAlign: {xs: "center", md: "left"}, // Center text on smaller screens
              }}
            >
              Good Thinking supports Londoners to look after their mental health and wellbeing in a way that works for
              them. Since its launch in 2017, more than half a million people have used our digital service to tackle
              anxiety, stress, low mood, sleep problems, and other concerns.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: {xs: "center", md: "flex-start"}, // Center button on smaller screens
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#667C53",
                  color: "#fff",
                  width: {xs: "100%", sm: "210px"},
                  padding: "14px 16px",
                  borderRadius: "56px",
                  fontSize: "17px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#5A6D48",
                  },
                }}
              >
                Read more
              </Button>
            </Box>
          </Grid>

          {/* Illustration Section */}
          <Grid
            data-aos="fade-left"
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            sx={{mt: {xs: 4, md: 0}}}
          >
            <Box
              component="img"
              src={heroImage}
              alt="Mental Health Illustration"
              sx={{
                maxWidth: "100%",
                borderRadius: 4,
                width: {xs: "90%", sm: "80%", md: "400px"},
                height: "auto",
              }}
            />
          </Grid>
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
              data-aos="fade-right"
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#3E2723',
                width: {xs: '100%', md: '45%'},
                marginBottom: {xs: 2, md: 0},
                fontSize: {xs: '1.75rem', sm: '2.25rem', md: '3rem'},
              }}
            >
              I'm looking for support for…
            </Typography>

            <Typography
              data-aos="fade-left"
              sx={{
                color: '#5C4935',
                fontSize: {xs: '0.875rem', sm: '1rem', md: '1.125rem'},
                lineHeight: 1.8,
                width: {xs: '100%', md: '50%'},
              }}
            >
              Good Thinking supports Londoners to look after their mental health and
              wellbeing in a way that works for them. Good Thinking supports Londoners
              to look after their...
            </Typography>
          </Box>

          <Box
            data-aos="fade-up"
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
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#3E2723',
                  marginBottom: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.5rem' },
                }}
              >
                Young people
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#5C4935',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                }}
              >
                We invite young people to guide and review our content – so you can be
                sure we'll help with the issues that really matter to you...
              </Typography>
            </Box>

            <Box
              component="img"
              src={img1}
              alt="Young person illustration"
              sx={{
                width: { xs: '100%', md: '35%' },
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
            />
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}  data-aos="fade-up">
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
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.75rem'},
                  }}
                >
                  Faith & belief communities
                </Typography>
                <Box
                  component="img"
                  src={img2}
                  alt="Faith communities illustration"
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
            <Grid item xs={12} md={4}  data-aos="fade-up">
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
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.75rem'},
                  }}
                >
                  Parents & carers
                </Typography>
                <Box
                  component="img"
                  src={img3}
                  alt="Parents and carers illustration"
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

            <Grid item xs={12} md={4}  data-aos="fade-up">
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
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#3E2723',
                    marginBottom: 2,
                    fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.75rem'},
                  }}
                >
                  Employers & employees
                </Typography>
                <Box
                  component="img"
                  src={img4}
                  alt="Employers and employees illustration"
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
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight="bold" color="#2a2926" gutterBottom  data-aos="fade-down">
            How to use the Good Thinking service
          </Typography>
          <Typography
            data-aos="fade-up"
            variant="subtitle1"
            color="#6c6c6c"
            sx={{mb: 4, maxWidth: "600px", mx: "auto"}}
          >
            In this short guide, we’ll take you through the various Good Thinking
            resources and suggest five ways you can access them.
          </Typography>
          <Stack
            data-aos="fade-up"
            direction={{ xs: "column", sm: "row" }} // Column on small screens, row on larger
            spacing={2}
            justifyContent="center"
            sx={{
              mb: 4,
              overflowX: "auto", // For horizontal scrolling if needed
              alignItems: { xs: "stretch", sm: "center" }, // Stretch buttons to full width on small screens
            }}
          >
            <Button
              variant="contained"
              sx={{
                whiteSpace: "nowrap",
                backgroundColor: "#56723f",
                color: "white",
                borderRadius: "20px",
                "&:hover": { backgroundColor: "#3e582b" },
              }}
            >
              Start from the home page
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: "#ddd",
                color: "#2a2926",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              Get expert advice
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: "#ddd",
                color: "#2a2926",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              Use self-assessment
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: "#ddd",
                color: "#2a2926",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              Take quiz
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: "#ddd",
                color: "#2a2926",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              Access workbooks
            </Button>
          </Stack>


          <Box sx={{display: "flex", justifyContent: "center", alignItems: "center",flexWrap:'wrap'}}>
            <Box  data-aos="fade-right">
              {/* Audience */}
              <Box>
                <List
                  sx={{
                    pl: 2,
                    "& li": {
                      position: "relative",
                      paddingLeft: "20px", // Adjust for custom bullet
                      "&::before": {
                        content: "'•'", // Custom bullet
                        position: "absolute",
                        left: 0,
                        color: "red", // Bullet color
                        fontSize: "1.5rem", // Adjust size if needed
                      },
                    },
                  }}
                >
                  <ListItem>
                    <Typography variant="h4" fontWeight="bold" color="#2a2926">
                      Audience
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body1" color="#6c6c6c" sx={{ pl: 3 ,textAlign:"start"}}>
                  Young people, Parents and carers, Employers and employees, Faith and
                  belief communities.
                </Typography>
              </Box>

              {/* Mental Health Concern */}
              <Box>
                <List
                  sx={{
                    pl: 2,
                    "& li": {
                      position: "relative",
                      paddingLeft: "20px",
                      "&::before": {
                        content: "'•'",
                        position: "absolute",
                        left: 0,
                        color: "red",
                        fontSize: "1.5rem",
                      },
                    },
                  }}
                >
                  <ListItem>
                    <Typography variant="h4" fontWeight="bold" color="#2a2926">
                      Mental health concern
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body1" color="#6c6c6c" sx={{ pl: 3 ,textAlign:"start" }}>
                  Sleep, Anxiety, Low mood, Stress.
                </Typography>
              </Box>

              {/* Type of Content */}
              <Box>
                <List
                  sx={{
                    pl: 2,
                    "& li": {
                      position: "relative",
                      paddingLeft: "20px",
                      "&::before": {
                        content: "'•'",
                        position: "absolute",
                        left: 0,
                        color: "red",
                        fontSize: "1.5rem",
                      },
                    },
                  }}
                >
                  <ListItem>
                    <Typography variant="h4" fontWeight="bold" color="#2a2926">
                      Type of content
                    </Typography>
                  </ListItem>
                </List>
                <Typography variant="body1" color="#6c6c6c" sx={{ pl: 3 ,textAlign:"start" }}>
                  Free apps, Podcasts, blogs and videos, How to guides, Workbooks.
                </Typography>
              </Box>
            </Box>

            <Box  data-aos="fade-left" width={450}>
              <Box
                component="img"
                src={tree}
                alt="Illustration of people under a tree"
                sx={{mt: 4, maxWidth: "100%", height: "auto"}}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, }}>
            Choose self-assessment
          </Typography>
          <Grid container spacing={4}>
            {assessments.map((assessment, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}  data-aos="fade-up">
                <Card
                  sx={{
                    borderRadius: "16px",
                    backgroundColor: assessment.bgColor,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 3,
                  }}
                > <Typography
                  variant="overline"
                  sx={{ display: "block", color: "#6C757D",fontSize:14, mb: 1 }}
                >
                  SELF-ASSESSMENT
                </Typography>
                  <Box
                    component="img"
                    src={assessment.image}
                    alt={assessment.title}
                    sx={{
                      width: "50%", // Adjust image size
                      maxHeight: "120px",
                      objectFit: "contain",
                      mb: 2,
                    }}
                  />
                  <CardContent sx={{ textAlign: "center" }}>

                    <Typography  sx={{ fontWeight: "bold", mb: 2 ,fontSize:20}}>
                      {assessment.title}
                    </Typography>
                    <Typography variant="body2" sx={{fontSize:15}} color="text.secondary">
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          mt: 4,
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cloud Decorations */}
        <Box  data-aos="fade-down"
          component="img"
          src={clouds}
          alt="clouds"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            opacity: 0.1,
            py:2
          }}
        />
        <Typography variant="h3" fontWeight="bold" gutterBottom  data-aos="fade-up">
          Subscribe to our newsletter
        </Typography>
        <Typography  data-aos="fade-up" variant="body1" color="textSecondary" sx={{mb: 3}}>
          Stay tuned and subscribe to our newsletter. Get the latest tips and
          resources for Londoners.
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            backgroundColor: "#6F8A6E", // Olive green
            color: "#fff",
            "&:hover": {backgroundColor: "#5A735A"},
            borderRadius: "20px",
            px: 4,
            py: 1.5,
          }}
        >
          Subscribe
        </Button>
        {/* Illustration at the bottom */}
        <Box
          component="img"
          src={footerImage}
          alt="illustration"
          sx={{
            width: "100%",
            height: "auto",
            mt: 4,
          }}
        />
      </Box>
    </Box>
  );
};

export default NewHomeView;
