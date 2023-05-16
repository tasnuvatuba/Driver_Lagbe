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
  import { useEffect, useState } from 'react';
  import axios from "axios";
  import { useRouter } from 'next/router';
import Services from './Services';
import { colors } from './constants/colors';
  
  export default function SignupCard() {
    const [header, setHeader] = useState('');
    const [nameLabel, setNameLabel] = useState('');
    const [usernameLabel, setUsernameLabel] = useState('');
    const [dobLabel, setDOBLabel] = useState('');
    const [genderLabel, setGenderLabel] = useState('');
    const [NIDLabel, setNIDLabel] = useState('');
   

    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [registerName, setRegisterName] = useState('');
    const [registerDoB, setRegisterDoB] = useState('');
    const [registerGender, setRegisterGender] = useState('');
    const [registerNID, setRegisterNID] = useState('');
    const [registerPhoneNo, setRegisterPhoneNo] = useState('');
    const [regsiterLocation, setRegisterLocation] = useState('');
    
    const toast = useToast();
    const router = useRouter();


    const [purpose, setPurpose] = useState("");
    const [ownerProfile, setOwnerProfile] = useState([])
  
    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      const purpose = queryParams.get('purpose');
      

      // Use the sourcePage value in your logic
      console.log('purpose:', purpose);
      setPurpose(purpose)

      if(purpose === null){
        //fetch data from database
        console.log("inside check");
        setPurpose("register");
        console.log(purpose);
      }

      setHeader("Register as a Owner");
      setNameLabel("Full Name");
      setUsernameLabel("Username (Please choose a unique username)");
      setDOBLabel("Date of Birth");
      setGenderLabel("Gender");
      setNIDLabel("NID Number");

    
      const fetchOwnerProfile = async () => {
        const username = localStorage.getItem('username');
        const services = new Services();
        const profileData = await services.getOwnerProfile(username);
        setOwnerProfile(profileData[0]);
        console.log(profileData[0])

        setHeader("Edit Profile");
        setNameLabel("Full Name: " + profileData[0].name);
        setUsernameLabel("Username: " + profileData[0].username);
        setDOBLabel("Date of Birth: " + profileData[0].dob);
        setGenderLabel("Gender: " + profileData[0].gender);
        setNIDLabel("NID Number: " + profileData[0].nId);

      };

    

      if(purpose === 'editProfile' && ownerProfile){
        //fetch data from database
        fetchOwnerProfile();
      }
    
    }, []);


    const saveToDatabase = () => {

      if(registerPhoneNo.length>0 && regsiterLocation.length>0 ){
        //save to database
        const services = new Services();
        const username = localStorage.getItem('username');
        const response = services.updateOwnerProfile(username, registerPhoneNo, regsiterLocation);

        if(response === "Failed to update profile" || response === "Error updating profile"){
          toast({
            title: 'Error',
            description: response,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
        else if(response === "Error updating profile"){
          toast({
            title: 'Error',
            description: response,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
    
        else {
          toast({
            title: 'Success',
            description: response,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    
      }
    }
      else{
        toast({
          title: 'Error',
          description: 'Please fill in all the fields',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        
      }
    };

    const isFieldVisible = (purpose) => {
      switch (purpose) {
        case 'editProfile':
          return false; // All fields are not visible for editing the profile
        case 'register':
          return true; // All fields are visible for registration
        default:
          return true; // Default to making all fields visible
      }
    };

    const getFields = () => {
      console.log("edit profile")

      document.getElementById('phone').placeholder = ownerProfile.phone;
      document.getElementById('location').placeholder = ownerProfile.address;

    };
    

    const register = () => {

        //check if all input are filled
        if(registerUsername.length>0 && registerPassword.length>0 && registerName.length>0 && registerDoB.length>0 && registerGender.length>0
          && registerNID.length>0  && registerPhoneNo.length>0 && regsiterLocation.length>0){
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

        
              axios({
                method: 'post',
                data: {
                  username: registerUsername,
                  password: registerPassword,
                  name: registerName,
                  dob: registerDoB,
                  gender: registerGender,
                  nId: registerNID,
                  phone: registerPhoneNo,
                  date: registerDate, 
                  location: regsiterLocation

                },
                withCredentials: true,
                url: 'http://localhost:3001/registerAsOwner'
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
        bg={colors.bg_light}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              {header}
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="fullName" isRequired>
                <FormLabel>{nameLabel}</FormLabel>
                {isFieldVisible(purpose) && 
                <Input type="text" onChange={e => setRegisterName(e.target.value)}/> }
              </FormControl>
              <FormControl id="username" isRequired>
                {console.log('Username: ', registerUsername)}
                <FormLabel>{usernameLabel}</FormLabel>
                {isFieldVisible(purpose) && 
                <Input type="text" onChange={e => setRegisterUsername(e.target.value)}/> }
              </FormControl>
              {isFieldVisible(purpose) && 
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                
                <Input type={registerPassword ? 'text' : 'password'} onChange={e => setRegisterPassword(e.target.value)}/> 
              </FormControl> }
              <FormControl id="dob" isRequired>
                <FormLabel>{dobLabel}</FormLabel>
                {isFieldVisible(purpose) && 
                <Input type="date" onChange={e => setRegisterDoB(e.target.value)}/> }
              </FormControl>
              <FormControl id="gender" isRequired>
                <FormLabel>{genderLabel}</FormLabel>
                {isFieldVisible(purpose) && 
                <RadioGroup onChange={setRegisterGender} value={registerGender}>
                  <Stack direction='row'>
                    <Radio value='male'>Male</Radio>
                    <Radio value='female'>Female</Radio>
                    <Radio value='others'>Others</Radio>
                  </Stack>
                </RadioGroup> }
              </FormControl>
              
              <FormControl id="nId" isRequired>
                <FormLabel>{NIDLabel}</FormLabel>
                {isFieldVisible(purpose) && 
                <Input type="number" onChange={e => setRegisterNID(e.target.value)}/> }
              </FormControl>
              <FormControl id="location" isRequired>
                <FormLabel>Area of Living (Please be specific)</FormLabel>
                <Input type="text" onChange={e => setRegisterLocation(e.target.value)}/>
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input type="number" onChange={e => setRegisterPhoneNo(e.target.value)}/>
              </FormControl>
              
              { isFieldVisible(purpose) && 
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
              }
              
              {isFieldVisible(purpose) && 
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href="/login" color={colors.bt_dark} fontWeight="bold">Login</Link>
                </Text>
              </Stack> }

              {purpose === 'editProfile' && getFields()}
              {purpose === 'editProfile' &&
                (<Stack spacing={10} pt={2}>
                  <Button
                    onClick={saveToDatabase}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Save Profile Update
                  </Button>
                </Stack>
                )
              }
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }