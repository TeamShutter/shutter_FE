import { Box, Button, Container, Paper, Typography, Rating, ImageList, ImageListItem, IconButton, ImageListItemBar, List, ListItemText, ListItem, ListItemAvatar, Avatar, Divider } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { GetStudios } from "../../components/fetcher/fetcher";
import { DevicesFold } from "@mui/icons-material";


const items = [
    {
        name: "Random Name #1",
        url: "http://www.opinionnews.co.kr/news/photo/202201/61266_46169_4414.jpg"
    },
    {
        name: "Random Name #2",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Photo_Studio_-_22_Feb._2011.jpg/400px-Photo_Studio_-_22_Feb._2011.jpg"
    },
    {
      name: "Random Name #3",
      url: "http://www.idjnews.kr/news/photo/202003/120256_80451_5613.jpg"
    },
    {
      name: "Random Name #4",
      url: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201705/29/06f15351-84f3-4693-811c-5042db9f0873.jpg"
    },
    {
      name: "Random Name #5",
      url: "https://ldb-phinf.pstatic.net/20201123_101/1606139540285QdVDU_JPEG/t-HTSVuXoKW_NdE6zJCY08Xi.jpeg.jpg?type=f804_408_60_sharpen"
    }
]


export default function Studio() {
    const router = useRouter();
    const {studioId} = router.query;

    const {data, isLoading, isError} = GetStudios();

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>


    return (

        <>
        <Head>
          <title>Shutter | Studio</title>
        </Head>
  
        <Box
          component='main'
        >
          <Container maxWidth="lg">

            <Link 
              href="/studios"
              >
                <a>
                  <ArrowBackIosNewIcon sx={{ mb : 2}} /> 
                </a>
              </Link>

             <Link 
              href="/"
              >
                <a>
                  <HomeIcon sx={{ mb : 2}} /> 
                </a>
              </Link>


              {/* <Paper>
                  <h2>{props.item.name}</h2>
                  <p>{props.item.description}</p>

                  <Button className="CheckButton">
                      Check it out!
                  </Button>
              </Paper> */}
               <Carousel
              //   NextIcon={<ArrowForwardIosIcon/>}
              //   PrevIcon={<ArrowBackIosNewIcon/>}
              //   navButtonsProps={{          
              //     style: {
              //         opacity: 0.5,
              //     }
              // }} 
               >
                {
                    items.map( (item, i) => (
                    <Box 
                    key={i}
                      sx={{
                          width: '100%',
                          paddingBottom: "60%",
                          backgroundImage: `url(${item.url})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                      }}
                      >
                      </Box>
                    ) )
                }
            </Carousel>

            <Box>
                <Typography>
                  공간사진스튜디오
                </Typography>

                <Rating name="read-only" value={3.5} precision={0.5} readOnly />

                <Box
                sx={{
                  mb: 3,
                }}>

                  <Box
                  sx={{
                    display: 'flex',
                  }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography>
                      영업시간
                    </Typography>
                  </Box>
                  
                  <Typography>
                    08:00 ~ 17:00
                  </Typography>
                </Box>

                <Box>
                  <Box
                   sx={{
                    display: 'flex',
                  }}
                  >
                    <InfoIcon sx={{mr: 1}} />
                    <Typography>
                      매장정보
                    </Typography>
                  </Box>
                  
                  <Typography>
                    우리 사진관 짱짱 좋아요~~!
                  </Typography>
                </Box>

            </Box>

            <Box
            sx={{ mt: 3 }}>
                  <Typography
                  variant="h5">
                    Photos
                  </Typography>

            <ImageList sx={{ width: '100%', height: 1000 }} cols={3} gap={10}>
                {data.map((photo) => (
                  <Link 
                  href={`photos/${photo.id}`}
                  key={photo.name}
                  >
                <a>
                <ImageListItem>
                    <img
                      src="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                      srcSet="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                      alt={photo.name}
                      loading="lazy"
                      layout='fill'
                      objectFit='contain'
                    />

                  <ImageListItemBar
                  sx={{
                    background:
                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                  }}
                  title={photo.name}
                  position="bottom"
                  actionIcon={
                    <IconButton
                      sx={{ color: 'white' }}
                      aria-label={`star ${photo.name}`}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />

                  </ImageListItem>
                </a>
                </Link>
              ))}
            </ImageList>
            </Box>

            <Box 
            sx={{ mt : 3 }}>
                <Typography
                  variant="h5">
                    Reviews
                  </Typography>

                  <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    {data.map((photo) => {
                      return (
                        <>
                           <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                              primary="남자 취업사진"
                              secondary={
                                <>
                                  <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    이*현
                                  </Typography>
                                  {" : 이 집 보정 잘하네"}
                                </>
                              }
                            />
                            <Rating name="read-only" value={4} precision={0.5} readOnly />
                          </ListItem>
                          
                          <Divider variant="inset" component="li" />
                        </>
                      )
                    })}
                </List>
            </Box>

          </Container>
        </Box>
      </>
    )
}