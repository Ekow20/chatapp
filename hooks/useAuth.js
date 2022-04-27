import { createContext, useEffect, useState, useContext } from "react";
import { auth, googleProv } from "../Firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import Login from "../pages/login";
import Loading from "../components/Loading";

const Context = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initLoad, setInitLoad] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const checkUser = onAuthStateChanged(auth, (user) => {
      setInitLoad(false);
      setUser(user);
    });
    return checkUser;
  }, []);

  const signIn = () => {
    signInWithPopup(auth, googleProv)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  };
  if (initLoad) {
    return <Loading />;
  }

  return (
    <Context.Provider value={{ user, setChatOpen, chatOpen }}>
      {user ? children : <Login signIn={signIn} />}
    </Context.Provider>
  );
};

const useAuth = () => {
  return useContext(Context);
};

export default useAuth;
