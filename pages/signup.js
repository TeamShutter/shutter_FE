import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie } from "../components/cookie";

export default function Signup() {
  const router = useRouter();

  const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : "http://15.164.100.14:8000"

    const [checked, setChecked] = useState(false);

    // 동의 체크
    const handleAgree = (event) => {
        setChecked(event.target.checked);
    };

    // form 전송
    const handleSubmit = async (e) => {
      
        e.preventDefault();

        const formData = {
          email: e.target.email.value,
          username: e.target.username.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          sex: e.target.sex.value,
          town: e.target.town.value,
          password: e.target.password.value,
          rePassword: e.target.rePassword.value,
      }

      const res =  await fetch(`${BASE_URL}/accounts/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          body: JSON.stringify(formData),
      });
      const data = await res.json();
  
      setCookie("user", data);
      // router.back();
      window.location.href = '/';
      
      
    };
    
    return (
        <>
      <Head>
        <title>Shutter | Signup</title>
      </Head>


      <Box
        component='main'
      >
        <Container maxWidth="lg">

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="username"
                    id="username"
                    name="username"
                    label="아이디"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="first_name"
                    id="first_name"
                    name="first_name"
                    label="이름"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="last_name"
                    id="last_name"
                    name="last_name"
                    label="성"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="sex"
                    id="sex"
                    name="sex"
                    label="성별"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="town"
                    id="town"
                    name="town"
                    label="동네 - '구' 단위로 적어주세요 ex) 관악구"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  />
                   </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Box>

        </Container>
      </Box>
    </>
    )
}