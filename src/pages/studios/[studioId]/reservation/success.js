import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import Layout from "../../../../layouts/Layout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Link from "next/link";

export default function Success() {
  return (
    <Layout>
      <Head>
        <title>사진관 예약 | Shutter</title>
      </Head>
      <Box sx={{ height: "60vh" }}>
        <Box
          sx={{
            mt: 20,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon
            color="hashtag"
            sx={{ width: "20%", height: "20%", mb: "10px" }}
          />
          <Typography sx={{ fontSize: "35px", fontWeight: "900", mb: 30 }}>
            예약 신청 완료!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: 6,
            }}
          >
            <Link href={`/profile`}>
              <Button variant="contained">예약신청내역 확인</Button>
            </Link>
            <Link href={`/`}>
              <Button variant="contained">홈페이지 가기</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
