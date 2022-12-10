import { Box, Button } from "@mui/material";
import Link from "next/link";
import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <Box
        sx={{
          mt: "40px",
          mb: "40px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link href={"/home"}>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              height: "80px",
            }}
          >
            사진관 찾기
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Box
        sx={{
          mt: "40px",
          mb: "40px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link href={"/recommend"}>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              height: "80px",
            }}
          >
            사진관 추천 받기
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}
