import { useAuth0 } from "@auth0/auth0-react"
import React from "react"
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"

export function LoginButton() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return(
        <button 
        type="button" 
        className="btn btn-light" 
        style={{
            margin: "1rem"
        }}
        onClick={() => loginWithRedirect()}>
        Log In
    </button>
    )

}