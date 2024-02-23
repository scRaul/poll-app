'use server';


const api = 'https://us-central1-poll-24d19.cloudfunctions.net/api/users';

export async function getUserName(userId: string) {
  try {
    let response = await fetch(`${api}/username/${userId}`, {
      method: 'GET',
    });
    let data = await response.json();
    if (!response.ok) {
      return {message: 'wasn\'t able to find user', username: null};
    }
    return {message: data.message, username: data.username};
  } catch (error) {
    console.log(error);
    return {message: 'wasn\'t able to find user', username: null};
  }
}