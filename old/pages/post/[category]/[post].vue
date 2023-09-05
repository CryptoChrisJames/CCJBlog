<template>
    <div v-if="currentBlog" class="article">
        <h2 class="article-title">{{ currentBlog.title }}</h2>
        <p class="article-info"> By Christopher Smith | {{ currentBlog.date }}</p>
        <p class="article-info">{{ currentBlog.description }}</p>
        <div class="divider"></div>
        <div class="content-body" ref="contentElement">
            <ContentRenderer :value="currentBlog" />
        </div>
        <div class="article-nav">
            <div v-if="previousBlog" @click="goToPost(previousBlog._path)" class="prev">
                <span class="article-nav-previous-text">
                    Previous
                </span>
                <span class="article-nav-previous-title">
                    {{ previousBlog.title }}
                </span>
            </div>
            <div v-if="nextBlog" @click="goToPost(nextBlog._path)" class="next">
                <span class="article-nav-next-text">
                    Next
                </span>
                <span class="article-nav-next-title">
                    {{ nextBlog.title }}
                </span>
            </div>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script setup>
const contentElement = ref(null);
const { category, post } = useRoute().params;
const path = `/${category}/${post}`
const { data } = await useAsyncData('post', 
    () => queryContent(`/${category}`).sort({ date: -1 }).find());

var currentBlog; 
var previousBlog;
var nextBlog;

for (var i = 0; i < data._rawValue.length; i++) {
    if (data._rawValue[i]._path == path) {
        currentBlog = data._rawValue[i];
        if (i > 0) {
            previousBlog = data._rawValue[i - 1];
        }
        if (i < data._rawValue.length - 1) {
            nextBlog = data._rawValue[i + 1];
        }
        break;
    }
}

onMounted(() => {
    if (contentElement.value) {
        const images = contentElement.value.getElementsByTagName('img');
        for (const img of images) {
            img.style.display = 'block';
            img.style.maxWidth = '85%';
            img.style.height = 'auto';
            img.style.margin = '0 auto';
            img.style.padding = '25px 0';
        }
    }
    if (contentElement.value) {
        const code = contentElement.value.getElementsByTagName('pre');
        for (const c of code) {
            c.style.overflowX = 'auto';
        }
    }
    if(contentElement.value) {
        const links = contentElement.value.getElementsByTagName('a');
        for (const a of links) {
            a.style.color = '#61a0d7';
            a.style.textDecoration = 'none';
        }
    }
});

const goToPost = async (path) => {
    await navigateTo(`/post${path}`);
};

const getTitle = () => {
    return currentBlog ? currentBlog.title : 'CryptoChrisJames Blog';
};

const getDescription = () => {
    return currentBlog ? currentBlog.description : 'Personal blog of Christopher James Smith';
};

const getUrl = () => {
    return currentBlog ? `blog.cryptochrisjames.com${currentBlog._path}` : 'blog.cryptochrisjames.com';
};


useHead({
    title: getTitle(),
    meta: [
        { property: 'og:title', content: getTitle() },
        { property: 'og:description', content: getDescription() },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: getUrl() },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: 'https://blog.cryptochrisjames.com/images/ccjlogoseo.jpg' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:title', content: getTitle() },
        { property: 'twitter:description', content: getDescription() },
        { property: 'twitter:image', content: 'https://blog.cryptochrisjames.com/images/ccjlogoseo.jpg' },
        { property: 'twitter:creator', content: '@NamesChrisJames' },
        { property: 'twitter:site', content: getUrl() },
    ],
})
</script>

<style lang="scss" scoped>
@import './assets/styles/colors';
@import './assets/styles/variables';

.article {
    margin: 0 auto;
    max-width: 777px;
    padding: 0 25px;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    align-items: center;
    color: $white;
}

.article-title {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.2;
    margin: 0 0 1.5rem;
    color: $yellow;
}

.article-info {
    font-size: 12px;
    font-weight: 200;
    margin: 0 0 1.5rem;
    color: $white;
}

.divider {
    margin: 0 auto;
    width: 100%;
    height: 1px;
    background-color: $yellow;
    margin-bottom: 1.5rem;
}
.article h1, h2, h3, h4, h5, h6 {
    color: $yellow;
}

.content-body {
    font-size: 15px;

    pre {
        overflow-x: auto;
    }
}

.article-nav {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    margin-left: -1rem;
    margin-right: -1rem;
    padding: 0;

    @include phone {
        flex-direction: column;
    }
}

.prev, .next {
    background: 0 0;
    margin: 0.5rem 1rem;
    border-bottom: none;
    transition: all .2s ease;
    padding: 1.5rem .1rem;
    border-radius: 0.35rem;
    flex: 0 0 calc(50% - 2rem);
    background-color: #2c2e42;
    display: flex;
    flex-direction: column;
    @include phone {
        margin: .5rem 0;
    }
}

.prev span, .next span {
    padding: 0 15px;
    font-weight: 400;
    font-size: 18px;
}

.prev {
    order: 1;
    text-align: right;
    @include phone {
        text-align: left;
    }
}

.next {
    order: 2;
    margin-left: auto;
    @include phone {
        margin-left: 0;
    }
}
</style>