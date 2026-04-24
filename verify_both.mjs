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
  console.log("Checking inventory_u8...");
  const snapU8 = await getDocs(collection(db, "inventory_u8"));
  snapU8.forEach(d => {
    if (d.id === "14712") console.log("U8 14712 Full Data:", JSON.stringify(d.data()));
  });

  console.log("Checking inventory_t8...");
  const snapT8 = await getDocs(collection(db, "inventory_t8"));
  snapT8.forEach(d => {
    if (d.id === "14766") console.log("T8 14766 Full Data:", JSON.stringify(d.data()));
  });
}

check().catch(console.error).then(() => process.exit(0));
