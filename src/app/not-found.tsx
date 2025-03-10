'use client';
import { usePathname, useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div>
            <h1 className='text-2xl'>Erreur 404</h1>
            <p>La page {pathname} n'existe pas</p>
            <button
                onClick={() => router.back()}
                type='button'
                className='px-3 py-1 bg-gray-200 rounded hover:bg-gray-300'
            >
                Retour
            </button>
        </div>
    )
}