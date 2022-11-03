import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Container, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetTowns } from '../fetcher/fetcher';

const TownChip = styled(Chip)({
    width: '23%',
    marginBottom: '8px',
  });
  

export default function TownSelector({town, setTown}) {
    const townsData = GetTowns();

    const towns = townsData.towns?.data;
    const townsLoading = townsData.townsLoading;
    const townsError = townsData.townsError;

    if (townsLoading) return <div>Loading...</div>;
    if (townsError) return <div>Error!!</div>;

    const handleChangeTown = (e) => {
        const newTown = e.target.innerText;
        if(newTown === town) {
          setTown('');
        } else {
          setTown(e.target.innerText);  
        }
        
      }

    return towns && (
        <Accordion
            sx={{
              boxShadow: 'none',
              border: 'none',
              ":before": {
                backgroundColor: 'rgba(0,0,0,0)'
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                position: 'relative',
              }}
            >
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Typography
                  sx={{
                    position: 'absolute',
                    right: 50
                  }}
                >
                  동네별로 보기
                </Typography>
              </Box>
             
            </AccordionSummary>
            <AccordionDetails>
              
                <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                {towns.map((t) => (
                  <TownChip
                    key={t}
                    onClick={handleChangeTown}
                    label={t}
                    color={town === t ? 'primary' : 'default'}
                    clickable
                  />
                ))}
                
                {/* <TownChip
                  onClick={handleChangeTown}
                  label="이태원"
                  color={town === '이태원' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="강남"
                  color={town === '강남' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="신촌"
                  color={town === '신촌' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="노원"
                  color={town === '노원' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="신림"
                  color={town === '신림' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="수서"
                  color={town === '수서' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="종로"
                  color={town === '종로' ? 'primary' : 'default'}
                  clickable
                />
                <TownChip
                  onClick={handleChangeTown}
                  label="용산"
                  color={town === '용산' ? 'primary' : 'default'}
                  clickable
                /> */}
              </Box>  

            </AccordionDetails>
          </Accordion>
    )
};