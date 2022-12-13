// import Head from "next/head";
// import { GetTags } from "../components/fetcher/fetcher";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import PhotoList from "../components/photos/PhotoList";

import Layout from "../layouts/Layout";

import TownSelector from "../components/filters/TownSelector";
import PriceSelector from "../components/filters/PriceSelector";
import TagSelector from "../components/filters/TagSelector";
import SelectedFilter from "../components/filters/SelectedFilter";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ColorSelector from "../components/filters/ColorSelector";
import PhotoTypeSelector from "../components/filters/PhotoTypeSelector";

import { defaultFilters } from "../data";
import Link from "next/link";

export default function Index() {
  const [town, setTown] = useState("");

  const [price, setPrice] = useState({ minPrice: "", maxPrice: "" });
  const [expanded, setExpanded] = useState("");

  const [tagList, setTagList] = useState([]);
  const [color, setColor] = useState("");
  const [photoType, setPhotoType] = useState("");

  const expandFilterDetail = (e) => {
    if (expanded === e.target.id) {
      setExpanded("");
    } else {
      setExpanded(e.target.id);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          mb: 7,
        }}
      >
        <img src="/static/logo_long.png" alt="Shutter Logo" width={300} />
      </Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10px",
            mb: 5,
          }}
        >
          <Typography variant="h6">원하는 사진관 찾기가 어렵다면?</Typography>
          <Link href={`/recommend`}>
            <Button id="recommend_from_main" size="small" variant="contained">
              스튜디오 추천받으러 가기
            </Button>
          </Link>
        </Box>
        <TagSelector tagList={tagList} setTagList={setTagList} />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          flexWrap: "nowrap",
          height: "40px",
          width: "100%",
          columnGap: "20px",
          justifyContent: { md: "center", xs: "start" },
          mt: "15px",
          mb: "10px",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        {defaultFilters.map((filter) => (
          <Button
            sx={{
              flex: "0 0 auto",
              ":hover": {
                backgroundColor: "hashtag.main",
                color: "white",
                borderColor: "hashtag.main",
                zIndex: 10,
              },
            }}
            color={expanded === filter.name ? "hashtag" : "primary"}
            key={filter.id}
            variant={expanded === filter.name ? "contained" : "outlined"}
            id={filter.name}
            onClick={expandFilterDetail}
            endIcon={
              expanded === filter.name ? (
                <ExpandLessIcon id={filter.name} />
              ) : (
                <ExpandMoreIcon id={filter.name} />
              )
            }
          >
            {filter.name}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Box sx={{ bgcolor: "blank.main", mb: "15px" }}>
        {expanded === "" ? null : expanded === "동네" ? (
          <TownSelector town={town} setTown={setTown} />
        ) : expanded === "가격" ? (
          <PriceSelector price={price} setPrice={setPrice} />
        ) : expanded === "색감" ? (
          <ColorSelector color={color} setColor={setColor} />
        ) : (
          <PhotoTypeSelector
            photoType={photoType}
            setPhotoType={setPhotoType}
          />
        )}
      </Box>
      <Box sx={{ mt: "10px" }}>
        <SelectedFilter
          town={town}
          setTown={setTown}
          price={price}
          setPrice={setPrice}
          tagList={tagList}
          setTagList={setTagList}
          color={color}
          setColor={setColor}
          photoType={photoType}
          setPhotoType={setPhotoType}
        />
      </Box>
      {/* <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} /> */}

      {/* <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} /> */}

      {/* <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />  */}
      <PhotoList
        town={town}
        price={price}
        tagList={tagList}
        color={color}
        photoType={photoType}
      />

      {/* <Pagination sx={{display:"flex", justifyContent:"center"}} onChange={changePage} count={2} />  */}
    </Layout>
  );
}
