import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetRecommendedStudios } from "../../components/fetcher/fetcher";
import Layout from "../../layouts/Layout";
import { API_URL } from "../../config";
import Link from "next/link";
import StudioCarousel from "../../components/studios/StudioCarousel";

export default function Result() {
  const router = useRouter();
  const photoType = router.query.photoType;
  const town = router.query.town;
  const color = router.query.color;
  const tag = router.query.tag;

  const photoTypeList = photoType
    ?.split('"')
    .filter((element, index) => index % 2 !== 0);
  const townList = town?.split('"').filter((element, index) => index % 2 !== 0);
  const colorList = color
    ?.split('"')
    .filter((element, index) => index % 2 !== 0);
  const tagList = tag?.split('"').filter((element, index) => index % 2 !== 0);

  const formData = {
    sex: router.query.sex,
    age: router.query.age,
  };

  useEffect(async () => {
    const res = await fetch(`${API_URL}/studio/recommend/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  }, []);

  const recommendedStudiosData = GetRecommendedStudios(
    photoTypeList,
    townList,
    colorList,
    tagList
  );

  const studios = recommendedStudiosData.studios?.data;
  const studiosLoading = recommendedStudiosData.studiosLoading;
  const studiosError = recommendedStudiosData.studiosError;

  if (studiosLoading) return <div>Loading...</div>;
  if (studiosError) console.log(studiosError);

  // Post 형식으로 gender랑 age 보냄

  return !studios ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <Typography>가장 추천하는 사진관</Typography>
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
      <Typography>이와 연관된 사진관들</Typography>
      <Box
        sx={{
          display: "inline-block",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          height: "40px",
          width: "100%",
          mt: "15px",
          mb: "10px",
          "&::-webkit-scrollbar": {
            // width: 0,
            height: "1px",
          },
        }}
      >
        {studios.map((studio, i) => (
          <Box key={i} sx={{ mb: 10, width: "45%" }}>
            <StudioCarousel studio={studio} />
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
