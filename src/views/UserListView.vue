<template>
<ContentBase>
    <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
        <div class="cardbody">
            <div class="row">
                <div class="col-1">
                    <img class="img-fluid" :src="user.photo" alt="">  <!-- :src属性前加:表示对字符串的内容取值，而不是字符串 -->
                </div>
                <div class="col-11">
                    <div class="username">{{ user.username }}</div>
                    <div class="fans">{{ user.followerCount }}</div>
                </div>
            </div>
        </div>
    </div>
</ContentBase>

</template>

<script>
import ContentBase from '../components/ContentBase'
import $ from 'jquery'
import { ref } from 'vue'
import router from '@/router'
import { useStore } from 'vuex' 
export default {
    name: 'UserListView',
    components: {
        ContentBase,
    },
    setup() {
        const store = useStore();
        let users = ref([]);
        $.ajax({
            url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',  // 获取用户列表
            type: 'get',
            success(resp) {
                users.value = resp;
            }
           
        });

        const open_user_profile = userId => {
            if (store.state.user.is_login) {
                router.push({
                    name: 'userprofile',
                    params: {
                        userId,
                    },
                });
            } else {
                router.push({name: 'login'});
            }
            
        };

        return {
            users,
            open_user_profile,
        }
    }
}
</script>


<style scoped>
img {
    border-radius: 50%;
    
}
.card {
    margin-bottom: 20px;
    cursor: pointer;
}
.card:hover {
    box-shadow: 2px 2px 10px lightgray;
    transition: 300ms;
}
.username {
    font-weight: bold;
    height: 50%;
    text-align: center;
}
.fans {
    font-size: 12px;
    color: gray;
    height: 50%;
    text-align: center;
}
</style>