import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { inventoryU8, inventoryT8 } from './data.js';

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

async function syncAll() {
    console.log(`Syncing ${inventoryU8.length} items for U-8...`);
    for (const item of inventoryU8) {
        const fullDesc = item.descripcion.replace(/ /g, "\u2009");
        // Sync to BOTH old and new collection names to be 100% sure
        await setDoc(doc(db, "inventory_u8", item.codigo), { ...item, descripcion: fullDesc, estado: "", revisado: false, comentarios: "", fotoUrl: "", historial: [] });
        await setDoc(doc(db, "inventario_u8", item.codigo), { ...item, descripcion: fullDesc, estado: "", revisado: false, comentarios: "", fotoUrl: "", historial: [] });
    }

    console.log(`Syncing ${inventoryT8.length} items for T-8...`);
    for (const item of inventoryT8) {
        const fullDesc = item.descripcion.replace(/ /g, "\u2009");
        await setDoc(doc(db, "inventory_t8", item.codigo), { ...item, descripcion: fullDesc, estado: "", revisado: false, comentarios: "", fotoUrl: "", historial: [] });
        await setDoc(doc(db, "inventario_t8", item.codigo), { ...item, descripcion: fullDesc, estado: "", revisado: false, comentarios: "", fotoUrl: "", historial: [] });
    }

    console.log("DONE! Everything synced to inventory_u8, inventario_u8, inventory_t8, and inventario_t8.");
}

syncAll().catch(console.error).then(() => process.exit(0));
