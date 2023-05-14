import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { RadioGroup } from "@chakra-ui/react";
  import { HStack, VStack } from "@chakra-ui/react";
  import { Radio } from "@chakra-ui/react";
  import { useRouter } from 'next/router';

  import { useState } from 'react'; 
  import axios from "axios";
  
  export default function SimpleCard() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('');

    const toast = useToast();
    const router = useRouter();
  
    const login = () => {
      //check if all input are filled
      if(username.length > 0 && password.length > 0 && loginType.length > 0){
          //all filled
          {console.log('all field')}

        
          axios({
            method: 'post',
            data: {
              username: username,
              password: password,
              loginType: loginType
            },
            withCredentials: true,
            url: 'http://localhost:3001/login'
          })
          .then(res => {
            //homepage
            if(res.data === "successOwner"){
              //router.push('/ownerHomePage');
              localStorage.setItem('username', username)
              localStorage.setItem('username', "fabiha")
              router.push({
                pathname: '/ownerHomePage',
                query: { username: username }
              })

            }
            else if(res.data === "successDriver"){
              //router.push('/driverHomePage')
              localStorage.setItem('username', username)
              router.push({
                pathname: '/driverHomePage',
                query: { username: username }
              })
            }
            else{
              toast({
                title: 'Error',
                description: res.data,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });

            }
          })
          .catch(err => {console.log(err)})

      }

      else{
        //blank input
        {console.log('blank input')}
        toast({
          title: 'Error',
          description: 'Please fill in all the fields',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      
    }
    

    //ui
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Login</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={e => setUsername(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={e => setPassword(e.target.value)}/>
              </FormControl>
              <FormControl id="ownerOrdriver" isRequired>
                <FormLabel> Please select one</FormLabel>
                <RadioGroup onChange={setLoginType} value={loginType}>
                  <HStack spacing='24px'>
                    <Radio value='owner'>Car Owner</Radio>
                    <Radio value='driver'>Driver</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  onClick={login}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Login
                </Button>
              </Stack>
              <VStack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Text>Not registered yet? </Text>
              <Link href="/registerAsOwner" color={'blue.400'}>Register as a Car Owner</Link>
              <Link href="/registerAsDriver" color={'blue.400'}>Register as a Driver</Link>
              </VStack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }