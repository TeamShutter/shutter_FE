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
import { useState } from "react";
import { GetTags } from "../fetcher/fetcher";

export default function TagSelector({ tagList, setTagList }) {
  const [tagSearchInput, setTagSearchInput] = useState("");

  const tagsData = GetTags();

  const tags = tagsData.tags?.data;
  const tagsLoading = tagsData.tagsLoading;
  const tagsError = tagsData.tagsError;

  if (tagsLoading) return <div>Loading...</div>;
  if (tagsError) return <div>Error!!</div>;

  const handleChangeTown = (e) => {
    const newTag = tags.find((tag) => tag.name === e.target.innerText.slice(1));
    if (tagList.includes(newTag)) {
      setTagList((prev) => prev.filter((tag) => tag !== newTag));
    } else {
      setTagList((prev) => [...prev, newTag]);
    }
  };

  return (
    tags && (
      <>
        <TextField
          hiddenLabel
          placeholder="찾으시는 사진 키워드를 입력해보세요"
          variant="filled"
          size="small"
          sx={{ width: "300px", mb: "10px" }}
          value={tagSearchInput}
          onChange={(e) => setTagSearchInput(e.target.value)}
        />
        <Box
          sx={{
            display: "inline-block",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            height: "40px",
            width: "100%",
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
        >
          {tags.map((t) =>
            t.name.includes(tagSearchInput) ? (
              <Button
                sx={{
                  ":hover": {
                    color: "hashtag.main",
                  },
                }}
                key={t.id}
                variant="text"
                size="medium"
                onClick={handleChangeTown}
                color={tagList.includes(t) ? "hashtag" : "primary"}
              >
                {"#" + t.name}
              </Button>
            ) : null
          )}
        </Box>
      </>
    )
  );
}
