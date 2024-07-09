<template>
  <div class="container">
    <div
      class="nav-wrapper"
      :class="[{'navbar-hidden': !showNav}]">
      <div class="navbar-logo">
        <a @click="goHome()"><img src="./public/images/logo.png" alt="CCJ Logo"></a>
      </div>
      <div class="navbar-links">
        <ul>
          <li><a href="https://cryptochrisjames.com">About</a></li>
          <li><a href="mailto:social@cryptochrisjames.com?subject=Reaching Out">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <NuxtPage/>
    </div>
  </div>
  <div class="bottom-footer">
    <Socials/>
    <img src="./public/images/ccjicon.png" alt="CryptoChrisJames Logo" class="sig">
    <p class="copyright">&copy; CryptoChrisJames 2023</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const goHome = async () => {
  await navigateTo('/');
}

var lastScrollPosition = 0;
var showNav = ref(true);

const onScroll = () => {
  var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  if(currentScrollPosition < 0) {
      return;
  }
  if (Math.abs(currentScrollPosition - lastScrollPosition) < 100) {
      return;
  }
  showNav.value = currentScrollPosition < lastScrollPosition;
  lastScrollPosition = currentScrollPosition;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);

})
</script>


<style lang="scss">
@import './assets/styles/colors';
@import './assets/styles/variables';

body, html{
  background-color: $black;
  color: $white;
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Nunito', sans-serif;
}

.container {
  max-width: 777px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  margin-top: 80px;
  padding: 10px 25px;
}

.nav-wrapper {
  background-color: $black;
  position: fixed;
  z-index: 999;
  max-width: 777px;
  width: 100%;
  display: flex;
  height: 48px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  color: $white;
  transform: translate3d(0, 0, 0);
  transition: 0.3s all ease-out;
  
    @include phone {
      box-shadow: 0 3px 13px $blue,
        0 2px 4px #467baaa8;
      background-color: $darkBlack;
      opacity: .92;
      padding: 0;
    }
}

.navbar-logo img {
  height: 50px;
  padding: 0 7px;
  padding-top: 5px;
}

.navbar-links ul {
  list-style: none;
  margin: 0;
  padding: 0 7px;
  display: flex;
}

.navbar-links li {
  margin: 0 10px;
  font-size: 20px;
}

.navbar-links a {
  color: inherit;
  text-decoration: none;
  font-weight: 200;
}

.navbar-hidden {
  @include phone {
    box-shadow: 0 1px 13px $grey;
  }
  transform: translate3d(0, -100%, 0);
}

.bottom-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sig {
  height: 40px;
  padding: 0 7px;
  padding-top: 5px;
}

.copyright {
  font-size: 12px;
  margin: 5px;
  padding-bottom: 5px;
  color: #4c4c51;
}
</style>