import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { GetSearch } from "../../components/fetcher/fetcher";

export default function Search() {
    const searchData = GetSearch();
    const search = searchData.search
    const searchLoading = searchData.searchLoading;
    const searchError = searchData.searchError;

    if(searchLoading) return <div>Loading...</div>
    if(searchError) return <div>Error!!</div>

    return (
        <Box>
            <Container>
                <Autocomplete
                  id="free-solo-demo"
                  freeSolo
                  options={search.map((option) => option.name)}
                  renderInput={(params) => <TextField {...params} label="Search" />}
                />
            </Container>
        </Box>
    );
  }