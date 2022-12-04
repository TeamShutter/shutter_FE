import { Box, Button, Modal, Typography } from "@mui/material";

export default function AlertModal({
  open,
  title,
  description,
  confirmFunc,
  cancelFunc,
}) {
  return (
    <Modal
      open={open}
      onClose={cancelFunc}
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
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, display: "flex", flexDirection: "column" }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "10px",
            mt: "15px",
          }}
        >
          {confirmFunc ? (
            <Button variant="contained" onClick={confirmFunc}>
              확인
            </Button>
          ) : null}
          {cancelFunc ? (
            <Button variant="contained" onClick={cancelFunc}>
              {confirmFunc ? "취소" : "확인"}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Modal>
  );
}
