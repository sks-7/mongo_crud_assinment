import React, { useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import { addTask, loadTasks } from '../Redux/action';
import { useNavigate } from 'react-router-dom';

const initialState = {
  Name: '',
  Phonenumber: 0,
  Email: '',
  hobbies: '',
};

const Addtask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Name, Phonenumber, Email, hobbies } = state;
  const toast = useToast();

  const handalAdd = () => {
    if (!Name || !Phonenumber || !Email || !hobbies) {
      toast({
        title: 'All the Input filled is required',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } else {
      dispatch(addTask(state, toast));

      navigate('/');

      dispatch(loadTasks());
    }
  };

  const handalChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };
  return (
    <>
      <Button onClick={onOpen}>Add form</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Container>
              <FormControl>
                <FormLabel> Name</FormLabel>
                <Input
                  placeholder=" Name"
                  name="Name"
                  value={Name || ''}
                  onChange={handalChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="Phonenumber"
                  placeholder="Phonenumber"
                  value={Phonenumber || ''}
                  onChange={handalChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="Email"
                  placeholder="Email"
                  value={Email || ''}
                  onChange={handalChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Hobbies</FormLabel>
                <Input
                  name="hobbies"
                  placeholder="hobbies"
                  value={hobbies || ''}
                  onChange={handalChange}
                />
              </FormControl>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={'blue'} mr={3} onClick={(handalAdd)}>
              Save
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addtask;
