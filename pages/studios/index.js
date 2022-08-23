
import Head from 'next/head';
import { Box, Container } from "@mui/material";
import * as React from 'react'; // 이거 왜 이렇게 하는거지??
import StudioFilterContainer from '../../components/filters/StudioFilterContainer';
import StudioList from '../../components/filters/StudioList';

export default function Studioindex() {
    const [distance, setDistance] = React.useState(0);
    const [price, setPrice] = React.useState(0);

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