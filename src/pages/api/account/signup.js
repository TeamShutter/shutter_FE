import { API_URL } from "../../../config";

const signup = async (req, res) => {
  if (req.method == "POST") {
    const { username, name, email, phone_number, password, re_password } =
      req.body;

    const body = JSON.stringify({
      username,
      name,
      email,
      phone_number,
      password,
      re_password,
    });
    try {
      const apiRes = await fetch(`${API_URL}/accounts/signup/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      if (apiRes.status === 201) {
        return res.status(201).json({ success: data.success });
      } else {
        return res.status(apiRes.status).json({
          error: data.error,
        });
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when registering account.",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed.` });
  }
};

export default signup;
