'use server';


import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
const api =
    'https://us-central1-poll-24d19.cloudfunctions.net/api/authenticate';


export async function signup(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(rawData);
    let response = await fetch(`${api}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonData,
    });
    let data = await response.json();
    if (!response.ok) {
      return {message: data.message};
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Signing up failed...Please try again later.'
    }
  }
  redirect('/login');
}

export async function login(formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(rawData);
    let response = await fetch(`${api}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonData,
    });
    let data = await response.json();

    if (!response.ok) {
      return {message: data.message};
    }
    cookies().set('session', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });
    cookies().set('user', data.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    })
  } catch (error) {
    console.log(error);
    return {
      message: error
    }
  }
  redirect('/dashboard');
}

export async function getMyId() {
  const userId = cookies().get('user');
  if (!userId) redirect('/login');
  return userId.value;
}