/* eslint-disable no-useless-catch */

import { ApiUrl } from "../lib/constants";

export const getUserByUsername = async ({
  username,
}: {
  username: string;
}): Promise<ApiResponse<User[]>> => {
  try {
    const response = await fetch(`${ApiUrl}/search/users?q=${username}`);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getRepository = async (url: string): Promise<Repo[]> => {
  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
};
