import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectedFilter({
  town,
  setTown,
  price,
  setPrice,
  tagList,
  setTagList,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);

  const handleDelete = (e) => {
    const filterDeleted = e.target.parentNode.parentNode.children[0].innerText;
    if (town === filterDeleted) {
      setTown("");
    } else if (
      filterDeleted.includes("~") ||
      filterDeleted.includes("이하") ||
      filterDeleted.includes("이상")
    ) {
      setPrice({ minPrice: "", maxPrice: "" });
    } else {
      setTagList((prev) => prev.filter((tag) => tag.name !== filterDeleted));
    }
  };

  useEffect(() => {
    setSelectedFilter([]);
    if (town) {
      setSelectedFilter((prev) => [...prev, town]);
    }
    if (price.minPrice || price.maxPrice) {
      if (!price.minPrice) {
        setSelectedFilter((prev) => [...prev, `${price.maxPrice}원 이하`]);
      } else if (!price.maxPrice) {
        setSelectedFilter((prev) => [...prev, `${price.minPrice}원 이상`]);
      } else {
        setSelectedFilter((prev) => [
          ...prev,
          `${price.minPrice}원 ~ ${price.maxPrice}원`,
        ]);
      }
    }
    if (tagList.length > 0) {
      tagList.map((tag) => {
        setSelectedFilter((prev) => [...prev, tag.name]);
      });
    }
  }, [town, price, tagList]);

  return (
    selectedFilter.length > 0 && (
      <Box
        sx={{
          display: "inline-block",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          width: "100%",
          mr: "15px",
          ml: "15px",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        {selectedFilter.map((s) => (
          <Chip
            sx={{ bgcolor: "hashtag.main", mr: "10px" }}
            key={s}
            onDelete={handleDelete}
            label={s}
          />
        ))}
      </Box>
    )
  );
}