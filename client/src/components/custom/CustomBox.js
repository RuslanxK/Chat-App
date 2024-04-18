import { Box } from '@mui/material'

const CustomBox = ({children}) => {
  return (
    <Box p={5} ml={5} mr={5} component="section" display="flex" flexDirection="column" alignItems="center" width={520} borderRadius={3} height={400} backgroundColor="white" justifyContent="center" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">{children}</Box>
  )
}

export default CustomBox