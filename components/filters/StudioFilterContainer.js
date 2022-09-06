import { Box } from "@mui/material";
import StudioFilterBar from "./StudioFilterBar";

const filters = [
    {
        title: 'price',
        options:  [
          {
              value: 0,
              label: '선택'
          },
          {
              value: 1,
              label: '10,000 ~'
          },
          {
              value: 2,
              label: '20,000 ~'
          },
          {
              value: 3,
              label: '30,000 ~'
          },
          {
              value: 4,
              label: '40,000 ~'
          },
          {
              value: 5,
              label: '50,000 ~'
          },
       ]
    },
  {
      title: 'distance',
      options:  [
        {
            value: 1,
            label: '가까움'
        },
        {
            value: 2,
            label: '중간'
        },
        {
            value: 3,
            label: '멈'
        },

     ]
  }
];


export default function StudioFilterContainer({ setPrice, setDistance }) {
    return (
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
            {filters.map((filter) => {
                let setFilter;
                filter.title == 'price' ? setFilter = setPrice :
                setFilter = setDistance;
                return (
                    <StudioFilterBar
                    key={filter.title}
                    title={filter.title} 
                    options={filter.options}
                    setFilter={setFilter}
                    />
                )
            })}
          
        </Box>
    )
}
