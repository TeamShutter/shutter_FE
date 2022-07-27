import { Box, Button,  Checkbox,  Container, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

export default function Login() {

    const [checked, setChecked] = useState(false);

    // form 전송
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <>
      <Head>
        <title>Shutter | Login</title>
      </Head>


      <Box
        component='main'
      >
        <Container maxWidth="lg">

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
              <Grid container spacing={2}>
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

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
            </FormControl>
          </Box>

        </Container>
      </Box>
    </>
    )
}