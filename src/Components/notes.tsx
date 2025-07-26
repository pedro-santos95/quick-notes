"use client"
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  content: string;
}

export default function Notes() {
    const [ notes, setNotes] = useState<Note[]>([]);
    const [ content, setContent] = useState("");
    const [ editingId, setEditingId]= useState<string | null>(null);

    const user = auth.currentUser;

   useEffect(() => {
  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    if (!user) return;

    const q = query(
      collection(db, "notes"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribeNotes = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];

      setNotes(notesData);
    });

    // Clean up
    return () => {
      unsubscribeNotes();
    };
  });

  return () => unsubscribeAuth();
}, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!content.trim() || !user ) return;

        if (editingId) {
            await updateDoc(doc(db, "notes", editingId), { content})
            setEditingId(null)  
        }else{
            await addDoc(collection(db, "notes"), {
                 uid: user.uid,
                 content,
                 createdAt: serverTimestamp(),
            })
        }
        setContent("");
    };
      const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  const handleEdit = (note: Note) => {
    setContent(note.content);
    setEditingId(note.id);
  };
    


    return(
         <div className="mt-6 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Escreva uma anotação..."
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded"
        >
          {editingId ? "Atualizar" : "Salvar"}
        </button>
      </form>

      <ul className="space-y-2">
        {notes?.map((note) => (
          <li key={note.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <span>{note.content}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(note)}
                className="text-blue-600 text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-600 text-sm"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    )


};
