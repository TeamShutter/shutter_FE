import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Rating,
  ImageList,
  ImageListItem,
  IconButton,
  ImageListItemBar,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { useSelector } from "react-redux";
import { GetProfile } from "../../components/fetcher/fetcher";
import { defaultReservationState } from "../../data";

export default function Profile() {
  const { profile, profileLoading, profileError } = GetProfile();

  console.log("Profile: ", profile);

  const [reservatedStudios, setReservatedStudios] = useState([]);

  useEffect(() => {
    if (profile) {
      profile.reservation?.map((r) => {
        setReservatedStudios((prev) => [
          ...prev,
          { studio: r.assigned_time.opened_time.studio, user: r.user },
        ]);
      });
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
  }, [profile]);
  if (profileLoading) return <div>Loading...</div>;
  if (profileError) return <div>Error!!</div>;

  return (
    profile && (
      <Layout>
        <Head>
          <title>Profile | Shutter</title>
        </Head>

        <ArrowBackIosNewIcon
          onClick={() => router.back()}
          sx={{ mb: 2, cursor: "pointer" }}
        />

        <Link href="/">
          <a>
            <HomeIcon sx={{ mb: 2 }} />
          </a>
        </Link>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Avatar
            alt="Seungoh"
            // src="/static/images/avatar/1.jpg"
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h6">{profile.user.username}</Typography>
            {/* <Typography
                    variant="subtitle1">
                    {auth.profile.profile.town}
                    </Typography> */}
            {/* <Box
                   sx={{
                       display: 'flex'
                   }}
                   >
                       <Chip label="20대" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="취업사진" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="깔끔" 
                        sx={{ mr: 1 }}
                       />
                       <Chip label="단정" 
                        sx={{ mr: 1 }}
                       />
                   </Box> */}
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            관심 사진
          </Typography>

          <ImageList sx={{ width: "100%" }} cols={2} gap={10}>
            {profile.like_photos.map((photo) => (
              <Link href={`photos/${photo.id}`} key={photo.name}>
                <a>
                  <ImageListItem>
                    <Box
                      sx={{
                        paddingBottom: "120%",
                        backgroundImage: `url(${photo.photo_url})`,
                        borderRadius: "15px",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    />
                  </ImageListItem>
                </a>
              </Link>
            ))}
          </ImageList>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            관심 매장
          </Typography>
          {profile.follow_studios.map((studio) => (
            <Link key={studio.id} href={`/studios/${studio.id}`}>
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ mb: 2, cursor: "pointer" }}
                >
                  <div>
                    <Box
                      sx={{
                        width: "200px",
                        paddingBottom: "100%",
                        backgroundImage: `url(${studio.thumbnail})`,
                        borderRadius: "25px",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        marginRight: "20px",
                      }}
                    />
                  </div>

                  <div>
                    <Typography variant="h6">{studio.name}</Typography>
                    <Typography variant="subtitle1">
                      {studio.description.substr(0, 20)}...
                    </Typography>
                    <Rating
                      name="read-only"
                      value={3}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </Box>
              </a>
            </Link>
          ))}
        </Box>
        <Box>
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            신청된 예약
          </Typography>
        </Box>
        <Box>
          {reservatedStudios.length > 0 ? (
            reservatedStudios.map((s, i) => (
              <Box sx={{ mt: "20px" }} key={i}>
                <Typography variant="h6">{s.studio.name}</Typography>
                {profile.reservation.map((r) => (
                  <Box key={r.id}>
                    <Box
                      sx={{
                        mt: "15px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                          상품 정보: {r.product.name} / 가격: {r.product.price}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">
                          {
                            defaultReservationState.find((s) => {
                              return s.id === r.state;
                            }).value
                          }
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "3px",
                        bgcolor: "blank.main",
                        mt: "10px",
                      }}
                    ></Box>
                  </Box>
                ))}
              </Box>
            ))
          ) : (
            <Typography>신청된 예약이 없습니다.</Typography>
          )}
        </Box>
      </Layout>
    )
  );
}
