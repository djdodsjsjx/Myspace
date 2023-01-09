<template>
<ContentBase>
    <div class="row">
        <div class="col-3">
            <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user" />  <!-- @follow123="follow"：若follow123事件被触发，则执行follow函数 -->
            <UserProfileWrite @make_a_post="make_a_post" />
        </div>
        <div class="col-9">
            <UserProfilePosts :posts="posts" />
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
export default {
    name: 'UserProfileView',
    components: {
        ContentBase,
        UserProfileInfo,
        UserProfilePosts,
        UserProfileWrite,
    },
    setup() {
        const user = reactive ({
            id: 1,
            username: "zhuhuaiyang",
            lastname: "Zhu",
            firstname: "Huaiyang",
            fans: 0,
            is_followed: false,
        });

        const posts = reactive ({
            count: 3,
            posts: [
                {
                    id: 1, 
                    userid: 1,
                    content: "你好啊"
                },
                {
                    id: 2, 
                    userid: 1,
                    content: "交个朋友吧"
                },
                {
                    id: 2, 
                    userid: 1,
                    content: "hhh"
                },
            ]
        })
        const follow = () => {
            if (user.is_followed) return ;
            user.fans ++;
            user.is_followed = true;
        }

        const unfollow = () => {
            if (!user.is_followed) return ;
            user.fans --;
            user.is_followed = false;
        }

        const make_a_post = content => {
            posts.count ++;
            posts.posts.unshift({
                id: posts.count,
                userId: 1,
                content: content,
            });
        };

        return {
            user,
            follow,
            unfollow,
            posts,
            make_a_post,
        }
    }
}
</script>
