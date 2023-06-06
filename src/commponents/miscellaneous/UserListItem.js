import React from "react"
import { Box, Avatar, Text } from "@chakra-ui/react"
const UserListItem = ({ handleFunction, user }) => {
  return (
    <Box
      onClick={handleFunction}
      background="#E8E8E8"
      _hover={{
        background: "#38b2ac",
        color: "white",
        cursor: "pointer"
      }}
      width="100%"
      alignItems="center"
      display="flex"
      color="black"
      px={3}
      py={2}
      mb={3}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.pseudo}
        src={user.picture}
      />
      <Box>
        <Text>{user.pseudo}</Text>
        <Text fontSize="xs"> <b>Email :</b> {user.email}</Text>
      </Box>
    </Box>
  )
}

export default UserListItem;