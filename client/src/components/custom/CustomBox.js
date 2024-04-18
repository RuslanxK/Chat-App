import { Box } from '@mui/material'

const CustomBox = ({children}) => {
  return (
    <Box p={3} ml={2} mr={2} component="section" display="flex" flexDirection="column" alignItems="center" width={520} borderRadius={3} height={400} backgroundColor="white" justifyContent="center" boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px">{children}</Box>
  )
}

export default CustomBox