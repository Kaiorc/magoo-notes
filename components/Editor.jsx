import React from "react"
import ReactMde from "react-mde"
import Showdown from "showdown"

// Componente Editor que recebe props tempNoteText e setTempNoteText
export default function Editor({ tempNoteText, setTempNoteText }) {
    // Estado para armazenar a aba selecionada (write ou preview)
    const [selectedTab, setSelectedTab] = React.useState("write")

    // Configuração do conversor Showdown para converter markdown em HTML
    const converter = new Showdown.Converter({
        tables: true, // Permite tabelas no markdown
        simplifiedAutoLink: true, // Converte URLs automaticamente em links
        strikethrough: true, // Permite texto tachado
        tasklists: true, // Permite listas de tarefas
    })

    return (
        // Seção do editor
        <section className="pane editor">
            {/* Componente ReactMde para edição de markdown */}
            <ReactMde
                value={tempNoteText} // Valor do texto da nota
                onChange={setTempNoteText} // Função para atualizar o texto da nota
                selectedTab={selectedTab} // Aba selecionada (write ou preview)
                onTabChange={setSelectedTab} // Função para mudar a aba selecionada
                generateMarkdownPreview={(markdown) =>
                    // Função para converter markdown em HTML usando Showdown
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={80} // Altura mínima do editor
                heightUnits="vh" // Unidade de altura (viewport height)
            />
        </section>
    )
}