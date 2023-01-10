<template>
<ContentBase>
    <div class="row justify-content-md-center">
        <div class="col-3">
            <form @submit.prevent="register">
                <div class="mb-3">
                    <label for="username" class="form-label">用户名</label>
                    <input v-model="username" type="text" class="form-control" id="username">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">密码</label>
                    <input v-model="password" type="password" class="form-control" id="password">
                </div>
                <div class="mb-3">
                    <label for="password_confirm" class="form-label">确认密码</label>
                    <input v-model="password_confirm" type="password" class="form-control" id="password_confirm">
                </div>
                <div class="error-message">{{ error_message }}</div>
                <button type="submit" class="btn btn-primary">注册</button>
            </form>
        </div>
    </div>
</ContentBase>
    
</template>

<script>
import ContentBase from '../components/ContentBase'
import { ref } from 'vue'
// import { useStore } from 'vuex';
import $ from 'jquery';
import router from '@/router/index';


export default {
    name: 'RegisterView',
    components: {
        ContentBase,
    },
    setup() {
        // const store = useStore();  // useStore()获取全局变量
        let username = ref('');
        let password = ref('');
        let password_confirm = ref('');
        let error_message = ref('');

        /*
            登录信息实现流程：
            1. 当输入正确的用户名和密码，点击登录按钮后，会触发submit事件，会执行当前组件下的login函数
            2. 通过dispatch函数，触发全局变量action中的login函数(user.js)
            3. 在全局变量中的login函数中，通过ajax获取后端对应的url信息
        */
        const register = () => {
            error_message.value = "";
            // store.dispatch("register", {
            //     username: username.value,
            //     password: password.value,
            //     password_confirm: password.value,
            //     success() {  // 后端验证成功后，执行的回调函数
            //         
            //     },
            //     error() {
            //         
            //     },
            // });
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/user/',
                type: 'post',
                data: {
                    username: username.value,
                    password: password.value,
                    password_confirm: password_confirm.value,
                },
                success(resp) {
                    if (resp.result === "success") {
                        router.push({name: 'login'});  // 注册成功，跳转至登录界面
                    } else {
                        error_message.value = resp.result;
                    }
                },
                error() {
                    console.log("网络异常");
                }
            });
        };


        return {
            username,
            password,
            password_confirm,
            error_message,
            register,
        };
    }
}
</script>

<style scoped>
button {
    width: 100%;
    margin-top: 10px;
}
.error-message {
    color: red;
}
</style>
    