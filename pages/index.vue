<template>

<div class="main-container">
      <div class="image-container"></div>
      <div id="pumpkin">A pumpkin halloween decoration? In September? Weird!</div>
      
    </div>
    <Script src="js/three.min.js"></Script>
    <Script src="js/panolens.min.js"></Script>
    <Script src="js/main.js"></Script>
    
  </template>
  
  <script>

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
  /* flex: 1; */
  height: 100%;

  position: fixed;
  width: 100%;
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

  </style>