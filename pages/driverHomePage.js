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

  import { useState } from 'react'; 
  import axios from "axios";
  import { useRouter } from 'next/router'
  
  export default function driverHome() {
    const router = useRouter()
    const { username } = router.query
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>From driver Home Page</Heading>
            <Heading fontSize={'4xl'}>{username}</Heading>
          </Stack>
          
        </Stack>
      </Flex>
    );
  }