import cookie from "cookie";
import { API_URL } from "../../../config";

const user = async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access_token = cookies.access_token ?? false;

    if (access_token === false) {
      return res.status(401).json({
        error: "UnAuthorized - No Access Token.",
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/accounts/user/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await apiRes.json();
      console.log("Data: ", data);

      if (apiRes.status === 200) {
        return res.status(200).json({
          user: data.user_profile,
          like_photos: data.photo,
          follow_studios: data.studio,
          reservation: data.reservation,
        });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong retrieving user data.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed.`,
    });
  }
};

export default user;
