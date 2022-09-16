const panoramaImage = new PANOLENS.ImagePanorama("panorama.png");
const panoramaHallway = new PANOLENS.ImagePanorama("images/panoramic.png")
const imageContainer = document.querySelector(".image-container");

const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  controlBar: false,
  output: 'console',
});
infoSpot1 = new PANOLENS.Infospot(200, PANOLENS.DataImage.Info);
infoSpot1.position.set(-2422.20, -3215.64, -2956.15);
infoSpot1.addEventListener('click', function(){
  var x = document.getElementById("pumpkin");
  if (x.style.display === "none"){
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  this.dispose();
})
infoSpot2 = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
infoSpot2.position.set(-4344.37, -70.24, 2465.97);
infoSpot2.addHoverText("Go To The Hallway");
infoSpot2.addEventListener('click', function(){
  viewer.setPanorama(panoramaHallway);
})



panoramaImage.add(infoSpot1, infoSpot2);
viewer.add(panoramaImage, panoramaHallway);

