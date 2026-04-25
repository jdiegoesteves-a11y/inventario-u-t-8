import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";

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

async function checkAll() {
    const cols = ["inventory_u8", "inventario_u8", "inventory_t8", "inventario_t8", "test_u8", "inventoryU8", "inventoryT8"];
    for (const c of cols) {
        try {
            const snap = await getDocs(query(collection(db, c), limit(1)));
            console.log(`Collection ${c}: ${snap.empty ? 'EMPTY' : 'HAS DATA'}`);
            if (!snap.empty) {
                console.log(`  Sample:`, snap.docs[0].data().descripcion);
            }
        } catch (e) {
            console.log(`Collection ${c}: ERROR ${e.message}`);
        }
    }
}

checkAll().catch(console.error).then(() => process.exit(0));
