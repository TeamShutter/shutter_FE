import Head from 'next/head'
import { GetTags } from '../components/fetcher/fetcher'
import { Box, Chip, Container, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import PhotoList from '../components/photos/PhotoList';
import FilterContainer from '../components/filters/FilterContainer';
import FilterTags from '../components/filters/FilterTags';
import { useAuth } from '../hooks/use-auth';
import Layout from '../layouts/Layout';

export default function Home() {
  
  const [price, setPrice] = useState(0);
  const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);
  // const [page, setPage] = useState(1);
  const [tagList, setTagList] = useState([]);

  // const {tags, tagsLoading, tagsError} = GetTags();

 
  // const auth = useAuth();
  
  // if(tagsLoading) return <div>Loading...</div>
  // if(tagsError) return <div>Error!!</div>
  // return tags && (
  return  (
    <Layout>

      {/* <Typography 
          variant='h2'
          sx={{
            textAlign: 'center',
            mb: 3,
            }}
            >
            Shutter
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 10
            }}
          >
          <img src="/static/logo_long.png" alt="Shutter Logo" width={300} />
          </Box>
          
          {/* <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} /> */}

          {/* <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} /> */}

          {/* <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />  */}
          <PhotoList price={1} />
          
          {/* <Pagination sx={{display:"flex", justifyContent:"center"}} onChange={changePage} count={2} />  */}
    </Layout>
  )
}
