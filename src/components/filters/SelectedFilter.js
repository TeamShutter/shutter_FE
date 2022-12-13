import { Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import {
  defaultColorList,
  defaultPhotoTypeList,
  defaultColorListTest,
} from "../../data";
import CircleIcon from "@mui/icons-material/Circle";

export default function SelectedFilter({
  town,
  setTown,
  price,
  setPrice,
  tagList,
  setTagList,
  color,
  setColor,
  photoType,
  setPhotoType,
}) {
  const [selectedFilter, setSelectedFilter] = useState([]);
  selectedFilter.map((s) => {
    defaultColorListTest.filter((c) => c.name === s).length > 0
      ? console.log(s)
      : null;
  });

  const handleDelete = (e) => {
    const filterDeleted = e.target.parentNode.parentNode.children[0].innerText;

    if (town === filterDeleted) {
      setTown("");
    } else if (
      filterDeleted !== undefined &&
      (filterDeleted.includes("~") ||
        filterDeleted.includes("이하") ||
        filterDeleted.includes("이상"))
    ) {
      setPrice({ minPrice: "", maxPrice: "" });
    } else if (
      // color === defaultColorList.find((c) => c.name === filterDeleted)?.id
      color ===
      defaultColorListTest.find(
        (c) => c.name === e.target.parentNode.parentNode.id
      )?.id
    ) {
      setColor("");
    } else if (
      photoType ===
      defaultPhotoTypeList.find((p) => p.name === filterDeleted)?.id
    ) {
      setPhotoType("");
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
      // const colorName = defaultColorList.find((c) => c.id === color).name;
      const colorName = defaultColorListTest.find((c) => c.id === color).name;
      setSelectedFilter((prev) => [...prev, colorName]);
    }
    if (photoType) {
      const photoTypeName = defaultPhotoTypeList.find(
        (p) => p.id === photoType
      ).name;
      setSelectedFilter((prev) => [...prev, photoTypeName]);
    }
    if (tagList.length > 0) {
      tagList.map((tag) => {
        setSelectedFilter((prev) => [...prev, tag.name]);
      });
    }
  }, [town, price, tagList, color, photoType]);

  return (
    selectedFilter.length > 0 && (
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll",
          flexWrap: "nowrap",
          width: "100%",
          "&::-webkit-scrollbar": {
            width: 0,
            height: 0,
          },
        }}
      >
        {selectedFilter.map((s) => (
          <Chip
            sx={{ mr: "10px", flex: "0 0 auto", color: s }}
            color="hashtag"
            variant="filled"
            key={s}
            onDelete={handleDelete}
            // label={s}
            label={
              defaultColorListTest.filter((c) => c.name === s).length > 0
                ? null
                : s
            }
            icon={
              defaultColorListTest.filter((c) => c.name === s).length > 0 ? (
                <CircleIcon />
              ) : null
            }
            id={
              defaultColorListTest.filter((c) => c.name === s).length > 0
                ? s
                : null
            }
          />
        ))}
      </Box>
    )
  );
}
