import { Box, Chip } from "@mui/material";
import { defaultColorList } from "../../data";
// import { GetColors } from "../fetcher/fetcher";

export default function ColorSelector({ color, setColor }) {
  const handleChangeColor = (e) => {
    const newColor = defaultColorList.find(
      (c) => c.name === e.target.innerText
    ).id;
    if (newColor === color) {
      setColor("");
    } else {
      setColor(newColor);
    }
  };

  return (
    <Box
      sx={{
        pt: "15px",
        pb: "10px",
        ml: "10px",
        mr: "10px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {defaultColorList.map((c) => (
        <Chip
          sx={{
            width: "23%",
            minWidth: "45px",
            marginBottom: "8px",
            ":hover": {
              backgroundColor: "hashtag.main",
              color: "white",
            },
          }}
          size="medium"
          key={c.id}
          className="filter_btn color_btn"
          onClick={handleChangeColor}
          label={c.name}
          color={color === c.id ? "hashtag" : "default"}
          clickable
        />
      ))}
    </Box>
  );
}
