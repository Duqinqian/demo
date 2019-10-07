<template>
	<div class="comment" >
		<div class="page-title">
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-arrow-circle-left"></i></span>
			<h3>{{title}}</h3>
		</div>

		<div class="comment-main">	
			<div class="comment-designer-desc">
				<!--<span class="comment-desc-icon"><img :src="icon" alt=""></span>-->
				<div class="desc-item_text">
					<p class="comment-desc-designer">{{title}}</p><br>
					<p >文 / {{author}} </p><br>
					 <img :src="'http://192.168.43.247/public/ariticle/' + id +'/' + '/cover_img.jpg' " alt=""  class="comment_img">
					 <!--<img :src="'http://192.168.43.247/public/ariticle/' + id +'/' + '/cover_img0.jpg' " alt=""  class="comment_img">-->
					 <!--<img :src="'http://192.168.43.247/public/ariticle/' + id +'/' + '/cover_img1.jpg' " alt=""  class="comment_img">-->
					<p v-html="content" class="comment_content">{{content}}</p></div>
				<!--<span @click="likeAriticles" class="fa fa-meh-o action-up"></span>
				<span  v-show="like" class="like"><i>{{_like}}</i></span> -->
				<!--<span @click="collectionAriticle" class="foot-actionr_follow"><i class="fa fa-heart-o" ></i> {{collection}} </span>-->
				<span @click="change()" v-if="!admire" class="foot-actionr_follow fa fa-heart-o">收藏</span>
				<span v-else @click="change()" class="foot-actionr_follow fa  fa-heart">已收藏</span>
				<span @click="change3()" v-if="!admire2" class="fa fa-thumbs-o-up action-up"></span>
				<span v-else @click="change3()" class="fa fa-thumbs-up action-up"></span>
				<span  v-show="_like" class="like"><i>{{_like}}</i></span>  
			</div>	

		
			<div class="comment-designer-word clearfix" >
				<p>作者</p>
				<img src="../../static/images/head.jpg" alt="" @click="showallarticle()">
				<span class="p">{{author}}</span>
				<span @click="change2()" v-if="!foucus" class="focus">+关注</span>
				<span v-else @click="change2()" class="focus">已关注</span>
			</div>


			<div class="comment-list">
				<span class="comment-list-tips">评论({{cNum}})</span>
				<div class="list">
					<ul>
						<li v-for="(data,index) in commentList" :key="index">
							<span class="comment-user_logo fl"><img src="../../static/images/logo.jpg" alt=""></span>
							<div class="comment-content">
								<p class="user-name">{{data.user_id}}</p>
								<p class="user-time">{{data.send_time}}</p>
								<p class="user-word">{{data.content}}</p>
							</div>
						</li>
					</ul>
				</div>
				<p class="page-footer">—— 没有了呢 ——</p>
			</div>		

		</div>

		<!--评论输入框-->
		<div class="comment-area" >
			<span class="icon"><img :src="'../../static/images/logo.jpg'" alt=""></span>
			<input class="send-input" type="text" placeholder="留下爪印" v-model="sendMsg" @focus="setPosition">
			<input type="button" class="send-btn" value="评论" @click="send">
		</div>
		<transition name="slide-fade">
			<div class="showNew" v-show="showNew">
				评论成功
			</div>
		</transition>
	</div>
</template>
<script>
	import  {prevent,mixin}  from '../utils'
	import  {getComment , postcomment, getAriticleFocus, deleteAriticleFocus, deleteuserFocus} from '../api/index'
	import  {getAriticle, likeAriticle, getuserFocus, ariticleFocus,getAuthor, userFocus} from '../api/index'
	export default{
		name: 'comment-details',
		mixins:[mixin],
		data() {
			return {
				admire: " " ,
				foucus:'',
				collection:'收藏',
				collected: '已收藏',
				admire2:'',
				_like:'',
				id:'',
				title:'',
				author:'',
				img:'',
				icon:'',
				content:'',
				commentList:[],
				// commentList:'',
				cNum:'',
				sendMsg:'',
				msgList:[],
				showNew:false,
				src: '../../static/images/logo.jpg',
				oldnum:''
			}
		},
		created: function(){
			// console.log("router",this.$route)
			this.id = this.$route.params.id;
			this.loadData();
			this.getData();
		},
		mounted(){
			// console.log("router",this.$route)			
			// this.id = this.$route.params.id;
			document.body.removeEventListener("touchmove",prevent);
		},
		watch:{
			showNew: function(){
				var self = this;
				setTimeout(function(){
					self.showNew = false;
				},1000);
			}
		},
		methods:{
			showallarticle: function(){
				// console.log(data,99999777)
				// debugger
				this.$router.push("/allarticle/"+this.author);
			},
			loadData: function(cb){
				var self = this;
				getAriticle(this.id, 'Ariticle').then(res => {
					let result = res.data;
					// console.log(this.id)
					if( result.code == 200){
						let temp = this.id.toString();
				        let temple = /[^\u4e00-\u9fa5]/g;
						let title = temp.replace(temple,'');
						// console.log(title)
						for( let i = 0 ; i < result.extra.length; i++){
								self.title = result.extra[i].title;
								self.icon = result.extra[i].cover_img;
								self.content = result.extra[i].content;
								self._like = result.extra[i]._like;
								this.user_id = result.extra[i].user_id;
								// console.log(this.user_id)
						}
						getAuthor(this.user_id).then(res =>{
							let response = res.data;
							if( response.code == 200) {
								this.author = response.extra[0]
								// console.log(response)
								this.username = localStorage.getItem('username');
								getuserFocus(this.username).then(res =>{
									let response = res.data;
									if( response.code == 200){
										// console.log(response.extra,22)
										for(let i= 0 ; i < res.data.extra.length  ; i++){
											if( response.extra[i].focus_User == this.author){
												this.foucus = true;
												break;
											}else{
												this.foucus = false;
												// console.log(",,,")
											}
													// console.log(response.extra[i].focus_User,33);
										}
										// console.log(this.author,66);
									}
								})
							}
						}).catch(function(error){
							console.log(error);
						});
					}
				}).catch(function(error){
					console.log(error);
				});
 				this.username = localStorage.getItem('username');
				getAriticleFocus(this.username).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response.extra,this.id,3333)
						for(let i= 0 ; i < res.data.extra.length ; i++){
							if( response.extra[i].ariticle_id == this.id){
								this.admire = true;
								break;
									console.log(response.extra[i].ariticle_id,this.id,999)
							}else{
								this.admire = false;
								// console.log(response.extra[i].ariticle_id,this.id,77)
							}
						}
					}
				})
			},
			// 收藏
			change:function(){
				// debugger
				this.username = localStorage.getItem('username');
				let params = {username: this.username, ariticle_id: this.id}
				if( this.admire == false ){
					ariticleFocus(params).then(res =>{
						let success = res.data
						if( success.code == 200){
							this.admire = true;
						}
					})
				}else{
					deleteAriticleFocus(this.username,this.id).then(res =>{
						let response = res.data;
						if( response.code == 200){
							this.admire = false ;
						}
					})
				}
				this.admire == false?this.admire = true:this.admire = false;
				localStorage.setItem('admire',this.admire);
			},
			change2:function(){
				this.username = localStorage.getItem('username');
				let params = { username: this.username,focus_username: this.author}
				// debugger
				if( this.foucus == false ){
					userFocus(params).then(res =>{
						let success = res.data
						if( success.code == 200){
							this.foucus = true;
							// console.log(this.username)
						}
					})
				}else{
					deleteuserFocus(this.username,this.author).then(res =>{
						let response = res.data;
						if( response.code == 200){
							this.foucus = false ;
							// console.log(this.author)
						}
					})
				}
				this.foucus == false?this.foucus = true:this.foucus = false;
				localStorage.setItem('foucus',this.foucus);
			},
			change3:function(){
				// debugger
				this.admire2 == false?this.admire2 = true:this.admire2 = false;
				localStorage.setItem('admire2',this.admire2);
				if( this.admire2 == false ){
					this._like = this._like - 1;
				}else{
					this._like = this._like + 1;
					this.$toast("感谢你的喜欢 (^.^) ");
					console.log(this._like)
				}
			},
			// 评论
			send: function(){
				// if(this.sendMsg){
				// 	this.commentList.unshift({
				// 		// icon:'./static/images/logo.jpg',name:'某某某',time:'刚刚',content:this.sendMsg
				// 	});
				// 	this.cNum ++;
				// 	this.showNew = true;
				// 	this.sendMsg = '';
				// }
				this.username = localStorage.getItem('username');
				let params = {ariticle_id: this.id,username: this.username,content:this.sendMsg }
				postcomment(params).then(res =>{
					let success = res.data
					if( this.sendMsg === ''){
						this.$toast('请输入内容')
					}
					if( success.code == 200 && this.sendMsg != ''){
						getComment(this.id).then(res => {
							let response = res.data;
								// console.log(response)
							if( response.code == 200){
								this.commentList = res.data.extra;
								this.cNum = res.data.extra.length;
							}
						}).catch(function(error){
							console.log(error);
						});
						this.msgList = [];
						this.cNum ++;
						this.showNew = true;
						this.sendMsg = '';
						// if( this.username != this.author){
							this.msgList = this.msgList.concat(this.id);
							localStorage.setItem('msgList',this.msgList);
							console.log(this.msgList,131313)
						// }
					}
				})
			},
			getData: function(){
				this.src = localStorage.getItem('headimg')
				// console.log(this.src)
				getComment(this.id).then(res => {
					// this.msgList = [];
					localStorage.setItem('msgList',this.msgList);
					// 文章id
					// console.log(this.id)
					let response = res.data;
						// console.log(response)
					if( response.code == 200){
						this.commentList = res.data.extra;
						this.cNum = res.data.extra.length;
						// this.oldnum = this.cNum;
						// localStorage.setItem('oldnum',this.oldnum);
						console.log(this.msgList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
			},
			setPosition: function(){
				// 解决安卓手机输入时键盘弹起遮盖输入框的问题
				document.querySelector(".page-footer").scrollIntoView(true);
			}
		}
	}
</script>
<style>
	.word{
		color: #999;
	}
</style>
