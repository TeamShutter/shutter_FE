
import Head from 'next/head';
import { Box, Container } from "@mui/material";
import StudioFilterContainer from '../../components/filters/StudioFilterContainer';
import StudioList from '../../components/filters/StudioList';
import { useState } from 'react';

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
      );
}