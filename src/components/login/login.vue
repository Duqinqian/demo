
<template>
  <div>
      <!--头像-->
      <div class="logo">
          <img class="login_logo" src="../../../static/images/logo.jpg">
      </div>

      <div  class="admin_login" >
        <span   @click="login">admin</span>
        <!--<span style="float: right;color: #A9A9AB">忘记密码？</span>-->
      </div>
      
    <div class="login_form">
      <p class="user">用户名：<input type="text" class="words"  placeholder="用户名" v-model="userName"></p>
      <p class="user">&nbsp;密码：&nbsp;&nbsp;<input type="text"  class="words" placeholder="密码" v-model="password"></p>
    
      <button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</button>
     
    </div>

     <div  class="registered" >
        <span   @click="login">去注册</span>
        <!--<span style="float: right;color: #A9A9AB">忘记密码？</span>-->
      </div>

  </div>
</template>

<script>
export default {
  data(){
      return{
          userName:'',
          password:'',
          isBtnLoading:false
      }
  },
  created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
 computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
 
      }
    }
}
</script>
<style>
    .logo{
        width: 120px;
        height: 120px;
        margin: auto;
        padding-top: 30%;
    }
    .login_logo{
        border-radius: 100%;
    }
    .login_form{
        width: 300px;
        margin: auto;
        padding-top: 3%;
    }
    .user{
        margin: 0 0px 20px -80px;
        width: 500px;
    }
    .words{
        margin: 10px;
        padding: 8px;
    }
     .login_btn {
         margin: 30px 30px 0px 90px;
         padding: 10px 30px;
     }
     .admin_login{
         /*width:80px;*/
         font-size: 28px;
         margin-left:560px;
         margin-top: 180px;
         color: #eee;
     }
     .registered{
         width: 100px;
         font-size: 24px;
         margin: auto;
         color: #ddd;
         padding-top: 30%;
     }
</style>

