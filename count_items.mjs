import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function count() {
  const snap = await getDocs(collection(db, "inventario_u8"));
  console.log("Items in inventario_u8:", snap.size);
  const t8Snap = await getDocs(collection(db, "inventario_t8"));
  console.log("Items in inventario_t8:", t8Snap.size);
}

count().catch(console.error).then(() => process.exit(0));
