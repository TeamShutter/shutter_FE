import { Box, Chip } from "@mui/material";
import { defaultColorListTest } from "../../data";
import CircleIcon from "@mui/icons-material/Circle";
// import { GetColors } from "../fetcher/fetcher";

export default function ColorSelector({ color, setColor }) {
  const handleChangeColor = (colorName) => {
    const newColor = defaultColorListTest.find((c) => c.name === colorName).id;
    if (newColor === color) {
      setColor("");
    } else {
      setColor(newColor);
    }
  };

  return (
    // <Box
    //   sx={{
    //     pt: "15px",
    //     pb: "10px",
    //     ml: "10px",
    //     mr: "10px",
    //     display: "flex",
    //     justifyContent: "space-between",
    //     flexWrap: "wrap",
    //   }}
    // >
    //   {defaultColorList.map((c) => (
    //     <Chip
    //       sx={{
    //         width: "23%",
    //         minWidth: "45px",
    //         marginBottom: "8px",
    //         ":hover": {
    //           backgroundColor: "hashtag.main",
    //           color: "white",
    //         },
    //       }}
    //       size="medium"
    //       key={c.id}
    //       className="filter_btn color_btn"
    //       onClick={handleChangeColor}
    //       label={c.name}
    //       color={color === c.id ? "hashtag" : "default"}
    //       clickable
    //     />
    //   ))}
    // </Box>
    <Box
      sx={{
        pt: "15px",
        pb: "10px",
        pl: "10px",
        display: "flex",
        columnGap: "15px",
        overflowX: "scroll",
        flexWrap: "nowrap",
        width: "100%",
        "&::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
      }}
    >
      {defaultColorListTest.map((c) => (
        <Box key={c.id} sx={{ flex: "0 0 auto" }}>
          <CircleIcon
            sx={{ color: c.name, width: "40px", height: "40px" }}
            onClick={() => handleChangeColor(c.name)}
          />
        </Box>
      ))}
    </Box>
  );
}
