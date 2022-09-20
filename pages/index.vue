<template>
 <p>Test</p>
</template>

<script>
export default {
  name: 'IndexPage',
  mounted(){
    const PANOLENS = window.PANOLENS;
    const panorama = new PANOLENS.ImagePanorama( '/field.jpg' );
    const viewer = new PANOLENS.Viewer();
    viewer.add( panorama );
  }
}
</script>

