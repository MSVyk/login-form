'use server';
import { createProfile, newPrivateKey } from './contract';
import { login } from './actions';
import { dropUser, storeUser } from './storage';

export const setUpProfile = async (form: FormData) => {

  const newUser = {
    username: form.get('username') as string,
    name: form.get('name') as string,
    privateKey: newPrivateKey(),
  };

  storeUser(newUser);

  try {
    await createProfile(newUser);
    await login(newUser);
  } catch (error) {
    dropUser(newUser);
    throw error;
  }
};
