import { createContext, ReactNode } from 'react';
import { Role } from '../services/IAuthService';

interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null });

export interface AuthProviderProps {
    children: ReactNode;
}