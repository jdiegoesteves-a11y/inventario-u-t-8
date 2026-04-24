import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0YlGepgouMvXR61uDyozlsU-17ZSB6Sw",
  authDomain: "inventario-u-t-8.firebaseapp.com",
  projectId: "inventario-u-t-8",
  storageBucket: "inventario-u-t-8.firebasestorage.app",
  messagingSenderId: "952474876599",
  appId: "1:952474876599:web:4938914b7f0ee42139eb32"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  const docRef = doc(db, "inventory_u8", "14712");
  await setDoc(docRef, {
    descripcion: "ESCALERA DE EXTENSION COMPLETA",
    codigo: "14712"
  });
  console.log("Test doc sent.");
}

test().catch(console.error).then(() => process.exit(0));
