import { UserData } from './api';

const USER_DATA_KEY = 'askexperts_user_data';
const NWC_STRING_KEY = 'askexperts_nwc_string';
const NWC_CONNECTED_KEY = 'askexperts_nwc_connected';

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

  /**
   * Save NWC connection string to localStorage
   * @param nwcString NWC connection string
   */
  saveNwcString: (nwcString: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(NWC_STRING_KEY, nwcString);
    }
  },

  /**
   * Get NWC connection string from localStorage
   * @returns NWC connection string or null if not found
   */
  getNwcString: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(NWC_STRING_KEY);
    }
    return null;
  },

  /**
   * Save connected NWC string to localStorage
   * @param nwcString Connected NWC string
   */
  saveConnectedNwcString: (nwcString: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(NWC_CONNECTED_KEY, nwcString);
    }
  },

  /**
   * Get connected NWC string from localStorage
   * @returns Connected NWC string or null if not found
   */
  getConnectedNwcString: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(NWC_CONNECTED_KEY);
    }
    return null;
  },
};