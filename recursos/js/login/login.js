import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { onAuthStateChanged } from "../../../src/index.js";

const boton = document.getElementById('googleIniciar');

boton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      Swal.fire({
        customClass: {
            confirmButton: 'confirm-button-class2',
            title: 'title-class',
            icon: 'icon-class'
          },   
        title: 'Bienvenido: '+ user.displayName,
        text: 'Inicio de sesión satisfactoria',
        icon: 'success',
        confirmButtonText: 'OK',
      })
      setTimeout(function(){
              window.location="../../../modulos/panel/adminpanel/adminpanel.html";
      }, 2000);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
)


