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
import { ref } from "../../../src/index.js"; 
import { child } from "../../../src/index.js"; 
import { get } from "../../../src/index.js"; 

const nombres = signupForm['signup-name'].value;
const apellidos = signupForm['signup-lastname'].value;
const dni = signupForm['signup-dni'].value;
const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;
const telefono = signupForm['signup-tel'].value;
const estado = 'desactivado';

$(document).ready( function () {
    let tabla = $('#myTable').DataTable(
{
    responsive: true,
    oLanguage: {
        sInfo: "Mostrando _START_ de _END_ de _TOTAL_ entradas", // text you want show for info section
        sSearch: "Buscar ",
        sLengthMenu: "Mostrando _MENU_ entradas",
        sInfoFiltered: " - filtrando de  _MAX_ registros",
        sZeroRecords: "No hay registros que mostrar",
        sInfoEmpty: "Mostrando _START_ de _END_ de _TOTAL_ entradas",
        oPaginate: {
          sNext: "Siguiente",
          sPrevious: "Atras",
        },
      },
   
}
    );
} );

const dbRef = ref(getDatabase());
get(child(dbRef, 'users/' + dni)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});