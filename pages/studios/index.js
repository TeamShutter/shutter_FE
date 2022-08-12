
import Head from 'next/head';
import { GetStudios } from '../../components/fetcher/fetcher';
import { Box, Container, Typography, Rating} from '@mui/material';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';

export default function Studioindex() {
    const {data, isLoading, isError} = GetStudios(0, 0, 0);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>
    console.log("data: ", data);

    return data && (
        <>
            <Head>
                <title>Studios</title>
            </Head>

            <Box>
                <Container>
                    <Box>
                        {
                            data.map( (studio, i) => (
                                <Box 
                                key={i}
                                sx={{ mb: 10 }}
                                >
                                    <Carousel
                                    NextIcon={<ArrowForwardIosIcon/>}
                                    PrevIcon={<ArrowBackIosNewIcon/>}
                                    navButtonProps={{
                                        style: {
                                            opacity: 0.5,
                                        }
                                    }}
                                    >
                                    {
                                        studio.images.map( (image, i) =>  (
                                        <Box
                                        key={i}
                                        sx={{
                                            width: '100%',
                                            paddingBottom: "60%",
                                            backgroundImage: `url(${image.url})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center center",
                                        }}
                                        >
                                        </Box>
                                        ))
                                    }
                                </Carousel>
                                <Link 
                                href={`/studios/${studio.id}`}
                                >
                                    <a>
                                        <div
                                        sx={{
                                            width: '100%',
                                        }}
                                        >
                                            <Typography
                                            variant='h5' fontWeight='bold' >
                                                {studio.name}
                                                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                                            </Typography>
                                        
                                            <Typography
                                            variant='h7'>
                                                {studio.address}<br></br>
                                                {/* {studio?.number}<br></br> */}
                                                {studio.openTime} : {studio.closeTime}
                                            </Typography>
                                        </div>
                                    </a>
                                </Link>

                                </Box>
                            ))
                        }
                        </Box>
                        
                </Container>
            </Box>
        </>
      );
}