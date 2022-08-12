import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import FilterBar from "./FilterBar";

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
      title: 'photoshop',
      options: [
        {
            value: 0,
            label: '선택'
        },
        {
            value: 1,
            label: '자연스럽게'
        },
        {
            value: 2,
            label: '적당히'
        },
        {
            value: 3,
            label: '빵빵하게'
        },
     ],
  },
  {
      title: 'gender',
      options: [
        {
            value: 0,
            label: '선택'
        },
        {
            value: 1,
            label: '남자'
        },
        {
            value: 2,
            label: '여자'
        },
     ]
  }
];


export default function FilterContainer({ setPrice, setPhotoshop, setSex }) {
    return (
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
            {filters.map((filter) => {
                return (
                    <FilterBar
                    key={filter.title}
                    title={filter.title} 
                    options={filter.options}
                    />
                )
            })}
          
        </Box>
    )
}

// export default function FilterContainer({ setPrice, setPhotoshop, setSex }) {
//     return (
//         <Box
//         sx={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'space-around',
//         }}>
//           <FormControl width='50%'>
//             <InputLabel variant="standard" htmlFor="uncontrolled-native">
//               Price
//             </InputLabel>
//             <NativeSelect
//               onChange={
//                 (event) => {
//                   event.preventDefault();
//                   setPrice(event.target.value);
//               }}
//               inputProps={{
//                 name: 'price',
//                 id: 'uncontrolled-native',
//               }}
//             >
//               <option 
//               value={0}
//               >선택</option>
//               <option 
//               value={1}
//               >10,000 ~</option>
//               <option 
//               value={2}
//               >20,000 ~</option>
//               <option 
//               value={3}
//               >30,000 ~</option>
//               <option 
//               value={4}
//               >40,000 ~</option>
//               <option 
//               value={5}
//               >50,000 ~</option>
//             </NativeSelect>
//           </FormControl>
        
  
        
//           <FormControl Width='50%'>
//             <InputLabel variant="standard" htmlFor="uncontrolled-native">
//               Photoshop
//             </InputLabel>
//             <NativeSelect
//               onChange={(event) => {
//                 event.preventDefault();
//                 setPhotoshop(event.target.value)
//               }}
//               inputProps={{
//                 name: 'photoshop',
//                 id: 'uncontrolled-native',
//               }}
//             >
//                <option 
//               value={0}
//               >선택</option>
//               <option 
//               value={1}
//               >자연스럽게</option>
//               <option 
//               value={2}
//               >적당히</option>
//               <option 
//               value={3}
//               >빵빵하게</option>
//             </NativeSelect>
//           </FormControl>
        
  
        
//           <FormControl Width='50%'>
//             <InputLabel variant="standard" htmlFor="uncontrolled-native">
//               Gender
//             </InputLabel>
//             <NativeSelect
//               onChange={(event) => {
//                 event.preventDefault();
//                 setSex(event.target.value)
//               }}
//               inputProps={{
//                 name: 'sex',
//                 id: 'uncontrolled-native',
//               }}
//             >
//               <option 
//               value={0}
//               >선택</option>
//               <option 
//               value={1}
//               >남자</option>
//               <option 
//               value={2}
//               >여자</option>
//             </NativeSelect>
//           </FormControl>
//         </Box>
//     )
// }