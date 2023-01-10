import $ from "jquery";
import jwt_decode from 'jwt-decode';  // 解码包

const ModuleUser = {
    state: {
        id: "",
        username: "",
        img: "",
        fans: "",
        access: "",
        is_login: false,
    },
    getters: {
    },
    mutations: {
        UpdateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.img = user.img;
            state.fans = user.fans;
            state.access = user.access;
            state.is_login = user.is_login;
        },
        UpdateAccess(state, access) {
            state.access = access;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.img = "";
            state.fans = 0;
            state.access = "";
            state.is_login = false; 
        },
        
    },
    actions: {
        // login：匿名函数
        // login: () => {
        // }
        
        // 字典里对象可简写
        login(context, data) {
            $.ajax({
                url: 'https://app165.acapp.acwing.com.cn/api/token/',
                type: 'post',
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {  // 通过登录验证后，可以获取用户信息
                    const {access, refresh} = resp;
                    const access_obj = jwt_decode(access);

                    setInterval(() => {  // 每隔5分钟刷新一次access
                        $.ajax({
                            url: 'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                            type: 'post',
                            date: {
                                // refresh: refresh,  // key === value 可简写  左侧refresh为后端服务器对应的值
                                refresh,
                            },
                            success(resp) {  // 更新
                                context.commit("UpdateAccess", resp.access);  // 调用mutations下UpdateAccess函数
                            },
                        });
                    }, 4.5 * 60 * 1000);

                    
                    $.ajax({
                        url: 'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type: 'get',
                        data: {
                            user_id: access_obj.user_id,
                        },
                        headers: {  // JWT验证
                            'Authorization': "Bearer " + access,
                        },
                        success(resp) {
                            context.commit("UpdateUser", {
                                ...resp,
                                access,
                                is_login: true,  // 将登录标志位设置为成功
                            });
                            data.success();  // 获取用户信息成功后，调用登录界面的回调函数
                        },
                    });
                },
                error() {
                    data.error();
                }
            });
        },
    },
    modules: {
    }
}

export default ModuleUser;