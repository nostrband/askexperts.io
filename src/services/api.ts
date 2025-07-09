import { API_BASE_URL } from '@/config';

export interface SignupResponse {
  token: string;
  userId: string;
  mcp_server_url: string;
  // Add any other fields returned by the API
}

export interface UserData {
  token: string;
  userId: string;
  mcp_server_url: string;
  // Add any other user data fields
}

export const api = {
  /**
   * Sign up a new user
   * @returns Promise with the signup response
   */
  signup: async (): Promise<SignupResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },
};