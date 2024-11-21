
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  useMediaQuery,
  TableContainer,
  Table,
  TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Accordion, AccordionSummary, Collapse, Fade,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import divider1 from 'src/assets/home/divider-main-1.png'
import img1 from 'src/assets/home/img1.png';
import img2 from 'src/assets/home/img2.png';
import img3 from 'src/assets/home/img3.png';
import counterImg from 'src/assets/home/counter.png';
import image1 from "src/assets/home/image-how-it-works-1.png";
import image2 from "src/assets/home/image-how-it-works-2.png";
import image3 from "src/assets/home/image-how-it-works-3.png";
import arro from "src/assets/home/arrow-down-green-2.png";
import professionalImg from 'src/assets/home/professional.png';
import divider2 from 'src/assets/home/divider-main-2.png';
import divider from "src/assets/gift/divider-main-4.png";
import right from 'src/assets/gift/quote-right.svg'
import left from 'src/assets/gift/quote-left.svg'
import image from 'src/assets/gift/img2.jpg'
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import checkboxImg from "src/assets/home/checkboxImg.png";
import AOS from 'aos';
import 'aos/dist/aos.css';import crossImg from "src/assets/home/cross.png";
import gift from 'src/assets/gift/gift-give.jpg'
import wive from 'src/assets/gift/line-squiggle.svg'
import sml from 'src/assets/gift/sml-logo.png'
import divider11 from 'src/assets/gift/divider-main-5.png'
import divider3 from "src/assets/home/divider-main-3.png"

// ----------------------------------------------------------------------

export default function HomeView() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-in-out',
    });
    // AOS.refresh()
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const createData = (feature, Mwellness, inOffice, info) => {
    return { feature, Mwellness, inOffice, info };
  };
  const rows = [
    createData(
      "Provided by a credentialed therapist",
      true,
      true,
      "Information about credentialed therapists"
    ),
    createData(
      "In-office visits",
      false,
      true,
      "Information about in-office visits"
    ),
    createData(
      "Messaging any time",
      true,
      false,
      "Information about messaging"
    ),
    createData("Chat sessions", true, false, "Information about chat sessions"),
    createData(
      "Phone sessions",
      true,
      true,
      "Information about phone sessions"
    ),
    createData(
      "Video sessions",
      true,
      true,
      "Information about video sessions"
    ),
    createData("Easy scheduling", true, false, "Information about scheduling"),
    createData(
      "Digital worksheets",
      true,
      false,
      "Information about worksheets"
    ),
    createData(
      "Group sessions",
      true,
      true,
      "Information about group sessions"
    ),
    createData(
      "Smart provider matching",
      true,
      false,
      "Information about provider matching"
    ),
    createData(
      "Easy to switch providers",
      true,
      false,
      "Information about switching providers"
    ),
    createData(
      "Access therapy from anywhere",
      true,
      false,
      "Information about access"
    ),
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const data = [
    {
      title: "Who are the therapists?",
      desc: "We require every therapist providing Therapist Services on the Platform to be a registered, trained, and experienced counsellor, psychologist, social worker, or therapist. Therapists must have a relevant academic degree in their field, at least 3 years of experience, and have to be qualified and credentialed by their respective professional organization after successfully completing the necessary education, exams, training, and practice requirements as applicable. For the avoidance of doubt, therapists are referred to on this site and related apps/sites by their title and U.S., U.K., or Australian credentials, whichever is applicable.",
    },
    {
      title: "Who will be helping me?",
      desc: "After you sign up, we will match you to an available therapist who fits your objectives, preferences, and the type of issues you are dealing with. Different therapists have different approaches and areas of focus, so it's important to find the right person who can achieve the best results for you. We have found that we are able to provide a successful match most of the time; however, if you start the process and you feel your therapist isn't a good fit for you, you may elect to be matched to a different therapist.",
    },
    {
      title: "Is MWellness right for me?",
      desc: "MWellness may be right for you if you're looking to improve the quality of your life. Whenever there is anything that interferes with your happiness or prevents you from achieving your goals, we may be able to help. We also have therapists who specialize in specific issues such as stress, anxiety, relationships, parenting, depression, addictions, eating, sleeping, trauma, anger, family conflicts, LGBT matters, grief, religion, self esteem, and more.",
    },
    {
      title: "How much does it cost?",
      desc: "The cost of therapy through MWellness ranges from $65 to $90 per week (billed every 4 weeks) and it is based on your location, source, preferences, and therapist availability. You can cancel your membership at any time, for any reason.",
    },
    {
      title: "After I sign up, how long until I'm matched with a therapist?",
      desc: "In most cases within 24 hours or less.",
    },
    {
      title: "How will I communicate with my therapist?",
      desc: "The cost of therapy through MWellness ranges from $65 to $90 per week (billed every 4 weeks) and it is based on your location, source, preferences, and therapist availability. You can cancel your membership at any time, for any reason.",
    },
    {
      title: "Can MWellness substitute for traditional face-to-face therapy?",
      desc: "The professionals who work through MWellness are licensed and credentialed therapists who were certified by their state's board to provide therapy and counseling. However, while the service may have similar benefits, it's not capable of substituting for traditional face-to-face therapy in every case. Please note that your provider won't be able to make any official diagnosis, to fulfill any court order or prescribe medication.",
    },
    {
      title: "How long can I use MWellness?",
      desc: "This depends on your needs and varies a lot from one person to another. Some people feel they get most of the value after just a few weeks, while others prefer to stick to the program for an extended period of time. This is completely up to you.",
    },
    {
      title: "How can I be sure that this is an effective form of therapy?",
      desc: 'There are many studies that confirm the effectiveness of the online medium for making life changes. For example, a study published by JMIR Publications and conducted by researchers from University of California - Berkeley, University of California - San Francisco, and the San Francisco General Hospital concluded that "users of MWellness experienced significantly reduced depression symptom severity after engaging with the platform." You can read the full study here. Our confidence in the platform comes primarily from the feedback and testimonials we receive from users. Every day, we are excited to hear from more people about the way this service helped them make a tremendous change in their lives.',
    },
  ];

  const happyImg = [
    {title: "Individual", subTitle: "For myself", color: "#397A4A", img: img1},
    {title: "Couples", subTitle: "For me and my partner", color: "#457777", img: img2},
    {title: "Teen", subTitle: "For my child", color: "#a75d00", img: img3},
  ];
  const stats = [
    { value: '386,025,679', description: 'Messages, chat, phone, video sessions' },
    { value: '34,794', description: 'Credentialed therapists ready to help' },
    { value: '4,830,879', description: 'People got help' }
  ];

  const titleLines = [
    "The world's largest therapy service.",
    "100% online."
  ];
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const getTitleFontSize = () => {
    if (isSmallScreen) return 24;
    if (isMediumScreen) return 36;
    return 48;
  };
  const getSubtitleFontSize = () => {
    if (isSmallScreen) return 16;
    if (isMediumScreen) return 18;
    return 22;
  };
  return (
    <>
      <Box sx={{backgroundColor: "darkGreen", height: "100vh", position: "relative", color: 'white'}}>
        <Box sx={{display: "flex", alignItems: "center", height: "100%"}}>
          <Container>
            <Box sx={{textAlign: "center"}}>
              <Box sx={{mb: "40px"}}>
                <Box sx={{fontSize: {xs: 28, sm: 38, md: 48}, letterSpacing: -1.5, fontWeight: 300}} className="overpass">You deserve to be
                  happy.</Box>
                <Box sx={{fontSize: {xs: 14, sm: 22}, mt: 3 , letterSpacing: -0.5, fontWeight: 350}}>What type of therapy are you
                  looking for?</Box>
              </Box>
              <Grid container spacing={{xs: 2, md: 3, lg: 5}} className="title overpass">
                {happyImg.map((item, index) => (
                  <Grid item xs={12} key={index} lg={4}>
                    <Box data-aos="fade-up" sx={{
                      overflow: "hidden",
                      height: {lg: "auto", xs: "120px"},
                      position: "relative",
                      '&:hover .rightArr': {backgroundColor: "white", color: "black"},
                      '&:hover .beHappyImg': {borderColor: "white !important"}
                    }}>
                      <Box sx={{position: "absolute", px: "30px", top: "30px"}}>
                        <Box sx={{
                          color: "white",
                          fontSize: "32px",
                          textAlign: "start"
                        }}>{item.title}</Box>
                        <Box sx={{textAlign: "start", mt: "10px"}}>{item.subTitle}
                          <Typography className={"rightArr"} component={"span"} sx={{
                            ml: "10px",
                            display: "inline-block",
                            border: "1px solid white",
                            px: "5px",
                            borderRadius: "50%",
                            transition: "0.4s"
                          }}>
                            <i className="arrow-inner fa fa-arrow-right"
                               style={{marginBottom: "-10px", display: "inline-block"}}/>
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{height: "100%"}}>
                        <img className={"beHappyImg"} src={item.img}
                             alt="You deserve to be happy"
                             style={{
                               backgroundColor: item.color,
                               borderRadius: "10px",
                               border: "1px solid #397A4A",
                               transition: "0.4s",
                               objectFit: "center"
                             }}/>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box sx={{position: "absolute", bottom: "-10px", width: "100%"}}><img src={divider1}
                                                                              alt="design image"/></Box>
      </Box>
      <Box sx={{ backgroundColor: "liteCream",display:"flex",justifyContent:"center",alignItems:"center" }}>
        <Container>
          <Box sx={{ pb:20, pt: 6 }}>
            <Grid container sx={{display:" flex", justifyContent: "center", alignItems: "center"}}>
              <Grid item md={6} xs={12} data-aos="fade-right">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: { xs: "40px", md: "unset" },
                    width: "70%",
                    mx: "auto"
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      "&:after": {
                        content: '""',
                        width: "72px",
                        height: "108px",
                        backgroundImage: `url(${counterImg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        position: "absolute",
                        bottom: { md: "80%", sm: "50%", xs: "70%" },
                        right: { sm: "100%", xs: "90%" },
                      }
                    }}
                  >
                    {titleLines.map((line, index) => (
                      <Box className="title overpass" key={index} sx={{ fontSize: { lg: 48, xs: 32 }, letterSpacing: -1.5, fontWeight: 300, color: index === 1 ? "green" : "black" }}>
                        {line}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={6} xs={12} data-aos="fade-left">
                {stats.map((stat, index) => (
                  <Box key={index} sx={{
                    borderBottom: index !== stats.length - 1 ? "1px solid #c3c8c1" : "none",
                    my: index !== 0 ? "20px" : "0"
                  }}>
                    <Box className="title overpass" sx={{ color: "green", fontWeight: 700, fontSize: { md: 32, xs: 24 }, letterSpacing: "-1.5px" }}>
                      {stat.value}
                    </Box>
                    <Box sx={{ fontSize: { md: 21, xs: 20 }, color: "liteBlack", my: "10px" }}>
                      {stat.description}
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box sx={{

        background: "linear-gradient(#f7f0e6 60%, #fffcf6 90%)",
        position: "relative",
        "&:before": {
          content: "''",
          height: "84px",
          width: "100%",
          backgroundColor: "cream",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          position: "absolute",
          bottom: "100%"
        }
      }}>
        <Container>
          <Grid container sx={{py: {xs: "50px", md: "100px"}, pb: "250px !important"}}>
            <Grid item xs={12} md={6} data-aos="zoom-in">
              <Box className="title overpass" sx={{fontSize: {xs: 28, sm: 38, md: 48}, letterSpacing: -1.5, fontWeight: 300}}>Professional
                and credentialed therapists who you can trust</Box>
              <Box sx={{maxHeight: "100%", display: {md: "none", xs: "block"}}}>
                <img src={professionalImg} alt="professional"/>
              </Box>
              <Box sx={{fontSize: {xs: "18px", md: "20px"}, color: 'liteBlack', my: "35px", lineHeight: 1.5, fontWeight: 300 }}>Tap into the
                world's largest network of credentialed and experienced therapists who can help you with a
                range of issues including depression, anxiety, relationships, trauma, grief, and more. With
                our therapists, you get the same professionalism and quality you would expect from an
                in-office therapist, but with the ability to communicate when and how you want.</Box>
              <Box sx={{textAlign: {md: "start", xs: "center"}}}>
                <Button
                  className="overpass"
                  sx={{
                    // fontWeight: 600,
                    backgroundColor: "liteGreen",
                    py: "10px",
                    px: {xs: "14px", md: "28px"},
                    textTransform: "unset",
                    fontSize: {xs: "17px", md: "20px"},
                    color: "green",
                    borderRadius: "30px",
                    "&:hover": {
                      backgroundColor: "green",
                      color: "white",
                    },
                  }}
                >
                  Get matched to a therapist
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} data-aos="fade-left" sx={{display: {md: "block", xs: "none"}}}>
              <Box sx={{maxHeight: "100%"}}>
                <img src={professionalImg} alt="professional"/>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box sx={{position: "absolute", bottom: "-10px", width: "100%"}}>
          <img src={divider2} alt="divider image"/>
        </Box>
      </Box>
      <Box sx={{backgroundColor: "#F5F7F5"}}>
        <Box>
          <Box display={"flex"} justifyContent={"center"} data-aos="zoom-in">
            <Typography
              className="title overpass"
              my={5}
              sx={{
                fontSize: getTitleFontSize(),
                fontWeight: 300,
                color: "#252625",
              }}
            >
              How it works
            </Typography>
          </Box>
          <Grid container py={5} display={"flex"} justifyContent={"center"}>
            <Grid item xl={8} >
              <Box>
                <Grid container my={5}>
                  <Grid item md={8} data-aos="fade-right">
                    <Box>
                      <img src={image1} alt="How it works step 1"/>
                    </Box>
                  </Grid>
                  <Grid item md={4} alignSelf={"center"} p={{xs: 5, md: 0}} data-aos="fade-left">
                    <Box>
                      <Typography style={{
                        fontSize: 32,
                        fontWeight: 350,
                        letterSpacing: -0.8,
                        fontFamily: "Overpass,sans-serif"
                      }}>
                        Get matched to the best therapist for you
                      </Typography>
                      <Typography
                        mt={3}
                        style={{
                          fontSize: getSubtitleFontSize(),
                          color: "#4a4d4a",
                          fontWeight: 350,
                          fontFamily: "Overpass, sans-serif"
                        }}
                      >
                        Answer a few questions to find a credentialed therapist
                        who fits your needs and preferences. Tap into the largest
                        network of credentialed providers.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box display={"flex"} justifyContent={"center"} data-aos="zoom-in">
                <Box sx={{height: "80px", width: "60px", objectFit: "contain"}}>
                  <img src={arro} alt="Arrow down"/>
                </Box>
              </Box>
              <Box>
                <Grid container py={5} my={5}>
                  <Grid item md={8} data-aos="fade-right">
                    <Box>
                      <img src={image2} alt="How it works step 2"/>
                    </Box>
                  </Grid>
                  <Grid item md={4} alignSelf={"center"} p={{xs: 5, md: 0}} data-aos="fade-left">
                    <Box>
                      <Typography className="title overpass" style={{
                        fontSize: 32,
                        fontWeight: 350,
                        letterSpacing: -0.8,
                        fontFamily: "Overpass,sans-serif"
                      }}>
                        Communicate your way
                      </Typography>
                      <Typography
                        mt={3}
                        style={{
                          fontSize: getSubtitleFontSize(),
                          color: "#4a4d4a",
                          fontWeight: 350,
                          fontFamily: "Overpass, sans-serif"
                        }}
                      >
                        Talk to your therapist however you feel comfortable — text, chat, phone, or
                        video.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box display={"flex"} justifyContent={"center"} data-aos="zoom-in">
                <Box sx={{height: "80px", width: "60px", objectFit: "contain"}}>
                  <img src={arro} alt="Arrow down"/>
                </Box>
              </Box>
              <Box>
                <Grid container py={5} my={5}>
                  <Grid item md={8} data-aos="fade-right">
                    <Box>
                      <img src={image3} alt="How it works step 3"/>
                    </Box>
                  </Grid>
                  <Grid item md={4} alignSelf={"center"} p={{xs: 5, md: 0}} data-aos="fade-left">
                    <Box>
                      <Typography className="title overpass" style={{
                        fontSize: 32,
                        fontWeight: 350,
                        letterSpacing: -0.8,
                        fontFamily: "Overpass,sans-serif"
                      }}>
                        Therapy when you need it
                      </Typography>
                      <Typography
                        mt={3}
                        style={{
                          fontSize: getSubtitleFontSize(),
                          color: "#4a4d4a",
                          fontWeight: 350,
                          fontFamily: "Overpass, sans-serif"
                        }}
                      >
                        You can message your therapist at anytime, from anywhere. You also get to
                        schedule live sessions when it's convenient for you, and can connect from
                        any mobile device or computer.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "#FFFCF6" }}>
        <Box sx={{backgroundColor: "#325343", pt: "120px", position: "relative"}}>
          <Box sx={{position: "absolute", top: -14, width: "100%"}}>
            <img src={divider3} alt="divider image"/>
          </Box>
          <Box>
            <Box sx={{display: "flex", justifyContent: "center"}} pb={5} data-aos="zoom-in">
              <Typography className="overpass title" sx={{fontSize: 48, fontWeight: 350, color: "white", fontFamily: "Overpass"}}>
                <Typography variant="span" sx={{color: "#A6DE9B"}}>
                  m
                </Typography>
                wellness vs. traditional in-office therapy
              </Typography>
            </Box>
            <Box>
              <Grid container display={"flex"} justifyContent={"center"}>
                <Grid item md={5} data-aos="zoom-out">
                  <TableContainer>
                    {/*{isMobile ? (*/}
                    {/*    <Box sx={{color:"white"}}>*/}
                    {/*        {rows.map((row) => (*/}
                    {/*            <Box*/}
                    {/*                key={row.feature}*/}
                    {/*                sx={{*/}
                    {/*                    padding: 2,*/}
                    {/*                    borderBottom: "1px solid white",*/}
                    {/*                }}*/}
                    {/*            >*/}
                    {/*                <Typography variant="h6">{row.feature}</Typography>*/}
                    {/*                {row.info && (*/}
                    {/*                    <Tooltip title={row.info}>*/}
                    {/*                        <IconButton size="small">*/}
                    {/*                            <InfoIcon fontSize="small" />*/}
                    {/*                        </IconButton>*/}
                    {/*                    </Tooltip>*/}
                    {/*                )}*/}
                    {/*                <Box*/}
                    {/*                    sx={{*/}
                    {/*                        display: "flex",*/}
                    {/*                        justifyContent: "space-between",*/}
                    {/*                        marginTop: 1,*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    <Typography>MWellness</Typography>*/}
                    {/*                    <Checkbox checked={row.Mwellness} disabled />*/}
                    {/*                </Box>*/}
                    {/*                <Box*/}
                    {/*                    sx={{*/}
                    {/*                        display: "flex",*/}
                    {/*                        justifyContent: "space-between",*/}
                    {/*                    }}*/}
                    {/*                >*/}
                    {/*                    <Typography>In-office</Typography>*/}
                    {/*                    <Checkbox checked={row.inOffice} disabled />*/}
                    {/*                </Box>*/}
                    {/*            </Box>*/}
                    {/*        ))}*/}
                    {/*    </Box>*/}
                    {/*) : (*/}
                    <Table>
                      <TableHead sx={{backgroundColor: "#325343"}}>
                        <TableRow>
                          <TableCell sx={{color: "white"}}></TableCell>
                          <TableCell className="title overpass" align="center" sx={{
                            fontFamily: "Overpass",
                            fontSize: 22,
                            color: "white",
                            backgroundColor: "green",
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px"
                          }}>
                            mwellness
                          </TableCell>
                          <TableCell className="title overpass" align="center"
                                     sx={{fontSize: 22, color: "white", fontFamily: "Overpass"}}>
                            In-office
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{backgroundColor: "#325343"}}>
                        {rows.map((row) => (
                          <TableRow key={row.feature}>
                            <TableCell
                              scope="row"
                              sx={{color: "white", fontFamily: "Overpass", fontSize: 18}}
                            >
                              {row.feature}
                              {row.info && (
                                <Tooltip title={row.info}>
                                  <IconButton size="small">
                                    <InfoIcon
                                      fontSize="small"
                                      sx={{color: "white"}}
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{backgroundColor: "white"}}
                            >
                              {/* <Checkbox
                                checked={row.Mwellness}
                                disabled
                              /> */}
                              <img
                                src={checkboxImg}
                                style={{objectFit: "contain", height: "35px"}}
                                alt="checkbox"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <img
                                src={crossImg}
                                style={{objectFit: "contain", height: "45px"}}
                                alt="checkbox"
                              />
                              {/* <Checkbox checked={row.inOffice} disabled /> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/*// )*/}
                    {/*}*/}
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          // top: { sm: "-40px", xs: "-20px" },
          // left: "0",
          // width: "100%",
          position: "relative",
          backgroundColor: "darkGreen",
          height: "800px"
        }}
      >
        {/*<Container>*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      position: "absolute",*/}
        {/*      top: "10%",*/}
        {/*      left: "45%",*/}
        {/*      width: {md:"600px",xs:"100%"},*/}
        {/*      color: "white",*/}
        {/*      transform: "translateX(-50%)",*/}
        {/*      fontSize: "32px",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <Box sx={{ position: "relative" ,textAlign:"center"}}>*/}
        {/*        Susan is amazing in her insights and conversational approach. I am so glad and blessed to have found her and started healing with her guidance.*/}
        {/*      <Box sx={{ position: "absolute", top: "0", left: "-100px" }}>*/}
        {/*        {" "}*/}
        {/*        <img src={left} alt="left" />{" "}*/}
        {/*      </Box>*/}
        {/*      <Box sx={{ position: "absolute", top: "0", right: "-80px" }}>*/}
        {/*        {" "}*/}
        {/*        <img src={right} alt="right" />{" "}*/}
        {/*      </Box>*/}
        {/*      <Box*/}
        {/*        sx={{*/}
        {/*          display: "flex",*/}
        {/*          justifyContent: "center",*/}
        {/*          alignItems: "center",*/}
        {/*            width: { md: "350px", xs: "250px" },*/}
        {/*            mx:"auto",*/}
        {/*            my:"10px"*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <img*/}
        {/*          src={image}*/}
        {/*          alt="image"*/}
        {/*        />*/}
        {/*      </Box>*/}
        {/*      <Box*/}
        {/*        sx={{*/}
        {/*          display: "flex",*/}
        {/*          justifyContent: "center",*/}
        {/*          alignItems: "center",*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <Button*/}
        {/*          variant="outlined"*/}
        {/*          sx={{*/}
        {/*            color: "white",*/}
        {/*            padding: "10px 36px",*/}
        {/*            borderColor: "white",*/}
        {/*            borderRadius: "30px",*/}
        {/*            "&:hover": {*/}
        {/*              color: "lightGreen",*/}
        {/*              borderColor: "lightGreen",*/}
        {/*            },*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          More success stories*/}
        {/*        </Button>*/}
        {/*      </Box>*/}
        {/*    </Box>*/}
        {/*  </Box>*/}
        {/*</Container>*/}
        <Box>
          <Container >
            <Box
              sx={{
                position: "absolute",
                top: {md: "14%", xs: "20%"},
                left: "50%",
                width: {md: "600px", xs: "90%"},
                color: "white",
                transform: "translateX(-50%)",
                fontSize: {md: "32px", xs: "24px"},
                textAlign: "center",
                px: {xs: 2, md: 0},
              }}
            >
              <Box data-aos="zoom-in" className="overpass title" sx={{position: "relative", textAlign: "center"}}>
                Susan is amazing in her insights and conversational approach. I am so glad and blessed to
                have found her and started healing with her guidance.
                <Box  sx={{
                  position: "absolute",
                  top: "0",
                  left: {md: "-100px", xs: "-5px"},
                  height: {md: "40px", xs: "20px"}
                }}>
                  <img src={left} alt="left"/>
                </Box>
                <Box sx={{
                  position: "absolute",
                  top: "0",
                  right: {md: "-80px", xs: "-5px"},
                  height: {md: "40px", xs: "20px"}
                }}>
                  <img src={right} alt="right"/>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: {md: "350px", xs: "250px"},
                    mx: "auto",
                    my: 2,
                  }}
                >
                  <img src={image} alt="image" style={{width: "100%", height: "auto"}}/>
                </Box>
                <Button
                  variant="outlined"
                  className="overpass"
                  sx={{
                    color: "white",
                    padding: {md: "12px 36px", xs: "8px 24px"},
                    borderColor: "white",
                    borderRadius: 30,
                    fontFamily: "Overpass",
                    "&:hover": {
                      color: "lightGreen",
                      borderColor: "lightGreen",
                    },
                  }}
                >
                  More success stories
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        <img src={divider} alt="divider image"/>
      </Box>

      <Box sx={{
        py: "30px", position: "relative", '&::before': {
          content: '""',
          height: '72px',
          // zIndex: -1,
          background: '#fffcf6',
          borderRadius: '40% 40% 0 0 / 50% 50% 0 0',
          position: 'absolute',
          top: '-70px',
          left: 0,
          width: "100%",
          // transform: 'scaleX(1.15)'
        }
      }}>
        <Container>
          <Box sx={{px: {lg: "160px", md: "50px"}}}>
            <Box
              data-aos="zoom-in"
              sx={{
                fontSize: "36px",
                color: "black",
                margin: "40px 0 20px",
                textAlign: "center",
              }}
            >
              Frequently asked questions
            </Box>
            {data.map((item, index) => (
              <Accordion
                data-aos="zoom-in"
                key={index}
                expanded={expanded === index}
                onChange={handleExpansion(index)}
                TransitionComponent={Fade}
                transitionDuration={400}
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "liteCream",
                  boxShadow: "unset",
                  fontFamily:"Overpass",
                  py: "6px",
                  "& div": {paddingInline: "0px !important"},
                  "& p": {fontSize: "20px"},
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                  sx={{
                    fontFamily: "Overpass",
                    minHeight: "48px",
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0",
                    },
                  }}
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <Collapse in={expanded === index}>
                  <Box
                    sx={{
                      padding: "16px",
                      backgroundColor: "liteCream",
                      "& p": {fontSize: "16px", color: "liteBlack"},
                    }}
                  >
                    <Typography>{item.desc}</Typography>
                  </Box>
                </Collapse>
              </Accordion>
            ))}
          </Box>
          <Box
            data-aos="zoom-in"
            sx={{
              fontSize: "18px",
              cursor: "pointer",
              color: "green",
              textDecoration: "underline",
              textAlign: "center",
              fontWeight: "600",
              mt: "15px",
              mb: "32px",
            }}
          >
            More frequently asked questions
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            data-aos="zoom-in"
          >
            <Button
              className='overpass'
              sx={{
                borderRadius: "30px",
                backgroundColor: "lightGreen",
                padding: "10px 36px",
                color: "darkGreen",
                textTransform: "initial",
                fontSize: "20px",
                "&:hover": {
                  backgroundColor: "green",
                  color: "white",
                },
              }}
            >
              Get started
            </Button>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "cream", pt: "20px",pb:"10px", position:"relative" }}>
        <Box sx={{ position: 'absolute', top:{sm:'-40px',xs:"-20px"},left:'0',width:"100%"}}>
          <img src={divider11} alt="divider image" />
        </Box>
        <Container>
          <Grid container sx={{pt: {md:"150px",xs:"unset"}}}>
            <Grid data-aos="fade-right" item xs={12} md={8} sx={{textAlign:{xs:'center',md:'unset'},zIndex:'11'}}>
              <Box
                sx={{
                  fontSize: { md: "48px", xs: "32px" },
                  margin: {md:"48px 0 24px"},
                }}
                className="overpass title"
              >
                <Typography variant="span" sx={{ color: "darkGreen" }}>
                  Give the gift
                </Typography>{" "}
                of a MWellness membership
              </Box>
              <Grid
                item
                xs={12}
                sx={{

                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  alignItems:"center"
                }}
              >
                <Box>
                  <Box
                    sx={{
                      borderRadius: "240px 15px 15px",
                      overflow: "hidden",
                      height:"194px",
                      width: "198px",
                      my:"24px"
                    }}
                  >
                    <img src={gift} alt="gift" />
                  </Box>
                </Box>
              </Grid>
              <Box sx={{ fontSize:{md: "20px",xs:"16px"}, margin: { xl: "0 100px 40px 0" },color:"liteBlack" }}>
                Therapy is one of the most meaningful gifts you can give to your
                friends and loved ones.
              </Box>
              <Box>
                <Button
                  className="overpass"
                  variant="outlined"
                  sx={{
                    fontSize: "20px",
                    borderRadius: "30px",
                    color: "darkGreen",
                    borderColor: "darkGreen",
                    padding: "10px 36px",
                    textTransform: "inherit",
                    "&:hover": {
                      borderColor: "darkGreen",
                      backgroundColor: "#F5FBF4",
                    },
                    my: { xs: "40px", lg: "unset" },
                    width:{md:"unset",xs:"100%"}
                  }}
                >
                  Gift a membership
                </Button>
              </Box>
            </Grid>
            <Grid
              data-aos="fade-left"
              item
              xs={4}
              sx={{
                alignContent: "center",
                display: { xs: "none", md: "block" },
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    borderRadius: "240px 15px 15px",
                    overflow: "hidden",
                    height: { xl: "346px" },
                    width: { xl: "384px" },
                  }}
                >
                  <img src={gift} alt="gift" />
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-50px",
                    right: { xl: "-20%", xs: "-5%" },
                    width: "85px",
                    height: "52px",
                    zIndex: "11",
                  }}
                >
                  <img src={wive} alt="gift wive" />
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6} mt={{ md: "90px", xs: "0px" }} data-aos="fade-right">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: "20px",
                }}
              >
                <Box
                  sx={{
                    fontSize: "15px",
                    color: "liteBlack",
                    fontWeight: "700",
                    lineHeight:1.5
                  }}
                >
                  If you are in a crisis or any other person may be in danger -
                  don't use this site. <br />
                  <Typography
                    variant="span"
                    sx={{ color: "green", textDecoration: "underline" }}
                  >
                    These resources
                  </Typography>{" "}
                  can provide you with immediate help.
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6} mt={{ md: "90px", xs: "32px" }} data-aos="fade-left">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {md:"end"},
                  alignItems: "center",
                  py: {md:"20px"},
                  opacity: ".5",
                }}
              >
                <Box sx={{ height: "40px", width: "115px" }}>
                  <img src={sml} alt="small logo" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
