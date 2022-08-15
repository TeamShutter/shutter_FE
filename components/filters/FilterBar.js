import { FormControl, InputLabel, NativeSelect } from "@mui/material";

export default function FilterBar({title, options, setFilter}) {
    return (
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
          </FormControl>
    )
} 