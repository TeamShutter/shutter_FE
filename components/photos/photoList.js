import { Box, ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import { GetPhotos } from "../fetcher/fetcher";

export default function PhotoList({price, photoshop, sex}) {
    const {photos, photosLoading, photosError} = GetPhotos('0', price, photoshop, sex);

  
    if(photosLoading) return <div>Loading...</div>
    if(photosError) return <div>Error!!</div>

    return (
        <ImageList sx={{ width: '100%' }} cols={3} gap={10}>
          
        {photos.map((photo) => (
            <Link 
            href={`photos/${photo.id}`}
            key={photo.name}
            >
           <a>
           <ImageListItem>
              <Box 
                sx={{
                  width: "100%",
                  paddingBottom: "120%",
                  backgroundImage: `url(${photo.photoUrl})`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              />
            </ImageListItem>
           </a>
          </Link>
        ))}

      </ImageList>

    )
}