// utils/emailValidator.js
const express = require('express');
const axios = require('axios');


async function checkEmailValid(email) {
  try {
    const response = await axios.get("https://api.hunter.io/v2/email-verifier", 
      {params: {
        email: email,
        api_key: process.env.HUNTER_API_KEY,
        }
      });
    const status = response.data.data.status;

    if (status === "valid") {
      return true;
    }
    return false;

  } catch {
    console.error('Error verifying email: \n', error);
    return false;
  }
}


module.exports = checkEmailValid;