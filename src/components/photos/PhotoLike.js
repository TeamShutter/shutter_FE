import { Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PhotoLike ({ like, setLike, likes, setLikes, photoId }) {

    const handleLike = async () => {
      
      const res = await fetch(`/api/photo/like?photoId=${photoId}`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
          }
      });
      console.log(res);

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
                  aria-label='star'
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