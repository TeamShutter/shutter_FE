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
  
  const handleTag = (id) => {
    tagList.includes(id) ? (
      setTagList((prev) => prev.filter(x => x != id))
    ) : (
      setTagList((prev) => [...prev, id])
    )
  }

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

          <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex}/>

          <Box
          display='flex'
          alignItems='center'
          sx={{
            mt: 2
          }}
          >
            {tags.map((tag) => {
              return (
                <Chip
                sx={{
                  mr: 1
                }}
                key={tag.id}
                label={`# ${tag.content}`}
                variant={tagList.includes(tag.id) ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleTag(tag.id)}
                />
              )
            })}
          </Box>

         <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />

        </Container>
      </Box>
    </>
  )
}
