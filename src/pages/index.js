// import Head from "next/head";
// import { GetTags } from "../components/fetcher/fetcher";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import PhotoList from "../components/photos/PhotoList";

import Layout from "../layouts/Layout";

import TownSelector from "../components/filters/TownSelector";
import PriceSelector from "../components/filters/PriceSelector";
import TagSelector from "../components/filters/TagSelector";
import SelectedFilter from "../components/filters/SelectedFilter";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Home() {
  // const classes = useStyles();

  const [town, setTown] = useState("");

  const [price, setPrice] = useState({ minPrice: "", maxPrice: "" });
  const [expanded, setExpanded] = useState("");

  // const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);
  // const [page, setPage] = useState(1);
  const [tagList, setTagList] = useState([]);
  const filters = [
    { id: 1, name: "동네" },
    { id: 2, name: "가격" },
  ];

  const expandFilterDetail = (e) => {
    if (expanded === e.target.id) {
      setExpanded("");
    } else {
      setExpanded(e.target.id);
    }
  };

  // const {tags, tagsLoading, tagsError} = GetTags();

  // const auth = useAuth();

  // if(tagsLoading) return <div>Loading...</div>
  // if(tagsError) return <div>Error!!</div>
  // return tags && (
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          justifyContent: "center",
          mb: 10,
        }}
      >
        <img src="/static/logo_long.png" alt="Shutter Logo" width={300} />
      </Box>
      <Box>
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
          display: "inline-block",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          height: "40px",
          width: "100%",
          mt: "15px",
          mb: "10px",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
        x
      >
        {filters.map((filter) => (
          <Button
            sx={{
              ml: "20px",
              ":hover": {
                backgroundColor: "hashtag.main",
                color: "white",
                borderColor: "hashtag.main",
              },
              // bgcolor: `${expanded === filter.name ? "hashtag.main" : ""}`,
            }}
            color={expanded === filter.name ? "hashtag" : "primary"}
            key={filter.id}
            variant={expanded === filter.name ? "contained" : "outlined"}
            id={filter.name}
            onClick={expandFilterDetail}
            endIcon={
              expanded === filter.name ? <ExpandLessIcon /> : <ExpandMoreIcon />
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
        ) : (
          <PriceSelector price={price} setPrice={setPrice} />
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
        />
      </Box>
      {/* <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} /> */}

      {/* <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} /> */}

      {/* <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />  */}
      <PhotoList town={town} price={price} tagList={tagList} />

      {/* <Pagination sx={{display:"flex", justifyContent:"center"}} onChange={changePage} count={2} />  */}
    </Layout>
  );
}
