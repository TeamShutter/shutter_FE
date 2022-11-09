import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import { GetTowns } from "../fetcher/fetcher";
import { useState } from "react";

const TownChip = styled(Chip)({
  width: "23%",
  minWidth: "90px",
  marginBottom: "8px",
});

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
      // <Accordion
      //   expanded={expanded}
      //   sx={{
      //     boxShadow: "none",
      //     border: "none",
      //     ":before": {
      //       backgroundColor: "rgba(0,0,0,0)",
      //     },
      //   }}
      // >
      <>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {towns.map((t) => (
              <TownChip
                className="town-select-btn"
                key={t}
                onClick={handleChangeTown}
                label={t}
                color={town === t ? "primary" : "default"}
                clickable
              />
            ))}
          </Box>
        </AccordionDetails>
        {/* </Accordion> */}
      </>
    )
  );
}
