import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function StudioCarousel({ studio }) {
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
            key={i}
            sx={{
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