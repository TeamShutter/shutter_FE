import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { GetStudioPhotos } from "../fetcher/fetcher";

export default function RecommendedPhotoList({ studioId }) {
  const photosData = GetStudioPhotos(studioId);

  const photos = photosData.photos?.data;
  const photosLoading = photosData.photosLoading;
  const photosError = photosData.photosError;

  if (photosLoading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  if (photosError) return <div>Error!!</div>;

  return (
    photos && (
      <>
        <ImageList
          sx={{
            overflowX: "auto",
            width: "100%",
            gridAutoFlow: "column",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)",
            "::-webkit-scrollbar": {
              height: "8px",
            },
            "::-webkit-scrollbar-button": {},
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "#2f3542",
              borderRadius: 5,
              backgroundClip: "padding-box",
              border: "1px solid transparent",
            },
            "::-webkit-scrollbar-thumb:hover": {},
            "::-webkit-scrollbar-track": {
              backgroundColor: "grey",
              borderRadius: 5,
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
      </>
    )
  );
}
