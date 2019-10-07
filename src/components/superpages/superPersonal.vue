<template>
	<div class="personal">
		<a href="http://192.168.43.247:8080/#/login" class="personal_exit">退出</a>
		<div class="personal-logo">
			<!--<div class="logo">
				<span class="logo_img"><img src="/static/images/logo.jpg" alt=""></span>
				<span class="personal_username">{{username}}</span>
			</div>-->

	       <div class="logo" >
				<div class="upload">
					<label for="file" id="ph" name="ph">
						<img :src="src" alt="image" class="logo_img">
					</label>
				</div>
				<!--wenjianshangchuan input-->
				<input type="file" @change="getFile" ref="file" id="file" name="cover_img">
				
				<span class="personal_username">{{username}}</span>
			</div>


		</div>
		<div class="super_wrap">
			<div class="superpublished">
				<img src="/static/images/log11.jpg" alt="" class="super_img" @click="superpublished">
				<span class="super_span"> 我的发布</span>
			</div>
			<div class="superpublish">
				<img src="/static/images/log12.jpg" alt="" class="super_img" @click="superpublish">
				<span class="super_span"> 发布文章</span>
			</div>
		</div>
	</div>
</template>
<script>
	import {prevent} from '../../utils'
	export default{
		name: 'personal',
		data(){
			return{
				username:'',
				src: '../../static/images/head2.jpg'
			}
		},
		mounted(){
			document.body.removeEventListener("touchmove",prevent);
		},
		created(){
			this.getData();
		},
	    methods: {
	    	toAbout:function(){
	    		this.$router.push("/about");
	    	},
			getFile(e) {
				let _this = this
				var files = e.target.files[0];
				if(!e || !window.FileReader) 
					return
				let reader = new FileReader()
				reader.readAsDataURL(files)
				reader.onloadend = function (){
					_this.src = this.result
				}
				localStorage.setItem('headimg', this.$refs.file.files[0].name)
			},
			superpublished:function(){
				this.$router.push("/superpublished")
			},
			superpublish:function(){
				this.$router.push("/superpublish")
				// console.log( this.$refs.file.files[0].name)
			},
			getData(){
				this.username = localStorage.getItem('username');
				// console.log(this.username);
			}
	    }
	};
</script>
<style>
	.personal_exit{
		position: absolute;
		top: 20px;
		right: 30px;
		color: #fafafa;
	}
	.personal_username{
		color: #ffffff;
		font-size: 40px;
		/*margin-top: 120px;*/
	}
	.superpublished{
		background:#fafafa;
		float: left;
		width: 300px;
		height: 380px;
		margin-left: 50px;
	}
	.superpublish{
		background:#fafafa;
		float: left;
		width: 300px;
		height: 380px;
		margin-left: 50px;
	}
	.super_img{
		width: 280;
		padding: 10px;
		height: 300px;
		/*border: 1px solid #999;*/
	}
	.super_span{
		clear: both;
		color: #999;
		padding-left: 90px;
		/*text-align: center;*/
	}
</style>
