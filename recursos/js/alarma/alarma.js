
import { onAuthStateChanged } from "../../../src/index.js";
import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { collection } from "../../../src/index.js";
import { addDoc } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { onSnapshot } from '../../../src/index.js';
import { query } from '../../../src/index.js';
import { where } from '../../../src/index.js';
import { doc } from '../../../src/index.js';
import { orderBy } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 
import { getDatabase } from "../../../src/index.js"; 
import { database } from "../../../src/index.js"; 
import { ref } from "../../../src/index.js"; 
import { set } from "../../../src/index.js"; 
import { db } from "../../../src/index.js"; 

const title = document.querySelector('#title');

function getTime(){
  const f = new Intl.DateTimeFormat("es-sp",{
    dateStyle:"short",
    timeStyle:"short",
  })
  const date=f.format(new Date())
  return date;
}



onAuthStateChanged(auth, (user) => {
  if (user) {

    function enviarMensaje(patron)

{
  set(ref(database, '/Test'), {
    LED: parseInt(patron),
  });
}


$("#activar").click(function (e) { 
    e.preventDefault();
    let activar_val=$(this).val();
    enviarMensaje(activar_val);
    Swal.fire({
      customClass: {
          confirmButton: 'confirm-button-class2',
          title: 'title-class',
          icon: 'icon-class'
        },   
      title: 'Alarma activada',
      text: 'Haz activado la alarma',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    setTimeout(function(){
      swal.close();
    }, 1500);
    try {
      getTime();
      const docRef = addDoc(collection(db, "alertas"), {
        texto: `${user.displayName}: activó la alarma `,
        uid: user.uid,
        nick:user.displayName,
        status:'activado',
        date:`${getTime()}`,        
        fecha: Date.now()
      });
      console.log("Mensaje guardado ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
});


$("#desactivar").click(function (e) { 
    e.preventDefault();
    getTime();
    let desactivar_val=$(this).val();
    enviarMensaje(desactivar_val);
    Swal.fire({
      customClass: {
          confirmButton: 'confirm-button-class2',
          title: 'title-class',
          icon: 'icon-class'
        },   
      title: 'Alarma desactivada',
      text: 'Haz desactivado la alarma',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    setTimeout(function(){
      swal.close();
    }, 1500);
    try {
      const docRef = addDoc(collection(db, "alertas"), {
        texto: `${user.displayName}: apagó la alarma `,
        uid: user.uid,
        nick:user.displayName,
        status:'desactivado',
        date:`${getTime()}`,        
        fecha: Date.now()
      });
      console.log("Mensaje guardado ");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
});
    
  } else {
      console.log("usuario no existe");
            Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class2',
            title: 'title-class',
            icon: 'icon-class'
          },
        title: 'Error',   
        text: 'Por favor inicia sesión',
        icon: 'error',
        confirmButtonText: 'O K',
      })
      setTimeout(function(){
        window.location.href = "../../index.html";
      }, 2000);

  }
});



