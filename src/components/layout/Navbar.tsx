import Link from "next/link";
import ThemeSwitch from "@/components/ui/ThemeSwitch"

export const Navbar = () => {
    return (
        <nav className="flex justify-between">
            <p>Links</p>
            <ThemeSwitch />
        </nav>
    )
}