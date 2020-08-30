<template>
    <div>
    <div class="site-wrapper p-0 cover" style="background-image: url(/images/bg.jpg)">
	
    <div class="site-wrapper-inner header-overlay-dark	 cover">
	<!-- particlesjs component -->
    <div id="particles-js"></div>
        <router-view/>
    </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  import Footer from '@/components/Footer'
  export default {
    name: 'PublicLayout',
    components: {
      'side-bar': Sidebar,
      'footer-bot': Footer
    }
  };
</script>

<style>
</style>