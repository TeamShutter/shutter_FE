import cookie from "cookie";
import { API_URL } from "../../../config";

const verify = async (req, res) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access_token = cookies.access_token ?? false;

    if (access_token === false) {
      return res.status(401).json({
        error: "UnAuthorized - No Access Token.",
      });
    }

    const body = JSON.stringify({
      token: access_token,
    });

    try {
      const apiRes = await fetch(`${API_URL}/account/token/verify/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (apiRes.status === 200) {
        return res.status(200).json({
          success: "Successfully Authenticated.",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication Failed",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong while Authenticating.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed.`,
    });
  }
};

export default verify;
