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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../actions/auth";
import Layout from "../layouts/Layout";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const signup_success = useSelector((state) => state.auth.signup_success);
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    checked: false,
  });

  const {
    first_name,
    last_name,
    username,
    email,
    password,
    re_password,
    checked,
  } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 동의 체크
  // const handleAgree = (event) => {
  //     setChecked(event.target.checked);
  // };

  // form 전송
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dispatch && dispatch !== null && dispatch !== undefined) {
      dispatch(
        signup(email, first_name, last_name, username, password, re_password)
      );
    }
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
  }
  if (signup_success) {
    router.push("/login");
  }

  return (
    <Layout>
      <Head>
        <title>Sign up | Shutter</title>
      </Head>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <FormControl component="fieldset" variant="standard">
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
                autoFocus
                fullWidth
                type="last_name"
                id="last_name"
                name="last_name"
                label="성"
              />
            </Grid>
            {/* <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="sex"
                    id="sex"
                    name="sex"
                    label="성별"
                  />
                </Grid> */}
            {/* <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="town"
                    id="town"
                    name="town"
                    label="동네 - '구' 단위로 적어주세요 ex) 관악구"
                  />
                </Grid> */}
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
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                type="password"
                id="re_password"
                name="re_password"
                label="비밀번호 재입력"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="checked"
                    onChange={handleChange}
                    color="primary"
                  />
                }
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
    </Layout>
  );
}
