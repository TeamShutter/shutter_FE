import { Avatar, Box, Container, IconButton, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { GetPhoto } from "../../components/fetcher/fetcher";
import Head from "next/head";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import { useEffect, useState } from "react";
import PhotoLike from "../../components/photos/PhotoLike";
import Layout from "../../layouts/Layout";
import { useAuth } from "../../hooks/use-auth";
import PhotoList from "../../components/photos/PhotoList";


export default function Photo() {
    const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "http://54.180.88.193:8000"

    const router = useRouter();
    const {photoId} = router.query;
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(0);
    const auth = useAuth();

    const {data, isLoading, isError} = GetPhoto(photoId);
    const studioId = data?.studio?.id;
    useEffect(() => {
      setLikes(data?.like_users.length);

      data?.like_users?.includes(auth.user?.id) == true ? (
        setLike(true)
      ) : (
        setLike(false)
      )
    }, [data]);

    
    const handleLike = async () => {
    await fetch(`${BASE_URL}/photos/${photoId}/like`, {
        method: 'GET',
        headers: {
          "userid": auth.user.id
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

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>


    return data && (

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
                      paddingBottom: "120%",
                      backgroundImage: `url(${data?.photoUrl})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      position: 'relative'
                    }}
                  >
                    <Link href={`/studios/${data?.studio?.id}`}>
                    <a>
                      <ImageListItemBar
                      sx={{
                        height: '70px',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      title={data?.name}
                      position="top"
                      actionIcon={
                        <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        >
                        <Avatar
                          alt={data?.studio?.name}
                          src={data?.studio?.thumbnail}
                          sx={{ width: 35, height: 35, ml: 2, mr: 2 }}
                        />
                          <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'white'
                          }}
                          >
                            {data?.studio?.name}
                          </Typography>
                      </Box>
                        }
                      actionPosition="left"
                    />
                    </a>
                    </Link>
                  </Box>
                  
                  <Box>
                    <PhotoList studioId={studioId} />
                  </Box>


                  {auth.user ? (
                    <PhotoLike setLike={setLike} setLikes={setLikes} /> 
                  ): null }

                  {/* {auth.user ? (
                    <Box
                    display="flex"
                    alignItems="center"
                    >
                      <IconButton
                            sx={{ color: 'red' }}
                            aria-label={`star ${data?.name}`}
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