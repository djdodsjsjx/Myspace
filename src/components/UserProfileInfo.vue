<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img :src="user.img" class="img-fluid" alt="">
                </div>
                <div class="col-9">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">好友数: {{ user.fans }}</div>
                    <button v-if="!is_me && !user.is_followed" @click="follow" type="button" class="btn btn-danger btn-sm">+关注</button>  <!-- @click="follow"：若当前按钮被点击，则执行follow函数 -->
                    <button v-else-if="!is_me" type="button" @click="unfollow" class="btn btn-danger btn-sm">取消关注</button>
            </div>
    </div>
        </div>
    </div>
    
</template>

<script>
import $ from 'jquery';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'UserProfileInfo',
    props: {  // 接受父组件的参数
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        const store = useStore();
        /*
            关注按钮触发事件流程：
            1. 当按钮被点击时，触发子组件的follow函数
            2. follow函数中通过`context.emit('follow');`触发父组件的follow事件
            3. 当父组件中的follow事件被触发后，则执行父组件中的follow函数，更新好友数量
            4. 再通过user属性更新子组件
        */
        const follow = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',  // 后端更改关注状态
                type: 'post',
                data: {
                    target_id: props.user.id,
                },
                headers: {  // JWT验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('follow');  // 触发父组件的follow事件
                    }
                }
            });
            
        }

        const unfollow = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type: 'post',
                data: {
                    target_id: props.user.id,
                },
                headers: {  // JWT验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('unfollow');  // 触发父组件的follow事件
                    }
                }
            });
        }

        const is_me = computed(() => store.state.user.id === props.user.id);
        return {
            follow,
            unfollow,
            is_me,
        }
    }
}
</script>


<style scoped>

img {
    border-radius: 50%;
}
.col-9 > div {
    display: flex;
    justify-content: flex-start;
}
.username {
    font-weight: bold;
}
.fans {
    font-size: 12px;
    color: gray;
}

button {
    padding: 2px, 4px;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
}
</style>
