import { Box, Button, Container, Paper, Typography, Rating, ImageList, ImageListItem, IconButton, ImageListItemBar, List, ListItemText, ListItem, ListItemAvatar, Avatar, Divider, FormControl, Grid, TextField } from "@mui/material";
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
import { GetPhotos, GetStudio, GetStudioReviews } from "../../components/fetcher/fetcher";
import { DevicesFold } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { getCookie } from "../../components/cookie";
import { useEffect, useState } from "react";
import ReviewList from "../../components/reviews/review-list";


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
  const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : "http://15.164.100.14:8000"

    const router = useRouter();
    const {studioId} = router.query;

    const [follow, setFollow] = useState(false);
    const [follows, setFollows] = useState(0);
    const [user, setUser] = useState(null);
    const [reviewList, setReviewList] = useState([]);

    const {studio, studioLoading, studioError} = GetStudio(studioId);
    const {photos, photosLoading, photosError} = GetPhotos(studioId);
    const {reviews, reviewsLoading, reviewsError} = GetStudioReviews(studioId);

    useEffect(() => {
      const curUser = getCookie("user");
      setFollows(studio?.follows);

      studio?.studio.follow_users.includes(curUser.id) == true ? (
        setFollow(true)
      ) : (
        setFollow(false)
      )
      setUser(curUser);
      setReviewList(reviews);
    }, [studio, reviews]);

    if(studioLoading || photosLoading || reviewsLoading) return <div>Loading...</div>
    if(studioError || photosError || reviewsError) return <div>Error!!</div>


    const handleFollow = async () => {
      await fetch(`${BASE_URL}/studios/${studioId}/follow`, {
          method: 'GET',
          headers: {
            "userid": user.id
          },
          withCredentials: true,
      });
  
      follow ? (
      setFollows((prev) => prev - 1)
       ) : (
         setFollows((prev) => prev + 1)
      )  
  
      setFollow((prev) => !prev);
  
      }

    const handleSubmit = async (e) => {
      e.preventDefault();

        const formData = {
          content: e.target.content.value,
          rating: e.target.rating.value,
          userId: user.id,
      }

        const res =  await fetch(`${BASE_URL}/studios/${studioId}/reviews/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          body: JSON.stringify(formData),
      });
      const data = await res.json();
      setReviewList((prev) => [...prev, data]);
      e.target.content.value = "";
    };

    return studio.studio && photos && reviews && (

        <>
        <Head>
          <title>Shutter | Studio</title>
        </Head>
  
        <Box
          component='main'
        >
          <Container maxWidth="lg">

          <ArrowBackIosNewIcon 
            onClick={() => router.back()}
            sx={{ mb : 2, cursor: 'pointer'}} /> 

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
                    studio.studio.images.map( (image, i) => (
                    <Box 
                    key={i}
                      sx={{
                          width: '100%',
                          paddingBottom: "60%",
                          backgroundImage: `url(${image.url})`,
                          backgroundSize: 'cover',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                      }}
                      >
                      </Box>
                    ) )
                }
            </Carousel>

            <Box
            >
              <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
              >
                <Typography>
                  {studio.studio.name}
                </Typography>

                <Box
                display= 'flex'
                alignItems= 'center'
                >
                  <a href="https://map.naver.com/v5/search/%EC%A6%9D%EB%AA%85%EC%82%AC%EC%A7%84/place/37213183?placePath=%3Fentry=pll%26from=nx%26fromNxList=true&n_ad_group_type=10&n_query=%EC%A6%9D%EB%AA%85%EC%82%AC%EC%A7%84&c=14131393.0499970,4506254.8175541,15,0,0,0,dh"
                  target="_blank" rel="noreferrer"
                  >
                    <Button
                    variant="contained"
                    color="info"
                    >
                      예약하기
                    </Button>
                  </a>

                  <Box
                  display="flex"
                  alignItems="center"
                  >
                    <IconButton
                          sx={{ color: 'red' }}
                          aria-label={`follow ${studio?.studio.name}`}
                          onClick={handleFollow}
                      >
                    {
                    follow
                    ?  
                    <FavoriteIcon /> 
                    : 
                    <FavoriteBorderIcon />
                    }
                    </IconButton>
                    <Typography>
                      {follows}
                    </Typography>

                  </Box>
                </Box>
              </Box>
                

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
                    {studio.studio.openTime} ~ {studio.studio.closeTime}
                  </Typography>
                </Box>

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
                      위치
                    </Typography>
                  </Box>
                  
                  <Typography>
                    {studio.studio.address}
                  </Typography>
                </Box>

                <Box
                sx={{
                  mb: 3,
                }}>
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
                    {studio.studio.description}
                  </Typography>
                </Box>

                <Box
                sx={{
                  mb: 3,
                }}>
                  <Box
                   sx={{
                    display: 'flex',
                  }}
                  >
                    <LocalPhoneIcon sx={{mr: 1}} />
                    <Typography>
                      전화번호
                    </Typography>
                  </Box>
                  
                  <Typography>
                    {studio.studio.phone}
                  </Typography>
                </Box>

            </Box>

            <Box
            sx={{ mt: 3 }}>
                  <Typography
                  variant="h5">
                    Photos
                  </Typography>

            <ImageList sx={{ width: '100%' }} cols={3} gap={10}>
                {photos.map((photo) => (
                  <Link 
                  href={`/photos/${photo.id}`}
                  key={photo.id}
                  >
                <a>
                <ImageListItem>
                  <Box 
                    sx={{
                      width: "100%",
                      paddingBottom: "120%",
                      backgroundImage: `url(${photo.photoUrl})`,
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
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

            <ReviewList reviews={reviewList} />

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
                <Box item xs={9}>
                  <TextField
                    required
                    fullWidth
                    type="content"
                    id="content"
                    name="content"
                    label="리뷰를 작성해주세요"
                  />
                </Box>
                <Rating name="rating" precision={1} sx={{ width: '100px', margin: 'auto' }}/>
                <Box item xs={3}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                  >
                    리뷰 작성
                  </Button>
                </Box>
             
            </FormControl>
          </Box>

                {/* <Box>
                  
                    <Button
                    variant="contained"
                    color="primary"
                    >
                      리뷰 작성
                    </Button>
                </Box> */}
            </Box>

          </Container>
        </Box>
      </>
    )
}