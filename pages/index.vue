<template>
<div class="main-container">
  <div class="image-container"></div>
      <div id ="start">You find yourself inside the family's living room. Why is everything out of place? What happened here? A million questions popped up in your head. You try to calm yourself down. One thing's for certain. You have to get out of here - fast.</div>
      <div id="famPic"><p id="tip">Who are these people?</p></div>
      <div id="barredDoor"><p id="tip">Definitely can't exit there.</p></div>
      <div id="lamp"><p id="tip">This could be useful later on. Should I get it?</p> </div>
      <div id="snackbar">Lamp added to inventory</div>
      <div id="picShow"><img src="../static/FamilyPic.png" alt=""></div>
</div>
</template>

<script>

export default {
  name: 'IndexPage',
  
  mounted(){
    const imageContainer = document.querySelector(".image-container");
    const PANOLENS = window.PANOLENS;
    const panoLivingRoom = new PANOLENS.ImagePanorama( '/livingRoom.png' );
    const PanoHallway = new PANOLENS.ImagePanorama('/field.jpg');
    const viewer = new PANOLENS.Viewer({
      container: imageContainer,
      controlBar: false,
      output: 'console',
    });

    panoLivingRoom.addEventListener('load', function(){
      livingRoomText();
    });

    const infoSpot1 = new PANOLENS.Infospot(1000, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAqSURBVHic7cExAQAAAMKg9U/tbwagAAAAAAAAAAAAAAAAAAAAAAAAAIA3T7AAATkWl3gAAAAASUVORK5CYII=");
    infoSpot1.position.set(4838.34, 165.72, -1209.98);
    const famPic = document.querySelector('#famPic');
    infoSpot1.addHoverElement( famPic, 150 );
    infoSpot1.addEventListener('click', function(){
      showPicture();
  })

    const infoSpot2 = new PANOLENS.Infospot(700, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAqSURBVHic7cExAQAAAMKg9U/tbwagAAAAAAAAAAAAAAAAAAAAAAAAAIA3T7AAATkWl3gAAAAASUVORK5CYII=");
    infoSpot2.position.set(-4975.47, -417.76, 116.37);
    infoSpot2.addHoverText("Go To The Hallway");
    infoSpot2.addEventListener('click', function(){
    viewer.setPanorama(PanoHallway);
    this.dispose();
  })

    const infoSpot3 = new PANOLENS.Infospot(500, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAqSURBVHic7cExAQAAAMKg9U/tbwagAAAAAAAAAAAAAAAAAAAAAAAAAIA3T7AAATkWl3gAAAAASUVORK5CYII=");
    infoSpot3.position.set(2505.93, 21.18, 4325.29);
    const barredDoor = document.querySelector('#barredDoor');
    infoSpot3.addHoverElement( barredDoor, 100 );

    const infoSpot4 = new PANOLENS.Infospot(500, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFAAAAp3o92gAAAAF0Uk5TAEDm2GYAAAAqSURBVHic7cExAQAAAMKg9U/tbwagAAAAAAAAAAAAAAAAAAAAAAAAAIA3T7AAATkWl3gAAAAASUVORK5CYII=");
    infoSpot4.position.set(374.55, -927.65, 4889.87);
    const lamp = document.querySelector('#lamp');
    infoSpot4.addHoverElement( lamp, 50 );
    infoSpot4.addEventListener('click', function(){
      itemAlert();
      this.dispose();
    });

    function livingRoomText() {
      // Get the snackbar DIV
      const x = document.getElementById("start")

      // Add the "show" class to DIV
      x.className = "show";

      // After 8 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 8000);
    }

    function showPicture() {
      // Get the snackbar DIV
      const x = document.getElementById("picShow")

      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    function itemAlert() {
      // Get the snackbar DIV
      const x = document.getElementById("snackbar")

      // Add the "show" class to DIV
      x.className = "show";

      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }


    panoLivingRoom.add(infoSpot1, infoSpot2, infoSpot3, infoSpot4);
    viewer.add( panoLivingRoom, PanoHallway );
  }
}
</script>

<style>
  body {
  margin: 0;
}


.main-container {
  display: flex;
  height: 100vh;
  align-items: center;
  background: #111;
}

.main-container .image-container {
  flex: 1;
  height: 100%;

  position: fixed;
  width: 100%;
}

#panel {
  width: 320px;
  height: 50px;
  background-color: transparent;
}

#tip {
  color: yellow;
  font-size: 20px;
  background-color: transparent;
}


.main-container h1 {
  flex: 1;
  text-align: center;
  color: #fff;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 60px;
  font-weight: 800;
  letter-spacing: 10px;

  z-index: 100;
  text-shadow: 2px 16px 16px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

body{
	justify-content: center;
	align-items: center;
}

button{
  color:#000;
  background-color:#999;
  margin-top:20px;
}
  

#start {
    visibility: hidden;
    max-width: 550px; /* Set a default minimum width */
    margin-left: -260px; /* Divide value of min-width by 2 */
    background-color: transparent; 
    color: yellow;
    font-size: 20px;
    text-align: center; 
    padding: 15px;
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%; 
    top: 10%;
    bottom: 80%; 
}

#snackbar {
    visibility: hidden; 
    min-width: 250px; /* Set a default minimum width */
    margin-left: -925px; /* Divide value of min-width by 2 */
    background-color: #333; 
    color: #fff; 
    text-align: center; 
    justify-content: center;
    border-radius: 2px; 
    padding: 12px;
    position: fixed; /* Sit on top of the screen */
    z-index: 1; /* Add a z-index if needed */
    left: 50%;
    bottom: 30px; 
}

.show {
    visibility: visible !important; /* Show the snackbar */

/* Add animation: Take 0.5 seconds to fade in and out the snackbar.
However, delay the fade out process for 2.5 seconds */
    -webkit-animation: fadein 0.5s, fadeout 0.5s 8s;
    animation: fadein 0.5s, fadeout 0.5s 8s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}
</style>
