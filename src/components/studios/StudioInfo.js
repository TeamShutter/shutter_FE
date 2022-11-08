import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { styled } from '@mui/styles';

const StyledTableHead = styled(TableCell)({
    backgroundColor: "black",
    color: "white",
    fontSize: 15,
  });

const StyledTableBody = styled(TableCell)({
    backgroundColor: "white",
    color: "black",
    fontSize: 13,
  });
export default function StudioInfo({ studio }) {
    return (
        <TableContainer component={Paper} sx={{ my: 3, borderRadius: 5 }}>
            <Table aria-label="customized table" >
                {/* <TableHead>
                    <TableRow>
                        <StyledTableHead align="center">영업시간</StyledTableHead>
                        <StyledTableHead align="center">주소</StyledTableHead>
                        <StyledTableHead align="center">전화번호</StyledTableHead>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow key={studio.id}>
                        <StyledTableBody align="center">
                            <AccessTimeIcon sx={{ mr: 1, transform: "translateY(5px)" }} />
                            {studio.open_time} ~ {studio.close_time}
                        </StyledTableBody>
                        <StyledTableBody align="center">
                            <RoomIcon sx={{ mr: 1, transform: "translateY(5px)" }} />
                            {studio.address}
                        </StyledTableBody>
                        <StyledTableBody align="center">
                            <LocalPhoneIcon sx={{ mr: 1, transform: "translateY(5px)" }} />
                            {studio.phone}
                        </StyledTableBody>
                    </TableRow>
                </TableBody> */}

                <TableRow>
                    <StyledTableHead variant="head" align="center">영업시간</StyledTableHead>
                    <StyledTableBody align="center">
                            <AccessTimeIcon sx={{ mr: 1, transform: "translateY(8px)" }} />
                            {studio.open_time} ~ {studio.close_time}
                    </StyledTableBody>
                </TableRow>
                <TableRow>
                    <StyledTableHead variant="head" align="center">주소</StyledTableHead>
                    <StyledTableBody align="center">
                            <RoomIcon sx={{ mr: 1, transform: "translateY(8px)" }} />
                            {studio.address}
                    </StyledTableBody>
                </TableRow>
                {studio.phone && (
                    <TableRow>
                        <StyledTableHead variant="head" align="center">전화번호</StyledTableHead>                   
                        <StyledTableBody align="center" >
                            <a 
                                href={`tel:${studio.phone}`}
                                style={{ cursor: 'pointer', display:'block', width: '100%', height: '100%' }}
                            >
                            <LocalPhoneIcon sx={{ mr: 1, transform: "translateY(8px)" }} />
                            {studio.phone}
                            </a>
                        </StyledTableBody>
                    </TableRow>
                )}
            </Table>
        </TableContainer>


        // <Box
        // sx={{
        //     display: 'flex',
        //     margin: 'auto',
        //     justifyContent: 'space-between',
        //     width: '70%',
        // }}
        // >
        //     <Box
        //     sx={{
        //     mb: 3,
        //     }}>

        //     <Box
        //     sx={{
        //         display: 'flex',
        //     }}>
        //         <AccessTimeIcon sx={{ mr: 1 }} />
        //         <Typography>
        //         영업시간
        //         </Typography>
        //     </Box>
            
        //     <Typography>
        //         {studio.open_time} ~ {studio.close_time}
        //     </Typography>

        //     </Box>

        //     <Box
        //         sx={{
        //             mb: 3,
        //         }}>

        //             <Box
        //             sx={{
        //             display: 'flex',
        //             }}>
        //             <RoomIcon sx={{ mr: 1 }} />
        //             <Typography>
        //                 위치
        //             </Typography>
        //             </Box>
                    
        //             <Typography>
        //             {studio.address}
        //             </Typography>
        //     </Box>

        //     <Box
        //         sx={{
        //           mb: 3,
        //         }}>
        //           <Box
        //            sx={{
        //             display: 'flex',
        //           }}
        //           >
        //             <LocalPhoneIcon sx={{mr: 1}} />
        //             <Typography>
        //               전화번호
        //             </Typography>
        //           </Box>
                  
        //           <Typography>
        //             {studio.phone}
        //           </Typography>
        //         </Box>
        // </Box>
    )
}