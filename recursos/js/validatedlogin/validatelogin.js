import { getAuth }  from "../../../src/index.js"; 
import { signInWithEmailAndPassword  }  from "../../../src/index.js"; 
import {updateProfile}  from "../../../src/index.js"; 

const auth = getAuth();

const signInForm = document.querySelector('#login-form');


signInForm.addEventListener('submit', async e => {
    e.preventDefault();

    const email = signInForm['login-email'].value;
    const password = signInForm['login-password'].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth,email,password);
        console.log(credentials);
//         updateProfile(auth.currentUser, {
//   displayName: "Admin", photoURL: "https://taskminions.com/office/img/Admin.png"
// })
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class2',
                title: 'title-class',
                icon: 'icon-class'
              },   
            title: 'Bienvenido: '+ credentials.user.displayName,
            text: 'Inicio de sesión satisfactoria',
            icon: 'success',
            confirmButtonText: 'OK',
          })
          setTimeout(function(){
            window.location ="../../../modulos/alarma/alarma.html";
          }, 2000);
          
          
    } catch (error) {
       if(error.code === "auth/wrong-password"){
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class',
                title: 'title-class',
                icon: 'icon-class'
              },
              
            title: 'Error de sesión',
            text: 'La contraseña es incorrecta',
            icon: 'error',
            confirmButtonText: 'OK',
          })
       }

       else if(error.code === "auth/user-not-found"){
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class',
                title: 'title-class',
                icon: 'icon-class'
              },
              
            title: 'Error de sesión',
            text: 'Usuario no encontrado',
            icon: 'error',
            confirmButtonText: 'OK',
          })
       } else {
        Swal.fire({
            customClass: {
                confirmButton: 'confirm-button-class',
                title: 'title-class',
                icon: 'icon-class'
              },
              
            title: 'Error de sesión',
            text: 'Lo sentimos',
            icon: 'error',
            confirmButtonText: 'OK',
          })
       }
    }


})