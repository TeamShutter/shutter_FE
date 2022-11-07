import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";

export default function StudioCarousel({ studio }) {
    const router = useRouter();

    return (
        <Carousel
        NextIcon={<ArrowForwardIosIcon sx={{ fontSize: {xs: '12px', md: '20px'} }} />}
        PrevIcon={<ArrowBackIosNewIcon sx={{ fontSize: {xs: '12px', md: '20px'} }} />}
        navButtonProps={{
            style: {
                opacity: 0.5,
            }
        }}
        >
        {
            studio.studio_images.map( (image, i) =>  (
            <Box
            onClick={() => router.push(`/studios/${studio.id}`)}
            key={i}
            sx={{
                cursor: 'pointer',
                width: '100%',
                paddingBottom: "70%",
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
    )
}