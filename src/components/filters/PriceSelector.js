import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AlertModal from "../alert/AlertModal";

export default function PriceSelector({ price, setPrice }) {
  const [minPrice, setMinPrice] = useState(price.minPrice);
  const [maxPrice, setMaxPrice] = useState(price.maxPrice);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handlePrice = () => {
    if (minPrice > maxPrice) {
      setOpen(true);
    } else {
      setPrice({ minPrice: minPrice, maxPrice: maxPrice });
    }
  };

  useEffect(() => {
    setMinPrice(price.minPrice);
    setMaxPrice(price.maxPrice);
  }, [price]);

  return (
    <>
      <Box>
        <Box
          sx={{
            pt: "5px",

            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.maxPrice === 50000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 0, maxPrice: 50000 })}
            className="filter_btn price_btn"
          >
            5만원 이하
          </Button>
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.maxPrice === 100000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 50000, maxPrice: 100000 })}
            className="filter_btn price_btn"
          >
            5만원 ~ 10만원
          </Button>
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.maxPrice === 150000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 100000, maxPrice: 150000 })}
            className="filter_btn price_btn"
          >
            10만원 ~ 15만원
          </Button>
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.maxPrice === 200000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 150000, maxPrice: 200000 })}
            className="filter_btn price_btn"
          >
            15만원 ~ 20만원
          </Button>
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.maxPrice === 250000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 200000, maxPrice: 250000 })}
            className="filter_btn price_btn"
          >
            20만원 ~ 25만원
          </Button>
          <Button
            sx={{
              width: "40%",
              ":hover": {
                color: "hashtag.main",
              },
            }}
            color={price.minPrice === 250000 ? "hashtag" : "primary"}
            onClick={() => setPrice({ minPrice: 250000, maxPrice: "" })}
            className="filter_btn price_btn"
          >
            25만원 이상
          </Button>
        </Box>
        <Box
          sx={{
            mt: "10px",
            pb: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "5px",
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="최저 금액"
            value={minPrice}
            sx={{ bgcolor: "white" }}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <Typography> ~ </Typography>
          <TextField
            size="small"
            id="outlined-basic"
            label="최고 금액"
            value={maxPrice}
            sx={{ bgcolor: "white" }}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <Button
            className="filter_btn price_btn"
            variant="contained"
            onClick={handlePrice}
          >
            적용
          </Button>
        </Box>
      </Box>
      <AlertModal
        open={open}
        title="가격오류"
        description="가격을 잘못 입력하였습니다!"
        cancelFunc={handleClose}
      />
    </>
  );
}
