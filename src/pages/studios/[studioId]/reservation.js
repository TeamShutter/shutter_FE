import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { GetStudio } from "../../../components/fetcher/fetcher";
import Layout from "../../../layouts/Layout";

export default function Reservation() {
  const router = useRouter();
  const { studioId } = router.query;

  // const [follow, setFollow] = useState(false);
  // const [follows, setFollows] = useState(0);
  // const [reviewList, setReviewList] = useState([]);

  const { studioData, studioDataLoading, studioDataError } =
    GetStudio(studioId);
  const studio = studioData?.studio_data;
  return (
    <Layout>
      <Box></Box>
    </Layout>
  );
}
