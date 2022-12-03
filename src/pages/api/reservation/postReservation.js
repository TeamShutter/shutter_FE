import cookie from "cookie";
import { API_URL } from "../../../config";

const postreservation = async (req, res) => {
  if (req.method === "POST") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const access_token = cookies.access_token ?? false;
    if (access_token === false) {
      return res.status(401).json({
        error: "UnAuthorized - No Access Token.",
      });
    }
    console.log("a");
    const reservationToPost = req.body;
    const studioId = req.query.studioId;
    console.log(studioId);
    console.log(reservationToPost);
    // const body = JSON.stringify(reservationToPost);
    // console.log(body);
    try {
      const apiRes = await fetch(`${API_URL}/studio/${studioId}/reservation/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(reservationToPost),
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
        error: "Something went wrong post reservation.",
      });
    }
  }
};

export default postreservation;
