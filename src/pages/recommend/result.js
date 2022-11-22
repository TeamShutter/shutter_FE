import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetRecommendedStudios } from "../../components/fetcher/fetcher";
import Layout from "../../layouts/Layout";
import { API_URL } from "../../config";

export default function Result() {
  const router = useRouter();
  // const age = router.query.age;
  // const gender = router.query.gender;
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
    gender: router.query.age,
    age: router.query.gender,
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

  return (
    <Layout>
      <Box>성공!</Box>
    </Layout>
  );
}
