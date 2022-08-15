import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Rating, Typography } from "@mui/material"

export default function ReviewList({reviews}) {
    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {reviews.map((review) => {
              return (
                <>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={review.author.username} src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={review.author.email}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline', mr : 2 }}
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
                    <Rating name="read-only" value={review.rating} precision={0.5} readOnly />
                  </ListItem>
                  
                  <Divider variant="inset" component="li" />
                </>
              )
            })}
        </List>
    )
}