import { Box, Chip } from "@mui/material"

export default function FilterTags({ tagList, setTagList, tags }) {

    const handleTag = (id) => {
        tagList.includes(id) ? (
          setTagList((prev) => prev.filter(x => x != id))
        ) : (
          setTagList((prev) => [...prev, id])
        )
      }

    return (
        <Box
      display='flex'
      alignItems='center'
      sx={{
        mt: 2
      }}
      >
        {tags.map((tag) => {
          return (
            <Chip
            sx={{
              mr: 1
            }}
            key={tag.id}
            label={`# ${tag.content}`}
            variant={tagList.includes(tag.id) ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleTag(tag.id)}
             />
          )
        })}
      </Box>
    )

}