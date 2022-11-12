import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectedFilter({
  town,
  setTown,
  price,
  setPrice,
  tagList,
  setTagList,
  color,
  setColor,
  colorList,
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
    } else if (color === colorList.find((c) => c.name === filterDeleted).id) {
      setColor("");
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
    if (color) {
      const colorName = colorList.find((c) => c.id === color).name;
      setSelectedFilter((prev) => [...prev, colorName]);
    }
    if (tagList.length > 0) {
      tagList.map((tag) => {
        setSelectedFilter((prev) => [...prev, tag.name]);
      });
    }
  }, [town, price, tagList, color]);

  return (
    selectedFilter.length > 0 && (
      <Box
        sx={{
          display: "inline-block",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          width: "100%",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        {selectedFilter.map((s) => (
          <Chip
            sx={{ mr: "10px" }}
            color="hashtag"
            variant="filled"
            key={s}
            onDelete={handleDelete}
            label={s}
          />
        ))}
      </Box>
    )
  );
}
