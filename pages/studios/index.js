
import Head from 'next/head';
import { GetStudios } from '../../components/fetcher/fetcher';
import { Box, Container, Typography, Rating} from '@mui/material';
import * as React from 'react';
import Link from 'next/link';
import StudioCarousel from '../../components/studios/StudioCarousel';
import StudioInfo from '../../components/studios/StudioInfo';
import StudioFilterContainer from '../../components/filters/StudioFilterContainer';
import StudioList from '../../components/studios/StudioList';
import Layout from '../../layouts/Layout';

export default function Studioindex() {
    const [distance, setDistance] = useState(0);
    const [price, setPrice] = useState(0);


    return (
        <>
            <Head>
                <title>Studios</title>
            </Head>

            <Box>
                <Container>
                    <StudioFilterContainer setPrice={setPrice} setDistance={setDistance}/>
                    <StudioList price={price} distance={distance} />
                </Container>
            </Box>
        </>

    // const {data, isLoading, isError} = GetStudios();
    // if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error!!</div>

    // return data && (
    //     <Layout>

    //             <Head>
    //                 <title>Studios | Shutter</title>
    //             </Head>

    //             <Box>
    //                     {
    //                         data.map( (studio, i) => (
    //                             <Box 
    //                             key={i}
    //                             sx={{ mb: 10 }}
    //                             >
    //                                <StudioCarousel studio={studio} />
    //                             <Link 
    //                             href={`/studios/${studio.id}`}
    //                             >
    //                                 <a>
    //                                     <div
    //                                     sx={{
    //                                         width: '100%',
    //                                     }}
    //                                     >
    //                                         <Typography
    //                                         variant='h5' fontWeight='bold' >
    //                                             {studio.name}
    //                                             <Rating name="read-only" value={4.5} precision={0.5} readOnly />
    //                                         </Typography>
                                        
    //                                         <StudioInfo studio={studio}/>
    //                                     </div>
    //                                 </a>
    //                             </Link>

    //                             </Box>
    //                         ))
    //                     }
    //                     </Box>

    //     </Layout>
      );
}