// Initialize Firebase -- copy from google given code
var config = {
    apiKey: "AIzaSyDgn-905hKtc6ZBpMNOfQxkd26Rx54ZIZo",
    authDomain: "automentor-f3b77.firebaseapp.com",
    databaseURL: "https://automentor-f3b77.firebaseio.com",
    projectId: "automentor-f3b77",
    storageBucket: "automentor-f3b77.appspot.com",
    messagingSenderId: "910011566568"
};
firebase.initializeApp(config);


// Global variable
let currentuser;

// sign off
$("#logoutBtn").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    firebase.auth().signOut().then(function () {
        console.log("sign off successful.");
        window.location = 'landingPage.html';
    }, function (error) {
        console.log(error);
    });
});

// — checking if user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        // to Global variable
        currentuser = user.uid;

        console.log("loggedin");
        console.log(uid);
        $(".status").text("Welcome. You are loggedin.");
        $(".user-id-display").append(uid);

        // -- sending token
        user.getIdToken().then(function (data) {
            // Send Token to backend via HTTP
            // to do...   
            var userObj = {
                email: user.email,
                uid: user.uid,
                token: data
            }

            $.post("/api/testuser", userObj).then(respond => {
                console.log(respond);
                if (respond.isManager === "yes") {
                    console.log("manager");
                }
            });
        });

    } else {
        // User is signed out.
        $(".status").text("You are not loggedin.");
        console.log("not loggedin");
    }
    $("#navbarName").text("\xa0\xa0\xa0\xa0"+email.split("@")[0].toUpperCase());
});