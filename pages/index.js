import Head from 'next/head'
import { GetTags } from '../components/fetcher/fetcher'
import { Box, Chip, Container, Typography } from '@mui/material';
import { useState } from 'react';
import PhotoList from '../components/photos/PhotoList';
import FilterContainer from '../components/filters/FilterContainer';

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

        </Container>
      </Box>
    </>
  )
}
