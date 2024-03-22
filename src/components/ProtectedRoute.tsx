import { PropsWithChildren, useContext, useEffect } from "react";
import userContext, { useAuth } from "../contexts/context";
import { useNavigate } from "react-router";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const {authorized} = useAuth();
    const {username} = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!authorized && username === null) {
            navigate("/login", { replace: true });
        }

    }, [authorized, navigate]);


  return children;
}

export default ProtectedRoute