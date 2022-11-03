import {Box, Container, Typography, Rating } from "@mui/material";
import Link from "next/link";
import { GetStudios } from "../fetcher/fetcher";
import StudioCarousel from "../studios/StudioCarousel";
import StudioInfo from "../studios/StudioInfo";

// {price, photoshop, sex, tags}
export default function StudioList({town}) {
  let studiosData;
  if (town) {
    studiosData = GetStudios(town);
  } else {
    studiosData = GetStudios();
  }

  const studios = studiosData.studios?.data;
  const studiosLoading = studiosData.studiosLoading;
  const studiosError = studiosData.studiosError;

  if (studiosLoading) return <div>Loading...</div>;
  if (studiosError) return <div>Error!!</div>;

  return studios && (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >

      {studios.map((studio, i) => (
        <Box key={i} sx={{ mb: 10, width: '45%' }}>
          <StudioCarousel studio={studio} />
          <Link href={`/studios/${studio.id}`}>
            <a>
              <Box
                // sx={{
                //   width: "100%",
                //   display: "flex",
                //   alignItems: "center",
                //   justifyContent: "space-between"
                // }}
              >
                <Box
                  // sx={{
                  //   width: '30%',
                  //   display: 'flex',
                  //   flexDirection: 'column',
                  //   alignItems: 'center'
                  // }}
                >
                  <Typography 
                  variant="h5" 
                  fontWeight="bold"
                  sx={{
                    fontSize: {xs : '14px', md: '17px'}
                  }}
                  >
                    {studio.name}
                  </Typography>
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
  );
}
