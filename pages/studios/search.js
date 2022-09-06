import {
  Autocomplete,
  Box,
  Container,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GetSearch } from "../../components/fetcher/fetcher";
import SearchIcon from "@mui/icons-material/Search";
import StudioInfo from "../../components/studios/StudioInfo";
import Link from "next/link";
import StudioCarousel from "../../components/studios/StudioCarousel";

export default function Search() {
  const [q, setQ] = useState("");
  const searchData = GetSearch(q);
  const search = searchData.search;
  const searchLoading = searchData.searchLoading;
  const searchError = searchData.searchError;

 
  const onKeyPress = (event) => {
    if (event.key == "Enter"){
        const w = event.target.value;
        setQ(w)
    }
  }

  const handleChange = (event) => {
    const x = event.target.value;
    setQ(x);
  }

  if (searchLoading) return <div>Loading...</div>;
  if (searchError) return <div>Error!!</div>;

  return search && (
    <>
      <Box component="main">
        <Container maxWidth="lg">
          <Autocomplete
            sx={{ width: "300px", margin: "auto" }}
            id="free-solo-demo"
            freeSolo
            options={search.map((option) => option.name)}
            renderInput={(params) => (
              <Box>
                <TextField
                  onKeyPress={onKeyPress}
                  onChange={handleChange}
                  sx={{ margin: "auto", width: "100%" }}
                  {...params}
                  label="Search"
                />
                <Box >
                    <SearchIcon />
                </Box>
              </Box>
            )}
          />
        </Container>
      </Box>
      
      <Box>
        <Container>
          <Box>
            {search.map((studio, i) => (
              <Box key={i} sx={{ mb: 10 }}>
                <StudioCarousel studio={studio} />
                <Link href={`/studios/${studio.id}`}>
                  <a>
                    <div
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography variant="h5" fontWeight="bold">
                        {studio.name}
                        <Rating
                          name="read-only"
                          value={4.5}
                          precision={0.5}
                          readOnly
                        />
                      </Typography>

                      <StudioInfo studio={studio} />
                    </div>
                  </a>
                </Link>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
