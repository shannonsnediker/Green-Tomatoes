
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdH05JyaMvRgxW_76mArIQXrPBBQbLpBQ",
  authDomain: "web104-final-project-ssnediker.firebaseapp.com",
  projectId: "web104-final-project-ssnediker",
  storageBucket: "web104-final-project-ssnediker.appspot.com",
  messagingSenderId: "595087140295",
  appId: "1:595087140295:web:6877a42e760f32b22725e2"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var user;
var provider;

function createUser(){

    let email = document.getElementById('create-email').value;
    let password = document.getElementById('create-password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
       user = userCredential.user;
       window.location.href = 'display.html';
     })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

    document.getElementById('create-email').value = ""
    document.getElementById('create-password').value = ""
}

function signIn(){
    let email = document.getElementById('login-email').value
    let password = document.getElementById('login-password').value


    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
   document.getElementById('form').style.display = 'none'

   console.log(userCredential)
    user = userCredential.user.uid
    window.location.href = 'display.html';
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

    document.getElementById('login-email').value = ""
    document.getElementById('login-password').value = ""
}

function googleSignIn(){
let gmail = document.getElementById('gmail').value
let provider = new firebase.auth.GoogleAuthProvider(gmail);
   
firebase.auth().signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
      window.location.href = 'display.html';
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });

    document.getElementById('gmail').value = ""

}


function addPoem(user){
       
        let poemTitle = document.getElementById("title").value;
        let poemContent = document.getElementById("poem").value;
        let blogAuthor = document.getElementById("authorName").value;
        
       
        db.collection("poem app").doc(user).set({
            subcollection: {
              title: poemTitle,
              content: poemContent,
              author: blogAuthor,
              }
        })
            .then(() => {
                alert("Document successfully written!");
                displayAllDocuments();
                document.getElementById("title").value = "";
                document.getElementById("poem").value = "";
                document.getElementById("author").value = "";
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    };

   

    function getPoems() {
      db.collection("poem app").get().then((querySnapshot) => {
        let displayHTML = "";
    
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(doc.id, " => ", data);
          
          if (data) {
            displayHTML +=
              "<div id='render'>" +
              "<input id='title' value='" + data.subcollection.title + "'>" +
              "<input id='author' value='" + data.subcollection.author + "'>" +
              "<textarea id='content' content-id class='contentParagraph'>" + data.subcollection.content + "</textarea>" +
              "<button class='deleteButton' data-id='" + doc.id + "'>Delete</button>" + " " +
              "<button class='updateButton' data-id='" + doc.id + "'>Update</button>" +
              "</div>";
          }
        });
    
        document.getElementById("displayData").innerHTML = displayHTML;
    
        
        let deleteButtons = document.querySelectorAll('.deleteButton');
        deleteButtons.forEach((button) => {
          button.addEventListener('click', () => {
            let docId = button.getAttribute('data-id');
            deletePoem(docId);
          });
        });
    
        let updateButtons = document.querySelectorAll('.updateButton');
        updateButtons.forEach((button) => {
          button.addEventListener('click', () => {
            let docId = button.getAttribute('data-id');
            updatePoem(docId);
          });
        });
      });
    }
    
    function updatePoem(docId) {
      var updatedTitle = document.getElementById('title').value
      var updatedAuthor = document.getElementById('author').value
      var updatedContent = document.getElementById('content').value
     
      db.collection("poem app").doc(docId).update({
        "subcollection.title": updatedTitle,
        "subcollection.author": updatedAuthor,
        "subcollection.content": updatedContent
      })
        .then(() => {
          console.log("Document successfully updated!");
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }
    
    function deletePoem(docId) {
      db.collection("poem app").doc(docId).delete()
        .then(() => {
          console.log("Document successfully deleted!");
          location.reload();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
    

function signOut() {
    firebase.auth().signOut().then(() => {
        console.log("log out successful")
        window.location.href = 'authentication.html';

      }).catch((error) => {
        // An error happened.
      });
}
