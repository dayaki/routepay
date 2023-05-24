import React from 'react';
import { apiService, postRegister } from '@utils';
import axios from 'axios';

type RegisterData = {
  email: string;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  status: boolean;
};

export const registerUser = (data: {}) => {
  return axios.post(postRegister, data).then(res => res.data);
};

export const createUserFn = async (formData: RegisterData) => {
  try {
    const response = await apiService(postRegister, 'post', formData);
    console.log('createUserFn', response);
    if (response.message.includes('Duplicate Email')) {
      throw 'Your email address is already in use!';
    } else if (
      response.message.includes(
        'PasswordTooShort,PasswordRequiresNonAlphanumeric',
      )
    ) {
      throw 'Password requires special characters and uppercase.';
    }
    return response;
  } catch (error) {
    throw 'An error occurred while processing your request.';
  }
};
