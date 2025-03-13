"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CommentForm from '@/components/forms/CommentForm'
import { Comment } from '@/lib/types/comment.types'
import { Post } from '@/lib/types/post.types'
import { User } from '@/lib/types/user.types'

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id)
  
  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Ajouter des logs pour déboguer
    console.log("Fetching data for post ID:", postId)
    
    async function fetchPostData() {
      try {
        setLoading(true)
        setError(null)
        
        // Récupérer les détails du post
        console.log("Fetching post details...")
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        if (!postRes.ok) {
          throw new Error(`Post non trouvé (status: ${postRes.status})`)
        }
        const postData: Post = await postRes.json()
        console.log("Post data received:", postData)
        setPost(postData)
        
        // Récupérer les commentaires du post
        console.log("Fetching comments...")
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        if (commentsRes.ok) {
          const commentsData: Comment[] = await commentsRes.json()
          console.log("Comments received:", commentsData.length)
          setComments(commentsData)
        } else {
          console.error("Failed to fetch comments:", commentsRes.status)
        }
        
        // Récupérer les infos de l'utilisateur
        console.log("Fetching user info...")
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
        if (userRes.ok) {
          const userData: User = await userRes.json()
          console.log("User data received:", userData.name)
          setUser(userData)
        } else {
          console.error("Failed to fetch user:", userRes.status)
        }
        
        // Important: s'assurer que loading est mis à false après toutes les opérations
        setLoading(false)
      } catch (err) {
        console.error("Error in fetchPostData:", err)
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
        setLoading(false) // Important: s'assurer que loading est mis à false même en cas d'erreur
      }
    }
    
    fetchPostData()
    
    // Nettoyage en cas de démontage du composant
    return () => {
      console.log("Component unmounting, cleaning up...")
    }
  }, [postId])
  
  // Fonction pour rafraîchir les commentaires après ajout
  const refreshComments = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      if (res.ok) {
        const data: Comment[] = await res.json()
        // Ajouter un nouveau commentaire simulé en haut de la liste
        const fakeNewComment: Comment = {
          id: Date.now(),
          postId: postId.toString(),
          name: "Votre nom",
          email: "votre@email.com",
          body: "Votre commentaire ajouté (simulé)"
        }
        setComments([fakeNewComment, ...data])
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des commentaires", error)
    }
  }
  
  console.log("Rendering with state:", { loading, error, post: !!post, commentsCount: comments.length })
  
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-pulse">Chargement...</div>
        <div className="mt-2 text-sm text-gray-500">Chargement des données pour le post #{postId}</div>
      </div>
    )
  }
  
  if (error || !post) {
    return (
      <div>
        <div>{error || "Post non trouvé"}</div>
        <Link href="/posts">
          Retour à la liste des posts
        </Link>
      </div>
    )
  }
  
  return (
    <div>
      <div>
        <Link href="/posts" className="text-blue-600">
          Retour à la liste des posts
        </Link>
      </div>
      
      <div>
        <h1 className='text-2xl my-4'>{post.title}</h1>
        
        {user && (
          <div>
            <span>Auteur: </span>
            <Link href={`/users`}>
              {user.name} ({user.email})
            </Link>
          </div>
        )}
        
        <div>
          <p>{post.body}</p>
        </div>
      </div>
      
      <h2 className='text-2xl my-4'>Commentaires ({comments.length})</h2>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id}>
            <div>
              <span className='font-bold'>{comment.name} - {comment.email}</span>
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
        
        {comments.length === 0 && (
          <div>Aucun commentaire pour ce post.</div>
        )}
      </div>
      
      <CommentForm postId={postId} onCommentAdded={refreshComments} />
    </div>
  )
}