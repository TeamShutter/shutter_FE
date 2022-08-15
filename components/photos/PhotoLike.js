import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PhotoLike ({ setLike, setLikes }) {

    const handleLike = async () => {
    await fetch(`${BASE_URL}/photos/${photoId}/like`, {
        method: 'GET',
        headers: {
          "userid": user.id
        },
        withCredentials: true,
    });

    like ? (
    setLikes((prev) => prev - 1)
     ) : (
       setLikes((prev) => prev + 1)
    )  

    setLike((prev) => !prev);

    }

    return (
        <Box
                    display="flex"
                    alignItems="center"
                    >
                      <IconButton
                            sx={{ color: 'red' }}
                            aria-label={`star ${data?.name}`}
                            onClick={handleLike}
                        >
                      {
                      like 
                      ?  
                      <FavoriteIcon /> 
                      : 
                      <FavoriteBorderIcon />
                      }
                      </IconButton>
                      <Typography>
                        {likes}
                      </Typography>
  
                    </Box>
    )
}