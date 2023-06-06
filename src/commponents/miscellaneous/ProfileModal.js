import React from "react"
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton } from "@chakra-ui/button"
import { Text } from "@chakra-ui/layout"
import { Modal, ModalOverlay, ModalBody, ModalHeader, ModalContent, ModalCloseButton, ModalFooter, Image } from '@chakra-ui/react'
const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>{
			children ? (
				<span onClick={onOpen}>{children}</span>
			) : (
				<IconButton 
				background="var(--color-white)"
				color="var(--color-name)"
				     _hover={{
                    background: "var(--color-light)",
                    color: "white",
                    cursor: "pointer"
                  }}
				d={{ base: "flex" }} icon={<i className="ri-eye-line" />} onClick={onOpen} />
			)}
			<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent
				background="var(--color-white)"
				color="var(--color-name)"
				 height="410px">
					<ModalHeader
						sx={{ display: "flex", justifyContent: "center", fontSize: "40px", fontFamily: "Work sans" }}
					>{user.pseudo}</ModalHeader>
					<ModalCloseButton />
					<ModalBody
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="space-between"
					>
						<Image
							borderRadius="full"
							boxSize="150px"
							src={user.picture}
							alt={user.pseudo}

						/>
						<Text fontSize={{ base: "1.5rem", md: "2rem" }}>Email : {user.email}</Text>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ProfileModal;