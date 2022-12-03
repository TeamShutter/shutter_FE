import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
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
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultReservationNum } from "../../../../data";
import { API_URL } from "../../../../config";

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
    if (!photographerValue) {
      alert("사진작가를 선택하여야 합니다!");
    } else if (!dateValue) {
      alert("날짜를 선택하여야 합니다!");
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

  const handleReservation = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const postReservation = async () => {
    const response = await fetch(`${API_URL}/studio/${studioId}/reservation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      body: JSON.stringify(reservationToPost),
    });
    const data = await response.json();
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
    return <div>Loading...</div>;
  if (
    studioPhotographersDataError ||
    studioAssignedTimesDataError ||
    studioProductsDataError
  )
    return <div>Error!!</div>;
  return (
    <>
      <Layout>
        <Box>
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
              selected={selected[0]}
              onChange={() => {
                setSelected({ 0: !selected[0], 1: false, 2: false, 3: false });
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
              {studioPhotographers.map((photographer) => (
                <Button
                  key={photographer.id}
                  variant="outlined"
                  sx={{
                    width: "30%",
                  }}
                  onClick={() => {
                    setPhotographerValue(photographer.name);
                    setSelected({ ...selected, 0: false, 1: true });
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
                setSelected({ 0: false, 1: !selected[1], 2: false, 3: false });
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CalendarPicker
                displayStaticWrapperAs="Responsive"
                value={dateValue}
                minDate={tomorrow}
                onChange={(newValue) => {
                  setDateValue(dayjs(newValue).format("YYYY-MM-DD"));
                  setSelected({ ...selected, 1: false, 2: true });
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
            {selected[2] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            {studioAssignedTimes
              .filter((t) => t.opened_time.date === dateValue)
              .filter((t) => t.photographer.name === photographerValue)
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
            {selected[3] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
              <Box
                key={i}
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
                  <Typography>{i + 1}번 상품</Typography>
                  <Typography>{product.name}</Typography>
                  <Typography>가격 : {product.price}원</Typography>
                  <Typography>{product.description}</Typography>
                </Box>
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
          >
            {cartState}순위 추가하기
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
                ) : null}
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          onClick={handleReservation}
          variant="contained"
          sx={{ width: "100%", mt: "20px" }}
        >
          예약 신청하기
        </Button>
      </Layout>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h2">
            예약 확인
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, display: "flex", flexDirection: "column" }}
          >
            예약을 신청하겠습니까?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "10px",
              mt: "15px",
            }}
          >
            <Button variant="contained" onClick={postReservation}>
              확인
            </Button>
            <Button variant="contained" onClick={handleClose}>
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
