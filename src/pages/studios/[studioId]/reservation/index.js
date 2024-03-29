import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Modal,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  GetStudioAssignedTime,
  GetStudioPhotographer,
  GetStudioProduct,
} from "../../../../components/fetcher/fetcher";
import Layout from "../../../../layouts/Layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { defaultReservationNum } from "../../../../data";
import AlertModal from "../../../../components/alert/AlertModal";
import Head from "next/head";

const fillZero = (time) => {
  if (time < 10) {
    const newTime = "0" + time;
    return newTime;
  } else {
    return time;
  }
};

export default function Reservation() {
  const router = useRouter();
  const { studioId } = router.query;

  const {
    studioPhotographersData,
    studioPhotographersDataLoading,
    studioPhotographersDataError,
  } = GetStudioPhotographer(studioId);
  const studioPhotographers = studioPhotographersData?.data;

  const {
    studioAssignedTimesData,
    studioAssignedTimesDataLoading,
    studioAssignedTimesDataError,
  } = GetStudioAssignedTime(studioId);
  const studioAssignedTimes = studioAssignedTimesData?.data;

  const {
    studioProductsData,
    studioProductsDataLoading,
    studioProductsDataError,
  } = GetStudioProduct(studioId);
  const studioProducts = studioProductsData?.data;

  const [reservationCart, setReservationCart] = useState({});
  const [cartState, setCartState] = useState(1);
  const [reservationToPost, setReservationToPost] = useState({});

  const [selected, setSelected] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });
  const [photographerValue, setPhotographerValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);

  const [timeValue, setTimeValue] = useState("");
  const [assignedTimeId, setAssignedTimeId] = useState(0);

  const [productValue, setProductValue] = useState([]);
  const [productId, setProductId] = useState(0);

  const addReservationCart = () => {
    if (!dateValue) {
      alert("날짜를 선택하여야 합니다!");
    } else if (!photographerValue) {
      alert("사진작가를 선택하여야 합니다!");
    } else if (!timeValue) {
      alert("시간을 선택하여야 합니다!");
    } else if (
      productValue.filter((product) => product.value === true).length === 0
    ) {
      alert("제품을 선택하여야 합니다!");
    } else {
      const productNum = productValue.find(
        (product) => product.value === true
      ).id;
      setReservationCart({
        ...reservationCart,
        [cartState]: {
          photographerValue: photographerValue,
          dateValue: dateValue,
          timeValue: timeValue,
          productValue: productNum,
        },
      });
      setPhotographerValue("");
      setDateValue("");
      setTimeValue("");
      setProductValue((prev) =>
        prev.map((p) => (p.value === true ? { id: p.id, value: false } : p))
      );
      if (cartState !== 3) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setSelected({ ...selected, 0: true, 3: false });
      } else {
        setSelected({ ...selected, 3: false });
      }
      setReservationToPost({
        ...reservationToPost,
        [cartState]: {
          assigned_time_id: assignedTimeId,
          product_id: productId,
        },
      });
      setAssignedTimeId(0);
      setProductId(0);
      setCartState(cartState + 1);
    }
  };

  const [phoneNum, setPhoneNum] = useState("");

  const handleReservation = () => {
    setReservationToPost({ ...reservationToPost, phone_num: phoneNum });
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const postReservation = async () => {
    try {
      const res = await fetch(`/api/reservation/user?studioId=${studioId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationToPost),
      });
      if (res.status === 201) {
        router.push(`/studios/${studioId}/reservation/success`);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (studioProducts) {
      studioProducts.map((product, i) =>
        setProductValue((prev) => [...prev, { id: i + 1, value: false }])
      );
    }
  }, [studioProducts]);

  if (
    studioPhotographersDataLoading ||
    studioAssignedTimesDataLoading ||
    studioProductsDataLoading
  )
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  if (
    studioPhotographersDataError ||
    studioAssignedTimesDataError ||
    studioProductsDataError
  )
    return <div>Error!!</div>;
  return (
    studioAssignedTimes &&
    studioPhotographers &&
    studioProducts && (
      <>
        <Layout>
          <Head>
            <title>사진관 예약 | Shutter</title>
          </Head>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                mt: "20px",
              }}
            >
              <CalendarMonthIcon />
              {dateValue ? (
                <Typography variant="h6">{dateValue}</Typography>
              ) : (
                <Typography variant="h6">날짜 선택</Typography>
              )}
              <ToggleButton
                disabled={cartState > 3 ? true : false}
                size="small"
                value="check"
                selected={selected[1]}
                onChange={() => {
                  setSelected({
                    0: !selected[0],
                    1: false,
                    2: false,
                    3: false,
                  });
                }}
              >
                {selected[0] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </ToggleButton>
            </Box>
            {selected[0] ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CalendarPicker
                  displayStaticWrapperAs="Responsive"
                  value={dateValue}
                  minDate={tomorrow}
                  onChange={(newValue) => {
                    setDateValue(dayjs(newValue).format("YYYY-MM-DD"));
                    setSelected({ ...selected, 0: false, 1: true });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  dayOfWeekFormatter={(day) => `${day}.`}
                />
              </LocalizationProvider>
            ) : null}
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "5px",
              bgcolor: "blank.main",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PersonIcon />
            {photographerValue ? (
              <Typography variant="h6">{photographerValue}</Typography>
            ) : (
              <Typography variant="h6">사진작가 선택</Typography>
            )}
            <ToggleButton
              disabled={cartState > 3 ? true : false}
              size="small"
              value="check"
              selected={selected[1]}
              onChange={() => {
                setSelected({
                  0: false,
                  1: !selected[1],
                  2: false,
                  3: false,
                });
              }}
            >
              {selected[1] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </ToggleButton>
          </Box>
          {selected[1] ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                rowGap: "5px",
                columnGap: "2%",
                mt: "15px",
                mb: "30px",
              }}
            >
              {studioPhotographers.map((photographer) => (
                <Button
                  key={photographer.id}
                  variant="outlined"
                  sx={{
                    width: "30%",
                  }}
                  onClick={() => {
                    setPhotographerValue(photographer.name);
                    setSelected({ ...selected, 1: false, 2: true });
                  }}
                >
                  {photographer.name}
                </Button>
              ))}
            </Box>
          ) : null}
          <Box
            sx={{
              width: "100%",
              height: "5px",
              bgcolor: "blank.main",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              mt: "20px",
            }}
          >
            <AccessTimeIcon />
            {!timeValue ? (
              <Typography variant="h6">시간 선택</Typography>
            ) : (
              <Typography variant="h6">{timeValue}</Typography>
            )}
            <ToggleButton
              disabled={cartState > 3 ? true : false}
              size="small"
              value="check"
              selected={selected[2]}
              onChange={() => {
                setSelected({ 0: false, 1: false, 2: !selected[2], 3: false });
              }}
            >
              {selected[2] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </ToggleButton>
          </Box>
          {selected[2] ? (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                rowGap: "5px",
                columnGap: "2%",
                mt: "15px",
                mb: "15px",
              }}
            >
              {studioAssignedTimes.filter(
                (t) =>
                  t.opened_time.date === dateValue &&
                  t.photographer.name === photographerValue
              ).length > 0 ? (
                studioAssignedTimes
                  .filter(
                    (t) =>
                      t.opened_time.date === dateValue &&
                      t.photographer.name === photographerValue
                  )
                  .map((time) => (
                    <Button
                      key={time.id}
                      variant="outlined"
                      sx={{
                        width: "23%",
                      }}
                      onClick={(e) => {
                        setTimeValue(e.target.innerText);
                        setAssignedTimeId(time.id);
                        setSelected({ ...selected, 2: false, 3: true });
                      }}
                    >
                      {fillZero(time.opened_time.hour)}:
                      {fillZero(time.opened_time.minute)}
                    </Button>
                  ))
              ) : (
                <Typography>예약 가능한 시간대가 없습니다</Typography>
              )}
            </Box>
          ) : null}
          <Box
            sx={{
              width: "100%",
              height: "5px",
              bgcolor: "blank.main",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              mt: "20px",
            }}
          >
            <PhotoCameraIcon />
            <Typography variant="h6">상품 선택</Typography>
            <ToggleButton
              disabled={cartState > 3 ? true : false}
              size="small"
              value="check"
              selected={selected[3]}
              onChange={() => {
                setSelected({ 0: false, 1: false, 2: false, 3: !selected[3] });
              }}
            >
              {selected[3] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </ToggleButton>
          </Box>
          {selected[3] ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px",
                mt: "15px",
                mb: "15px",
              }}
            >
              {studioProducts.map((product, i) => (
                <Box key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "start",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      checked={productValue[i].value ? true : false}
                      onClick={() => {
                        setProductValue((prev) =>
                          prev.map((p) =>
                            p.value === true
                              ? { id: p.id, value: false }
                              : p.id === i + 1
                              ? { id: p.id, value: true }
                              : p
                          )
                        );
                        setProductId(product.id);
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{ borderBottom: "1px solid black", width: "60px" }}
                      >
                        {i + 1}번 상품
                      </Typography>
                      <Typography sx={{ fontWeight: "900" }}>
                        {product.name}
                      </Typography>
                      <Typography>가격 : {product.price}원</Typography>
                      <Typography>{product.description}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "2px",
                      bgcolor: "blank.main",
                      mt: "10px",
                    }}
                  ></Box>
                </Box>
              ))}
            </Box>
          ) : null}
          <Box
            sx={{
              width: "100%",
              height: "5px",
              bgcolor: "blank.main",
            }}
          ></Box>
          {cartState < 4 ? (
            <Button
              onClick={addReservationCart}
              variant="contained"
              sx={{ width: "100%", mt: "20px" }}
              id="reservation_add_btn"
            >
              {cartState}순위로 예약신청하기
            </Button>
          ) : null}

          <Box>
            {defaultReservationNum.map((r) => (
              <Box
                key={r.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                  mt: "15px",
                }}
              >
                <Box>
                  <Typography variant="h6">{r.id}순위 예약</Typography>
                  {reservationCart[r.id] ? (
                    <Box>
                      <Typography>
                        선택된 사진작가 :{" "}
                        {reservationCart[r.id].photographerValue}
                      </Typography>
                      <Typography>
                        예약 날짜 : {reservationCart[r.id].dateValue}
                      </Typography>
                      <Typography>
                        예약 시간 : {reservationCart[r.id].timeValue}
                      </Typography>
                      <Typography>
                        예약 상품 : {reservationCart[r.id].productValue}번 상품
                      </Typography>
                    </Box>
                  ) : (
                    <Typography sx={{ fontSize: "13px", color: "gray" }}>
                      신청하신 예약이 아직 없어요!
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: "20px" }}>
            <TextField
              sx={{ width: "100%" }}
              required
              id="outlined-required"
              label="전화번호를 입력해주세요"
              onChange={(e) => {
                setPhoneNum(e.target.value);
              }}
            />
            <Typography sx={{ mt: 1 }}>
              예약 확정을 위해 예약자 분의 정확한 전화번호를 입력해주세요!
            </Typography>
          </Box>

          <Button
            onClick={handleReservation}
            variant="contained"
            sx={{ width: "100%", mt: "20px" }}
            id="reservation_apply_btn"
          >
            예약 신청하기
          </Button>
        </Layout>

        <AlertModal
          open={open}
          title="예약 확인"
          description="예약을 신청하시겠습니까?"
          confirmFunc={postReservation}
          cancelFunc={handleClose}
        />
      </>
    )
  );
}
