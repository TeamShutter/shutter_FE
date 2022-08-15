import { Box, ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import { GetPhotos, GetStudioPhotos } from "../fetcher/fetcher";

// {price, photoshop, sex, tags}
export default function PhotoList(props) {
  let photosData, photos, photosLoading, photosError;
  if ('price' in props) {
    photosData = GetPhotos(props.price, props.photoshop, props.sex, props.tags);
  } else {
    photosData = GetStudioPhotos(props.studioId);
  }

  photos = photosData.photos;
  photosLoading = photosData.photosLoading;
  photosError = photosData.photosError;

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