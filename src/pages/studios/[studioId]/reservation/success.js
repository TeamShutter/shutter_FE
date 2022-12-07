import { Box, Typography } from "@mui/material";
import Layout from "../../../../layouts/Layout";

export default function Success() {
  return (
    <Layout>
      <Head>
        <title>사진관 예약 | Shutter</title>
      </Head>
      <Box>
        <Typography>예약이 완료되었습니다!</Typography>
      </Box>
    </Layout>
  );
}
