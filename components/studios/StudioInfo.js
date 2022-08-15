import { Box, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function StudioInfo({ studio }) {
    return (
        <>
            <Box
            sx={{
            mb: 3,
            }}>

            <Box
            sx={{
                display: 'flex',
            }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>
                영업시간
                </Typography>
            </Box>
            
            <Typography>
                {studio.openTime} ~ {studio.closeTime}
            </Typography>

            </Box>

            <Box
                sx={{
                    mb: 3,
                }}>

                    <Box
                    sx={{
                    display: 'flex',
                    }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography>
                        위치
                    </Typography>
                    </Box>
                    
                    <Typography>
                    {studio.address}
                    </Typography>
            </Box>
        </>
    )
}