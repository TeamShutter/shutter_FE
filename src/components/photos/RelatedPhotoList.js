import {
  Box,
  ImageList,
  ImageListItem,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { GetRelatedPhotos } from "../fetcher/fetcher";

export default function RelatedPhotoList({ photoId }) {
  let photosData;

  photosData = GetRelatedPhotos(photoId);

  const usage = "index";

  const photos = photosData.photos?.data;
  const photosLoading = photosData.photosLoading;
  const photosError = photosData.photosError;

  if (photosLoading) return <div>Loading...</div>;
  if (photosError) return <div>Error!!</div>;

  if (photos && photos.length > 0) {
    if(usage === "index") {
      return (
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
                          backgroundImage: `url(${photo.photo_url})`,
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
      )
    } else {
      return (
        <ImageList
          sx={{
            overflowX: "auto",
            width: "100%",
            gridAutoFlow: "column",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)",
            "::-webkit-scrollbar": {
              width: "3px",
            },
            "::-webkit-scrollbar-button": {},
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#2f3542",
              borderRadius: 10,
              backgroundClip: "padding-box",
              border: "1px solid transparent",
            },
            "::-webkit-scrollbar-thumb:hover": {},
            "::-webkit-scrollbar-track": {
              backgroundColor: "grey",
              borderRadius: 10,
            },
            "::-webkit-scrollbar-track-piece": {},
            "::-webkit-scrollbar-corner": {},
            "::-webkit-resizer": {},
          }}
        >
          {photos.map((photo) => (
            <Box key={photo.id}>
              <Link href={`/photos/${photo.id}`}>
                <a>
                  <ImageListItem>
                    <Box
                      sx={{
                        width: "100%",
                        paddingBottom: "120%",
                        backgroundImage: `url(${photo.photo_url})`,
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
      )
    }
  } else {
   return (
    <Box sx={{ mt: "10px", ml: "5px" }}>
      <Typography variant="subtitle1" as="span">
        조건에 맞는 사진이 없습니다
      </Typography>
    </Box>
   )
  }

}
