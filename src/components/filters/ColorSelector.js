import { Box, Chip } from "@mui/material";
import { GetColors } from "../fetcher/fetcher";

export default function ColorSelector({ color, setColor, colorList }) {
  const handleChangeColor = (e) => {
    const newColor = colorList.find((c) => c.name === e.target.innerText).id;
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
      {colorList.map((c) => (
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
          onClick={handleChangeColor}
          label={c.name}
          color={color === c.id ? "hashtag" : "default"}
          clickable
        />
      ))}
    </Box>
  );
}
