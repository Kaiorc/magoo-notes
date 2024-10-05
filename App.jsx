import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
    // Estado para armazenar a lista de notas
    const [notes, setNotes] = React.useState([])
    // Estado para armazenar o ID da nota atual
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    // Estado para armazenar o texto temporário da nota
    const [tempNoteText, setTempNoteText] = React.useState("")
    
    // Encontra a nota atual com base no ID ou pega a primeira nota ou cria uma nota vazia
    const currentNote =
        notes.find(note => note.id === currentNoteId)
        || notes[0]
        || { body: ""}
    
    // Ordena as notas pela data de atualização em ordem decrescente
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

    // useEffect para sincronizar as notas com o banco de dados em tempo real
    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        // Retorna a função de limpeza para cancelar a assinatura
        return unsubscribe
    }, [])
    
    // useEffect para definir a nota atual quando a lista de notas é atualizada
    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])
    
    // useEffect para atualizar o texto temporário quando a nota atual muda
    React.useEffect(() => {
        if (currentNote) {
            setTempNoteText(currentNote.body)
        }
    }, [currentNote])
    
    // useEffect para salvar a nota automaticamente após 500ms de inatividade
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        // Retorna a função de limpeza para cancelar o timeout
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])

    // Função assíncrona para criar uma nova nota
    async function createNewNote() {
    // Cria um novo objeto de nota com corpo padrão e timestamps
    const newNote = {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    // Adiciona a nova nota à coleção de notas no banco de dados
    const newNoteRef = await addDoc(notesCollection, newNote)
    // Define o ID da nota atual para o ID da nova nota criada
    setCurrentNoteId(newNoteRef.id)
    }

    // Função assíncrona para atualizar uma nota existente
    async function updateNote(text) {
    // Referência ao documento da nota atual no banco de dados
    const docRef = doc(db, "notes", currentNoteId)
    // Atualiza o corpo e o timestamp da nota no banco de dados
    await setDoc(
        docRef, 
        { body: text, updatedAt: Date.now() }, 
        { merge: true }
    )
    }

    // Função assíncrona para deletar uma nota
    async function deleteNote(noteId) {
    // Referência ao documento da nota a ser deletada no banco de dados
    const docRef = doc(db, "notes", noteId)
    // Deleta a nota do banco de dados
    await deleteDoc(docRef)
    }

    // Renderiza o componente principal
    return (
    <main>
        {
            // Verifica se há notas na lista
            notes.length > 0
                ?
                // Se houver notas, renderiza o componente Split com Sidebar e Editor
                <Split
                    sizes={[30, 70]}
                    direction="horizontal"
                    className="split"
                >
                    <Sidebar
                        notes={sortedNotes} // Passa as notas ordenadas para o Sidebar
                        currentNote={currentNote} // Passa a nota atual para o Sidebar
                        setCurrentNoteId={setCurrentNoteId} // Função para definir o ID da nota atual
                        newNote={createNewNote} // Função para criar uma nova nota
                        deleteNote={deleteNote} // Função para deletar uma nota
                    />
                    <Editor
                        tempNoteText={tempNoteText} // Passa o texto temporário da nota para o Editor
                        setTempNoteText={setTempNoteText} // Função para definir o texto temporário da nota
                    />
                </Split>
                :
                // Se não houver notas, renderiza uma mensagem e um botão para criar uma nova nota
                <div className="no-notes">
                <h1>Magoo Notes</h1>
                <h2>You have no notes</h2>
                <button
                    className="first-note"
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
        }
    </main>
    )
}