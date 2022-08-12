import Head from 'next/head'
import { GetPhotos, GetTags } from '../components/fetcher/fetcher'
import { Box, Button, Chip, Container, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, InputLabel, NativeSelect, Typography } from '@mui/material';
import { theme } from '../theme';
import Link from 'next/link';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useEffect, useState } from 'react';
import PhotoList from '../components/photos/photoList';
import FilterContainer from '../components/filters/FilterContainer';
import FilterTags from '../components/filters/FilterTags';

export default function Home() {
  
  const [price, setPrice] = useState(0);
  const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);
  const [tagList, setTagList] = useState([]);

  const {tags, tagsLoading, tagsError} = GetTags();
  
  

    if(tagsLoading) return <div>Loading...</div>
    if(tagsError) return <div>Error!!</div>

  return tags && (
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
          mb: 3,
          }}
          >
          Shutter
        </Typography>
        
        <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} />

        <FilterTags setTagList={setTagList} tags={tags} />

      

      <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />


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
