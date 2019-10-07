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
		<div class="personal-main">
			<div class="personal-main_list">
				<ul>
					<li @click="myfocus"><i class="fa fa-heart-o"></i><span>我的收藏</span><i class="fa fa-angle-right"></i></li>
					<li @click="myfocusauthor"><i class="fa fa-paint-brush"></i><span>关注的作者</span><i class="fa fa-angle-right"></i></li>
					<li @click="mylost"><i class="fa fa-bullhorn"></i><span>我的寻物</span><i class="fa fa-angle-right"></i></li>
					<!--<li><i class="fa fa-bell-o"></i><span>消息中心</span><i class="fa fa-angle-right"></i></li>-->
					<li @click="myfound"><i class="fa fa-map-o"></i><span>我的招领</span><i class="fa fa-angle-right"></i></li>
					<li @click="mychat"><i class="fa fa-comments-o"></i><span>我的微聊</span><i class="fa fa-angle-right"></i></li>
					<li @click="mymsg"><i class="fa fa-bell-o"></i><span>我的消息</span>&nbsp;&nbsp;<i class="fa fa-commenting" v-show="isShowMsg"></i><i class="fa fa-angle-right"></i></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {prevent} from '../utils'
	export default{
		name: 'personal',
		data(){
			return{
				isShowMsg:false,
				username:'',
				src: '../../static/images/logo.jpg'
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
			myfocus:function(){
				this.$router.push("/myfocus")
				// console.log( this.$refs.file.files[0].name)
			},
			myfocusauthor:function(){
				this.$router.push("/myfocusauthor")
				// console.log( this.$refs.file.files[0].name)
			},
			myfound() {
				this.$router.push("/myfound")
			},
			mylost(){
				this.$router.push("/mylost")
			},
			mychat(){
				this.$router.push("/mychat")
			},
			mymsg(){
				this.$router.push("/mymsg")
			},
			getData(){
				this.username = localStorage.getItem('username');
				this.msgList = localStorage.getItem('msgList');
				this.mymsgList = localStorage.getItem('mymsgList');
				if( this.msgList != []){
					this.isShowMsg = !this.isShowMsg;
				}
				console.log(this.isShowMsg,11);
				console.log(this.msgList,22);
			}
			// mypublish:function(){
			// 	this.$router.push('/mypublish')
			// }
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
	.fa-commenting:before{
		color: #FF6A6A;
		/*margin: 10px;*/
	}
</style>
