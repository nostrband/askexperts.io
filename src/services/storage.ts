import { UserData } from './api';

const USER_DATA_KEY = 'askexperts_user_data';

export const storage = {
  /**
   * Save user data to localStorage
   * @param userData User data to save
   */
  saveUserData: (userData: UserData): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  },

  /**
   * Get user data from localStorage
   * @returns User data or null if not found
   */
  getUserData: (): UserData | null => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(USER_DATA_KEY);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          return null;
        }
      }
    }
    return null;
  },

  /**
   * Clear user data from localStorage
   */
  clearUserData: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_DATA_KEY);
    }
  },

  /**
   * Check if user is logged in
   * @returns True if user is logged in
   */
  isLoggedIn: (): boolean => {
    return !!storage.getUserData()?.token;
  },
};