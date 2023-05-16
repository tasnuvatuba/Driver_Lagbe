import { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import RequestCard from "./components/RequestCard";
import { useRouter } from 'next/router';
import { OwnerNavbar } from './components';
import { Header } from "./container";
import '/sentRequests.css'

export default function sentRequest() {
  const [requests, setRequests] = useState([]);

  const router = useRouter();
  const { username } = router.query;
  const ownerUsername = username;

  console.log(username);

  useEffect(() => {
    axios({
        method: 'post',
        withCredentials: true,
        data: {
            ownerUsername: ownerUsername

        },
        url: 'http://localhost:3001/sentRequest'
      })
        .then(res => {
            setRequests(res.data);
            
        })
        .catch(err => {
            console.log(err);
        })




  }, [ownerUsername]);

  if (!requests) {
    // Render a loading state or fallback UI when driverProfile is null
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div style={{ marginTop: '50px' , marginLeft: '30px', marginRight: '30px'}}>
        <header className="header">
          <h1>Available Drivers</h1>
        </header>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
                {requests.map((request) => (
                    <RequestCard key={request.id} request={request} />
                ))}
            </SimpleGrid>
        </div>
    </div>
    
  );
}
