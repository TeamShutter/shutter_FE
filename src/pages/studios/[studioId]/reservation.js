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
  const [value, setValue] = useState();
  const [selected, setSelected] = useState({
    1: true,
    2: false,
    3: false,
  });
  const today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "년 " + month + "월 " + day + "일";

  const [timeValue, setTimeValue] = useState("");
  const timeList = defaultTime;
  const [timeIndex, setTimeIndex] = useState([]);

  const { studioData, studioDataLoading, studioDataError } =
    GetStudio(studioId);
  const studio = studioData?.studio_data;
  const dateValue = dayjs(value).format("YYYY년 MM월 DD일");

  useEffect(() => {
    if (value) {
      if (timeIndex.length === 10) {
        setTimeIndex([]);
      }
      for (let i = 0; i < 12; i++) {
        setTimeIndex((prev) => [...prev, Math.floor(Math.random() * 14)]);
      }
    }
  }, [value]);

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
          {value ? (
            <Typography variant="h6">{dateValue}</Typography>
          ) : (
            <Typography variant="h6">{dateString}</Typography>
          )}
          <ToggleButton
            size="small"
            value="check"
            selected={selected[1]}
            onChange={() => {
              setSelected({ ...selected, 1: !selected[1] });
            }}
          >
            {selected[1] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </ToggleButton>
        </Box>
        {selected[1] ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              displayStaticWrapperAs="Responsive"
              value={value}
              minDate={tomorrow}
              onChange={(newValue) => {
                setValue(newValue);
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
            setSelected({ ...selected, 2: !selected[2] });
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
            setSelected({ ...selected, 3: !selected[3] });
          }}
        >
          {selected[3] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ToggleButton>
      </Box>
      {selected[3] ? (
        <Box>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="1번 상품" />
            <FormControlLabel control={<Checkbox />} label="2번 상품" />
          </FormGroup>
        </Box>
      ) : null}
      <Box
        sx={{
          width: "100%",
          height: "5px",
          bgcolor: "blank.main",
        }}
      ></Box>
    </Layout>
  );
}
