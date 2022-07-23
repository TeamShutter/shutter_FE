import Head from 'next/head';
import { GetPhotos } from '../components/fetcher/fetcher';
import { Box, Container, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import { theme } from '../theme';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Home() {
  const {data, isLoading, isError} = GetPhotos();

  
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!!</div>

  return data && (
    <>
      <Head>
        <title>Shutter | Home</title>
      </Head>

      <Box
        component='main'
      >
        <Container maxWidth="lg">

        <Typography 
        variant='h2'
        sx={{
          textAlign: 'center',
          mb: 10,
          }} >
          Shutter
        </Typography>


        <ImageList sx={{ width: '100%' }} cols={3} gap={10}>
          
          {data.map((photo) => (
              <Link 
              href={`photos/${photo.id}`}
              key={photo.name}
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

        </Container>
      </Box>
    </>
  )
}
