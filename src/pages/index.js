import Head from "next/head";
import { GetTags } from "../components/fetcher/fetcher";
import { AccordionSummary, Box, Chip, Typography } from "@mui/material";
import { useState } from "react";
import PhotoList from "../components/photos/PhotoList";
import FilterContainer from "../components/filters/FilterContainer";
import FilterTags from "../components/filters/FilterTags";
import Layout from "../layouts/Layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TownSelector from "../components/filters/TownSelector";
import PriceSelector from "../components/filters/PriceSelector";

export default function Home() {
  // const classes = useStyles();

  const [town, setTown] = useState("");

  const [price, setPrice] = useState({ minPrice: 0, maxPrice: 0 });
  const [expanded, setExpanded] = useState(true);

  const [photoshop, setPhotoshop] = useState(0);
  const [sex, setSex] = useState(0);
  // const [page, setPage] = useState(1);
  const [tagList, setTagList] = useState([]);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            width: "200px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography onClick={() => setExpanded((prev) => !prev)}>
              동네별로 보기
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography onClick={() => setExpanded((prev) => !prev)}>
              가격별로 보기
            </Typography>
          </Box>
        </AccordionSummary>
      </Box>
      <Box>
        <TownSelector town={town} setTown={setTown} />
        <PriceSelector price={price} setPrice={setPrice} />
      </Box>
      {/* <FilterContainer setPrice={setPrice} setPhotoshop={setPhotoshop} setSex={setSex} /> */}

      {/* <FilterTags tagList={tagList} setTagList={setTagList} tags={tags} /> */}

      {/* <PhotoList price={price} photoshop={photoshop} sex={sex} tags={tagList} />  */}
      <PhotoList town={town} price={price} />

      {/* <Pagination sx={{display:"flex", justifyContent:"center"}} onChange={changePage} count={2} />  */}
    </Layout>
  );
}
