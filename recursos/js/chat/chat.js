import { onAuthStateChanged } from "../../../src/index.js";
import { auth } from "../../../src/index.js";
import { provider } from "../../../src/index.js";
import { signInWithPopup } from "../../../src/index.js";
import { collection } from "../../../src/index.js";
import { addDoc } from "../../../src/index.js";
import { GoogleAuthProvider } from "../../../src/index.js";
import { db } from '../../../src/index.js';
import { onSnapshot } from '../../../src/index.js';
import { query } from '../../../src/index.js';
import { where } from '../../../src/index.js';
import { doc } from '../../../src/index.js';
import { orderBy } from "../../../src/index.js";
import { signOut } from "../../../src/index.js"; 

const botones = document.querySelector('#botones');
const nombreUsuario = document.querySelector('#nombreUsuario');
const contenidoProtegido=document.querySelector('#contenidoProtegido');
const formulario=document.querySelector('#formulario');
const inputChat=document.querySelector('#inputChat');
const title = document.querySelector('#title');
const foto = document.querySelector('#foto');

const f = new Intl.DateTimeFormat("es-sp",{
  dateStyle:"short",
  timeStyle:"short",
})


onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        const uid = user.uid;
        title.innerHTML=/*html*/`
        ${user.displayName}
        `
        foto.innerHTML+=/*html*/`
        <img src=" ${user.photoURL}" alt="foto" class="foto">
  
        `
        botones.innerHTML=/*html*/`
        <button class="btn btn-outline-danger" id="btnCerrarSesion">Cerrar sesión</button>
        `
        nombreUsuario.innerHTML=user.displayName;
        cerrarSesion();
        formulario.classList = "input-group py-3 fixed-bottom container"
        contenidoChat(user);


    } else {
        console.log("usuario no existe");
        botones.innerHTML=/*html*/`
        <button class="btn btn-outline-success" id="btnAcceder">Acceder</button>
        `
        iniciarSesion();
        nombreUsuario.innerHTML='Chat';
        contenidoProtegido.innerHTML=/*html*/`
        <p class="text-center lead mt-5">Debes iniciar sesion</p>
        `
        formulario.classList = "input-group py-3 fixed-bottom container d-none";
        
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
          window.location.href = "../../index.html";
        }, 2000);


    }
});

const contenidoChat = (user) => {

    formulario.addEventListener('submit',(e) => {
        e.preventDefault();
        console.log(inputChat.value);
        if(!inputChat.value.trim()){
            console.log("Input vacio");
            return;
        }

        try {
            const docRef = addDoc(collection(db, "chat"), {
              texto: inputChat.value,
              uid: user.uid,
              nick:user.displayName,
              fecha: Date.now()
            });
            console.log("Mensaje guardado ");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          inputChat.value=""

    })
    
    const q = query(collection(db, "chat"),orderBy('fecha'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        contenidoProtegido.innerHTML="";
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(user.uid);
        if(doc.data().uid === user.uid){
            contenidoProtegido.innerHTML +=/*html*/`
            <div class="d-flex justify-content-end me-4 mt-4">
            <span class="badge text-bg-primary">${doc.data().nick}: ${doc.data().texto}</span>
            </div>
            `
        } else{
            contenidoProtegido.innerHTML +=/*html*/`
              <div class="d-flex justify-content-start me-4 mt-4">
              <span class="badge text-bg-secondary">${doc.data().nick}: ${doc.data().texto}</span>
            </div>
            `
        }
        contenidoProtegido.scrollTop=contenidoProtegido.scrollHeight;

      });
    });

};

const cerrarSesion=() => {
    const btnCerrarSesion=document.querySelector('#btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', async() => {
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

    
    
    }


const iniciarSesion = () => {
    const btnAcceder=document.querySelector('#btnAcceder');
    btnAcceder.addEventListener('click', async() => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
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
    
    })
    
    }