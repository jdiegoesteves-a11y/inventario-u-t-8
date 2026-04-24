import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, writeBatch, deleteDoc } from "firebase/firestore";

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

const inventoryU8 = [
    { codigo: "14712", sicafi: "1000004", pf: "29577", descripcion: "ESCALERA DE EXTENSION", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "15036", sicafi: "1000912", pf: "29578", descripcion: "ESCALERA DE ASALTO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "15037", sicafi: "1000913", pf: "29757", descripcion: "ESCALERA DE EXTENSION", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "17431", sicafi: "1005677", pf: "29737", descripcion: "MOTOTROZADORA", ubicacion: "I-258 - U-8", marca: "PCTEL", modelo: "FD-950", serie: "06-1800114" },
    { codigo: "19326", sicafi: "1007621", pf: "29741", descripcion: "GENERADOR PORTATIL", ubicacion: "I-258 - U-8", marca: "ALL POWER", modelo: "3250", serie: "15608Z270912" },
    { codigo: "19541", sicafi: "1007846", pf: "28759", descripcion: "DESTROYER 2 1/2", ubicacion: "I-258 - U-8", marca: "AKRON", modelo: "STYLE 3420", serie: "" },
    { codigo: "19542", sicafi: "1007847", pf: "28761", descripcion: "BARRA DE LUCES ESTROBOSCOPICAS", ubicacion: "I-258 - U-8", marca: "WHIRL WIND", modelo: "", serie: "86792" },
    { codigo: "19543", sicafi: "1007848", pf: "29554", descripcion: "DRIVER DE SIRENAS ELECTRONICA", ubicacion: "I-258 - U-8", marca: "WHIRL WIND", modelo: "SA-314", serie: "01-0883449-00" },
    { codigo: "20362", sicafi: "1008757", pf: "29551", descripcion: "RADIO BASE MOTOROLA DGM6100 GPS", ubicacion: "I-258 - U-8", marca: "MOTOROLA PRO 5100", modelo: "DGM-6100", serie: "038TNQ7736" },
    { codigo: "20950", sicafi: "1009349", pf: "29547", descripcion: "PITON PROTEK DE 1 1/2\"", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "366", serie: "A426729" },
    { codigo: "21039", sicafi: "1009439", pf: "29740", descripcion: "PITON PROTEK DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "368", serie: "A558200" },
    { codigo: "21041", sicafi: "1009441", pf: "29549", descripcion: "PITON PROTEK DE 1 1/2\"", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "366", serie: "A426186" },
    { codigo: "21792", sicafi: "1010263", pf: "29579", descripcion: "BIFURCADORA DE ALUMINIO PROTEK 520", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "520", serie: "5230286" },
    { codigo: "21906", sicafi: "1010377", pf: "29568", descripcion: "BIFURCADORA DE ALUMINIO PROTEK 520", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "520", serie: "5230169" },
    { codigo: "21908", sicafi: "1010379", pf: "29575", descripcion: "EDUCTOR EN BRONCE PROTEK 201-60", ubicacion: "I-258 - U-8", marca: "PROTEK", modelo: "201-60", serie: "2020662" },
    { codigo: "23663", sicafi: "1012165", pf: "29756", descripcion: "CAMILLA PARA RESCATE", ubicacion: "I-258 - U-8", marca: "JWIN", modelo: "JSA-300.PS", serie: "S/S" },
    { codigo: "23664", sicafi: "1012166", pf: "29758", descripcion: "GANCHO CON MANGO DE 12 PIES", ubicacion: "I-258 - U-8", marca: "SAMDUNG", modelo: "S/M", serie: "S/S" },
    { codigo: "23665", sicafi: "1012167", pf: "29759", descripcion: "GANCHO CON MANGO DE 12 PIES", ubicacion: "I-258 - U-8", marca: "SAMDUNG", modelo: "S/M", serie: "S/S" },
    { codigo: "23668", sicafi: "1012170", pf: "29744", descripcion: "GANCHO CON MANGO DE 4 PIES Y AGARRADERA", ubicacion: "I-258 - U-8", marca: "AKRON", modelo: "S/M", serie: "S/S" },
    { codigo: "23669", sicafi: "1012171", pf: "29745", descripcion: "GANCHO CON MANGO DE 4 PIES Y AGARRADERA", ubicacion: "I-258 - U-8", marca: "AKRON", modelo: "S/M", serie: "S/S" },
    { codigo: "25161", sicafi: "1013671", pf: "15336", descripcion: "RADIO SIERENA", ubicacion: "I-258 - U-8", marca: "CODE 3", modelo: "", serie: "" },
    { codigo: "25708", sicafi: "1014213", pf: "29561", descripcion: "EQ/PROTEC.RESP.AUTON.+MASC+VALV+ENCHUFE MP", ubicacion: "I-258 - U-8", marca: "AIRBOX", modelo: "AERIS PRO TIPO 2", serie: "EQ114907-06-16" },
    { codigo: "25968", sicafi: "1014473", pf: "6650", descripcion: "EQ/PROTEC.RESP.AUTON.+MASC+VALV+ENCHUFE MP", ubicacion: "I-258 - U-8", marca: "AIRBOX", modelo: "AERIS PRO TIPO 2", serie: "EQ114765-06-16" },
    { codigo: "25970", sicafi: "1014475", pf: "6648", descripcion: "CILINDRO / EQ. RESP. AUTON. + VALVULA", ubicacion: "I-258 - U-8", marca: "AIRBOX", modelo: "COMPOSITE 6.9", serie: "FJM-38541" },
    { codigo: "26031", sicafi: "1014536", pf: "29729", descripcion: "EQ/PROTEC.RESP.AUTON.+MASC+VALV+ENCHUFE MP", ubicacion: "I-258 - U-8", marca: "AIRBOX", modelo: "AERIS PRO TIPO 2", serie: "EQ114826/06/16" },
    { codigo: "26167", sicafi: "1014672", pf: "29732", descripcion: "CILINDRO / EQ. RESP. AUTON. + VALVULA", ubicacion: "I-258 - U-8", marca: "AIRBOX", modelo: "COMPOSITE 6.9", serie: "FJM-38787" },
    { codigo: "26714", sicafi: "1015239", pf: "29753", descripcion: "PITON TURBO 2 1/2\"", ubicacion: "I-258 - U-8", marca: "AWG", modelo: "TURBO 250", serie: "" },
    { codigo: "26779", sicafi: "1015304", pf: "29742", descripcion: "MONITOR PORTAIL", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "27149", sicafi: "2026998", pf: "29500", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27150", sicafi: "2026999", pf: "29501", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27151", sicafi: "2027000", pf: "29525", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27154", sicafi: "2027003", pf: "29527", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27156", sicafi: "2027005", pf: "26031", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27157", sicafi: "2027006", pf: "26032", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27158", sicafi: "2027007", pf: "26033", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27159", sicafi: "2027008", pf: "26046", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27160", sicafi: "2027009", pf: "26047", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27503", sicafi: "2027352", pf: "37168", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27504", sicafi: "2027353", pf: "35944", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27505", sicafi: "2027354", pf: "16272", descripcion: "TRAMO DE MANGUERA 1 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27624", sicafi: "2027550", pf: "14866", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27637", sicafi: "2027563", pf: "29542", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27638", sicafi: "2027564", pf: "29543", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27639", sicafi: "2027565", pf: "29544", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27640", sicafi: "2027566", pf: "29523", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27641", sicafi: "2027567", pf: "14412", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27885", sicafi: "2027811", pf: "29528", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27886", sicafi: "2027812", pf: "29545", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27887", sicafi: "2027813", pf: "29522", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "27888", sicafi: "2027814", pf: "29541", descripcion: "TRAMO DE MANGUERA 2 1/2\"(CAUCHO)", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "28999", sicafi: "2000964", pf: "29747", descripcion: "LLAVES PARA VALVULA DE HIDRANTE", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "29008", sicafi: "2000972", pf: "29555", descripcion: "LLAVES DE ALUMINIO PARA TRAMOS", ubicacion: "I-258 - U-8", marca: "AKRON", modelo: "STYLE 1O", serie: "" },
    { codigo: "29369", sicafi: "2001340", pf: "29572", descripcion: "REDUCTOR DE 2 1/2 A 1 1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29370", sicafi: "2001341", pf: "29499", descripcion: "ARPON GRANDE", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29388", sicafi: "2001355", pf: "29556", descripcion: "LLAVES PARA HIDRANTE DE OJO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29390", sicafi: "2001357", pf: "29557", descripcion: "LLAVE PARA TRAMO DE OJO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29392", sicafi: "2001359", pf: "29558", descripcion: "LLAVE PARA TRAMO DE OJO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29403", sicafi: "2001370", pf: "29573", descripcion: "REDUCTOR DE BRONCE DE 2,1/2\" A 1,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "29528", sicafi: "2001479", pf: "29750", descripcion: "HACHAS T/BOMBEROS", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30425", sicafi: "2002242", pf: "29571", descripcion: "CANASTILLAS DE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30510", sicafi: "2002311", pf: "29569", descripcion: "ACOPLES DE BRONCE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30511", sicafi: "2002312", pf: "29570", descripcion: "ACOPLES DE BRONCE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30519", sicafi: "2002320", pf: "29748", descripcion: "COMBO CON MANGO DE HIERRO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30525", sicafi: "2002324", pf: "23533", descripcion: "HACHAS T/LEÑADOR", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30528", sicafi: "2002329", pf: "29559", descripcion: "LLAVE PARA TRAMO DE OJO", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30538", sicafi: "2002340", pf: "29749", descripcion: "PATA DE CABRA", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "30546", sicafi: "2002345", pf: "29576", descripcion: "REDUCTORES DE 2,1/2\" A 1,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "31582", sicafi: "2003355", pf: "29537", descripcion: "TRAMOS DE MANGUERA DE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "31583", sicafi: "2003356", pf: "29538", descripcion: "TRAMOS DE MANGUERA DE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "31584", sicafi: "2003357", pf: "29539", descripcion: "TRAMOS DE MANGUERA DE 2,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "34112", sicafi: "2005707", pf: "29567", descripcion: "ACOPLES DE 1,1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "40970", sicafi: "2012476", pf: "29507", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40971", sicafi: "2012477", pf: "29508", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40972", sicafi: "2012478", pf: "29509", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40973", sicafi: "2012479", pf: "29510", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40974", sicafi: "2012480", pf: "29511", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40975", sicafi: "2012481", pf: "29512", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40976", sicafi: "2012482", pf: "29513", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40977", sicafi: "2012483", pf: "29506", descripcion: "TRAMO DE MAGUERA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "KEY FRE HHOSE", modelo: "DOBLE CHAQUETA 800 PSI", serie: "" },
    { codigo: "40979", sicafi: "2012486", pf: "", descripcion: "LLAVE FRANCESA 12\"", ubicacion: "I-258 - U-8", marca: "TRUE- TOUCH", modelo: "", serie: "" },
    { codigo: "42310", sicafi: "2014430", pf: "", descripcion: "LLAVE EN T PARA VALVULA", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "44469", sicafi: "2018667", pf: "29752", descripcion: "LLAVES DE PISO PARA HIDRANTE", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "44514", sicafi: "2018713", pf: "29560", descripcion: "JGO. HERRAMIENTAS BASICAS", ubicacion: "I-258 - U-8", marca: "STAR FIRE", modelo: "NN", serie: "NN" },
    { codigo: "44515", sicafi: "2018714", pf: "29735", descripcion: "GATA TIPO BOTELLA", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "44840", sicafi: "2019054", pf: "29574", descripcion: "PITON DE 2.1/2", ubicacion: "I-258 - U-8", marca: "AKRON", modelo: "", serie: "" },
    { codigo: "47878", sicafi: "2022181", pf: "29502", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47879", sicafi: "2022182", pf: "29503", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47880", sicafi: "2022183", pf: "29504", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47881", sicafi: "2022184", pf: "29505", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47882", sicafi: "2022185", pf: "29516", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47883", sicafi: "2022186", pf: "29517", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47884", sicafi: "2022187", pf: "29514", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47885", sicafi: "2022188", pf: "29515", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47886", sicafi: "2022189", pf: "29520", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47887", sicafi: "2022190", pf: "29521", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 2 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47888", sicafi: "2022191", pf: "29540", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 2 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47889", sicafi: "2022192", pf: "29534", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 2 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47890", sicafi: "2022193", pf: "29535", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 2 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "47891", sicafi: "2022194", pf: "29536", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 2 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48292", sicafi: "2022603", pf: "29566", descripcion: "TAPON TIPO HEMBRA DE 2 1/2\"", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "NN", serie: "NN" },
    { codigo: "48915", sicafi: "2023332", pf: "29518", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48916", sicafi: "2023333", pf: "29526", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48917", sicafi: "2023334", pf: "29519", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48918", sicafi: "2023335", pf: "29529", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48919", sicafi: "2023336", pf: "29530", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48920", sicafi: "2023337", pf: "29531", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48921", sicafi: "2023338", pf: "29532", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "48922", sicafi: "2023339", pf: "29533", descripcion: "TRAMO DE MANGUERA NAFT DE 15 METROS DE 1 1/2", ubicacion: "I-258 - U-8", marca: "NATIONAL FOAM", modelo: "TP-800", serie: "NN" },
    { codigo: "49513", sicafi: "2023944", pf: "29736", descripcion: "EXTINTOR H2O AGUA PRESURIZADA 2,5 GALONES", ubicacion: "I-258 - U-8", marca: "BUCKEYE", modelo: "500", serie: "AD887606" },
    { codigo: "52632", sicafi: "2027931", pf: "29497", descripcion: "ABSORVENTE DE 4\"", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "52633", sicafi: "2027932", pf: "29498", descripcion: "ABSORVENTE DE 4\"", ubicacion: "I-258 - U-8", marca: "DESAUTEL", modelo: "", serie: "" },
    { codigo: "53777", sicafi: "", pf: "29755", descripcion: "MASTIL TELESCOPICO", ubicacion: "I-258 - U-8", marca: "FIRECO", modelo: "SUPER ENTRY 6 MTS", serie: "021074/Y18" },
    { codigo: "53897", sicafi: "", pf: "29550", descripcion: "FOCO PÓRTÁTIL CON BATERIA (FOCO LED)", ubicacion: "I-258 - U-8", marca: "FIRECO", modelo: "BRECIA", serie: "185241" },
    { codigo: "54988", sicafi: "", pf: "28760", descripcion: "RADIO PORTÁTIL", ubicacion: "I-258 - U-8", marca: "MOTOROLA", modelo: "DEP450", serie: "752TUQ4797" },
    { codigo: "57598", sicafi: "", pf: "29733", descripcion: "LINTERNA PORTATIL", ubicacion: "I-258 - U-8", marca: "NIGHTSTICK", modelo: "XPR-5580R", serie: "20407-3995" },
    { codigo: "57599", sicafi: "", pf: "29734", descripcion: "LINTERNA PORTATIL", ubicacion: "I-258 - U-8", marca: "NIGHTSTICK", modelo: "XPR-5580R", serie: "20407-3994" },
    { codigo: "58032", sicafi: "", pf: "29743", descripcion: "HERRAMIENTA PARA ENTRADA FORZOSA", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "62415", sicafi: "", pf: "29751", descripcion: "HALLIGAN", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "", serie: "" },
    { codigo: "66113", sicafi: "-", pf: "", descripcion: "ARNES DE CUERPO ENTERO", ubicacion: "I-258 - U-8", marca: "ARMADURA", modelo: "", serie: "" },
    { codigo: "69533", sicafi: "-", pf: "", descripcion: "VENTILADOR A BATERÍA", ubicacion: "I-258 - U-8", marca: "BLOWHARD", modelo: "QUICKEE", serie: "Q1-Q1-356759" },
    { codigo: "69543", sicafi: "-", pf: "", descripcion: "DUCTO PARA VENTILADOR A BATERIA", ubicacion: "I-258 - U-8", marca: "No Aplica", modelo: "QUICKEE", serie: "S/S" }
];

async function updateDB() {
  // Clear all items from both collections
  console.log("Cleaning up inventory_u8 and inventory_t8...");
  const u8Snap = await getDocs(collection(db, "inventory_u8"));
  const t8Snap = await getDocs(collection(db, "inventory_t8"));
  
  const clearBatch = writeBatch(db);
  u8Snap.forEach(d => clearBatch.delete(d.ref));
  t8Snap.forEach(d => clearBatch.delete(d.ref));
  await clearBatch.commit();
  console.log("Databases cleared.");

  // Upload U-8
  const u8Batch = writeBatch(db);
  for (const item of inventoryU8) {
    const docRef = doc(db, "inventory_u8", item.codigo);
    u8Batch.set(docRef, {
      ...item,
      estado: "",
      revisado: false,
      comentarios: "",
      fotoUrl: "",
      historial: [],
      ultimaRevision: "",
      proximaRevision: ""
    });
  }
  await u8Batch.commit();
  console.log("Successfully uploaded 121 items to inventory_u8 with FULL descriptions!");
}

updateDB().catch(console.error).then(() => process.exit(0));
