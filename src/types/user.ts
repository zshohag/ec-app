export interface User {
  _id?: string;
  email: string;
  name: string;
  image?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}