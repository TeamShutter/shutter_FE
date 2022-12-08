import { Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../../layouts/Layout";

export default function ReservationHome() {
  const router = useRouter();
  const { studioId } = router.query;
  return (
    <Layout>
      <Head>
        <title>예약 안내 | Shutter</title>
      </Head>
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          셔터 예약 서비스 안내
        </Typography>
        <Typography sx={{ fontSize: "15px", mb: 3 }}>
          셔터에서 제공하는 예약서비스는 예약 '신청' 서비스입니다. <br></br>
          원하시는 사진작가, 날짜, 시간, 상품을 선택하신 후 '선택하기' 버튼을
          누르시면 장바구니에 담깁니다. <br></br>총 3순위까지 예약 신청할 수
          있으며 1순위부터 3순위 순으로 가능한 날짜가 우선적으로 예약이 진행
          됩니다.<br></br> 예약이 완료되면 입력해주신 전화번호로 예약 성공 및
          입금 안내 메세지가 전송됩니다. 다만, 신청하신 예약이 전부 불가능하다면
          예약 불발 안내 메시지가 가게 됩니다. <br></br> 이후에 다른 날짜에도
          예약을 원하신다면 다시 한번 예약 신청해주시면 됩니다. <br></br>셔터
          서비스에 관심 가져주셔서 정말 감사드리며, 예약을 원하신다면 '예약
          신청하러가기' 버튼을 눌러주세요!
        </Typography>
        <Link href={`/studios/${studioId}/reservation`}>
          <Button variant="contained">예약 신청하러가기</Button>
        </Link>
      </Box>
    </Layout>
  );
}
