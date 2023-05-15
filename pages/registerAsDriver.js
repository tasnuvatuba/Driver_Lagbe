import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react';
  import { RadioGroup } from "@chakra-ui/react";
  import { Radio } from "@chakra-ui/react";
  import { useState } from 'react';
  import axios from "axios";
  import { useRouter } from 'next/router';
import { colors } from './constants/colors';
  
  export default function SignupCard() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [registerName, setRegisterName] = useState('');
    const [registerDoB, setRegisterDoB] = useState('');
    const [registerGender, setRegisterGender] = useState('');
    const [registerNID, setRegisterNID] = useState('');
    const [registerDrivingID, setRegisterDrivingID] = useState('');
    const [registerExperience, setRegisterExperience] = useState('');
    const [registerPhoneNo, setRegisterPhoneNo] = useState('');
    const [regsiterLocation, setRegisterLocation] = useState('');
    const [registerFare, setRegisterFair] = useState('')

    const toast = useToast();
    const router = useRouter();
    
    

    const register = () => {

        //check if all input are filled
        if(registerUsername.length>0 && registerPassword.length>0 && registerName.length>0 && registerDoB.length>0 && registerGender.length>0
          && registerNID.length>0 && registerDrivingID.length>0 && registerExperience.length>0 &&registerPhoneNo.length>0 && regsiterLocation.length>0 && registerFare.length>0 ){
            //all filled
            {console.log('all field')}


            //checking age validity
            const today = new Date();
            const registerDate = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;

            const birthDate = new Date(registerDoB);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }

            if(age<18){
              toast({
                title: 'Error',
                description: 'Age must be more than 18',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });

            }

            else{ //valid age
              const experience = parseInt(registerExperience)
              //checking experience validity
              if(experience>=age){
                toast({
                  title: 'Error',
                  description: 'Experience must be less than age',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                });
              }

              else{//valid experience

                axios({
                  method: 'post',
                  data: {
                    username: registerUsername,
                    password: registerPassword,
                    name: registerName,
                    dob: registerDoB,
                    gender: registerGender,
                    nId: registerNID,
                    drivingId: registerDrivingID,
                    experience: registerExperience,
                    phone: registerPhoneNo,
                    date: registerDate, 
                    location: regsiterLocation,
                    fare: registerFare
    
                  },
                  withCredentials: true,
                  url: 'http://localhost:3001/registerAsDriver'
                })
                .then(res => {
                  if(res.data === "success"){
                    router.push('/login')
                    toast({
                      title: 'Success',
                      description: 'Successfully registered',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                  else if(res.data === "duplicateUsername"){
                    toast({
                      title: 'Error',
                      description: 'Username already in use, Please use another username',
                      status: 'error',
                      duration: 5000,
                      isClosable: true,
                    });

                  }
                  else
                    console.log(res)
                      
                })
                .catch(err => {console.log(err)})

              }

            }

            

            
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




  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={colors.bg_light}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Register as a Driver
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" onChange={e => setRegisterName(e.target.value)}/>
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username (Please choose a unique username)</FormLabel>
                <Input type="text" onChange={e => setRegisterUsername(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type={registerPassword ? 'text' : 'password'} onChange={e => setRegisterPassword(e.target.value)}/>
              </FormControl>
              <FormControl id="dob" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input type="date" onChange={e => setRegisterDoB(e.target.value)}/>
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup onChange={setRegisterGender} value={registerGender}>
                  <Stack direction='row'>
                    <Radio value='male'>Male</Radio>
                    <Radio value='female'>Female</Radio>
                    <Radio value='others'>Others</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl id="nId" isRequired>
                <FormLabel>NID Number</FormLabel>
                <Input type="number" onChange={e => setRegisterNID(e.target.value)}/>
              </FormControl>
              <FormControl id="drivingId" isRequired>
                <FormLabel>Driving Licence ID Number</FormLabel>
                <Input type="number" onChange={e => setRegisterDrivingID(e.target.value)}/>
              </FormControl>
              <FormControl id="location" isRequired>
                <FormLabel>Area of Living (Please be specific)</FormLabel>
                <Input type="text" onChange={e => setRegisterLocation(e.target.value)}/>
              </FormControl>
              <FormControl id="experience" isRequired>
                <FormLabel>Experience (in years)</FormLabel>
                <Input type="number" onChange={e => setRegisterExperience(e.target.value)}/>
              </FormControl>
              <FormControl id="fare" isRequired>
                <FormLabel>Charged fare per Hour in BDT (approximated)</FormLabel>
                <Input type="number" onChange={e => setRegisterFair(e.target.value)}/>
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type="number" onChange={e => setRegisterPhoneNo(e.target.value)}/>
              </FormControl>
              
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={register}
                  loadingText="Submitting"
                  size="lg"
                  bg={colors.bt_light}
                  color={'white'}
                  _hover={{
                    bg: colors.bt_dark
                  }}>
                  Register
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href="/login" color={colors.bt_dark} fontWeight="bold">Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }