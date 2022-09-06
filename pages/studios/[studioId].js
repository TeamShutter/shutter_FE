import { Box, Button, Container, Typography, Rating, IconButton, FormControl, TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfoIcon from '@mui/icons-material/Info';
import { GetStudio, GetStudioPhotos, GetStudioReviews } from "../../components/fetcher/fetcher";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useEffect, useState } from "react";
import ReviewList from "../../components/reviews/ReviewList";
import StudioCarousel from "../../components/studios/StudioCarousel";
import StudioInfo from "../../components/studios/StudioInfo";
import PhotoList from '../../components/photos/PhotoList';
import Layout from "../../layouts/Layout";
import { useAuth } from "../../hooks/use-auth";


export default function Studio() {
  const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://127.0.0.1:8000"
: "http://takeshutter.co.kr:8000"

    const auth = useAuth();

    const router = useRouter();
    const {studioId} = router.query;

    const [follow, setFollow] = useState(false);
    const [follows, setFollows] = useState(0);
    const [reviewList, setReviewList] = useState([]);

    const {studio, studioLoading, studioError} = GetStudio(studioId);
    const {photos, photosLoading, photosError} = GetStudioPhotos(studioId);
    const {reviews, reviewsLoading, reviewsError} = GetStudioReviews(studioId);

    useEffect(() => {
      setFollows(studio?.follows);

      studio?.studio.follow_users.includes(auth.user?.id) == true ? (
        setFollow(true)
      ) : (
        setFollow(false)
      )
      setReviewList(reviews);
    }, [studio, reviews]);

    if(studioLoading || photosLoading || reviewsLoading) return <div>Loading...</div>
    if(studioError || photosError || reviewsError) return <div>Error!!</div>


    const handleFollow = async () => {
      await fetch(`${BASE_URL}/studios/${studioId}/follow`, {
          method: 'GET',
          headers: {
            "userid": auth.user.id
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
          userId: auth.user.id,
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

    return studio && photos && reviews && (
        <Layout>

          <Head>
            <title>{studio.studio.name} | Shutter</title>
          </Head>

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

              <StudioCarousel studio={studio.studio} />

            <Box
            >
              <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
              >
                <Typography
                variant='h5'
                >
                  {studio.studio.name}
                </Typography>

               {auth.user ? (
                  <Box
                  display= 'flex'
                  alignItems= 'center'
                  >
                    <a href={studio.studio.reservation}
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
               ) : null}
              </Box>
                

                <Rating name="read-only" value={3.5} precision={0.5} readOnly />

                <StudioInfo studio={studio.studio} />

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

              <PhotoList studioId={studioId} />
            </Box>

            <Box 
            sx={{ mt : 3 }}>
                <Typography
                  variant="h5">
                    Reviews
                  </Typography>

              <ReviewList reviews={reviewList} studioId={studioId}/>

              {auth.user ? (
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
             ) : null}
               
            </Box>
        </Layout>
    )
}