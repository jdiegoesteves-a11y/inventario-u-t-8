import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch, deleteDoc } from "firebase/firestore";
import fs from 'fs';

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

// Function to extract arrays from data.js
function extractData() {
    const content = fs.readFileSync('data.js', 'utf8');
    
    const extractArray = (name) => {
        const start = content.indexOf(`export const ${name} = [`);
        if (start === -1) return [];
        let end = start;
        let count = 0;
        for (let i = start; i < content.length; i++) {
            if (content[i] === '[') count++;
            if (content[i] === ']') count--;
            if (count === 0 && i > start) {
                end = i + 1;
                break;
            }
        }
        const match = content.substring(start, end).match(/=\s*(\[[\s\S]*\])/);
        if (!match) return [];
        return eval(`(${match[1]})`);
    };

    return {
        inventoryU8: extractArray('inventoryU8'),
        inventoryT8: extractArray('inventoryT8')
    };
}

async function syncAll() {
    const { inventoryU8, inventoryT8 } = extractData();
    console.log(`Extracted ${inventoryU8.length} items for U-8 and ${inventoryT8.length} for T-8.`);

    // 1. Wipe everything
    console.log("Wiping collections...");
    const u8Snap = await getDocs(collection(db, "inventory_u8"));
    const t8Snap = await getDocs(collection(db, "inventory_t8"));
    
    const wipeBatch = writeBatch(db);
    u8Snap.forEach(d => wipeBatch.delete(d.ref));
    t8Snap.forEach(d => wipeBatch.delete(d.ref));
    await wipeBatch.commit();
    console.log("Wipe complete.");

    // 2. Upload U-8
    console.log("Uploading U-8...");
    for (let i = 0; i < inventoryU8.length; i += 100) {
        const batch = writeBatch(db);
        const chunk = inventoryU8.slice(i, i + 100);
        chunk.forEach(item => {
            const docRef = doc(db, "inventory_u8", item.codigo);
            batch.set(docRef, {
                ...item,
                estado: "",
                revisado: false,
                comentarios: "",
                fotoUrl: "",
                historial: [],
                ultimaRevision: "",
                proximaRevision: ""
            });
        });
        await batch.commit();
    }
    console.log("U-8 upload complete.");

    // 3. Upload T-8
    console.log("Uploading T-8...");
    for (let i = 0; i < inventoryT8.length; i += 100) {
        const batch = writeBatch(db);
        const chunk = inventoryT8.slice(i, i + 100);
        chunk.forEach(item => {
            const docRef = doc(db, "inventory_t8", item.codigo);
            batch.set(docRef, {
                ...item,
                estado: "",
                revisado: false,
                comentarios: "",
                fotoUrl: "",
                historial: [],
                ultimaRevision: "",
                proximaRevision: ""
            });
        });
        await batch.commit();
    }
    console.log("T-8 upload complete.");
}

syncAll().catch(console.error).then(() => process.exit(0));
