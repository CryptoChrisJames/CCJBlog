<template>
    <div class="socials-container">
        <a href="https://github.com/CryptoChrisJames"><img src="../assets/icons/gh.svg" alt="Github Link"></a>
        <a href="https://www.youtube.com/@cryptochrisjames"><img src="../assets/icons/yt.svg" alt="YouTube Link"></a>
        <a href="https://www.linkedin.com/in/cryptochrisjames/"><img src="../assets/icons/li.svg" alt="LinkedIn Link"></a>
        <a href="https://www.instagram.com/cryptochrisjames/"><img src="../assets/icons/ig.svg" alt="Instagram Link"></a>
        <a href="https://www.facebook.com/CryptoChrisJames"><img src="../assets/icons/fb.svg" alt="Facebook Link"></a>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";

.socials-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 222px;
    margin: 15px auto;
    padding: 10px;
    img {
        width: 35px;
        height: 35px;
        filter:
            invert(97%)
            sepia(19%)
            saturate(6994%)
            hue-rotate(307deg)
            brightness(109%)
            contrast(104%);
    }
}
</style>