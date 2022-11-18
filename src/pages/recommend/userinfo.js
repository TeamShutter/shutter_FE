import { Box, Button, ButtonGroup, Slide, Typography } from "@mui/material";
import Head from "next/head";
import Layout from "../../layouts/Layout";
import { useState } from "react";

export default function Usertest() {
  const [checked, setChecked] = useState({ 1: true, 2: false });

  const handleQ = (e) => {
    const QNum = Number(e.target.id);
    setChecked({ ...checked, [QNum]: false, [QNum + 1]: true });
  };
  const genderButtons = [
    <Button key="female">여성</Button>,
    <Button key="male">남성</Button>,
  ];
  const ageButtons = [
    <Button key="10">10대</Button>,
    <Button key="20">20대</Button>,
    <Button key="30">30대</Button>,
    <Button key="40">40대</Button>,
    <Button key="50">50대</Button>,
  ];
  return (
    <Layout>
      <Head>
        <title>사진관 추천 | Shutter</title>
      </Head>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Slide direction="up" in={checked[1]} mountOnEnter unmountOnExit>
          <Box sx={{ height: "450px" }}>
            <Typography>1. 성별</Typography>
            <ButtonGroup orientation="vertical">{genderButtons}</ButtonGroup>
            <Button id="1" onClick={handleQ}>
              확인
            </Button>
          </Box>
        </Slide>
        <Slide direction="down" in={checked[2]} mountOnEnter unmountOnExit>
          <Box>
            <Typography>2. 나이</Typography>
            <ButtonGroup orientation="vertical">{ageButtons}</ButtonGroup>
            <Button id="2" onClick={handleQ}>
              확인
            </Button>
          </Box>
        </Slide>
      </Box>
    </Layout>
  );
}
