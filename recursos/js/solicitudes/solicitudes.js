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
import { onValue } from "../../../src/index.js";
import { db } from "../../../src/index.js";
import { database } from "../../../src/index.js"; 
import { update } from "../../../src/index.js"; 
// import { db } from "../../../src/index.js";
// $(document).ready( function () {
//     let tabla = $('#myTable').DataTable(
// {
//     responsive: true,
//     searching: true,
//     oLanguage: {
//         sInfo: "Mostrando _START_ de _END_ de _TOTAL_ entradas", // text you want show for info section
//         sSearch: "Buscar ",
//         sLengthMenu: "Mostrando _MENU_ entradas",
//         sInfoFiltered: " - filtrando de  _MAX_ registros",
//         sZeroRecords: "No hay registros que mostrar",
//         sInfoEmpty: "Mostrando _START_ de _END_ de _TOTAL_ entradas",
//         oPaginate: {
//           sNext: "Siguiente",
//           sPrevious: "Atras",
//         },
//       },

// }
//     );
// } );
let array_usuarios_temp = [];
let tabla_usuarios;
// const dbRef = ref(getDatabase());

// const q = query(collection(db, "userquest"), orderBy("fecha"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     let item = {
//       dni: doc.data().dni,
//       nombres: doc.data().nombres,
//       apellidos: doc.data().apellidos,
//       telefono: doc.data().telefono,
//       email: doc.data().email,
//       estado: doc.data().estado,
//     };
//     array_usuarios_temp.push(item);
//   });

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
    };
    array_usuarios_temp.push(item);



      console.log(item)          // "example@gmail.com"
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
      { data: "estado" },
      {
        defaultContent: "<div><button class='btn_update_user btn btn-success'>Activar</button>  <button class='btn_update_user2 btn btn-danger'>Desactivar</button></div>",
        
      },
    ],
  });


  $("#myTable tbody").on("click", ".btn_update_user", function (e) {
    let infousuarios = tabla_usuarios.row($(this).parents("tr,li")).data();
    update(ref(database, 'users/' + infousuarios.dni), {
      estado:'activado'
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
    setTimeout(function(){
      location.reload();

    }, 1000);
    
  });

  $("#myTable tbody").on("click", ".btn_update_user2", function (e) {
    
    let infousuarios = tabla_usuarios.row($(this).parents("tr,li")).data();
    update(ref(database, 'users/' + infousuarios.dni), {
      estado:'desactivado'
    });

    Swal.fire({
      customClass: {
          confirmButton: 'confirm-button-class2',
          title: 'title-class',
          icon: 'icon-class'
        },   
      title: 'Datos actualizados',
      text: 'Usuario desactivado',
      icon: 'success',
      confirmButtonText: 'OK',
    })
    setTimeout(function(){
      location.reload();

    }, 1000);
    
  });





}).catch((error) => {
  console.error(error);
});

  
// });
