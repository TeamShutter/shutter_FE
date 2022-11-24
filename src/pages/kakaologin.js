import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { API_URL } from "../config";

export default function Kakaologin() {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  const loginHandler = useCallback(
    async (code) => {
      // 백엔드에 전송
      const response = await fetch(
        `${API_URL}/accounts/kakao/login/callback?code=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const header = response.headers;
      console.log(response);
      console.log(header);
      // response.setHeader(
      //   "Set-Cookie",
      //   header
      //     .get("set-cookie")
      //     .split(",")
      //     .map((v) => v.trimStart())
      // );
      // const header = response.headers;
      // response.setHeader(
      //   "Set-Cookie",
      //   header
      //     .get("set-cookie")
      //     .split(",")
      //     .map((v) => v.trimStart())
      // );
      // .then((data) => {
      //   localStorage.setItem("access_token", data.access_token);
      //   router.push("/");
      // });
    },
    [router]
  );

  useEffect(() => {
    if (authCode) {
      loginHandler(authCode);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push("/notifications/authentication-failed");
    }
  }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
}
