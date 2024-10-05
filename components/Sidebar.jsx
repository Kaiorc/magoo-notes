import React from "react"

// Componente Sidebar que recebe props
export default function Sidebar(props) {
    // Mapeia a lista de notas para criar elementos de nota
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div 
                // Adiciona a classe "selected-note" se a nota for a nota atual
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                // Define a nota atual quando o título da nota é clicado
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                {/* Exibe o primeiro parágrafo da nota como título */}
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                {/* Botão para deletar a nota */}
                <button 
                    className="delete-btn"
                    // Chama a função deleteNote passando o ID da nota quando o botão é clicado
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        // Seção da barra lateral
        <section className="pane sidebar">
            {/* Cabeçalho da barra lateral */}
            <div className="sidebar--header">
                <h3>Magoo Notes</h3>
                {/* Botão para criar uma nova nota */}
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {/* Renderiza os elementos de nota */}
            {noteElements}
        </section>
    )
}