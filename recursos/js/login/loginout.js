import { auth } from "../../../src/index.js";
import { onAuthStateChanged } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
const btnCerrarSesion = document.getElementById('endSesion');
const title = document.querySelector('#title');
const foto = document.querySelector('#foto');

onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      console.log(user.photoURL);

      title.innerHTML=/*html*/`
      ${user.displayName}
      `
      foto.innerHTML+=/*html*/`
      <img src=" ${user.photoURL}" alt="foto" class="foto">

      `

        btnCerrarSesion.addEventListener('click',function() {

            setTimeout(function(){
                signOut(auth).then(() => {
                    Swal.fire({
                        customClass: {
                            confirmButton: 'confirm-button-class2',
                            title: 'title-class',
                            icon: 'icon-class'
                          },   
                        text: 'Cerraste sesión',
                        icon: 'success',
                        confirmButtonText: 'OK',
                      })   
              }).catch((error) => {
                // An error happened.
              });


            }, 500);
    
           })


    } else {
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class2',
                title: 'title-class',
                icon: 'icon-class'
              },
            title: 'Error',   
            text: 'Por favor inicia sesión',
            icon: 'error',
            confirmButtonText: 'OK',
          })
          setTimeout(function(){
            window.location="../../../index.html";
        }, 2000);
    }
});


