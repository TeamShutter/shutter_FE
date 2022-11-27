import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetStudios } from "../../components/fetcher/fetcher";
import Layout from "../../layouts/Layout";
import { API_URL } from "../../config";
import Link from "next/link";
import StudioCarousel from "../../components/studios/StudioCarousel";
import RecommendedPhotoList from "../../components/photos/RecommendedPhotoList";

export default function Test() {
  const studiosData = GetStudios();

  const studios = studiosData.studios?.data;
  const studiosLoading = studiosData.studiosLoading;
  const studiosError = studiosData.studiosError;

  if (studiosLoading) return <div>Loading...</div>;
  if (studiosError) console.log(studiosError);

  // Post 형식으로 gender랑 age 보냄

  return !studios ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <Typography variant="h4">가장 추천하는 사진관</Typography>
      <Box sx={{ mb: 10, width: "75%" }}>
        <StudioCarousel studio={studios[0]} />
        <Link href={`/studios/${studios[0].id}`}>
          <a>
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "14px", md: "17px" },
                  }}
                >
                  {studios[0].name}
                </Typography>
              </Box>
            </Box>
          </a>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Typography>이와 연관된 사진관들</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {studios
          .filter((studio, i) => i !== 0)
          .map((studio, i) => (
            <Box key={i} sx={{ mb: 10, width: "45%" }}>
              <RecommendedPhotoList studioId={studio.id} />
              <Link href={`/studios/${studio.id}`}>
                <a>
                  <Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "14px", md: "17px" },
                        }}
                      >
                        {studio.name}
                      </Typography>
                    </Box>
                  </Box>
                </a>
              </Link>
            </Box>
          ))}
      </Box>
    </Layout>
  );
}
