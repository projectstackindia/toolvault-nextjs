'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Note {
  id: number
  text: string
  date: string
}

export default function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [popup, setPopup] = useState({ show: false, message: '' })

  const showPopup = (msg: string) => setPopup({ show: true, message: msg })
  const closePopup = () => setPopup({ show: false, message: '' })

  useEffect(() => {
    const stored = localStorage.getItem('toolvault-notes')
    if (stored) setNotes(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('toolvault-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!newNote.trim()) {
      showPopup('Please write something before adding')
      return
    }
    // Format date as DD-MM-YYYY
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    const formattedDate = `${day}-${month}-${year}`

    const note: Note = {
      id: Date.now(),
      text: newNote.trim(),
      date: formattedDate
    }
    setNotes([note, ...notes])
    setNewNote('')
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <div className="mb-6 -ml-85">
        <Link href="/tools">
          <button className="px-6 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] hover:bg-white/20 transition-all duration-200 hover:scale-105 cursor-pointer flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            BACK TO TOOLS
          </button>
        </Link>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm" onClick={closePopup}>
          <div className="glass-card p-6 max-w-sm mx-4 border-2 border-red-500/50" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-white uppercase tracking-[0.2em] mb-3">Error</h3>
              <p className="text-white/80 text-sm tracking-[0.2em] uppercase font-bold mb-5">{popup.message}</p>
              <button
                onClick={closePopup}
                className="px-6 py-2 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-sm uppercase tracking-wide hover:scale-105 transition"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-8 border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-7xl mb-3">📓</div>
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-[0.1em] uppercase mb-4">
            Notes App
          </h1>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mx-auto">
            <p className="text-white/80 text-sm font-bold tracking-[0.1em] capitalize">
              Save Private Notes Automatically In Your Browser
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-5 mb-6">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            rows={3}
            className="w-full px-4 py-3 capitalize tracking-[0.2em] bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 outline-none text-white text-base text-left placeholder:text-white/40 resize-vertical"
          />
          <button
            onClick={addNote}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-base uppercase tracking-[0.2em] shadow-md hover:shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          >
            Add Note
          </button>
        </div>

        {/* Notes List */}
        <div className="mt-8 space-y-4 max-h-96 overflow-y-auto pr-2">
          {notes.length === 0 ? (
            <div className="text-center text-white/40 py-12 glass-card p-8 border border-white/10">
              <p className="text-sm uppercase tracking-wide">No notes yet. Add your first note above</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-white/90 text-sm font-medium tracking-wide whitespace-pre-wrap break-all">
                      {note.text}
                    </p>
                    {/* Date now shows DD-MM-YYYY */}
                    <p className="text-white/40 text-xs uppercase tracking-[0.2em] mt-2">{note.date}</p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-400 hover:text-red-300 transition text-xl px-2 cursor-pointer"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}