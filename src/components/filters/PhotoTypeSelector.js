import { Box, Chip } from "@mui/material";
import { defaultPhotoTypeList } from "../../data";
// import { GetColors } from "../fetcher/fetcher";

export default function ColorSelector({ photoType, setPhotoType }) {
  const handleChangePhotoType = (e) => {
    const newPhotoType = defaultPhotoTypeList.find(
      (p) => p.name === e.target.innerText
    ).id;
    if (newPhotoType === photoType) {
      setPhotoType("");
    } else {
      setPhotoType(newPhotoType);
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
      {defaultPhotoTypeList.map((p) => (
        <Chip
          sx={{
            pl: 0,
            pr: 0,
            width: "30%",
            minWidth: "45px",
            marginBottom: "8px",
            ":hover": {
              backgroundColor: "hashtag.main",
              color: "white",
            },
          }}
          size="medium"
          key={p.id}
          className="filter_btn photoType_btn"
          onClick={handleChangePhotoType}
          label={p.name}
          color={photoType === p.id ? "hashtag" : "default"}
          clickable
        />
      ))}
    </Box>
  );
}
