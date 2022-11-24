import { Box, Button, ButtonGroup, Slide, Typography } from "@mui/material";
import Head from "next/head";
import Layout from "../../layouts/Layout";
import { useEffect, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { defaultColorList, defaultPhotoTypeList } from "../../data";
import { GetTags, GetTowns } from "../../components/fetcher/fetcher";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Userinfo() {
  // const [state, setState] = useState(true);
  // const ref1 = useRef(null);
  // const ref2 = useRef(null);
  // const nodeRef = state ? ref1 : ref2;
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  const [checked, setChecked] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [townList, setTownList] = useState([]);
  const [photoTypeList, setPhotoTypeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [tagList, setTagList] = useState([]);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  const townsData = GetTowns();
  const tagsData = GetTags();

  const towns = townsData.towns?.data;
  const townsLoading = townsData.townsLoading;
  const townsError = townsData.townsError;

  const tags = tagsData.tags?.data;
  const tagsLoading = tagsData.tagsLoading;
  const tagsError = tagsData.tagsError;

  if (townsLoading || tagsLoading) return <div>Loading...</div>;
  if (townsError || tagsError) return <div>Error!!</div>;

  const handleQ = (e) => {
    const QDirection = e.target.id.substring(2).trim();
    const QNum = Number(e.target.id.substring(0, 1));
    if (QDirection === "next") {
      if (QNum === 1 && sex.length === 0) {
        alert("성별을 선택하여야 합니다!");
      } else if (QNum === 2 && age.length === 0) {
        alert("나이를 선택하여야 합니다!");
      } else if (QNum === 3 && photoTypeList.length === 0) {
        alert("사진 종류를 1개 이상 선택하여야 합니다!");
      } else if (QNum === 4 && townList.length === 0) {
        alert("지역을 1개 이상 선택하여야 합니다!");
      } else if (QNum === 5 && colorList.length === 0) {
        alert("색감을 1개 이상 선택하여야 합니다!");
      } else {
        setChecked({ ...checked, [QNum]: false, [QNum + 1]: true });
      }
    } else if (QDirection === "before") {
      setChecked({ ...checked, [QNum]: false, [QNum - 1]: true });
    }
  };

  const handleChangePhotoType = (e) => {
    const newPhotoType = defaultPhotoTypeList.find(
      (photoType) => photoType.name === e.target.innerText
    );
    if (photoTypeList.includes(newPhotoType.name)) {
      setPhotoTypeList((prev) =>
        prev.filter((photoType) => photoType !== newPhotoType.name)
      );
    } else {
      setPhotoTypeList((prev) => [...prev, newPhotoType.name]);
    }
  };

  const handleChangeTown = (e) => {
    const newTown = towns.find((town) => town === e.target.innerText);
    if (townList.includes(newTown)) {
      setTownList((prev) => prev.filter((town) => town !== newTown));
    } else {
      setTownList((prev) => [...prev, newTown]);
    }
  };

  const handleChangeColor = (e) => {
    const newColor = defaultColorList.find(
      (color) => color.name === e.target.innerText
    );
    if (colorList.includes(newColor.name)) {
      setColorList((prev) => prev.filter((color) => color !== newColor.name));
    } else {
      setColorList((prev) => [...prev, newColor.name]);
    }
  };

  const handleChangeTag = (e) => {
    const newTag = tags.find(
      (tag) => tag.name === e.target.innerText.substring(1).trim()
    );
    if (tagList.includes(newTag.name)) {
      setTagList((prev) => prev.filter((tag) => tag !== newTag.name));
    } else {
      setTagList((prev) => [...prev, newTag.name]);
    }
  };

  const handleSubmit = (e) => {
    if (tagList.length === 0) {
      alert("분위기 태그를 1개 이상 선택하여야 합니다!");
    } else {
    }
  };

  return (
    <Layout>
      <Head>
        <title>사진관 추천 | Shutter</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: "5%",
          mr: "5%",
          width: "90%",
        }}
      >
        <Slide direction="up" in={checked[1]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">1. 성별을 알려주세요!</Typography>
            <Typography>성별에 알맞는 추천을 위해 필요합니다 ^^</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                width: "20%",
              }}
            >
              <Button
                onClick={(e) => setSex(e.target.id)}
                id="female"
                name="sex"
                variant={sex === "female" ? "contained" : "outlined"}
                color={sex === "female" ? "hashtag" : "primary"}
              >
                여성
              </Button>
              <Button
                onClick={(e) => setSex(e.target.id)}
                id="male"
                name="sex"
                variant={sex === "male" ? "contained" : "outlined"}
                color={sex === "male" ? "hashtag" : "primary"}
              >
                남성
              </Button>
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="1 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[2]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">2. 나이를 알려주세요!</Typography>
            <Typography>내 또래들이 좋아하는 사진관을 추천해드려요</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                width: "40%",
              }}
            >
              <Button
                onClick={(e) =>
                  setAge(e.target.innerText.substring(0, 2).trim())
                }
                key="10"
                name="age"
                variant={age === "10" ? "contained" : "outlined"}
                color={age === "10" ? "hashtag" : "primary"}
              >
                10대
              </Button>
              <Button
                onClick={(e) =>
                  setAge(e.target.innerText.substring(0, 2).trim())
                }
                key="20"
                name="age"
                variant={age === "20" ? "contained" : "outlined"}
                color={age === "20" ? "hashtag" : "primary"}
              >
                20대
              </Button>
              <Button
                onClick={(e) =>
                  setAge(e.target.innerText.substring(0, 2).trim())
                }
                key="30"
                name="age"
                variant={age === "30" ? "contained" : "outlined"}
                color={age === "30" ? "hashtag" : "primary"}
              >
                30대
              </Button>
              <Button
                onClick={(e) =>
                  setAge(e.target.innerText.substring(0, 2).trim())
                }
                key="40"
                name="age"
                variant={age === "40" ? "contained" : "outlined"}
                color={age === "40" ? "hashtag" : "primary"}
              >
                40대
              </Button>
              <Button
                onClick={(e) =>
                  setAge(e.target.innerText.substring(0, 2).trim())
                }
                key="50"
                name="age"
                variant={age === "50" ? "contained" : "outlined"}
                color={age === "50" ? "hashtag" : "primary"}
              >
                50대
              </Button>
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="2 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="2 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[3]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">3. 무슨 사진 찍고 싶어요?</Typography>
            <Typography>찍고 싶으신 사진의 종류를 전부 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                width: "50%",
              }}
            >
              {defaultPhotoTypeList.map((photoType) => (
                <Button
                  onClick={handleChangePhotoType}
                  key={photoType.id}
                  name="photoType"
                  variant={
                    photoTypeList.includes(photoType.name)
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    photoTypeList.includes(photoType.name)
                      ? "hashtag"
                      : "primary"
                  }
                >
                  {photoType.name}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="3 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="3 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[4]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              4.사진관 위치는 어디가 좋으신가요?
            </Typography>
            <Typography>원하시는 스튜디오 위치를 모두 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                rowGap: "10px",
                columnGap: "2%",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {towns.map((town) => (
                <Button
                  variant={townList.includes(town) ? "contained" : "outlined"}
                  color={townList.includes(town) ? "hashtag" : "primary"}
                  onClick={handleChangeTown}
                  key={town}
                  name="town"
                  sx={{ width: "30%", minWidth: "50px" }}
                >
                  {town}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="4 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="4 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[5]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              5.어떤 색감의 사진을 찍고 싶으신가요?
            </Typography>
            <Typography>원하시는 사진의 색감을 모두 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
                width: "50%",
              }}
            >
              {defaultColorList.map((color) => (
                <Button
                  variant={
                    colorList.includes(color.name) ? "contained" : "outlined"
                  }
                  color={colorList.includes(color.name) ? "hashtag" : "primary"}
                  onClick={handleChangeColor}
                  key={color.id}
                  name="color"
                >
                  {color.name}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="5 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="5 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[6]} mountOnEnter unmountOnExit>
          <Box
            sx={{
              height: "450px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              6.어떤 분위기의 사진을 찍고 싶으신가요?
            </Typography>
            <Typography>원하는 분위기의 태그를 모두 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "2%",
                rowGap: "10px",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              {tags.map((tag) => (
                <Button
                  variant={
                    tagList.includes(tag.name) ? "contained" : "outlined"
                  }
                  color={tagList.includes(tag.name) ? "hashtag" : "primary"}
                  onClick={handleChangeTag}
                  key={tag.id}
                  name="tag"
                  sx={{ width: "30%", minWidth: "45px" }}
                >
                  #{tag.name}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" id="6 before" onClick={handleQ}>
                이전
              </Button>
              <Link
                href={{
                  pathname: "/recommend/result",
                  query: {
                    sex: sex,
                    age: age,
                    photoType: JSON.stringify(photoTypeList),
                    town: JSON.stringify(townList),
                    color: JSON.stringify(colorList),
                    tag: JSON.stringify(tagList),
                  },
                }}
              >
                <Button variant="contained">제출</Button>
              </Link>
            </Box>
          </Box>
        </Slide>
      </Box>
    </Layout>
  );
}
