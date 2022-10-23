import { API_URL } from '../../../config';

const logout = async (req, res) => {
    if(req.method === 'POST') {

        try {
            const apiRes = await fetch(`${API_URL}/account/logout/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cookie': req.headers.cookie
                }
            });

            if(apiRes.status === 200) {
                const delete_cookie = [
                    'access_token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
                    'refresh_token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
                ]
                res.setHeader('Set-Cookie', delete_cookie);
                
                return res.status(200).json({
                    success: 'Logged out successfully.'
                })
            }   else {
                return res.status(apiRes.status).json({
                    error: 'Log Out Failed.'
                })
            }

        }   catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when logging out.'
            })
        }

    }   else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} Not Allowed.`
        })
    }
}

export default logout;