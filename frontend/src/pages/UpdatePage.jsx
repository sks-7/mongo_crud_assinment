import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getSingleTasks, loadTasks, updateTask } from '../Redux/action';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePage = () => {
  const [state, setState] = useState({
    Name: '',
    Phonenumber: 0,
    Email: '',
    hobbies: '',
  });

  let { id } = useParams();

  console.log(id);
  const { singletask } = useSelector((state) => state);
  const navigate = useNavigate();
  const toast = useToast();

  const dispatch = useDispatch();

  const { Name, Email, hobbies, Phonenumber } = state;

  useEffect(() => {
    dispatch(getSingleTasks(id));
    // dispatch(loadUsers());
  }, []);

  useEffect(() => {
    if (singletask) {
      setState({ ...singletask });
    }
  }, [singletask]);

  const handalChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handalSubmmit = () => {
    if (!Name || !Email || !hobbies || !Phonenumber) {
      toast({
        title: 'All the Input filled is required',
        status: 'error',
        duration: 5000,
        position: 'top',
        isClosable: true,
      });
    } else {
      dispatch(updateTask(state, id));
      navigate('/');
      dispatch(loadTasks());
    }
  };

  return (
    <>
      <Container>
        <FormControl>
          <FormLabel> Name</FormLabel>
          <Input
            placeholder=" Name"
            name="Name"
            value={Name}
            onChange={handalChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="Phonenumber"
            placeholder="Phonenumber"
            value={Phonenumber}
            onChange={handalChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="Email"
            placeholder="Email"
            value={Email}
            onChange={handalChange}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Hobbies</FormLabel>
          <Input
            name="hobbies"
            placeholder="hobbies"
            value={hobbies}
            onChange={handalChange}
          />
        </FormControl>

        <Button mt="30px" w="100%" onClick={handalSubmmit}>
          Update
        </Button>
      </Container>
    </>
  );
};

export default UpdatePage;
