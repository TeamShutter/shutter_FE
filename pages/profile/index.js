import { Box, Button, Container, Paper, Typography, Rating, ImageList, ImageListItem, IconButton, ImageListItemBar, List, ListItemText, ListItem, ListItemAvatar, Avatar, Divider, Chip } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InfoIcon from '@mui/icons-material/Info';
import { GetStudios } from "../../components/fetcher/fetcher";
import StarBorderIcon from '@mui/icons-material/StarBorder';



export default function Studio() {
    const router = useRouter();
    const {studioId} = router.query;

    const {data, isLoading, isError} = GetStudios();

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>


    return (

        <>
        <Head>
          <title>Shutter | Profile</title>
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


            <Box
            sx={{
                display: 'flex'
            }}
            >
                <Avatar 
                alt="Seungoh" 
                src="/static/images/avatar/1.jpg"
                sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                    <Typography
                    variant="h6">
                    승오
                    </Typography>
                    <Typography
                    variant="subtitle1">
                    서울시 관악구
                    </Typography>
                   <Box
                   sx={{
                       display: 'flex'
                   }}
                   >
                       <Chip label="20대" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="취업사진" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="깔끔" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="단정" 
                        sx={{ mr: 1 }}
                       />
                   </Box>
                </Box>
               
            </Box>

            <Box>

                <Typography
                variant='h5'
                sx={{ mt:3 }}
                >
                    관심 사진
                </Typography>

                <ImageList sx={{ width: '100%' }} cols={2} gap={10}>
                    
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

            <Box>

                <Typography
                variant='h5'
                sx={{ mt:3 }}
                >
                    관심 매장
                </Typography>
                {data.map((photo) => (
                    <Box 
                    key={photo.id}
                    sx={{
                        display: 'flex'
                    }}
                    >
                        <div>
                         <img
                            src="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                            srcSet="https://blog.kakaocdn.net/dn/bAyJve/btqNr8wMiXi/rV0XKPT78iMnmkXlViEmk0/img.jpg"
                            alt={photo.name}
                            loading="lazy"
                            layout='fill'
                            objectFit='contain'
                            width='150'
                        />
                        </div>

                        <div>
                            <Typography
                            variant="h6"
                            >
                                {photo.name}
                            </Typography>
                            <Typography
                            variant="subtitle1"
                            >
                                {photo.description}
                            </Typography>
                            <Rating name="read-only" value={3} precision={0.5} readOnly />
                        </div>
                    </Box>
                ))}
            </Box>
           

          </Container>
        </Box>
      </>
    )
}