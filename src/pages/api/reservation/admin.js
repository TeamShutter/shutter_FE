import { CompressOutlined } from "@mui/icons-material";
import cookie from "cookie";
import { API_URL } from "../../../config";

const user = async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access_token = cookies.access_token ?? false;
    if (access_token === false) {
      return res.status(401).json({
        error: "UnAuthorized - No Access Token.",
      });
    }
    const stateChange = req.body;
    const reservationId = req.query.reservationId;

    try {
      const apiRes = await fetch(`${API_URL}/reservation/${reservationId}/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(stateChange),
      });
      const data = apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json("success");
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong patch reservation state.",
      });
    }
  }
};

export default user;
