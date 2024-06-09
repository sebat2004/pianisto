'use client'

import React, { createContext, useState } from 'react'

export const UserContext = createContext({
    userId: '',
    setUserId: (userId: string) => {},
    userEmail: '',
    setUserEmail: (userEmail: string) => {}
})

export function Providers({ children }) {
    const [userEmail, setUserEmail] = useState('')
    const [userId, setUserId] = useState('')
    return (
        <UserContext.Provider value={{ userId: userId, setUserId, userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    )
}
