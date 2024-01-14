"use client"

import { signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci";


const LogoutButton = () => {

  return (
    <button onClick={() => signOut()}>
      Logout 
      <CiLogout size={22}/>
    </button>
  )
}

export default LogoutButton