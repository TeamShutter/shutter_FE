import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { kakaologin, loaduser } from "../actions/auth";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../actions/types";
import { API_URL } from "../config";

export default function Kakaologin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { code: code, error: kakaoServerError } = router.query;

  useEffect(() => {
    if (code) {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(kakaologin(code));
      }
      // loginHandler(code);

      // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
    } else if (kakaoServerError) {
      router.push("/notifications/authentication-failed");
    }
  }, [code, kakaoServerError, router]);

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
  }

  return <h2>로그인 중입니다..</h2>;
}

// export default function Kakaologin() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { code: authCode, error: kakaoServerError } = router.query;

//   const loginHandler = useCallback(
//     async (code) => {
//       // 백엔드에 전송
//       const response = await fetch(
//         `${API_URL}/accounts/kakao/login/callback?code=${code}`,
//         {
//           method: "GET",
//           headers: {
//             "Accept": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       const data = await response.json();
//       console.log("RES : ", response);
//       const header = response.headers;
//       console.log("header : ", header);
//       console.log("cookie : ", header.get("set-cookie"));
//       console.log("data : ", data);
//       if (header.status === 200) {
//         res.setHeader(
//           "Set-Cookie",
//           header
//             .get("set-cookie")
//             .split(",")
//             .map((v) => v.trimStart())
//         );
//       }
//     },
//     [router]
//   );

//   useEffect(() => {
//     if (authCode) {
//       loginHandler(authCode);

//       // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
//     } else if (kakaoServerError) {
//       router.push("/notifications/authentication-failed");
//     }
//   }, [loginHandler, authCode, kakaoServerError, router]);

//   return <h2>로그인 중입니다..</h2>;
// }
