import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

async function checkItem() {
    const docSnap = await getDoc(doc(db, "inventario_u8", "14712"));
    if (docSnap.exists()) {
        console.log("Item 14712 description:", JSON.stringify(docSnap.data().descripcion));
    } else {
        console.log("Item not found");
    }
}

checkItem().catch(console.error).then(() => process.exit(0));
