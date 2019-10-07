
<template>
  <div>
      <!--头像-->
      <!--<div class="logo">
          <img class="login_logo" src="http://192.168.43.247/public/user/App.ico">
          <img class="login_logo" src="../../../static/images/logo.jpg">
      </div>-->
    <div class="login_photo">
        <img src="../../../static/images/login.jpg"  class="s">
    </div>
    <div class="login_form">
        <div class="input_login">
            <p class="user"><i class="fa fa-user-o"></i> <input type="text" class="words"  placeholder="请输入用户名" v-model="username"></p>
            <p class="user"><i class="fa fa-lock"></i>&nbsp;&nbsp;<input type="password"  class="words"  placeholder="请输入密码" v-model="password" ></p>
        </div>
      <button class="login_btn" @click="login" type="primary" round :loading="isBtnLoading">登录</button>
      <div  class="superuser" >
        <span   @click="superuser">超级用户登录</span>
        <!--<span style="float: right;color: #A9A9AB">忘记密码？</span>-->
      </div>
      <div  class="registered_btn" >
        <span   @click="register">去注册</span>
        <!--<span style="float: right;color: #A9A9AB">忘记密码？</span>-->
      </div>
    
    </div>

    
  </div>
</template>

<script>
import {login} from '../../api/index'

export default {
  data(){
      return{
          username:'',
          password:'',
          isBtnLoading:false
      }
  },
  created () {
    },
 computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if (this.username === '') {
          this.$toast('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$toast('请输入密码');
          return;
        }
        if( this.username == 'superuser'){
            this.$toast('请使用超级用户登录')
        }
        if( this.username != 'superuser'){
            let params = {username: this.username, password: this.password}
            login(params).then(res => {
                let success = res.data
                if (success.code === 200) {
                    localStorage.setItem('username',this.username);
                    this.$router.push({path: '/things'})
                } else {
                    this.$toast('账号或密码错误');
                }
            })
        }
      },
      register() {
        this.$router.push('/register');
      },
      superuser:function(){
        this.$router.push('/superlogin')
      }
    }
}
</script>
<style scoped>
    .login_logo{
        border-radius: 100%;
    }
    .login_form{
        background:#fff;
        height: 1300px;
    }
    .input_login{
        width: 400px;
        color: #aaa;
        margin: auto;
    }
    .user{
        padding: 100px 0 20px 40px;
        border-bottom: 1px solid #eee;
        outline:none;
    }
    .words{
        margin: 0px 50px;
        width: 200px;
        border: none;
    }

    input:focus { outline: none; } 

     .login_btn {
         margin: 80px 30px 30px 170px;
         padding: 20px 180px;
         background:#ddd;
         border: none;
         color: #fff;
         border-radius: 5px;
     }
     .registered_btn{
         /*width: 100px;*/
         font-size: 24px;
         text-align: center;
         /*margin: auto;*/
         /*color: #ddd;*/
         /*padding-top: 30%;*/
         color: #ccc;
     }
     .superuser{
         color: #ccc;
         text-align: center;
         font-size: 26px;
         margin: 120px 0 30px 0;
     }
</style>

