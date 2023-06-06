import React from "react"
import { Box } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"
const UserBadgeItem = ({ user, handleFunction }) => {
  return <Box
    px={2}
    py={1}
    m={1}
    mb={2}
    variant="solid"
    display="flex"
    fontSize={12}
    cursor="pointer"
    onClick={handleFunction}

  >
    <Avatar src={user.picture} size="sm" />
    <i className="ri ri-close-line" onClick={handleFunction}></i>
  </Box>
}

export default UserBadgeItem;