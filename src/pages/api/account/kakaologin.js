import { API_URL } from "../../../config";

const kakaologin = async (req, res) => {
  if (req.method === "GET") {
    const code = req.query.code ?? "";

    try {
      const apiRes = await fetch(`${API_URL}/accounts/kakao/login/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        withCredentials: true,
      });

      const data = await apiRes.json();
      if (apiRes.status === 200) {
        res.setHeader(
          "Set-Cookie",
          [`access_token=${data.access_token}; HttpOnly; Path=/`,
          `refresh_token=${data.refresh_token}; HttpOnly; Path=/`
        ]
        );

        return res.status(200).json({
          success: "Kakao Login success.",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Kakao Authentication Failed.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when kakao authenticating.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed.`,
    });
  }
};

export default kakaologin;
