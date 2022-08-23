import {Box, Container, Typography, Rating } from "@mui/material";
import Link from "next/link";
import { GetStudios } from "../../components/fetcher/fetcher";
import StudioCarousel from "../studios/StudioCarousel";
import StudioInfo from "../studios/StudioInfo";

// {price, photoshop, sex, tags}
export default function StudioList(props) {
  const studiosData = GetStudios(props.price, props.distance);

  const studios = studiosData.studios;
  const studiosLoading = studiosData.studiosLoading;
  const studiosError = studiosData.studiosError;

  if (studiosLoading) return <div>Loading...</div>;
  if (studiosError) return <div>Error!!</div>;

  return (
    <Box>
      {studios.map((studio, i) => (
        <Box key={i} sx={{ mb: 10 }}>
          <StudioCarousel studio={studio} />
          <Link href={`/studios/${studio.id}`}>
            <a>
              <div
                sx={{
                  width: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  {studio.name}
                  <Rating
                    name="read-only"
                    value={4.5}
                    precision={0.5}
                    readOnly
                  />
                </Typography>

                <StudioInfo studio={studio} />
              </div>
            </a>
          </Link>
        </Box>
      ))}
      </Box>
  );
}
