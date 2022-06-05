import type { User } from '@prisma/client';
import React, {
  createContext, useContext,
} from 'react';
import { v4 as uuid } from 'uuid'

export const AuthContext = createContext<string | null>(null);

export const AuthProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [userId, setUserId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      let tmpUserId = localStorage.getItem('user_id')
      
      if (!tmpUserId) {
        tmpUserId = uuid()
        localStorage.setItem('user_id', tmpUserId as string)
      }

      if (tmpUserId) {
        fetch(`/api/auth/${tmpUserId}`).then((i) => i.json())
          .then((res) => {
            const user = res?.user as User
            setUserId(user.fingerprint)
          })
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={userId}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const auth = useContext(AuthContext);
  return auth;
};
