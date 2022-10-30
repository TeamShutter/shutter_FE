import Head from 'next/head'
import { GetTags } from '../components/fetcher/fetcher'
import { Box, Chip, Container, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import PhotoList from '../components/photos/PhotoList';
import FilterContainer from '../components/filters/FilterContainer';
import FilterTags from '../components/filters/FilterTags';
import Layout from '../layouts/Layout';
// import { makeStyles } from '@mui/styles';
import { styled } from '@mui/styles';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const useStyles = makeStyles(() => {
//   root: {
//     width: '260px'
//   }
// })

const TownChip = styled(Chip)({
  width: '23%',
  marginBottom: '8px',
});


export default function Home() {
  // const classes = useStyles();

  const [town, setTown] = useState('');

  const handleChangeTown = (e) => {
    setTown(e.target.innerText);
  }
  
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
              position: 'relative',
              justifyContent: 'center',
              mb: 10
            }}
          >
          <img src="/static/logo_long.png" alt="Shutter Logo" width={300} />
          <Box sx={{
              position: 'absolute', 
              right: 5,
              top: 10,
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <Typography>
              동네별로 보기
              </Typography>
            <ArrowBackIosIcon sx={{ ml: 2 }} />
          </Box>
          
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <TownChip
              onClick={handleChangeTown}
              label="홍대"
              color={town === '홍대' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="이태원"
              color={town === '이태원' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="강남"
              color={town === '강남' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="신촌"
              color={town === '신촌' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="노원"
              color={town === '노원' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="신림"
              color={town === '신림' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="수서"
              color={town === '수서' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="종로"
              color={town === '종로' ? 'primary' : 'default'}
              clickable
            />
            <TownChip
              onClick={handleChangeTown}
              label="용산"
              color={town === '용산' ? 'primary' : 'default'}
              clickable
            />
          </Box>
          
          {/* <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} /> */}

          {/* <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} /> */}

          {/* <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />  */}
          <PhotoList price={1} />
          
          {/* <Pagination sx={{display:"flex", justifyContent:"center"}} onChange={changePage} count={2} />  */}
    </Layout>
  )
}
