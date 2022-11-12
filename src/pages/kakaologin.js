// import { useRouter } from "next/router";
// import { useCallback, useEffect } from "react";
// import { API_URL } from "../config";

export default function Kakaologin() {
  // const router = useRouter();
  // const { code: authCode, error: kakaoServerError } = router.query;

  // const loginHandler = useCallback(
  //   async (code) => {
  //     // 백엔드에 전송
  //     const response = await fetch(
  //       `${API_URL}/accounts/kakao/login/callback?code=${code}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then((res) => res.json());
  //     if (response.success === True) {
  //       // 성공하면 홈으로 리다이렉트
  //       router.push("/");
  //     } else {
  //       // 실패하면 에러 페이지로 리다이렉트
  //       router.push("/notifications/authentication-failed");
  //     }
  //   },
  //   [router]
  // );

  // useEffect(() => {
  //   if (authCode) {
  //     loginHandler(authCode);

  //     // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
  //   } else if (kakaoServerError) {
  //     router.push("/notifications/authentication-failed");
  //   }
  // }, [loginHandler, authCode, kakaoServerError, router]);

  return <h2>로그인 중입니다..</h2>;
}
