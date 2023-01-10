<template>
<div class="card">
    <div class="card-body">
        <div v-for="post in posts.posts" :key="post.id">
            <div class="card single-post">
                <div class="card-body">
                    {{ post.content }}
                    <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>  <!-- delete_a_post(post.id)直接传参数，后台会转化箭头函数 -->
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery';
export default {
    name: 'UserProfilePosts',
    props: {  // 接受子组件的参数
        posts: {
            type: Object,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {  // 需要添加props，父组件传过来的user属性
        const store = useStore();
        let is_me = computed(() => store.state.user.id === props.user.id);

        const delete_a_post = post_id => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',
                type: 'delete',
                headers: {  // JWT验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                data: {
                    post_id: post_id,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit("delete_a_post", post_id);
                    }
                }
            });
            
        };
        return {
            is_me,
            delete_a_post,
        };
    },
    

}
</script>

<style scoped>
.single-post {
    margin-bottom: 10px;
}
button {
    float: right;
}
</style>