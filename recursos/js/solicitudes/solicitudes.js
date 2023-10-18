import { onAuthStateChanged } from "../../../src/index.js";
import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { collection } from "../../../src/index.js";
import { addDoc } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { onSnapshot } from "../../../src/index.js";
import { query } from "../../../src/index.js";
import { where } from "../../../src/index.js";
import { doc } from "../../../src/index.js";
import { orderBy } from "../../../src/index.js";
import { signOut } from "../../../src/index.js";
import { getDatabase } from "../../../src/index.js";
import { ref } from "../../../src/index.js";
import { child } from "../../../src/index.js";
import { get } from "../../../src/index.js";
import { set } from "../../../src/index.js";
import { onValue } from "../../../src/index.js";
import { db } from "../../../src/index.js";
import { database } from "../../../src/index.js"; 
import { update } from "../../../src/index.js"; 
import { getAuth } from "../../../src/index.js"; 
import { createUserWithEmailAndPassword } from "../../../src/index.js"; 
import { updateProfile } from "../../../src/index.js"; 
import { remove } from "../../../src/index.js";

const btnCerrarSesion = document.getElementById('endSesion');
const title = document.querySelector('#title');
const foto = document.querySelector('#foto');
let array_usuarios_temp = [];
let tabla_usuarios;


const dbRef = ref(getDatabase());
get(child(dbRef, 'users/')).then((snapshot) => {
  if (snapshot.exists()) {
    snapshot.forEach((childSnapshot) => {
    let item = {
      dni: childSnapshot.val().dni,
      nombres:childSnapshot.val().nombres,
      apellidos: childSnapshot.val().apellidos,
      telefono: childSnapshot.val().telefono,
      email: childSnapshot.val().email,
      estado: childSnapshot.val().estado,
      password: childSnapshot.val().password,
    };
    array_usuarios_temp.push(item);



   })
  } else {
    console.log("No data available");
  }

  tabla_usuarios = $("#myTable").DataTable({
    'iDisplayLength': 100,
    dom: "Bflrtip",
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
              }},
    data: array_usuarios_temp,
    columns: [
      { data: "dni" },
      { data: "nombres" },
      { data: "apellidos" },
      { data: "telefono" },
      { data: "email" },
      { data: "password" },
      {
        defaultContent: "<div><button class='btn_update_user btn btn-success'>Aprobar</button>  <button class='btn_update_user2 btn btn-danger'>Rechazar</button></div>",
        
      },
    ],
  });


  $("#myTable tbody").on("click", ".btn_update_user", function (e) {
    let infousuarios = tabla_usuarios.row($(this).parents("tr,li")).data();
    let email = infousuarios.email;
    let password= infousuarios.password;
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: infousuarios.nombres, photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    });
    Swal.fire({
      customClass: {
          confirmButton: 'confirm-button-class2',
          title: 'title-class',
          icon: 'icon-class'
        },   
      title: 'Datos actualizados',
      text: 'Usuario activado',
      icon: 'success',
      confirmButtonText: 'OK',
    })  

    signOut(auth);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });


    
  });

  $("#myTable tbody").on("click", ".btn_update_user2", function (e) {
    let infousuarios = tabla_usuarios.row($(this).parents("tr,li")).data();

    tabla_usuarios
    .row( $(this).parents('tr') )
    .remove()
    .draw()

    const db = getDatabase();
    const dbRef = ref(db, "users/" + infousuarios.dni);
    remove(dbRef).then(() => console.log("Deleted"))

  });



}).catch((error) => {
  console.error(error);
});

  
// });
