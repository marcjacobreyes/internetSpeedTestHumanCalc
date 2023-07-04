let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");
let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 10;
let testCompleted = 0;

//Get Random image from unsplash.com
let imageApi = "https://images.unsplash.com/photo-1653310755342-e565ceb3c859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dG9waWN8fHx8fHwxNjg4NDk3ODIy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080";

//When image loads
image.onload = async function () { 
    endTime = new Date().getTime();

    //Get image size
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

//Function to calculate speed
function calculateSpeed() { 
    //Time taken in seconds
    let timeDuration = (endTime - startTime) / 1000;
    //Total Bits
    let loadedBits = imageSize * 8;
    let speedInBits = loadedBits / timeDuration;
    let speedInKbs = speedInBits / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBits;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    //if all test completed (we get 5 image then calculate average

    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbs = (totalMbSpeed / numTests).toFixed(2);

        //display average speeds
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbs}`;
        mbSpeed.innerHTML += `${averageSpeedInMbs}`;
        info.innerHTML = "Test Completed!"
    } else {
        //Run the next test
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

//Initial function to start tests
const init = async () => {
    info.innerHTML = "Test Running...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

//Run test when the page loads
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};

