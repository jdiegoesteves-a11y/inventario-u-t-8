import pkg from './data.js';
const { inventoryU8 } = pkg;
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch } from "firebase/firestore";

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

async function updateU8() {
  console.log("Fetching existing inventory_u8...");
  const snapshot = await getDocs(collection(db, "inventory_u8"));
  
  const batch = writeBatch(db);
  let count = 0;
  
  // Create a map for quick lookup
  const existingMap = new Map();
  snapshot.forEach(docSnap => {
    existingMap.set(docSnap.id, docSnap.data());
  });

  // Update or Add items from data.js
  for (const item of inventoryU8) {
    const docRef = doc(db, "inventory_u8", item.codigo);
    const existingData = existingMap.get(item.codigo) || {};

    batch.set(docRef, {
      ...item,
      estado: existingData.estado || "",
      revisado: existingData.revisado || false,
      comentarios: existingData.comentarios || "",
      fotoUrl: existingData.fotoUrl || "",
      historial: existingData.historial || [],
      ultimaRevision: existingData.ultimaRevision || "",
      proximaRevision: existingData.proximaRevision || ""
    }, { merge: true });
    
    count++;
  }
  
  await batch.commit();
  console.log(`Successfully updated ${count} items in inventory_u8!`);

  // Delete items not in inventoryU8
  const currentCodes = new Set(inventoryU8.map(i => i.codigo));
  const batchDelete = writeBatch(db);
  let deleteCount = 0;
  
  for (const [id, data] of existingMap) {
    if (!currentCodes.has(id)) {
      batchDelete.delete(doc(db, "inventory_u8", id));
      deleteCount++;
    }
  }
  
  if (deleteCount > 0) {
    await batchDelete.commit();
    console.log(`Deleted ${deleteCount} obsolete items from inventory_u8!`);
  }
}

updateU8().catch(console.error).then(() => process.exit(0));
