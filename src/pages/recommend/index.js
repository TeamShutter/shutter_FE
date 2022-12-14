import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import {
  defaultColorList,
  defaultColorListTest,
  defaultPhotoTypeList,
} from "../../data";
import { GetTags, GetTowns } from "../../components/fetcher/fetcher";
import Link from "next/link";
import { useSelector } from "react-redux";
import AlertModal from "../../components/alert/AlertModal";
import Transition from "../../components/recommend/Transition";
import CircleIcon from "@mui/icons-material/Circle";

export default function Recommend() {
  const user = useSelector((state) => state.auth.user);

  const [checked, setChecked] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });

  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [townList, setTownList] = useState([]);
  const [photoTypeList, setPhotoTypeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [alertDesc, setAlertDesc] = useState("");

  const townsData = GetTowns();
  const tagsData = GetTags();

  const towns = townsData.towns?.data;
  const townsLoading = townsData.townsLoading;
  const townsError = townsData.townsError;

  const tags = tagsData.tags?.data;
  const tagsLoading = tagsData.tagsLoading;
  const tagsError = tagsData.tagsError;

  if (townsLoading || tagsLoading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  if (townsError || tagsError) return <div>Error!!</div>;

  const handleQ = (e) => {
    const QDirection = e.target.id.substring(2).trim();
    const QNum = Number(e.target.id.substring(0, 1));
    if (QDirection === "next") {
      if (QNum === 1 && sex.length === 0) {
        setAlertDesc("성별을");
        setOpen(true);
      } else if (QNum === 2 && age.length === 0) {
        setAlertDesc("나이를");
        setOpen(true);
      } else if (QNum === 3 && photoTypeList.length === 0) {
        setAlertDesc("사진종류를");
        setOpen(true);
      } else if (QNum === 4 && townList.length === 0) {
        setAlertDesc("지역을");
        setOpen(true);
      } else if (QNum === 5 && colorList.length === 0) {
        setAlertDesc("색감을");
        setOpen(true);
      } else {
        setChecked({ ...checked, [QNum]: false, [QNum + 1]: true });
      }
    } else if (QDirection === "before") {
      setChecked({ ...checked, [QNum]: false, [QNum - 1]: true });
    }
  };

  const handleChangePhotoType = (e) => {
    const newPhotoType = defaultPhotoTypeList.find(
      (photoType) => photoType.name === e.target.innerText.trim()
    );
    if (photoTypeList.includes(newPhotoType.id)) {
      setPhotoTypeList((prev) =>
        prev.filter((photoType) => photoType !== newPhotoType.id)
      );
    } else {
      setPhotoTypeList((prev) => [...prev, newPhotoType.id]);
    }
  };

  const handleChangeTown = (e) => {
    const newTown = towns.find((town) => town === e.target.innerText.trim());
    if (townList.includes(newTown)) {
      setTownList((prev) => prev.filter((town) => town !== newTown));
    } else {
      setTownList((prev) => [...prev, newTown]);
    }
  };

  const handleChangeColor = (name) => {
    const newColor = defaultColorListTest.find((color) => color.name === name);
    if (colorList.includes(newColor.id)) {
      setColorList((prev) => prev.filter((color) => color !== newColor.id));
    } else {
      setColorList((prev) => [...prev, newColor.id]);
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

  const selectAll = (e) => {
    const type = e.target.id;

    if (type === "photoType") {
      if (photoTypeList.length === defaultPhotoTypeList.length) {
        setPhotoTypeList([]);
      } else {
        setPhotoTypeList([]);
        defaultPhotoTypeList.map((p) => {
          setPhotoTypeList((prev) => [...prev, p.id]);
        });
      }
    } else if (type === "town") {
      if (townList.length === towns.length) {
        setTownList([]);
      } else {
        setTownList([]);
        towns.map((t) => {
          setTownList((prev) => [...prev, t]);
        });
      }
    } else if (type === "color") {
      if (colorList.length === defaultColorListTest.length) {
        setColorList([]);
      } else {
        setColorList([]);
        defaultColorListTest.map((c) => {
          setColorList((prev) => [...prev, c.id]);
        });
      }
    } else if (type === "tag") {
      if (tagList.length === tags.length) {
        setTagList([]);
      } else {
        setTagList([]);
        tags.map((t) => {
          setTagList((prev) => [...prev, t.name]);
        });
      }
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
          mr: "5%",
          ml: { xs: "0", md: "5%" },
          width: "90%",
          height: "70vh",
        }}
      >
        <Transition in={checked[0]}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">사진관 추천 소개</Typography>
            <Typography>내 마음에 쏙 드는 스튜디오 찾기, 힘드셨죠?</Typography>
            <Typography>
              셔터에서는 자체 개발 AI 기술을 이용해,<br></br>
              {user ? user.username : "고객"}님이 가장 좋아하실 스튜디오를
              추천해드려요!
              <br></br>
              이제 인스타그램에서 헤매지말고, <br></br>
              셔터에서 인생 스튜디오를 추천 받으세요!
            </Typography>
            <Typography>자, 이제 시작해볼까요?</Typography>
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              사진관을 추천받으시기 위해서는 성별, 나이 정보가 필요합니다.
              <br></br>
              모든 정보는 오직 저희의 내부 데이터로만 활용됩니다. 안심하세요!
            </Typography>

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
              <Button variant="contained" id="0 next" onClick={handleQ}>
                추천 받으러가기
              </Button>
            </Box>
          </Box>
        </Transition>
        <Transition in={checked[1]}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">1. 성별을 알려주세요!</Typography>
            <Typography>성별에 알맞는 추천을 위해 필요합니다</Typography>
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
              <Button variant="contained" id="1 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="1 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Transition>
        <Transition in={checked[2]}>
          <Box
            sx={{
              height: "600px",
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
        </Transition>
        <Transition in={checked[3]}>
          <Box
            sx={{
              height: "600px",
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
                    photoTypeList.includes(photoType.id)
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    photoTypeList.includes(photoType.id) ? "hashtag" : "primary"
                  }
                >
                  {photoType.name}
                </Button>
              ))}
              <Button
                variant="contained"
                color="selectall"
                id="photoType"
                onClick={selectAll}
              >
                모두 선택
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
              <Button variant="contained" id="3 before" onClick={handleQ}>
                이전
              </Button>
              <Button variant="contained" id="3 next" onClick={handleQ}>
                다음
              </Button>
            </Box>
          </Box>
        </Transition>
        <Transition in={checked[4]}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              4.사진관 위치는 어디가 좋으세요?
            </Typography>
            <Typography>원하시는 스튜디오 위치를 모두 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                rowGap: "10px",
                columnGap: "2%",
                width: { md: "80%", xs: "100%" },
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
                  sx={{ width: "30%", minWidth: "50px", pl: 0, pr: 0 }}
                >
                  {town}
                </Button>
              ))}
              <Button
                variant="contained"
                color="selectall"
                id="town"
                onClick={selectAll}
                sx={{ width: "30%", minWidth: "50px" }}
              >
                모두 선택
              </Button>
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: { md: "80%", xs: "100%" },
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
        </Transition>
        <Transition in={checked[5]}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              5.어떤 배경 색감을 찾고 계신가요?
            </Typography>
            <Typography>원하시는 사진의 색감을 모두 골라주세요!</Typography>
            {/* <Box
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
                    colorList.includes(color.id) ? "contained" : "outlined"
                  }
                  color={colorList.includes(color.id) ? "hashtag" : "primary"}
                  onClick={handleChangeColor}
                  key={color.id}
                  name="color"
                >
                  {color.name}
                </Button>
              ))}
              <Button
                variant="contained"
                color="selectall"
                id="color"
                onClick={selectAll}
              >
                모두 선택
              </Button>
            </Box> */}
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
              {defaultColorListTest.map((c) => (
                <Button
                  key={c.id}
                  variant={colorList.includes(c.id) ? "contained" : "outlined"}
                  color={colorList.includes(c.id) ? "hashtag" : "primary"}
                  onClick={() => handleChangeColor(c.name)}
                  name="color"
                  sx={{
                    color: c.name,
                    width: "30%",
                    minWidth: "45px",
                    pl: 0,
                    pr: 0,
                  }}
                >
                  <CircleIcon
                    variant="outlined"
                    sx={{
                      stroke: "black",
                      strokeWidth: 0.1,
                      width: "35px",
                      height: "35px",
                    }}
                  />
                </Button>
              ))}
              <Button
                variant="contained"
                color="selectall"
                id="color"
                onClick={selectAll}
                sx={{ width: "30%", minWidth: "45px" }}
              >
                모두 선택
              </Button>
            </Box>
            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                columnGap: "30px",
                width: { md: "85%", xs: "95%" },
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
        </Transition>
        <Transition in={checked[6]}>
          <Box
            sx={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
            }}
          >
            <Typography variant="h5">
              6.어떤 분위기의 사진을 찍고 싶으세요?
            </Typography>
            <Typography>원하는 분위기의 태그를 모두 골라주세요!</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "2%",
                rowGap: "10px",
                width: { md: "80%", xs: "100%" },
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
                  sx={{ width: "30%", minWidth: "45px", pl: 0, pr: 0 }}
                >
                  #{tag.name}
                </Button>
              ))}
              <Button
                variant="contained"
                color="selectall"
                id="tag"
                onClick={selectAll}
                sx={{ width: "30%", minWidth: "45px" }}
              >
                모두 선택
              </Button>
            </Box>

            <Box
              sx={{
                mt: "15px",
                display: "flex",
                flexDirection: "row",
                width: { md: "80%", xs: "95%" },
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
                <Button id="recommend" variant="contained">
                  제출
                </Button>
              </Link>
            </Box>
          </Box>
        </Transition>
      </Box>
      <AlertModal
        open={open}
        title="추천 선택 오류"
        description={alertDesc + " 선택하여야 합니다!"}
        cancelFunc={handleClose}
      />
    </Layout>
  );
}
