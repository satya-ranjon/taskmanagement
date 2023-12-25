import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  UserCredential,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import auth from "../firebase/firebaseConfig";
import { ToastContainer } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}

export interface User {
  uid?: string;
  providerData?: {
    displayName?: string | null;
    photoURL?: string | null;
  }[];
}

export interface AuthContextType {
  loginGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  user: User;
  userId: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  registration: (email: string, password: string) => Promise<UserCredential>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registration = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = async (name: string, photo: string) => {
    return updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
      setUser(user?.providerData?.[0] || {});
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginGoogle,
        logoutUser,
        user,
        userId,
        loading,
        login,
        registration,
        updateUserProfile,
      }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
