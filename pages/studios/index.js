
import Head from 'next/head';
import { GetStudios } from '../../components/fetcher/fetcher';
import { Box, Container, Typography, Rating} from '@mui/material';
import * as React from 'react';
import Link from 'next/link';
import StudioCarousel from '../../components/studios/StudioCarousel';
import StudioInfo from '../../components/studios/StudioInfo';

export default function Studioindex() {
    const {data, isLoading, isError} = GetStudios(0, 0, 0);

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error!!</div>

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
                                   <StudioCarousel studio={studio} />
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
                                        
                                            <StudioInfo studio={studio}/>
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