import { Box, Chip } from "@mui/material";
// import { townList } from "../../data";
import { GetTowns } from "../fetcher/fetcher";

export default function TownSelector({ town, setTown }) {
  const townsData = GetTowns();

  const towns = townsData.towns?.data;
  const townsLoading = townsData.townsLoading;
  const townsError = townsData.townsError;

  if (townsLoading) return <div>Loading...</div>;
  if (townsError) return <div>Error!!</div>;

  const handleChangeTown = (e) => {
    const newTown = e.target.innerText;
    if (newTown === town) {
      setTown("");
    } else {
      setTown(e.target.innerText);
    }
  };

  return (
    towns && (
      <Box
        sx={{
          pt: "5px",
          ml: "10px",
          mr: "10px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {towns.map((t) => (
          <Chip
            sx={{
              width: "24%",
              minWidth: "45px",
              marginBottom: "8px",
              ":hover": {
                backgroundColor: "hashtag.main",
                color: "white",
              },
            }}
            size="small"
            key={t}
            className="filter_btn town_btn"
            onClick={handleChangeTown}
            label={t}
            // disabled={towns.includes(t.name) ? false : true}
            color={town === t ? "hashtag" : "default"}
            clickable
          />
        ))}
      </Box>
    )
  );
}
