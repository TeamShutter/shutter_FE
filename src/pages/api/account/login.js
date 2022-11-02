import { API_URL } from "../../../config";

const login = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const body = JSON.stringify({
      username,
      password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/account/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const header = apiRes.headers;
      if (apiRes.status === 200) {
        res.setHeader(
          "Set-Cookie",
          header
            .get("set-cookie")
            .split(",")
            .map((v) => v.trimStart())
        );

        return res.status(200).json({
          success: "Logged in successfully.",
        });
      } else {
        return res.status(apiRes.status).json({
          error: "Authentication Failed.",
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when authenticating.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      error: `Method ${req.method} Not Allowed.`,
    });
  }
};

export default login;
