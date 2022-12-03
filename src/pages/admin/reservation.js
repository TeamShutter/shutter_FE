import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  GetAdminReservations,
  GetStudios,
} from "../../components/fetcher/fetcher";
import Layout from "../../layouts/Layout";

export default function adminReservation() {
  const {
    adminReservationsData,
    adminReservationsDataLoading,
    adminReservationsDataError,
  } = GetAdminReservations();
  //   const studiosData = GetStudios();

  //   const studios = studiosData.studios?.data;
  //   const studiosLoading = studiosData.studiosLoading;
  //   const studiosError = studiosData.studiosError;

  const adminReservations = adminReservationsData?.data;
  const [users, setUsers] = useState([]);
  const [reservationState, setReservationState] = useState({});
  const [state, setState] = useState(0);
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
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (adminReservations) {
      adminReservations.map((r) => {
        setUsers((prev) => [...prev, r.user]);
        setReservationState((prev) => ({ ...prev, [r.id]: r.state }));
      });
      setUsers((prev) =>
        prev.filter((v, i, arr) => {
          return arr.findIndex((item) => item.id === v.id) === i;
        })
      );
    }
  }, [adminReservations]);
  console.log(adminReservations);
  console.log(users);
  console.log(reservationState);
  return (
    <Layout>
      <Box>
        {users.map((u, i) => (
          <Box key={i}>
            <Typography>유저: {u.username}</Typography>
            {adminReservations
              .filter((r) => r.user.id === u.id)
              .map((r) => (
                <Box key={r.id}>
                  <Box>
                    <Typography>
                      스튜디오 : {r.assigned_time.opened_time.studio.name}
                    </Typography>
                    <Typography>
                      예약 시간 : {r.assigned_time.opened_time.date}{" "}
                      {r.assigned_time.opened_time.hour}시{" "}
                      {r.assigned_time.opened_time.minute}분
                    </Typography>
                    <Typography>
                      상품 정보: {r.product.name} / 가격: {r.product.price}
                    </Typography>
                  </Box>

                  <Box>
                    <Select
                      value={reservationState[r.id]}
                      onChange={(e) => handleChange(e, r.id)}
                    >
                      <MenuItem value={1}>예약전</MenuItem>
                      <MenuItem value={2}>예약완료</MenuItem>
                      <MenuItem value={3}>예약취소</MenuItem>
                      <MenuItem value={4}>입금완료</MenuItem>
                      <MenuItem value={5}>예약반려</MenuItem>
                    </Select>
                    <Button onClick={() => postStateChange(r.id)}>확인</Button>
                  </Box>
                </Box>
              ))}
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
