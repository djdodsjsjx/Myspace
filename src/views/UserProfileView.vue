<template>
<ContentBase>
    <div class="row">
        <div class="col-3">
            <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />  <!-- @follow123="follow"：若follow123事件被触发，则执行follow函数 -->
            <UserProfileWrite v-if="is_me" @make_a_post="make_a_post" />
        </div>
        <div class="col-9">
            <UserProfilePosts :user="user" :posts="posts" @delete_a_post="delete_a_post" />
        </div>
    </div>
</ContentBase>

</template>

<script>
import ContentBase from '../components/ContentBase'
import UserProfileInfo from '@/components/UserProfileInfo.vue';
import UserProfilePosts from '@/components/UserProfilePosts.vue';
import UserProfileWrite from '@/components/UserProfileWrite.vue';
import { reactive } from 'vue'
import { useRoute } from 'vue-router';
import $ from 'jquery';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'UserProfileView',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup() {
        const store = useStore();
        const route = useRoute();  // 取得链接中的参数
        const userId = parseInt(route.params.userId);
        const user = reactive ({});
        const posts = reactive ({});

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',  // 获取某个用户的信息
            type: 'get',
            data: {
                user_id: userId,
            },
            headers: {  // JWT验证
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                user.id = resp.id;
                user.username = resp.username;
                user.img = resp.photo;
                user.fans = resp.followerCount;
                user.is_followed = resp.is_followed;
            },
        });

        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/post/',  // 获取某个用户的所有帖子
            type: 'get',
            data: {
                user_id: userId,
            },
            headers: {  // JWT验证
                'Authorization': "Bearer " + store.state.user.access,
            },
            success(resp) {
                posts.count = resp.length;
                posts.posts = resp;
            },
        });
        
        const follow = () => {
            if (user.is_followed) return ;
            user.fans ++;
            user.is_followed = true;
        };

        const unfollow = () => {
            if (!user.is_followed) return ;
            user.fans --;
            user.is_followed = false;
        };

        const make_a_post = content => {
            posts.count ++;
            posts.posts.unshift({
                id: posts.count,
                userId: 1,
                content: content,
            });
        };

        const delete_a_post = post_id => {
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count --;
        };
        const is_me = computed(() => userId === store.state.user.id);

        return {
            user,
            follow,
            unfollow,
            posts,
            make_a_post,
            is_me,
            delete_a_post,
        }
    }
}
</script>

<style scoped> 
</style>