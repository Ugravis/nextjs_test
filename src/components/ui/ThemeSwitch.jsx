'use client'

import { useEffect, useState } from "react"

export default function ThemeSwitch() {
    const [isDarkTheme, setIsDarkTheme] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const isInitiallyDark = savedTheme === 'dark'
        setIsDarkTheme(isInitiallyDark)

        if(isInitiallyDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [])

    const toggleTheme = () => {
        const newThemeIsDark = !isDarkTheme
        setIsDarkTheme(newThemeIsDark)

        localStorage.setItem('theme', newThemeIsDark ? 'dark' : 'light')

        if(newThemeIsDark) document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }

    return (
        <button onClick={toggleTheme}>
            {isDarkTheme ? (
                <p>Toggle light</p>
            ) : (
                <p>Toggle dark</p>
            )}
        </button>
    )
}