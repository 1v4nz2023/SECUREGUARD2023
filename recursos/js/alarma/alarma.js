 var firebaseConfig = {

    apiKey: "AIzaSyD68kzIw8vC4hy2iqR6NRrPw6qHN9Xhb0o",
    authDomain: "g-a9e04.firebaseapp.com",
    databaseURL: "https://g-a9e04-default-rtdb.firebaseio.com",
    projectId: "g-a9e04",
    storageBucket: "g-a9e04.appspot.com",
    messagingSenderId: "542743360102",
    appId: "1:542743360102:web:fd9595b60cfb9b5c99f3a7",
    measurementId: "G-4PP141JSLL"


  };


  firebase.initializeApp(firebaseConfig);

var db=firebase.database();





function enviarMensaje(patron)

{
   

    db.ref("/Test")
    .set({
       LED: parseInt(patron),
  
    });
    return (false);
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
    }, 2000);
});



$("#desactivar").click(function (e) { 
    e.preventDefault();
    
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
    }, 2000);
});


