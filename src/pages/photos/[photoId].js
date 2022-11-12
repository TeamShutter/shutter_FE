import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { GetPhoto, GetPhotoTags } from "../../components/fetcher/fetcher";
import Head from "next/head";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";
import { useEffect, useState } from "react";
import PhotoLike from "../../components/photos/PhotoLike";
import Layout from "../../layouts/Layout";
import PhotoList from "../../components/photos/PhotoList";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import TagSelector from "../../components/filters/TagSelector";

export default function Photo() {
  const router = useRouter();
  const { photoId } = router.query;
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const photoTagsData = GetPhotoTags(photoId);

  const { photoData, photoDataLoading, photoDataError } = GetPhoto(photoId);

  const photo = photoData?.photo_data;
  const photoTags = photoTagsData.photoTags?.data;

  const photoTagsLoading = photoTagsData.photoTagsLoading;
  const photoTagsError = photoTagsData.photoTagsError;
  const studioId = photo?.studio?.id;
  useEffect(() => {
    setLikes(photo?.like_users.length);

    photo?.like_users?.includes(user?.id) == true
      ? setLike(true)
      : setLike(false);
  }, [photo]);

  const handleLike = async () => {
    await fetch(`${API_URL}/photo/${photoId}/like`, {
      method: "GET",
      headers: {
        userid: user.id,
      },
      withCredentials: true,
    });

    like ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);

    setLike((prev) => !prev);
  };

  if (photoDataLoading || photoTagsLoading) return <div>Loading...</div>;
  if (photoDataError || photoTagsError) return <div>Error!!</div>;

  return (
    photo &&
    photoTags && (
      <Layout>
        <Head>
          <title>Photo | Shutter</title>
        </Head>

        {/* <ArrowBackIosNewIcon 
            onClick={() => router.back()}
            sx={{ mb : 2, cursor: 'pointer'}} />  */}

        <Box
          sx={{
            // backgroundColor: 'black',
            borderRadius: "20px",
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              mb: 2,
              px: 3,
            }}
            onClick={() => router.push(`/studios/${photo?.studio?.id}`)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={photo?.studio?.name}
                src={photo?.studio?.thumbnail}
                sx={{ width: 35, height: 35, mr: 2 }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  color: "black",
                }}
              >
                {photo?.studio?.name}
              </Typography>
            </Box>

            <Button
              sx={{
                color: "white",
                display: "block",
                backgroundColor: "black",
                border: "1px solid black",
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "black",
                },
              }}
            >
              View More
            </Button>
          </Box>

          <Box
            sx={{
              width: "100%",
              paddingBottom: "120%",
              backgroundImage: `url(${photo?.photo_url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              position: "relative",
            }}
          >
            {/* <Link href={`/studios/${photo?.studio?.id}`}>
                    <a>
                      <ImageListItemBar
                      sx={{
                        height: '70px',
                        background:
                          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                      }}
                      // title={photo?.id}
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
                    </Link> */}
          </Box>
        </Box>
        <Box
          sx={{
            display: "inline-block",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            width: "100%",
            mt: "15px",
            mb: "10px",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
        >
          {photoTags.map((photoTag) => (
            <Typography
              sx={{ display: "inline-block", mr: "10px" }}
              key={photoTag.id}
              variant="subtitle2"
            >
              {"#" + photoTag.name}
            </Typography>
          ))}
        </Box>
        {/* 중간선 */}
        <Box
          sx={{
            width: "100%",
            height: "5px",
            bgcolor: "blank.main",
          }}
        ></Box>

        <Box
          sx={{
            mt: "8px",
            mb: "5px",
          }}
        >
          <Typography variant="h6">PORTFOLIO</Typography>
        </Box>

        <Box>
          <PhotoList studioId={studioId} />
        </Box>

        {user ? <PhotoLike setLike={setLike} setLikes={setLikes} /> : null}

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
  );
}
