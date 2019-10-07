<template>
	<div class="publicNotes">
		<div class="login_photo">
			<img src="../../../static/images/login.jpg"  class="s">
			<span @click="goBack" class="register_goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
		</div>
		<div class="register_warp">
			<div class="input_register">
				<p class="user"><i class="fa fa-user-o"></i><input type="text" placeholder="请输入用户名" v-model="userName" class="register_input"></p>
				<p class="user"><i class="fa fa-lock"></i>&nbsp;<input type="password" placeholder="请设置密码" v-model="password" class="register_input"></p>
				<p class="user"><i class="fa fa-lock"></i>&nbsp;<input type="password" placeholder="请再次输入密码" v-model="password2" class="register_input" ></p>
			</div>
			<button class="register_btn" @click="register">注册</button>
		</div>
	</div>
</template>
<script>
import {register} from '../../api/index'

export default {
  data(){
      return{
			userName:'',
			password:'',
			password2:'',
			nickname:''
		}
	},
	methods: {
		register() {
			if (this.userName === ''){
				this.$toast('请输入用户名');
				return;
			}
			if( this.userName === 'superuser'){
				this.$toast('请更换用户名')
			}
			if (!this.password) {
				this.$toast('请输入密码');
				return;
			}
			if (!this.password2) {
				this.$toast('请确认密码');
				return;
			}
			if (this.password != this.password2){
				this.$toast('两次密码输入不同');
				return;
			} 
			if( this.userName != 'superuser'){
				let params = {username: this.userName, password: this.password, nickname: this.userName}
				register(params).then(res => {
					let success = res.data
					if (success.code === 200) {
						this.$router.push('/login');
					} else {
						this.$toast('注册失败');
					}
				})
					console.log(params)
			}
		},
		goBack: function(){	
			this.$router.goBack();	
		}
	}
};
</script>
<style scoped>
	.register_goBack{
		display: inline-block; 
		position: absolute;
		top: 20px;
		left: 30px;
	}
	.register_warp{
		background:#fff;
		height: 1300px;
	}
	.input_register{
		width: 400px;
		color: #aaa;
		margin: auto;
	}
	.user{
		padding: 100px 0 20px 40px;
		border-bottom: 1px solid #eee;
        outline:none;
    }
	.register_input{
	    margin: 0px 50px;
		width: 200px;
		border: none;
    }
	.register_btn {
         margin: 80px 30px 30px 200px;
         padding: 20px 140px;
		 background:#ddd;
         border: none;
         color: #fff;
         border-radius: 5px;
     }
</style>
