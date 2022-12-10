import {
  Box,
  Container,
  Typography,
  Rating,
  CircularProgress,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import Link from "next/link";
import { GetStudios } from "../fetcher/fetcher";
import StudioCarousel from "../studios/StudioCarousel";
import StudioInfo from "../studios/StudioInfo";

// {price, photoshop, sex, tags}
export default function StudioList({ town }) {
  let studiosData;
  if (town) {
    studiosData = GetStudios(town);
  } else {
    studiosData = GetStudios();
  }

  const studios = studiosData.studios?.data;
  const studiosLoading = studiosData.studiosLoading;
  const studiosError = studiosData.studiosError;
  console.log(studios);
  if (studiosLoading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  if (studiosError) return <div>Error!!</div>;

  return (
    studios && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {studios.map((studio, i) => (
          <Box key={i} sx={{ mb: 10, width: "45%" }}>
            <StudioCarousel studio={studio} />
            <Link href={`/studios/${studio.id}`}>
              <a>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "17px", md: "20px" },
                      }}
                    >
                      {studio.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        columnGap: "2px",
                      }}
                    >
                      <FavoriteIcon
                        sx={{ color: "red", width: "17px", height: "17px" }}
                      />
                      <Typography>{studio.follow_users.length}</Typography>
                    </Box>
                    {/* <Rating
                      name="read-only"
                      size="small"
                      value={4.5}
                      precision={0.5}
                      readOnly
                    /> */}
                  </Box>

                  {/* <StudioInfo studio={studio} /> */}
                </Box>
              </a>
            </Link>
          </Box>
        ))}
      </Box>
    )
  );
}
