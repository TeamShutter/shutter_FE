import { Avatar, Box, Container, IconButton, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GetPhoto } from "../../components/fetcher/fetcher";
import Head from "next/head";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import { useEffect, useState } from "react";
import PhotoLike from "../../components/photos/PhotoLike";
import Layout from "../../layouts/Layout";
import PhotoList from "../../components/photos/PhotoList";
import { useSelector } from "react-redux";


export default function Photo() {
    const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
: "http://takeshutter.co.kr:8000"

    const router = useRouter();
    const {photoId} = router.query;
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const user = useSelector(state => state.auth.user);

    const {photoData, photoDataLoading, photoDataError} = GetPhoto(photoId);

    const photo = photoData?.photo_data;
    const studioId = photo?.studio?.id;
    useEffect(() => {
      setLikes(photo?.like_users.length);

      photo?.like_users?.includes(user?.id) == true ? (
        setLike(true)
      ) : (
        setLike(false)
      )
    }, [photo]);

    
    const handleLike = async () => {
    await fetch(`${BASE_URL}/photo/${photoId}/like`, {
        method: 'GET',
        headers: {
          "userid": user.id
        },
        withCredentials: true,
    });

    like ? (
    setLikes((prev) => prev - 1)
     ) : (
       setLikes((prev) => prev + 1)
    )  

    setLike((prev) => !prev);

    }

    if(photoDataLoading) return <div>Loading...</div>
    if(photoDataError) return <div>Error!!</div>


    return photo && (

        <Layout>
          <Head>
            <title>Photo | Shutter</title>
          </Head>

          <ArrowBackIosNewIcon 
            onClick={() => router.back()}
            sx={{ mb : 2, cursor: 'pointer'}} /> 


                  <Box
                    sx={{
                      width: '100%',
                      paddingBottom: "100%",
                      backgroundImage: `url(${photo?.photo_url})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      position: 'relative'
                    }}
                  >
                    <Link href={`/studios/${photo?.studio?.id}`}>
                    <a>
                      <ImageListItemBar
                      sx={{
                        height: '70px',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      title={photo?.id}
                      position="top"
                      actionIcon={
                        <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        >
                        <Avatar
                          alt={photo?.studio?.name}
                          src={photo?.studio?.thumbnail}
                          sx={{ width: 35, height: 35, ml: 2, mr: 2 }}
                        />
                          <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'white'
                          }}
                          >
                            {photo?.studio?.name}
                          </Typography>
                      </Box>
                        }
                      actionPosition="left"
                    />
                    </a>
                    </Link>
                  </Box>
                  
                  <Box>
                    Studio ID: {studioId}
                    <PhotoList studioId={studioId} />
                  </Box>


                  {user ? (
                    <PhotoLike setLike={setLike} setLikes={setLikes} /> 
                  ): null }

                  {/* {user ? (
                    <Box
                    display="flex"
                    alignItems="center"
                    >
                      <IconButton
                            sx={{ color: 'red' }}
                            aria-label={`star ${photo?.name}`}
                            onClick={handleLike}
                        >
                      {
                      like 
                      ?  
                      <FavoriteIcon /> 
                      : 
                      <FavoriteBorderIcon />
                      }
                      </IconButton>
                      <Typography>
                        {likes}
                      </Typography>
  
                    </Box>
                  ) : null} */}

        </Layout>
    )
}