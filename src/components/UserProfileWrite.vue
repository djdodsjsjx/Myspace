<template>
<div class="card edit-field">
    <div class="card-body">
        <div class="mb-3">
            <label for="edit" class="form-label">编辑</label>
            <textarea v-model="content" class="form-control" id="edit" rows="3"></textarea>  <!-- v-model: 将textarea的内容和content变量绑定起来 -->
            <button @click="make_a_post" type="button" class="btn btn-info btn-sm">发帖</button>
        </div>
    </div>
</div>
</template>


<script>

import {ref} from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';
export default {
    name: 'UserProfileWrite',
    setup(props, context) {
        const store = useStore();
        let content = ref('');

        /*
            发帖实现流程：
            1. 当发帖事件被触发后，会执行当前组件下的make_a_post函数
            2. make_a_post函数中通过`context.emit('make_a_post', content.value);`触发父组件的make_a_post事件
            3. 当父组件中的make_a_post事件被触发后，则执行父组件中的make_a_post函数，将新的内容添加至posts列表中
            4. 由于posts是reactive属性，因此posts内容发生变化时，会更新使用当前posts变量的组件UserProfilePosts，最终更新显示内容
        */
        const make_a_post = () => {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/myspace/post/',  // 创建一个帖子
                type: 'post',
                data: {
                    content: content.value,
                },
                headers: {  // JWT验证
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {  // 若在数据库中添加成功，更新前端显示
                        context.emit('make_a_post', content.value);
                        content.value = "";
                    }
                }
            });
            
        };

        return {
            content,
            make_a_post,
        }
    }
}
</script>


<style scoped>
.edit-field {
    margin-top: 20px;
}
button {
    margin-top: 10px;
}
</style>