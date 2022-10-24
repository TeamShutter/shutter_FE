const logout = async (req, res) => {
    if(req.method === 'POST') {

            const delete_cookie = [
                'access_token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/',
                'refresh_token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
            ]
            res.setHeader('Set-Cookie', delete_cookie);
                
            return res.status(200).json({
                success: 'Logged out successfully.'
            })

    }   else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({
            error: `Method ${req.method} Not Allowed.`
        })
    }
}

export default logout;