"use client"
import { useState, FormEvent } from "react"

interface CommentFormProp {
  postId: number
  onCommentAdded: () => void
}

export default function CommentForm({ postId, onCommentAdded }: CommentFormProp) {
  const [name, setName] = useState(``)
  const [email, setEmail] = useState(``)
  const [body, setBody] = useState(``)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState(``)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(``)

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          name,
          email,
          body,
        }),
      })
      if (response.ok) {
        setName(``)
        setEmail(``)
        setBody(``)
        setMessage(`Comment successful added`)
        onCommentAdded()
      } else {
        setMessage(`Error during post comment`)
      }
    } catch (error) {
      setMessage(`Error during post comment`)
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div>
    <h2 className="text-2xl my-4">Ajouter un commentaire</h2>

      {message && (
          <div className={`p-3 mb-4 rounded ${message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-1 w-1/2"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-1 w-1/2"
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="body">Commentaire</label>
          <textarea
            id="body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="border-1 w-1/2"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-300 my-2"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le commentaire'}
        </button>
      </form>
    </div>
  )
}
