import Head from 'next/head'
import { GetTags } from '../components/fetcher/fetcher'
import { Box, Chip, Container, Typography } from '@mui/material';
import { useState } from 'react';
import PhotoList from '../components/photos/PhotoList';
import FilterContainer from '../components/filters/FilterContainer';
import FilterTags from '../components/filters/FilterTags';
import Layout from '../layouts/Layout';
import { useAuth } from '../hooks/use-auth';

export default function Home() {
  
  const [price, setPrice] = useState(0);
  const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);
  const [tagList, setTagList] = useState([]);

  const {tags, tagsLoading, tagsError} = GetTags();

  const auth = useAuth();
  
  if(tagsLoading) return <div>Loading...</div>
  if(tagsError) return <div>Error!!</div>

  return tags && (
    <Layout>

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

          <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} />

          <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />

    </Layout>
  )
}
