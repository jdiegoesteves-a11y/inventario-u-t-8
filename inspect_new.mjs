import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query, where } from "firebase/firestore";

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

async function inspect() {
  const snap = await getDocs(collection(db, "inventario_u8"));
  let count = 0;
  snap.forEach(d => {
    if (d.data().revisado || d.data().estado) {
        console.log(`ID: ${d.id}`, d.data());
        count++;
    }
  });
  console.log("Items with work in inventario_u8:", count);
}

inspect().catch(console.error).then(() => process.exit(0));
