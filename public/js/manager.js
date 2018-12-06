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

// — checking if user loggin
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
        // debugger;
        console.log("logged in");
        console.log(uid);
        $(".status").text("You are currently logged in.");
        // $(".user-id-display").append(uid);

        // -- sending token
        user.getIdToken().then(function (data) {
            // Send Token to backend via HTTP

            // IS THIS WHERE THE CHART STUFF HAS TO GO?


            // STUFF FOR CHARTS

            // Load the Visualization API and the corechart package.
            google.charts.load("current", {
                // Set a callback to run when the Google Visualization API is loaded.
                callback: init,
                packages: ["corechart", "bar"]
            })
            // $("#btn_refresh").click(function () {
            //     init();
            // })

            let processedData;
            let processedData2;

            function processData(data) {
                let arr = new Array();
                jQuery.each(data, function (index, object) {
                    arr.push(object["firstName"], parseInt(object["SUM(results.score)"]));
                })
                console.log("first array??")
                console.log(arr);
                return arr;
            }

            function processData2(data) {
                let arr = new Array();
                jQuery.each(data, function (index, object) {
                    arr.push(object["id"], parseInt(object["SUM(results.score)"]));

                })
                console.log("first array??")
                console.log(arr);
                return arr;
            }

            function init() {
                $.get("/api/userscore", function (data) {
                    console.log(data);
                    processedData = processData(data);
                    console.log("THIS 1")
                    console.log(processedData);
                    drawChart(processedData);
                });

                $.get("/api/quizscore", function (data2) {
                    console.log(data2);
                    processedData2 = processData2(data2);
                    console.log("THIS 2")
                    console.log(processedData2);
                    drawChart2(processedData2);
                });

            }
            // Callback that creates and populates a data table, instantiates the chart, passes in the data and draws it.
            function drawChart(dataArray) {
                // Create the data table.
                let data = new google.visualization.DataTable();
                console.log("made it! " + dataArray);
                data.addColumn("string", "User Name");
                data.addColumn("number", "Score on Test");
                for (let i = 0; i < dataArray.length; i += 2) {
                    data.addRow([dataArray[i], dataArray[i + 1]]);
                }

                // Set chart options
                let options = {
                    title: "Scores on each Question",
                    height: 500,
                    chartArea: {
                        width: '50%',
                        height: '50%'
                    },
                    colors: ['lightgray'],
                    hAxis: {
                        title: "Score",
                        minValue: 0
                    },
                    vAxis: {
                        title: "Employee"
                    }
                };

                // Instantiate and draw our chart
                let chart = new google.visualization.BarChart(document.getElementById('chart'));
                chart.draw(data, options);
            }


            // -------------STUFF FOR SECOND GRAPH-----------------------------------------------

            let stringnumber;

            // Callback that creates and populates a data table, instantiates the chart, passes in the data and draws it.
            function drawChart2(dataArray) {
                // Create the data table.
                let data = new google.visualization.DataTable();
                console.log("made it! " + dataArray);
                data.addColumn("string", "Question");
                data.addColumn("number", "Number Correct");
                for (let i = 0; i < dataArray.length; i += 2) {
                    stringnumber = dataArray[i].toString();
                    data.addRow([stringnumber, dataArray[i + 1]]);
                }

                // Set chart options
                let options = {
                    title: "Correct Answers Per Question",
                    height: 500,
                    chartArea: {
                        width: '50%',
                        height: '60%'
                    },
                    colors: ['lightgray'],
                    hAxis: {
                        title: "Number Correct",
                        minValue: 0
                    },
                    vAxis: {
                        title: "Question Number",
                        minValue: 0
                    }
                };

                // Instantiate and draw our chart
                let chart = new google.visualization.BarChart(document.getElementById('chart2'));
                chart.draw(data, options);
            }

        });


    } else {
        // User is signed out.
        $(".status").text("You currently logged out.");
        console.log("not logged in");
    }
    $("#navbarName").text(email.split("@")[0].toUpperCase());
    console.log("zzz" + email.split("@")[0]);
});