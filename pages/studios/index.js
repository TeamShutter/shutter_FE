
import Head from 'next/head';
import { GetStudios } from '../../components/fetcher/fetcher';
import { Box, Container, Typography } from '@mui/material';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';

var items = [
    {
        name: "연희동 사진관",
        url: "http://newsimg.hankookilbo.com/2019/05/06/201905061505757907_9.jpg"
    },
    {
        name: "길가네 사진관",
        url: "http://www.idjnews.kr/news/photo/202003/120256_80451_5613.jpg"
    },
    {
        name: "초원 사진관",
        url: "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1UxX/image/i8bIDZ65ASt-mV5hodJ6JfWdOSQ.JPG"
    },
    {
        name: "효자동 사진관",
        url: "https://www.mstoday.co.kr/news/photo/202010/61898_43818_4325.jpg"
    },
    {
        name: "새한칼라스튜디오",
        url: "https://newsimg.hankookilbo.com/cms/articlerelease/2021/08/12/efd65911-bb32-4256-a520-6ca29a257290.jpg"
    },

]


export default function Studioindex() {
    const {data, isLoading, isError} = GetStudios();

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
                <Carousel>
                {
                    items.map( (item, i) =>  (
                        <>
                        <img
                    src={item.url}
                    srcSet={item.url}
                    alt={item.name}
                    loading="lazy"
                    layout='fill'
                    objectFit='contain'
                    height="400"
                  />
                  <Typography
                  variant='h4' >
                      {item.name}
                  </Typography>
                        </>
                    ))
                }
                </Carousel>
                </Container>
            </Box>
            <Box>

            </Box>
           
        
        </>

      );
}