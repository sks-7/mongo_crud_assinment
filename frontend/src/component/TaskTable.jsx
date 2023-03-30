import React, { useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  useToast,
} from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from '@chakra-ui/react';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, loadTasks } from '../Redux/action';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TaskTable = () => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);

  const { tasks } = useSelector((state) => state);

  const toast = useToast();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const handleCheckboxChange = (e, ele) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, ele]);
    } else {
      setSelectedRows(selectedRows.filter((row) => row._id !== ele._id));
    }
  };

  // console.log(selectedRows);

  const handalDelete = (id) => {
    if (window.confirm('Do you want to delete the task ?')) {
      dispatch(deleteTask(id));
      dispatch(loadTasks());
    }
  };

  const handalEmail = async () => {
    try {
      await axios.post('http://localhost:8080/email/post', selectedRows);
    } catch (e) {
      console.log('error', e);

      toast({
        title: 'Email is not sent something went wrong',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    }

    toast({
      title: 'Email sent successfully',
      status: 'success',
      duration: 5000,
      position: 'top',
      isClosable: true,
    });
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="#e8f5fd">
          <Thead>
            <Tr>
              <Th>Select row</Th>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Hobbies</Th>
              <Th>Actions</Th>
              <Th>Send email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks &&
              tasks.map((ele, ind) => (
                <Tr key={ele._id}>
                  <Td>
                    <Checkbox onChange={(e) => handleCheckboxChange(e, ele)} />
                  </Td>
                  <Td>{ind}</Td>
                  <Td>{ele.Name}</Td>
                  <Td>{ele.Phonenumber}</Td>
                  <Td>{ele.Email}</Td>
                  <Td>{ele.hobbies}</Td>

                  <Td>
                    <Popover>
                      <PopoverTrigger>
                        <Button>
                          <BsThreeDotsVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>select</PopoverHeader>

                        <Link to={`/edit/${ele._id}`}>
                          <PopoverBody
                            style={{ cursor: 'pointer' }}
                            _hover={{ background: 'blue', color: 'white' }}
                          >
                            Update
                          </PopoverBody>
                        </Link>

                        <PopoverBody
                          style={{ cursor: 'pointer' }}
                          _hover={{ background: 'red', color: 'white' }}
                          onClick={() => handalDelete(ele._id)}
                        >
                          Delete
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>

                  <Td>
                    <Button onClick={handalEmail}>Send Email</Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
