import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function StudioCarousel({ studio }) {
    return (
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
    )
}