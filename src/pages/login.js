import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layouts/Layout";
import { login, reset_signup_success } from "../actions/auth";
import { KAKAO_AUTH_URL } from "../components/OAuth";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  useEffect(() => {
    if (dispatch && (dispatch !== null) & (dispatch !== undefined)) {
      dispatch(reset_signup_success());
    }
  }, [dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // form 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(login(username, password));
    }
  };
  if (typeof window !== "undefined" && isAuthenticated) {
    router.back();
  }

  const setGoogleLogin = () => {
    console.log("google login");
  };

  return (
    <Layout>
      <Head>
        <title>Login | Shutter</title>
      </Head>

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "100%" }}
      >
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ width: "100%" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
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
                onChange={handleChange}
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
            sx={{ mt: 3 }}
            size="large"
          >
            로그인
          </Button>
        </FormControl>
        <Link href={"/signup"}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large"
          >
            회원가입하러 가기
          </Button>
        </Link>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* <p>SNS 계정 간편 로그인</p> */}
          <Button href={KAKAO_AUTH_URL}>
            <img
              src="/static/kakao_login_medium_narrow.png"
              alt="Shutter Logo"
            />
          </Button>
        </Grid>
      </Box>
    </Layout>
  );
}
