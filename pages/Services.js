import React, { useState } from "react";
// import DefaultService from './DefaultService'
import axios from 'axios'



class Services {

    static instance = Services.instance || new Services()

    async getActiveDrivers() {
    try {
      const response = await axios.post("http://localhost:3001/getActiveDrivers", 
        {withCredentials: true},
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching active drivers:", error);
      return [];
    }

  }

  async getDriverProfile(username) {
    try {
      const response = await axios.post(
        "http://localhost:3001/getDriverProfile",
         {username },
        { withCredentials: true },
         
      );
      const responseData = response.data;
      return responseData
    } catch (error) {
      console.error("Error fetching driver's profile:", error);
      return ;
    }

  }

  async getAllDrivers() {
    try {
      const response = await axios.post(
        "http://localhost:3001/getAllDrivers",
        { withCredentials: true },
         
      );
      const responseData = response.data;
      return responseData
      } catch (error) {
        console.error("Error fetching driver's profile:", error);
        return ;
      }

  }

  async updateStatus(username, latitude, longitude, status) {
    try {
      const response = await axios.post(
        "http://localhost:3001/updateStatus",
        { username, latitude, longitude, status },
        { withCredentials: true },
      );
      const responseData = response.data;
      return responseData
      console.log("Received data:", responseData);
      // Do something with the received data
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }
}



export default Services;