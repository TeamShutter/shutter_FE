import Head from 'next/head'
import { GetPhotos } from '../components/fetcher/fetcher'
import { Box, Button, Container, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, InputLabel, NativeSelect, Typography } from '@mui/material';
import { theme } from '../theme';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import PhotoList from '../components/photos/photoList';

export default function Home() {
  
  const [price, setPrice] = useState(0);
  const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);

  return (
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
          }}
          >
          Shutter
        </Typography>

        <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        <FormControl width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Price
          </InputLabel>
          <NativeSelect
            onChange={
              (event) => {
                event.preventDefault();
                setPrice(event.target.value);
            }}
            inputProps={{
              name: 'price',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={0}
            >All</option>
            <option 
            value={1}
            >~ 10,000</option>
            <option 
            value={2}
            >~ 20,000</option>
            <option 
            value={3}
            >~ 30,000</option>
            <option 
            value={4}
            >~ 40,000</option>
            <option 
            value={5}
            >~ 50,000</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Photoshop
          </InputLabel>
          <NativeSelect
            onChange={(event) => {
              event.preventDefault();
              setPhotoshop(event.target.value)
            }}
            inputProps={{
              name: 'photoshop',
              id: 'uncontrolled-native',
            }}
          >
             <option 
            value={0}
            >All</option>
            <option 
            value={1}
            >자연스럽게</option>
            <option 
            value={2}
            >적당히</option>
            <option 
            value={3}
            >빵빵하게</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gender
          </InputLabel>
          <NativeSelect
            onChange={(event) => {
              event.preventDefault();
              setSex(event.target.value)
            }}
            inputProps={{
              name: 'sex',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={0}
            >All</option>
            <option 
            value={1}
            >남자</option>
            <option 
            value={2}
            >여자</option>
          </NativeSelect>
        </FormControl>
      </Box>

      <PhotoList price={price} photoshop={photoshop} sex={sex} />


        {/* <ImageList sx={{ width: '100%' }} cols={3} gap={10}>
          
          {photos.map((photo) => (
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
              </ImageListItem>
             </a>
            </Link>
          ))}

        </ImageList> */}

        </Container>
      </Box>
    </>
  )
}
