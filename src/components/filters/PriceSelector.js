import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";

export default function PriceSelector({ price, setPrice }) {
  const [expanded, setExpanded] = useState(true);
  const [minPrice, setMinPrice] = useState(price.minPrice);
  const [maxPrice, setMaxPrice] = useState(price.maxPrice);

  const handlePrice = () => {
    if (minPrice > maxPrice) {
      console.log("가격 에러");
    } else {
      setPrice({ minPrice: minPrice, maxPrice: maxPrice });
    }
  };

  //   useEffect(() => {

  //   }, [minPrice, maxPrice])

  return (
    // <Accordion
    //   expanded={expanded}
    //   sx={{
    //     boxShadow: "none",
    //     border: "none",
    //     ":before": {
    //       backgroundColor: "rgba(0,0,0,0)",
    //     },
    //   }}
    // >
    <>
      <AccordionDetails>
        <Box>
          <TextField
            id="outlined-basic"
            label="최저 금액"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="최고 금액"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button variant="contained" onClick={handlePrice}>
            확인
          </Button>
        </Box>
      </AccordionDetails>
    </>
    // </Accordion>
  );
}
