import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { GetTags } from "../fetcher/fetcher";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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

  const handleTagInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchedTags = tags.filter((tag) =>
        tag.name.includes(e.target.value)
      );
      if (tagList.includes(searchedTags[0]) === false) {
        setTagList((prev) => [...prev, searchedTags[0]]);
        setTagSearchInput("");
      }
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
          sx={{ width: { md: "300px", xs: "90%" }, mb: "10px" }}
          value={tagSearchInput}
          onChange={(e) => setTagSearchInput(e.target.value)}
          onKeyPress={handleTagInputKeyPress}
        />
        {/* <Box>
          <KeyboardArrowLeftIcon fontSize="small" />
          <Box sx={{ ml: "10px", mr: "15px" }}> */}
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
                className="hashtag"
                onClick={handleChangeTown}
                color={tagList.includes(t) ? "hashtag" : "primary"}
              >
                {"#" + t.name}
              </Button>
            ) : null
          )}
        </Box>
        {/* </Box>
          <KeyboardArrowRightIcon fontSize="small" />
        </Box> */}
      </>
    )
  );
}
