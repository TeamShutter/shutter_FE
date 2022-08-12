import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";

export default function FilterContainer({ setPrice, setPhotoshop, setSex}) {
    return (
        <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        <FormControl width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Price
          </InputLabel>
          <NativeSelect
            onChange={
              (event) => {
                event.preventDefault();
                setPrice(event.target.value);
            }}
            inputProps={{
              name: 'price',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={0}
            >선택</option>
            <option 
            value={1}
            >10,000 ~</option>
            <option 
            value={2}
            >20,000 ~</option>
            <option 
            value={3}
            >30,000 ~</option>
            <option 
            value={4}
            >40,000 ~</option>
            <option 
            value={5}
            >50,000 ~</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Photoshop
          </InputLabel>
          <NativeSelect
            onChange={(event) => {
              event.preventDefault();
              setPhotoshop(event.target.value)
            }}
            inputProps={{
              name: 'photoshop',
              id: 'uncontrolled-native',
            }}
          >
             <option 
            value={0}
            >선택</option>
            <option 
            value={1}
            >자연스럽게</option>
            <option 
            value={2}
            >적당히</option>
            <option 
            value={3}
            >빵빵하게</option>
          </NativeSelect>
        </FormControl>
      

      
        <FormControl Width='50%'>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gender
          </InputLabel>
          <NativeSelect
            onChange={(event) => {
              event.preventDefault();
              setSex(event.target.value)
            }}
            inputProps={{
              name: 'sex',
              id: 'uncontrolled-native',
            }}
          >
            <option 
            value={0}
            >선택</option>
            <option 
            value={1}
            >남자</option>
            <option 
            value={2}
            >여자</option>
          </NativeSelect>
        </FormControl>
      </Box>

    )
}