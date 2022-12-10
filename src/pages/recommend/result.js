import { Avatar, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetRecommendedStudios } from "../../components/fetcher/fetcher";
import Layout from "../../layouts/Layout";
import { API_URL } from "../../config";
import Link from "next/link";
import RecommendedPhotoList from "../../components/photos/RecommendedPhotoList";
import Head from "next/head";
import { useSelector } from "react-redux";
import StudioCarousel from "../../components/studios/StudioCarousel";

export default function Result() {
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(0);

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
    ?.split("")
    .filter((element, index) => index % 2 !== 0);
  const tagList = tag?.split('"').filter((element, index) => index % 2 !== 0);

  const formData = {
    sex: router.query.sex,
    age: router.query.age,
  };

  // useEffect(async () => {
  //   const res = await fetch(`${API_URL}/studio/recommend/`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",

  //       Authorization: `Bearer ${access_token}`,
  //     },
  //     withCredentials: true,
  //     body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  // }, []);

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
  if (studiosError) return <div>Error!</div>;

  // Post 형식으로 gender랑 age 보냄

  return !studios ? (
    <div>Loading...</div>
  ) : (
    <Layout>
      <Head>
        <title>사진관 추천 | Shutter</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "10px",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "900",
            fontSize: { md: "40px", xs: "30px" },
            alignContent: "end",
          }}
        >
          {user?.username}
        </Typography>
        <Typography
          sx={{
            color: "grey",
            fontWeight: "400",
            fontSize: { md: "30px", xs: "20px" },
          }}
        >
          님에게 가장 추천하는 사진관
        </Typography>
      </Box>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { md: "70%", xs: "100%" },
            height: { md: "70%", xs: "100%" },
            margin: "auto",
          }}
        >
          <StudioCarousel studio={studios[0]} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: "30px", md: "30px" },
              fontWeight: "900",
            }}
          >
            {studios[0].name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 3, width: "100%" }}>
        <RecommendedPhotoList studioId={studios[0].id} />
      </Box>
      <Box
        sx={{ mb: 3, display: "flex", justifyContent: "end", height: "50px" }}
      >
        <Link href={`/studios/${studios[0].id}`}>
          <Button 
          id="recommend_result_studio_btn"
          variant="contained"
          >
            스튜디오 알아보기
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Typography
        sx={{
          color: "grey",
          fontWeight: "400",
          fontSize: { md: "30px", xs: "23px" },
          mt: 2,
          mb: 3,
        }}
      >
        이외에도 추천하는 사진관들
      </Typography>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "row",
          columnGap: 3,
          overflowX: "scroll",
          flexWrap: "nowrap",
          width: "100%",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        {studios
          .filter((studio, i) => i !== 0)
          .map((studio, idx) => (
            <Box
              key={studio.id}
              sx={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                rowGap: 1,
                alignItems: "center",
              }}
            >
              <Avatar
                id={studio.id}
                onClick={(e) => setSelected(Number(e.target.parentNode.id))}
                alt="studio_thumbnail"
                src={studio.studio_images.map((image) => image.url)[0]}
                sx={
                  selected === studio.id
                    ? {
                        border: "3px solid black",
                        width: { md: "100px", xs: "70px" },
                        height: { md: "100px", xs: "70px" },
                      }
                    : {
                        width: { md: "100px", xs: "70px" },
                        height: { md: "100px", xs: "70px" },
                      }
                }
              />
              <Typography
                sx={{ fontWeight: "400", fontSize: { md: "20px", xs: "16px" } }}
              >
                {studio.name}
              </Typography>
            </Box>
          ))}
      </Box>
      <Box>
        {studios
          .filter((s) => s.id === selected)
          .map((s) => (
            <Box key={s.id}>
              <Box sx={{ mb: 3, width: "100%" }}>
                <RecommendedPhotoList studioId={s.id} />
              </Box>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  justifyContent: "end",
                  height: "50px",
                }}
              >
                <Link href={`/studios/${s.id}`}>
                  <Button 
                  variant="contained"
                  className="recommend_related_studio_btn"
                  >
                    스튜디오 알아보기
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
      </Box>
    </Layout>
  );
}
