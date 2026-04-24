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

async function check() {
  const snap = await getDocs(collection(db, "inventory_u8"));
  snap.forEach(d => {
    if (d.id === "14712") {
      console.log("Item 14712 Description:", d.data().descripcion);
    }
  });
}

check().catch(console.error).then(() => process.exit(0));
