'use server';

import {PollPrep} from '@/lib/models';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {revalidateTag} from 'next/cache';
const api = 'https://us-central1-poll-24d19.cloudfunctions.net/api/polls';
// const api = 'http://127.0.0.1:5001/poll-24d19/us-central1/api/polls';

export async function sendVote(pollId: string, selection: number) {
  try {
    var user = 'guest';
    const userId = cookies().get('user')?.value;
    if (userId) {
      user = userId
    }
    const jsonData = JSON.stringify({user, selection});
    let response = await fetch(`${api}/vote/${pollId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });
    let data = await response.json();
    if (!response.ok) {
      return {message: 'something went wrong', answers: {}};
    }
    revalidateTag(`poll-${pollId}`);
    return {message: data.message, answers: data.answers.answers};
  } catch (error) {
    console.error(error);
    return {message: 'something went wrong', answers: {}};
  }
}


export async function getPollById(pollId: string) {
  try {
    let response = await fetch(
        `${api}/get/${pollId}`,
        {method: 'GET', next: {tags: [`poll-${pollId}`]}});
    let data = await response.json();
    if (!response.ok) {
      redirect('/');
    }
    return data.poll;
  } catch (error) {
    console.log(error);
    redirect('/');
  }
}

export async function getUsersPolls() {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user', polls: {}
      }
    }
    const response = await fetch(`${api}/my-polls`, {
      method: 'GET',
      headers: {'Authorization': 'bearer ' + token},
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(data.message)
      return {message: 'Unable to retrieve polls'};
    }
    return {message: 'successfully retrived polls', polls: data.polls};
  } catch (err) {
    console.error(err);
    return {message: 'error', polls: {}};
  }
}
export async function createPoll(poll: PollPrep) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user', polls: {}
      }
    }

    const jsonData = JSON.stringify(poll);
    const response = await fetch(`${api}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: jsonData
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.message)
      return {message: 'Unable to retrieve polls', poll: {}};
    }
    return {message: 'successfully retrived polls', poll: data.poll};
  } catch (err) {
    console.error(err);
    return {message: 'error', poll: {}};
  }
}
export async function deletePoll(pollId: string) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user', polls: {}
      }
    }
    const response = await fetch(`${api}/delete/${pollId}`, {
      method: 'DELETE',
      headers: {'Authorization': 'bearer ' + token},
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.message)
      return {message: 'unsuccessfull'};
    }
    revalidateTag(`poll-${pollId}`);
    return {message: 'successfull'};
  } catch (err) {
    console.error(err);
    return {message: 'error'};
  }
}
// only allowed to update if voting is live
export async function updatePoll(pollId: string, isOpen: boolean) {
  try {
    const token = cookies().get('session')?.value;
    if (!token) {
      return {
        message: 'unable to verify user', polls: {}
      }
    }

    const jsonData = JSON.stringify({isOpen: isOpen ? 'true' : 'false'});
    const response = await fetch(`${api}/update/${pollId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + token
      },
      body: jsonData
    });
    const data = await response.json();
    if (!response.ok) {
      console.log(data.message)
      return {message: 'unsuccessfull'};
    }
    revalidateTag(`poll-${pollId}`);
    return {message: 'successfull'};
  } catch (err) {
    console.error(err);
    return {
      message: 'error', poll: {}
    }
  }
}