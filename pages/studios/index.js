import Head from "next/head";
import { GetStudios } from "../../components/fetcher/fetcher";
import {
  Box,
  Container,
  Typography,
  Rating,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import StudioCarousel from "../../components/studios/StudioCarousel";
import StudioInfo from "../../components/studios/StudioInfo";
import StudioFilterContainer from "../../components/filters/StudioFilterContainer";
import StudioList from "../../components/studios/StudioList";
import Layout from "../../layouts/Layout";
import { useState } from "react";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useEffect } from "react";

export default function Studioindex() {
  const [distance, setDistance] = useState(1);
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  const changePage = (e) => {
    setPage(e.target.innerText);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  }, []);

  const getLocation = (e) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      const latitude = position.coords.latitude;
      const longtitude = position.coords.longitude;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  };

  return (
    <Layout>
      <Head>
        <title>Studios</title>
      </Head>

      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ display: "flex", alignItems: "center" }}
            id="outlined-read-only-input"
            variant="filled"
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <FmdGoodOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <GpsFixedIcon onClick={getLocation} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Container>
          <StudioFilterContainer
            setPrice={setPrice}
            setDistance={setDistance}
          />
          <StudioList price={price} distance={distance} latitude={latitude} longitude={longitude} />
        </Container>
      </Box>
    </Layout>

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
