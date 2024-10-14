# Magoo Notes

Magoo Notes é uma aplicação de anotações baseada em React que permite aos usuários criar, editar e deletar notas em formato Markdown. As notas são armazenadas no Firebase Firestore, permitindo sincronização em tempo real.

## Demonstração

Você pode visualizar uma demonstração do sistema (somente leitura e interação limitada) no seguinte link:

[Magoo Notes Demo](https://magoo-notes.netlify.app)

## Demonstração em Vídeo

https://github.com/user-attachments/assets/fef89b4e-c8ce-43d5-b20e-9fa3e15ab751

## Funcionalidades

- **Criação de Notas**: Permite criar novas notas com um título padrão.
- **Edição de Notas**: Permite editar o conteúdo das notas usando Markdown.
- **Deleção de Notas**: Permite deletar notas existentes.
- **Sincronização em Tempo Real**: As notas são sincronizadas em tempo real com o Firebase Firestore.
- **Visualização de Markdown**: Permite visualizar o conteúdo das notas em formato Markdown.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário (versão utilizada: 17.0.2).
- **Firebase Firestore**: Banco de dados NoSQL em tempo real.
- **[ReactMde](https://www.npmjs.com/package/react-mde)**: Componente de editor Markdown para React.
- **[Showdown](https://www.npmjs.com/package/showdown)**: Biblioteca para converter Markdown em HTML.
- **Vite**: Ferramenta de build rápida para projetos web modernos.

## Estrutura do Projeto

- **App.jsx**: Componente principal que gerencia o estado das notas e renderiza os componentes `Sidebar` e `Editor`.
- **Sidebar.jsx**: Componente que exibe a lista de notas e permite selecionar, criar e deletar notas.
- **Editor.jsx**: Componente que permite editar o conteúdo das notas em formato Markdown.
- **firebase.js**: Configuração do Firebase e inicialização do Firestore.

## Como Executar o Projeto Localmente com suas Configurações do Firebase

### Pré-requisitos

- Node.js instalado
- Conta no Firebase com um projeto configurado

### Passos

1. Clone o repositório:
    ```bash
    git clone https://github.com/Kaiorc/magoo-notes.git
    cd magoo-notes
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o Firebase:
    - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
    - Adicione um aplicativo web ao projeto e copie as credenciais de configuração.
    - Substitua as credenciais no arquivo [`firebase.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2Fsrc%2Fmagoo-notes%2Ffirebase.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22b0b097aa-fb98-495d-a906-8cf754c78ef5%22%5D "c:\src\magoo-notes\firebase.js") com as suas credenciais do Firebase.

4. Execute a aplicação:
    ```bash
    npm run dev
    ```

5. Acesse a aplicação no navegador na porta apresentada no terminal da aplicação