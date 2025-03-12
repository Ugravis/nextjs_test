import Link from "next/link"
import ThemeSwitch from "@/components/ui/ThemeSwitch"
import React from "react"

export default function Navbar() {
    return (
        <nav className="flex justify-between">
            <div className="flex gap-4">
                <Link href="/">
                    Home
                </Link>
                <Link href="/users">
                    Team
                </Link>
                <Link href="/about">
                    About
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </div>
            <ThemeSwitch />
        </nav>
    )
}