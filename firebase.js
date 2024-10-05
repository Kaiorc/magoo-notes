// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

// Configuração do Firebase com as credenciais do projeto
const firebaseConfig = {
  apiKey: "AIzaSyC9QgaMCQ_4_0v8RTNdRHxJ1Psb7bX4h1E",
  authDomain: "magoo-notes.firebaseapp.com",
  projectId: "magoo-notes",
  storageBucket: "magoo-notes.appspot.com",
  messagingSenderId: "24272242388",
  appId: "1:24272242388:web:a4ffdd5227d7934fb75d41"
};

// Inicializa o aplicativo Firebase com a configuração fornecida
const app = initializeApp(firebaseConfig);

// Obtém uma instância do Firestore para interagir com o banco de dados
export const db = getFirestore(app)

// Cria uma referência à coleção "notes" no Firestore
export const notesCollection = collection(db, "notes")