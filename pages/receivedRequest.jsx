import { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import ReceivedReqCard from "./components/receivedReqCard";
import { useRouter } from 'next/router';


export default function sentRequest() {
  const [requests, setRequests] = useState([]);

  const router = useRouter();
  const { username } = router.query;
  const driverUsername = username;

  console.log("driverUsername: ", driverUsername);

  useEffect(() => {
    axios({
        method: 'post',
        withCredentials: true,
        data: {
            driverUsername: driverUsername

        },
        url: 'http://localhost:3001/receivedRequest'
      })
        .then(res => {
            setRequests(res.data);
            
        })
        .catch(err => {
            console.log(err);
        })




  }, [driverUsername]);

  if (!requests) {
    // Render a loading state or fallback UI when driverProfile is null
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: '50px' , marginLeft: '30px', marginRight: '30px'}}>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
      {requests.map((request) => (
        <ReceivedReqCard key={request.id} request={request} />
      ))}
    </SimpleGrid>

    </div>
    
  );
}
