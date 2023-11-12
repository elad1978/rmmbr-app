import axios from "axios";
//const axios = require("axios");

//get
export async function fetchDataFromDatabase(endpoint) {
  try {
    const response = await axios.get(endpoint);
    return response.data; // Assuming the data is in JSON format
  } catch (error) {
    throw new Error(`Error fetching data from ${endpoint}: ${error.message}`);
  }
}
//post-regular
export async function postDataToDatabase(endpoint, dataToSend) {
  try {
    const response = await axios.post(endpoint, dataToSend);
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    throw new Error(`Error posting data to ${endpoint}: ${error.message}`);
  }
}

// post-with-file
export async function postDataWithFileToDatabase(endpoint, dataToSend) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data", // Use 'multipart/form-data' when sending files
      // Add other headers if needed, for example:
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    };
    console.log(dataToSend);
    const response = await axios.post(endpoint, dataToSend, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error posting data to ${endpoint}: ${error.message}`);
  }
}

//put
export async function updateDataInDatabase(endpoint, dataToUpdate) {
  try {
    const response = await axios.put(endpoint, dataToUpdate);
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    throw new Error(`Error updating data at ${endpoint}: ${error.message}`);
  }
}

export async function putDataWithFileToDatabase(endpoint, dataToSend) {
  try {
    const headers = {
      "Content-Type": "multipart/form-data", // Use 'multipart/form-data' when sending files
      // Add other headers if needed, for example:
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    };
    console.log(dataToSend);
    const response = await axios.put(endpoint, dataToSend, { headers });
    return response.data;
  } catch (error) {
    throw new Error(`Error putting data to ${endpoint}: ${error.message}`);
  }
}

//delete

export async function deleteDataFromDatabase(endpoint) {
  try {
    const response = await axios.delete(endpoint);
    return response.data; // Assuming the response contains data in JSON format
  } catch (error) {
    throw new Error(`Error deleting data from ${endpoint}: ${error.message}`);
  }
}
