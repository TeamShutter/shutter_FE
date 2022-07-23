
import Head from 'next/head';
import { GetStudios } from '../../components/fetcher/fetcher';
import { Box, Container, Typography, Rating} from '@mui/material';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from 'next/link';

var items = [
    {
        name: "레이지데이",
        address: "서울시 관악구 청룡5길 3",
        number: "070-7954-4777",
        hour: "11:00 ~ 20:30 일요일 휴무",
        urls: [
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220109_255%2F1641726645309GqrjB_JPEG%2Fupload_30c65192e68fd0ee99aca71ba3008d6e.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20211206_209%2F1638790871352DrCxa_JPEG%2Fupload_eeff6bd6492bbcd9d0c788fd26e3ca77.jpeg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20220130_180%2F1643536394216fq6BE_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20220130_13%2F16435363880800oBfX_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220404_77%2F1649079328444wWW2k_JPEG%2F%25B4%25DC%25C3%25BC2.jpg",
        ]
    },
    {
        name: "팝콘 스튜디오",
        address: "서울시 관악구 관악로 168 203호",
        number: "0507-1406-9805",
        hour: "11:00 ~ 20:00 일요일 휴무",
        urls: [
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20151021_254%2F1445385099661YXSyj_JPEG%2F166964416139318_2.jpeg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20210714_83%2F1626229666543PKpGh_JPEG%2Fupload_d49d811b39cd03dd11929c763f76c0aa.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20200930_4%2F1601433134899XE28G_JPEG%2Fupload_60af1f61237c5e7821cb097e4910b625.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20201016_62%2F1602825456510Wg2XX_JPEG%2Fupload_137ddea432d6dbc3d6d3cb1d694d935f.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20200609_241%2F1591669479160BF0Ih_JPEG%2Fupload_e0e2f58543201a5050dd2e000054a80c.jpg",        
        ]
    },
    {
        name: "신림동 사진관",
        address: "서울시 관악구 남부순환로181길 15 2층",
        number: "02-6166-5892",
        hour: "12:00 ~ 20:00 일요일 휴무",
        urls: [
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20220531_280%2F1653995121575EBXEj_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20220531_202%2F1653995121204dIKeK_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211222_177%2F1640161921724Wox0H_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211112_181%2F1636678765749tkGbk_JPEG%2Fimage.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fnaverbooking-phinf.pstatic.net%2F20211017_293%2F1634440438045f09rx_JPEG%2Fimage.jpg",
        ]
    },
    {
        name: "라라스튜디오",
        address: "서울시 관악구 관악로 148 2층",
        number: "0507-1362-4779",
        hour: "09:30 ~ 19:30 일요일 휴무",
        urls: [
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191009_155%2F157058442831579VFt_JPEG%2F20KhVP0BW9WJXKSJ7rf2meaw.JPG.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191009_252%2F1570584427937fCeKQ_JPEG%2F2fMGUzdE2e-osu0LF450Ab9z.JPG.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA2MTdfMjAg%2FMDAxNjU1NDQxOTIwNTQ5.Qao4v4EcpplGnR09ihgQIGH5mMtBhw7_zxOyc7u_6BQg.E68S2i4y2JQqARJxRs3TNUE8dbDYI2fmjPfnj1Ag9Cgg.JPEG%2Fupload_77cfeafdcbbab75543ee05ac3a06ac38.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190527_293%2F1558940550590CmSq7_JPEG%2F0002.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191009_10%2F1570584427884veOu8_JPEG%2FopY6yOefaoz9HcohCgiFpAXF.JPG.jpg",
        ]
    },
    {
        name: "우리동네사진관",
        address: "서울시 관악구 관악로15길 6",
        number: "0507-1400-5870",
        hour: "10:00 ~ 19:30",
        urls: [
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA3MTRfOTUg%2FMDAxNjU3NzY4Nzc4NTU2.0EEn0MxLDaTn2m4mRZG12x5BNpQREDqWphJAlKie5wcg.FiXemfha0SVsJI8tr57Y8SEFsFCTIqgBAEcRJ0UvmjMg.JPEG%2Fupload_ae42a5c6ff1594bae5db56a7bf6db2dd.jpeg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA3MTRfNzAg%2FMDAxNjU3NzY4Nzc4MzA2.Wch4B3dHiztm2oRgJr3BLhsuE6MjwZW8I1MqONTLkX4g.B1tVh44ieaarwyFD9ZEWwrjoDq-lHl1W06jkWSlBHeAg.JPEG%2Fupload_0bb2e58dd5ad1945e4862c18b3d27f99.jpeg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA2MThfOTMg%2FMDAxNjU1NTM2NTYwNjEx.bbJBlSkKDU7JY0nKbfsBfDOsXx1YRX_yywKeQcS3bTAg.sAnzwH_ZoTWPnMdxMiAXK1LbeETGcEaHo3352_9I46og.JPEG%2Fupload_e1e261c64c05ccd06b7783c2c3113178.jpeg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMjA2MDVfNjYg%2FMDAxNjU0MzU4OTAwNzUw.kZc9V6bvBlvhA-EYHfRURRgqJxZMW-_JnLboxsZKFTUg.oSJA7mw5i6BAgzWCQTbFExR_F1VxQI3Mf5w7d3nb38Qg.JPEG%2Fupload_0a4c07792536a79b409f5aec7152c504.jpg",
            "https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220424_179%2F1650774418689FTVrO_JPEG%2Fupload_9291ebcddec444f061573b0ac39bacb9.jpeg",
        ]   
    }
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
                    <Box>
                        {
                            items.map( (item, i) => (
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
                                        item.urls.map( (url, i) =>  (
                                        <Box
                                        key={i}
                                        sx={{
                                            width: '100%',
                                            paddingBottom: "60%",
                                            backgroundImage: `url(${url})`,
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
                                href={`/studios/${item.id}`}
                                >
                                    <a>
                                        <div
                                        sx={{
                                            width: '100%',
                                        }}
                                        >
                                            <Typography
                                            variant='h5' fontWeight='bold' >
                                                {item.name}
                                                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                                            </Typography>
                                        
                                            <Typography
                                            variant='h7'>
                                                {item.address}<br></br>
                                                {item.number}<br></br>
                                                {item.hour}
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