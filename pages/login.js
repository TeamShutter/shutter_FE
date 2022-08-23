import { Box, Button,  Checkbox,  Container, FormControl, FormControlLabel, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import Layout from "../layouts/Layout";

export default function Login() {
  const router = useRouter();
  const auth = useAuth();
  const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:8000"
  : "http://54.180.88.193:8000"

    const [checked, setChecked] = useState(false);

    // form 전송
    const handleSubmit = async (e) => {
      
      e.preventDefault();

      const username = e.target.username.value;
      const password = e.target.password.value;
      auth.login(username, password);
    //   const formData = {
    //     username: e.target.username.value,
    //     password: e.target.password.value,
    // }

    // fetch(`${BASE_URL}/accounts/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(formData),
    // });
    // router.push("/");
    
    
  };


    return (
       <Layout>
         <Head>
           <title>Login | Shutter</title>
         </Head>  

         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
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

       </Layout>
    )
}