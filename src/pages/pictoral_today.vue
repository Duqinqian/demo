<template>
	<div class="pictoral">
		<span @click="goBack" class="goBack_pictoral"><i class="fa fa-2x fa-angle-left"></i></span>
		<div class="pictoral-main">
			 <transition-group name="cell" tag="div" class="container"
					v-bind:css="false"
				    v-on:before-enter="beforeEnter"
				    v-on:enter="enter"
   					v-on:leave="leave">
				<div v-for="(data, index) in dataList" class="pictoral-item"  
					:key="indexList[index]"  
					:data-index="index" 
					@click="showArticles(data)">
					<!--每篇文章上的小图标-->
					<span class="pictoral-item_logo"><img src="../../static/images/logo1.jpg"></span>
					<!--首页推荐文章正标题-->
					<h6>{{data.title}}</h6>
					<!--<div class="biaoti">{{data.title}}</div>-->
					<!--小标题-->
					<!--<p>——{{author}}</p>  -->
					<!--正文图片-->
					<div class="photo">
						<!--<img :src="'http://192.168.43.247/public/images/' + data.cover_img" alt="" >-->
						 <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
						 <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt="" >-->
					</div>
					<!--<img src="../api/images/1.jpg" alt="">-->
					<!--<img :src="data.portrait" alt="">-->
					<!--摘要-->
					<div class="words">
					<p v-html="data.cover_desc">{{data.cover_desc}}</p>
						<!--<div class="icon" @click="icon">-->
						<!--<i class="fa fa-heart-o"></i>&nbsp;&nbsp;-->
						<!--<i class="fa fa-smile-o">13</i>-->
						<!--</div>-->
					</div>
				</div>
			</transition-group>
			<div class="no-more-data"  v-show="noData"><i class="fa fa-hand-o-up"></i><p>没有更多了，试试向上滑动吧！</p></div>
		</div>
	</div>
</template>
<script>
	import AlloyFinger from 'alloyfinger'
	import Velocity from 'velocity-animate/velocity.js'
	import 'velocity-animate/velocity.ui.js'
	import {prevent} from '../utils'
	import {getAriticle, getAuthor} from '../api/index'
	
	export default{
		name: 'pictoral',
		data (){
			return{
				author:'',
				dataList:[],
				first:0,
				second:1,
				third:2,
				forth:3,
				slideStart:0,
				slideEnd:0,
				activeIndex:0,
				stop:false,
				noData:false,
				indexList:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
			}
		},
		created: function(){
			this.getData();
		},
		mounted: function(){
			this.bindSlide();
			document.body.addEventListener("touchmove",prevent);
		},
		watch:{
			activeIndex:function(){
				var list = document.querySelectorAll(".pictoral-item");
					this.stop = true;
					for(var i=0;i < list.length;i++){
						this.leave(list[i]);
					}
				if(this.activeIndex == this.dataList.length){
					this.noData = true;
				}else{
					this.noData = false;
				}
			},
			slideEnd: function(){
				if(!this.stop){
					if(this.slideEnd - this.slideStart > 20){
						if(!this.noData){
							this.first += 1;
							this.second += 1;
							this.third += 1;
							this.forth += 1;
							this.activeIndex++;
						}
					}else if(this.slideEnd - this.slideStart < -20){
						if(this.first > 0){
				       		this.first -= 1;
							this.second -= 1;
							this.third -= 1;
							this.forth -= 1;
							this.activeIndex--;
						}
					}
				}
			}
		},
		methods:{
			goBack: function(){	
				this.$router.goBack();	
			},
			showArticles: function(data){
				console.log(data)
				this.$router.push('/comment/'+data.id);
			},
			beforeEnter: function (el) {
		      el.style.opacity = 0;
		      el.style.height = 0;
		    },
		    enter: function (el, done) {
		      var delay = el.dataset.index * 50;
		      var top = '';
		      var width = this.setWidth(el.dataset.index);

		      if(el.dataset.index >= (this.first + 4)){
		      	top = 15 + "%";
		      }else{
		      	top = (4 - (el.dataset.index - this.first))*10 + "%";
		      }
		      setTimeout(function () {
		        Velocity(
		          el,
		          { opacity: 1, 
		          	height: '80%',
		          	translateY:top,
		          	width:width,
		          	zIndex: 1000 - el.dataset.index
		          },
		          { complete: done }
		        )
		      }, delay);
		    },
		    leave: function (el, done) {
		      var self = this;
		      var top = '';
		      var delay = el.dataset.index * 10;
		      var width = this.setWidth(el.dataset.index);

		      if(el.dataset.index < this.first){
		      	top = "99%";
		      }else{
		      	if(el.dataset.index >= (this.first + 4)){
			      	top = 15 + "%";
			      }else{
			      	top = (4 - (el.dataset.index - this.first))*10 + "%";
			      }
		      }
		      	Velocity(
		          el,
		          { 
		          	width:width,
		          	translateY:top
		          },{
		          	mobileHA:true,
		          	easing: [ 0.4, 0.01, 0.165, 0.99 ],
		          	complete: function(){
			          	if(el.dataset.index == (self.dataList.length - 1)){
			          		self.stop = false;
			          	}
		      	    } 
		          }
		        );
		    },
			bindSlide: function(){
				var self = this;
				var el = document.querySelector(".pictoral-main");
				var fl = new AlloyFinger(el,{
					touchStart: function(evt){
						self.slideStart = evt.changedTouches[0].clientY;
					},
					touchMove: function(evt){
						self.slideEnd = evt.changedTouches[0].clientY;
					},
	   				touchEnd:function (evt) { 
	   					self.slideEnd = evt.changedTouches[0].clientY;
	   				}
				});
			},
			setWidth: function(index){
				return index == this.first   ? '76%' :
					   index == this.second  ? '68%' :
					   index == this.third   ? '56%' : '40%';
			}, 
			getData: function(){
				var self = this;
				getAriticle(0, 'Ariticle_today').then(res=> {
					let result = res.data;
					if( result.code == 200){
						self.dataList  = res.data.extra;
						let username = localStorage.getItem('username');
						// console.log(this.user_id)
					}
				}).catch(function(error){
					console.log(error);
				});
				getAuthor(this.user_id).then(res =>{
					let response = res.data;
					if( response.code == 200) {
						this.author = response.extra[0]
						console.log(response)
					}
				}).catch(function(error){
					console.log(error);
				});
			},
			icon:function(){
				this.$router.push('/comment/'+data.id);
			}
		}
	};
</script>
<style>
	.goBack_pictoral{
		display: inline-block;
              /*float: left;*/
              color: #bbb;

			  margin: 10px 0 0 30px;
              /*margin-top: -10px; */
	}
	.photo{
		height: 300px;
		/*margin-top: 30px;*/
		/*background:#EDEDED;	*/
	}
	.words{
		/*width: 500px;*/
		height: 400px;
		/*margin-top: 10px;*/
		/*margin: auto;*/
		/*background:#EDEDED;	*/
	}
	.icon{
		margin: 10px;
		/*background:#EDEDED;*/
		color: #CFCFCF;
		float: right;
	}
</style>

