import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GetAdminReservations } from "../../components/fetcher/fetcher";
import { defaultReservationState } from "../../data";
import Layout from "../../layouts/Layout";
// import Cookies from "js-cookie";
// import cookie from "cookie";

export default function adminReservation() {
  //   const access_token = Cookies.get("access_token");
  //   const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  //   console.log(Cookies.get());
  //   console.log(access_token);
  const {
    adminReservationsData,
    adminReservationsDataLoading,
    adminReservationsDataError,
  } = GetAdminReservations();
  const adminReservations = adminReservationsData?.data;
  const [users, setUsers] = useState([]);
  const [reservationState, setReservationState] = useState({});
  const [state, setState] = useState(0);
  const [reservatedStudios, setReservatedStudios] = useState([]);
  const handleChange = (e, id) => {
    setState(e.target.value);
    setReservationState({ ...reservationState, [id]: e.target.value });
  };

  const postStateChange = async (id) => {
    try {
      const stateChange = { state: state };
      const res = await fetch(`/api/reservation/admin?reservationId=${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stateChange),
      });
      if (res.status === 200) {
        alert("state 변경 완료!");
      }
    } catch (err) {
      alert("에러!!!!");
    }
  };
  useEffect(() => {
    if (adminReservations) {
      adminReservations.map((r) => {
        setUsers((prev) => [...prev, r.user]);
        setReservationState((prev) => ({ ...prev, [r.id]: r.state }));
        setReservatedStudios((prev) => [
          ...prev,
          { studio: r.assigned_time.opened_time.studio, user: r.user },
        ]);
      });
      setUsers((prev) =>
        prev.filter((v, i, arr) => {
          return arr.findIndex((item) => item.id === v.id) === i;
        })
      );
      setReservatedStudios((prev) =>
        prev.filter((v, i, arr) => {
          return (
            arr.findIndex(
              (item) =>
                item.studio.id === v.studio.id && item.user.id === v.user.id
            ) === i
          );
        })
      );
    }
  }, [adminReservations]);

  return (
    <Layout>
      <Head>
        <title>예약 관리 | Shutter</title>
      </Head>
      <Box>
        {users.map((u, i) => (
          <Box key={i}>
            <Typography variant="h5">유저: {u.username}</Typography>
            <Typography variant="h6">전화번호: {u.phone}</Typography>
            <Box
              sx={{
                width: "100%",
                height: "5px",
                bgcolor: "gray",
                mt: "20px",
              }}
            ></Box>
            {reservatedStudios.map((s, idx) =>
              s.user.id === u.id ? (
                <Box key={idx}>
                  <Typography sx={{ mt: "10px" }} variant="h6">
                    스튜디오 : {s.studio.name}
                  </Typography>
                  {adminReservations
                    .filter(
                      (r) =>
                        r.user.id === u.id &&
                        r.assigned_time.opened_time.studio.id === s.studio.id
                    )
                    .map((r) => (
                      <Box
                        key={r.id}
                        sx={{
                          mt: "15px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2">
                            {r.rank}순위
                          </Typography>
                          <Typography variant="body2">
                            예약 시간 : {r.assigned_time.opened_time.date}{" "}
                            {r.assigned_time.opened_time.hour}시{" "}
                            {r.assigned_time.opened_time.minute}분
                          </Typography>
                          <Typography variant="body2">
                            상품 정보: {r.product.name} / 가격:{" "}
                            {r.product.price}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "10px",
                            height: "40px",
                          }}
                        >
                          <Select
                            sx={{ width: "150px" }}
                            value={reservationState[r.id]}
                            onChange={(e) => handleChange(e, r.id)}
                          >
                            {defaultReservationState.map((s) => (
                              <MenuItem key={s.id} value={s.id}>
                                {s.value}
                              </MenuItem>
                            ))}
                          </Select>
                          <Button
                            variant="contained"
                            onClick={() => postStateChange(r.id)}
                          >
                            확인
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  <Box
                    sx={{
                      width: "100%",
                      height: "3px",
                      bgcolor: "blank.main",
                      mt: "10px",
                    }}
                  ></Box>
                </Box>
              ) : null
            )}

            <Box
              sx={{
                width: "100%",
                height: "10px",
                bgcolor: "black",
                mt: "20px",
                mb: "20px",
              }}
            ></Box>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
