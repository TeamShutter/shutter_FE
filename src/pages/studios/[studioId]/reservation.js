import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { GetStudio } from "../../../components/fetcher/fetcher";
import Layout from "../../../layouts/Layout";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { defaultTime } from "../../../data";

export default function Reservation() {
  const router = useRouter();
  const { studioId } = router.query;
  const { studioData, studioDataLoading, studioDataError } =
    GetStudio(studioId);
  const studio = studioData?.studio_data;

  const [selected, setSelected] = useState({
    1: true,
    2: false,
    3: false,
  });

  const [dateNaturalValue, setDateNaturalValue] = useState();
  const dateValue = dayjs(dateNaturalValue).format("YYYY년 MM월 DD일");

  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "년 " + month + "월 " + day + "일";

  const [timeValue, setTimeValue] = useState("");
  const timeList = defaultTime;
  const [timeIndex, setTimeIndex] = useState([]);

  const [productValue, setProductValue] = useState({
    1: false,
    2: false,
    3: false,
  });
  console.log(productValue);
  const handleReservation = () => {
    if (!dateNaturalValue) {
      alert("날짜를 선택하여야 합니다!");
    } else if (!timeValue) {
      alert("시간을 선택하여야 합니다!");
    } else if (
      productValue[1] === false &&
      productValue[2] === false &&
      productValue[3] === false
    ) {
      alert("제품을 선택하여야 합니다!");
    } else {
      console.log("success");
    }
  };

  useEffect(() => {
    if (dateNaturalValue) {
      if (timeIndex.length === 20) {
        setTimeIndex([]);
      }
      for (let i = 0; i < 20; i++) {
        setTimeIndex((prev) => [...prev, Math.floor(Math.random() * 14)]);
      }
    }
  }, [dateNaturalValue]);

  console.log(timeIndex);

  return (
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
          <CalendarMonthIcon />
          {dateNaturalValue ? (
            <Typography variant="h6">{dateValue}</Typography>
          ) : (
            <Typography variant="h6">{dateString}</Typography>
          )}
          <ToggleButton
            size="small"
            value="check"
            selected={selected[1]}
            onChange={() => {
              setSelected({ 1: !selected[1], 2: false, 3: false });
            }}
          >
            {selected[1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ToggleButton>
        </Box>
        {selected[1] ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              displayStaticWrapperAs="Responsive"
              value={dateNaturalValue}
              minDate={tomorrow}
              onChange={(newValue) => {
                setDateNaturalValue(newValue);
                setSelected({ ...selected, 1: false, 2: true });
              }}
              renderInput={(params) => <TextField {...params} />}
              dayOfWeekFormatter={(day) => `${day}.`}
              // toolbarFormat="ddd DD MMMM"
              // showToolbar
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
          size="small"
          value="check"
          selected={selected[2]}
          onChange={() => {
            setSelected({ 1: false, 2: !selected[2], 3: false });
          }}
        >
          {selected[2] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ToggleButton>
      </Box>
      {selected[2] ? (
        <Box
          variant="outlined"
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
          {timeList.map((time) => (
            <Button
              key={time.id}
              disabled={timeIndex.includes(time.id) ? true : false}
              variant="outlined"
              sx={{
                width: "23%",
              }}
              onClick={(e) => {
                setTimeValue(e.target.innerText);
                setSelected({ ...selected, 2: false, 3: true });
              }}
            >
              {time.value}
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
          size="small"
          value="check"
          selected={selected[3]}
          onChange={() => {
            setSelected({ 1: false, 2: false, 3: !selected[3] });
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={productValue[1] ? true : false}
              onClick={(e) =>
                setProductValue({ 1: !productValue[1], 2: false, 3: false })
              }
            />
            <Box>
              <Typography>1번 상품</Typography>
              <Typography>증명사진</Typography>
              <Typography>가격 : 50000원</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={productValue[2] ? true : false}
              onClick={(e) =>
                setProductValue({ 1: false, 2: !productValue[2], 3: false })
              }
            />
            <Box>
              <Typography>2번 상품</Typography>
              <Typography>프로필사진</Typography>
              <Typography>가격 : 100000원</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={productValue[3] ? true : false}
              onClick={(e) =>
                setProductValue({ 1: false, 2: false, 3: !productValue[3] })
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography>3번 상품</Typography>
              <Typography>프로필사진 + 메이크업</Typography>
              <Typography>가격 : 200000원</Typography>
            </Box>
          </Box>
        </Box>
      ) : null}
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
      <Button
        onClick={handleReservation}
        variant="contained"
        sx={{ width: "100%", mt: "20px" }}
      >
        예약 완료하기
      </Button>
    </Layout>
  );
}
