/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Logout() {
  const navigate = useNavigate()
  const {setToken} = useAuth()
  useEffect(() => {
    localStorage.clear();
    setToken('')
    navigate()
  }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout