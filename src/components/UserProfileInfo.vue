<template>
    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img src="http://www.zhuhuaiyang.cn/upload/2022/08/QQ%E5%9B%BE%E7%89%8720220101122944.jpg" class="img-fluid" alt="">
                </div>
                <div class="col-9">
                    <div class="username">{{ fullname }}</div>
                    <div class="fans">好友数: {{ user.fans }}</div>
                    <button v-if="!user.is_followed" @click="follow" type="button" class="btn btn-danger btn-sm">+关注</button>  <!-- @click="follow"：若当前按钮被点击，则执行follow函数 -->
                    <button v-else type="button" @click="unfollow" class="btn btn-danger btn-sm">取消关注</button>
            </div>
    </div>
        </div>
    </div>
    
</template>

<script>

import { computed } from 'vue';

export default {
    name: 'UserProfileInfo',
    props: {  // 接受子组件的参数
        user: {
            type: Object,
            required: true,
        },
    },
    setup(props, context) {
        let fullname = computed(() => props.user.lastname + " " + props.user.firstname);

        /*
            按钮触发事件流程：
            1. 当按钮被点击时，触发子组件的follow函数
            2. follow函数中通过`context.emit('follow');`触发父组件的follow事件
            3. 当父组件中的follow事件被触发后，则执行父组件中的follow函数，更新好友数量
            4. 再通过user属性更新子组件
        */
        const follow = () => {
            context.emit('follow');  // 触发父组件的follow事件
        }

        const unfollow = () => {
            context.emit('unfollow');
        }

        return {
            fullname,
            follow,
            unfollow,
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