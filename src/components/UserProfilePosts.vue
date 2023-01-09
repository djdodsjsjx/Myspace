<template>
<div class="card">
    <div class="card-body">
        <div v-for="post in posts.posts" :key="post.id">
            <div class="card single-post">
                <div class="card-body">
                    {{ post.content }}
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name: 'UserProfilePosts',
    props: {  // 接受子组件的参数
        posts: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style socped>
.single-post {
    margin-bottom: 10px;
}
</style>