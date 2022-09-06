import { Box, ImageList, ImageListItem, Pagination } from "@mui/material";
import Link from "next/link";
import { GetPhotos, GetStudioPhotos } from "../fetcher/fetcher";

// {price, photoshop, sex, tags}
export default function PhotoList(props) {

  let photosData, photos, photosLoading, photosError, usage;
  if ("price" in props) {
    photosData = GetPhotos(props.price, props.photoshop, props.sex, props.tags);
    usage = "index"
  } else {
    photosData = GetStudioPhotos(props.studioId);
    usage = "studio"

  }

  photos = photosData.photos;
  photosLoading = photosData.photosLoading;
  photosError = photosData.photosError;

  if (photosLoading) return <div>Loading...</div>;
  if (photosError) return <div>Error!!</div>;

  return (
    <> {
      usage === "index" ?
      <ImageList sx={{ width: "100%" }} cols={3} gap={10}>
        {photos.map((photo) => (
          <Box key={photo.id}>
            <Link href={`/photos/${photo.id}`}>
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
          </Box>
        ))}
      </ImageList>
      :
      <ImageList sx={{
        overflowX: "auto",
         width: "100%",
         gridAutoFlow: "column",
         gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
         gridAutoColumns: "minmax(160px, 1fr)",
         '::-webkit-scrollbar': {
          width: '3px'
        },
        '::-webkit-scrollbar-button': {

        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#2f3542',
          borderRadius: 10,
          backgroundClip: 'padding-box',
          border: '1px solid transparent',
        },
        '::-webkit-scrollbar-thumb:hover': {
          
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'grey',
          borderRadius: 10,
        },
        '::-webkit-scrollbar-track-piece': {
         
        },
        '::-webkit-scrollbar-corner': {
        
        },
        '::-webkit-resizer': {
          
        },
        }}>
      {photos.map((photo) => (
        <Box key={photo.id}>
          <Link href={`/photos/${photo.id}`}>
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
        </Box>
      ))}
    </ImageList>
    }
      
    </>

    //     <ImageList sx={{ width: '100%' }} cols={3} gap={10}>

    //     {photos.map((photo) => (
    //         <Link
    //         href={`/photos/${photo.id}`}
    //         key={photo.name}
    //         >
    //        <a>
    //        <ImageListItem>
    //           <Box
    //             sx={{
    //               width: "100%",
    //               paddingBottom: "120%",
    //               backgroundImage: `url(${photo.photoUrl})`,
    //               backgroundPosition: "center center",
    //               backgroundRepeat: "no-repeat",
    //               backgroundSize: "cover",
    //             }}
    //           />
    //         </ImageListItem>
    //        </a>
    //       </Link>
    //     ))}

    //   </ImageList>
  );
}
