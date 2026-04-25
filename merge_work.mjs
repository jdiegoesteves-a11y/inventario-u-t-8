import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

async function mergeWork() {
    console.log("Merging work from inventory_u8 to inventario_u8...");
    const oldSnap = await getDocs(collection(db, "inventory_u8"));
    let count = 0;
    for (const d of oldSnap.docs) {
        const data = d.data();
        // Only if it has some work done
        if (data.estado || data.revisado || data.comentarios || data.fotoUrl || (data.historial && data.historial.length > 0)) {
            console.log(`Found work for item ${d.id}, merging...`);
            const targetRef = doc(db, "inventario_u8", d.id);
            await updateDoc(targetRef, {
                estado: data.estado || "",
                revisado: data.revisado || false,
                comentarios: data.comentarios || "",
                fotoUrl: data.fotoUrl || "",
                historial: data.historial || [],
                ultimaRevision: data.ultimaRevision || "",
                proximaRevision: data.proximaRevision || ""
            }).catch(e => console.log(`  Skipping ${d.id}: ${e.message}`));
            count++;
        }
    }
    console.log(`Merged work for ${count} items.`);

    console.log("Merging work from inventory_t8 to inventario_t8...");
    const oldT8Snap = await getDocs(collection(db, "inventory_t8"));
    let countT8 = 0;
    for (const d of oldT8Snap.docs) {
        const data = d.data();
        if (data.estado || data.revisado || data.comentarios || data.fotoUrl || (data.historial && data.historial.length > 0)) {
            const targetRef = doc(db, "inventario_t8", d.id);
            await updateDoc(targetRef, {
                estado: data.estado || "",
                revisado: data.revisado || false,
                comentarios: data.comentarios || "",
                fotoUrl: data.fotoUrl || "",
                historial: data.historial || [],
                ultimaRevision: data.ultimaRevision || "",
                proximaRevision: data.proximaRevision || ""
            }).catch(e => console.log(`  Skipping ${d.id}: ${e.message}`));
            countT8++;
        }
    }
    console.log(`Merged work for ${countT8} items.`);
    console.log("DONE! Work merged.");
}

mergeWork().catch(console.error).then(() => process.exit(0));
