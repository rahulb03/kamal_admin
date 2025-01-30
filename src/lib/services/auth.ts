"use client"

import axios, { AxiosPromise } from 'axios';
import { jwtDecode } from 'jwt-decode';
import {  headers } from '@/config/constant';// TODO: Replace with your Strapi backend URL
import { STRAPI_URL } from '@/config/constant';

export type User = {
  id: number;
  username: string;
  email: string;
  organization: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export async function login(identifier: string, password: string): Promise<AuthResponse> {
  try {
    const res = await axios.post(`${STRAPI_URL}/api/auth/local`, {
      identifier,
      password,
    }); 
     
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
}

export async function register(username: string, email: string, password: string ): Promise<AuthResponse> {
  try {
    const res = await axios.post(`${STRAPI_URL}/api/auth/local/register`, {
      username,
      email,
      password,
      // organizatio/n,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
}

export async function updateProfile(userId: number, data: Partial<User>, token: string): Promise<User> {
  try {
    const res = await axios.put(
      `${STRAPI_URL}/api/users/${userId}`,
      data,
      {
        headers

      }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Profile update failed');
  }
}

export function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
  } catch {
    return false;
  }
}
