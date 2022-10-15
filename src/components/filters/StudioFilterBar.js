import { Box, FormControl, InputLabel, NativeSelect, Slider, Typography } from "@mui/material";

const marks = [
  {
    value: 1,
    label: '1km',
  },
  {
    value: 2,
    label: '2km',
  },
  {
    value: 3,
    label: '3km',
  }
]

export default function StudioFilterBar({title, options, setFilter}) {
    return (
      title === 'price' ? (
        <FormControl width='50%'>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {title.toUpperCase()}
            </InputLabel>
            <NativeSelect
              onChange={
                (event) => {
                  event.preventDefault();
                  setFilter(event.target.value);
              }}
              inputProps={{
                name: title,
                id: 'uncontrolled-native',
              }}
            >
                {options.map((option) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value}
                        >
                            {option.label}
                        </option>
                    )
                })}
            </NativeSelect>
          </FormControl>)
          : (
            <Box>
              <Typography variant="caption">
                  {title.toUpperCase()}
              </Typography>
            <Slider
             aria-label="distance"
              onChange={
                (event) => {
                  event.preventDefault();
                  setFilter(event.target.value);
              }}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={marks}
              valueLabelDisplay="auto"
            />
            </Box>
          )
    )
} 