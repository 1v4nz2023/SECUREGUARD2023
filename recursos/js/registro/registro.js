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
import { child } from "../../../src/index.js"; 
import { ref } from "../../../src/index.js"; 
import { set } from "../../../src/index.js"; 
import { setDoc } from "../../../src/index.js"; 
import { database } from "../../../src/index.js"; 

const signupForm = document.querySelector('#signup-form');


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
const nombres = signupForm['signup-name'].value;
const apellidos = signupForm['signup-lastname'].value;
const dni = signupForm['signup-dni'].value;
const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;
const telefono = signupForm['signup-tel'].value;
const estado = 'desactivado';

    document.querySelector('#signupModal');
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    writeUserData(nombres, apellidos, dni, email, password, telefono, estado);
    signupForm.reset();
});

function writeUserData(nombres, apellidos, dni, email, password, telefono, estado) {
  set(ref(database, 'users/' + dni), {
    nombres: nombres,
    apellidos: apellidos,
    dni:dni,
    email:email,
    password:password,        
    telefono:telefono,
    estado:estado,
  });
   console.log("Mensaje guardado ");
      Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class2',
            title: 'title-class',
            icon: 'icon-class'
          },   
        title: 'Registro exitoso ',
        text: 'Espere a que sea aprobado',
        icon: 'success',
        confirmButtonText: 'OK',
      })
}

