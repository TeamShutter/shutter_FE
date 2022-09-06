import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function ReviewList({ reviews }) {

  // const handleEdit = async (e) => {
  //   e.preventDefault();

  //     const formData = {
  //       content: e.target.content.value,
  //       rating: e.target.rating.value,
  //       userId: 3,  // 로그인이 안돼서 일단 2로 바꿔놓음
  //   }

  //     const res =  await fetch(`${BASE_URL}/studios/${studioId}/review/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //       body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   setReviewList((prev) => [...prev, data]);
  //   e.target.content.value = "";
  // };

  // const handleDelete = async (e) => {
  //   e.preventDefault();

  //     const formData = {
  //       content: e.target.content.value,
  //       rating: e.target.rating.value,
  //       userId: 3,  // 로그인이 안돼서 일단 2로 바꿔놓음
  //   }

  //     const res =  await fetch(`${BASE_URL}/studios/${studioId}/review/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //       body: JSON.stringify(formData),
  //   });
  //   const data = await res.json();
  //   setReviewList((prev) => [...prev, data]);
  //   e.target.content.value = "";
  // };


  return (
    <List sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}>
      {reviews.map((review) => {
        return (
            <Box key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={review.author.username}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={review.author.email}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline", mr: 2 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {review.author.username}
                      </Typography>
                      {review.content}
                    </>
                  }
                />
                <EditIcon />
                <DeleteForeverIcon />
                <Rating
                  name="read-only"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
              </ListItem>



              <Divider variant="inset" component="li" />
            </Box>
        );
      })}
    </List>
  );
}
