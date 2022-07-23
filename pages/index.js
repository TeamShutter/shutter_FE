import Head from 'next/head'
import { GetStudios } from '../components/fetcher/fetcher'
import { Box, Button, Container, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, InputLabel, NativeSelect, Typography } from '@mui/material';
import { theme } from '../theme';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState } from 'react';
import { display } from '@mui/system';

export default function Home() {
  
  const [price, setPrice] = useState(0);
  const [photoshop, setPhotoshop] = useState(0);
  const [gender, setGender] = useState(0);

  const {data, isLoading, isError} = GetStudios(price, photoshop, gender);

  console.log(price);
  console.log(photoshop);
  console.log(gender);

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!!</div>
  console.log("data: ", data);


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
          mb: 5,
          }} >
          Shutter
        </Typography>

        <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Price
          </InputLabel>
          <NativeSelect
            onChange={(event) => setPrice(event.target.value)}
            defaultValue={0}
            inputProps={{
              name: 'price',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={1}
            // onClick={()=> setPrice(1)}
            >0 ~ 30,000</option>
            <option 
            value={2}
            // onClick={()=> setPrice(2)}
            >30,000 ~ 50,000</option>
            <option 
            value={3}
            // onClick={()=> setPrice(3)}
            >50,000 ~ 70,000</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Photoshop
          </InputLabel>
          <NativeSelect
            onChange={(event) => setPhotoshop(event.target.value)}
            defaultValue={0}
            inputProps={{
              name: 'photoshop',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={1}
            // onClick={()=> setPhotoshop(1)}
            >약함</option>
            <option 
            value={2}
            // onClick={()=> setPhotoshop(2)}
            >보통</option>
            <option 
            value={3}
            // onClick={()=> setPhotoshop(3)}
            >강함</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gender
          </InputLabel>
          <NativeSelect
            onChange={(event) => setGender(event.target.value)}
            defaultValue={0}
            inputProps={{
              name: 'gender',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={1}
            // onClick={()=> setGender(1)}
            >Male</option>
            <option 
            value={2}
            // onClick={()=> setGender(2)}
            >Female</option>
            <option 
            value={3}
            // onClick={()=> setGender(3)}
            >Group</option>
          </NativeSelect>
        </FormControl>
      </Box>


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

        </Container>
      </Box>
    </>
  )
}
