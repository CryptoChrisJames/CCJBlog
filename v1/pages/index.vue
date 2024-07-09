<template>
    <div>
        <h3 class="welcome">
            Welcome to the blog of Christopher James Smith (CryptoChrisJames)!
            This is the place where I discuss technology, entertainment,
            and everything else in between.
        </h3>
    </div>
    <div class="content-container">
        <div class="picker-container">
            <div class="category-picker">
                <div class="category" v-for="category in categories" :key="category">
                    <button
                        class="selector"
                        :class="[{'selected': selected == category}]"
                        @click="(select(category))"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>
        </div>
        <span v-for="blogs in blogsList" :key="blogs">
            <span v-if="blogs.name == selected">
                <span v-if="hasBlogs(blogs)">
                    <div class="content-list" v-for="blog in blogs.blogs" :key="blog">
                        <div class="article-container" @click="goToPost(blog._path)">
                            <div class="text-container">
                                <div class="blog-date"><p>{{ blog.date }}</p></div>
                                <div class="blog-title"><p class="date-style">{{ blog.title }}</p></div>
                            </div>
                        </div>
                    </div>
                </span>
                <span style="text-align: center;" v-else>
                    <h3>
                        There's currently no articles in this category.
                        Please check again later.
                    </h3>
                </span>
            </span>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const router = useRouter();
const categories = ['Tech', 'Entertainment', 'Life'];
const routes = {
    'Tech': '/tech',
    'Entertainment': '/ent',
    'Life': '/life'
};
const blogsList = [];
const selected = ref('Tech');
const select = (category) => {
    selected.value = category;
};

for(var i = 0; i < categories.length; i++) {
    const category = categories[i];
    const { data } = await useAsyncData(category,
        () => queryContent(`${routes[category]}`)
            .only(['title', '_path', 'description', 'date'])
            .sort({ date: -1 })
            .find());
    var blog = {
        name: category,
        blogs: data._rawValue
    }
    blogsList.push(blog);
};

const hasBlogs = (blogs) =>  { return blogs.blogs.length > 0 };

const test = () => {
    console.log(blogsList);
};


const goToPost = (path) => {
    router.push(`post${path}`);
};

useHead({
    title: 'CryptoChrisJames Blog',
    meta: [
        { property: 'og:title', content: 'CryptoChrisJames Blog' },
        { property: 'og:description', content: 'Personal blog of Christopher James Smith' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'blog.cryptochrisjames.com' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:image', content: 'https://blog.cryptochrisjames.com/images/ccjlogoseo.jpg' },
        { property: 'twitter:title', content: 'CryptoChrisJames Blog' },
        { property: 'twitter:description', content: 'Personal blog of Christopher James Smith' },
        { property: 'twitter:image', content: 'https://blog.cryptochrisjames.com/images/ccjlogoseo.jpg' },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: 'blog.cryptochrisjames.com' },
        { property: 'twitter:creator', content: '@NamesChrisJames' }
    ],
})
</script>

<style lang="scss" scoped>
@import './assets/styles/colors';
@import './assets/styles/variables';

.welcome {
    font-size: 15px;
    font-weight: 200;
    margin: 15px auto;
    max-width: 444px;
    padding: 7px;
}

.content-container {
    margin: 0 auto;
    max-width: 444px;
}

.content-list {
    margin: 0 auto;
    width: 100%;
}
.picker-container {
    margin: 0 auto;
    max-width: 444px;
}
.category-picker {
    width: 100%;
    display: flex;
    height: 48px;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-between;
    color: $white;
}

.category {
    flex: 1;
    margin: 0 auto;
}

.selector {
    width: 100%;
    height: 44px;
    font-size: 20px;
    border: none;
    border-bottom: 2px solid $white;
    border-top: 2px solid $white;
    background-color: transparent;
    color: $white;
}

.selected {
    color: $yellow;
    border: none;
    border-bottom: 2px solid $blue;
    border-top: 2px solid $blue;
}

.image-container {
    display: flex;
    flex-basis: 50%;
    align-items: center;
    justify-content: center;
}

.image-container img {
    display: block;
    width: 50%;
    height: auto;

    @include phone {
        width: 100%;
    }
}

.text-container h2 {
    color: $yellow;
    margin-top: 10px;

    @include phone {
        margin: 0;
    }
}

.text-container{
    display: flex;
    align-items: center;
}

.blog-date{
    flex: 0.5;
}

.blog-title {
    flex: 1;
}

.desc {
    font-size: 13px;
    font-weight: 200;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.date {
    font-size: 13px;
    font-weight: 200;
    margin-bottom: 10px;
}

.date-style {
    font-size: 25px;
    font-weight: 200;
    color: $yellow;
}
</style>