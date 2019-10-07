<template>
	<div class="things">
	<!--轮播-->
	<div class="banner" @mouseout="runInv">
	  <div class="lunbo_item">
	  	<img :src="dataList_lunbo[currentIndex]">
  	  </div>
	  <div class="lunbo_page" v-if="this.dataList_lunbo.length > 1">
		  <ul>
			  <li @click="gotoPage(prevIndex)">&lt;</li>
			  <li v-for="(item,index) in dataList_lunbo" :key="index" @click="gotoPage(index)" :class="{'current':currentIndex == index}"> {{index + 1}} </li>
			  <li @click="gotoPage(nextIndex)">&gt;</li>
		  </ul>
	  </div>
  </div>
		<!--导航栏-->
		<div class="things-nav">
			<swiper :dataList="navList" :activeIndex="activeIndex" ref="navSwiper" :swiperOption="swiperOptionNav" ></swiper>
		</div>
		<div class="things-main">
			<scroller 
				:on-refresh="refresh" 
				:refreshText="refreshText" ref="scroller">
				<span style="width:20px;height:20px;" class="spinner" slot="refresh-spinner"></span>
				<!--<div class="things-time">TODAY</div>-->
				<swiper 
					:dataList="navList"  
					:swiperOption="swiperOptionMain"  ref="mainSwiper">
					<div slot="swiperMain" slot-scope="slotProps">
						<div v-for="(item, index) in slotProps.data.extra" :key="index" class="things-item" >
							<div class="things-img-wrapper" @click="showDetails(item)">
								<!--<img class="things-item_img" :src="'http://192.168.43.247/public/images/'+item.cover_img" alt="">-->
								<img class="things-item_img" :src="'http://192.168.43.247/public/ariticle/' + item.id +'/' + '/cover_img.jpg' " alt="" >
								<!--<span class="things-item_tips">{{item.author}}</span>-->
								<span v-html="item.cover_desc">{{item.cover_desc}}</span>
							</div>
							<!--图片下方一栏-->
							<div class="things-item-foot">
								<div class="foot-desc">
									<!--头像-->
									<span class="foot-desc_logo"><img src="../../static/images/logo.jpg" alt=""></span>
									<div class="foot-desc_text">
										<p>{{item.title}}</p>
										<p class="origin">{{item.publish_time}}</p>
									</div>
								</div>
								<!--点赞-->
								<div class="foot-action">
									<span @click="change(item)" v-if="!admire" class="fa fa-thumbs-o-up action-up"></span>
									<span v-else @click="change(item)" class="fa fa-thumbs-up action-up"></span>
									<span  v-show="item._like" class="like"><i>{{item._like}}</i></span>  
									<!--<span @click="dislike(item)" class="fa fa-frown-o action-down"></span>-->
									<!--<span v-show="item._unlike" class="dislike"><i>{{item._unlike}}</i></span>-->
								</div>
							</div>
						</div>
					</div>
					
				</swiper>
			</scroller>
			<!--置顶按钮-->
			<div class="to-top" @click="toTop"><i class="fa fa-arrow-up"></i></div>
			<div class="search" @click="toSearch"><i class="fa fa-search"></i></div>
		</div>
	</div>
</template>
<script>
	import { mixin,pageAct } from '../utils'
	import {getAriticle, likeAriticle} from '../api/index'

	export default{
		name: 'things',
		data (){
			return{
				admire: 0 ,
				dataList_lunbo:[
				
					"../../static/images/lb2.jpg",
					'../../static/images/lb4.jpg',					
					'../../static/images/lb3.jpg',				
					'../../static/images/lb1.jpg'					
				],
				currentIndex:0,
				timer: null,
				flag: 0
				}
		},
		mixins:[mixin,pageAct],
		methods:{
			gotoPage(index) {
				this.currentIndex = index;
			},
			change(item){
				this.admire == false?this.admire = true:this.admire = false;
				localStorage.setItem('admire',this.admire);
				if( this.admire == false ){
					item._like = item._like - 1;
				}else{
					item._like = item._like + 1;
					this.$toast("感谢你的喜欢 (^.^) ");
				}
			},
			runInv() {
				this.timer = setInterval(() => {
					this.gotoPage(this.nextIndex)
					// console.log('ccc')
				}, 3000)
			},
			mounted() {
			　　clearInterval(this.timer)
			},
			distroyed: function () {
			　　clearInterval(this.timer)
			},
			showDetails: function(item){
				console.log(item)
				this.$router.push("/comment/"+item.id);
			},
			getData: function(cb){
				var self = this;
				getAriticle(0,'Ariticle').then(res=> {
					var result_article = res.data;
					 getAriticle(0,'Lost').then(res=> {
						var result_fun = res.data;
						getAriticle(0,'Chat').then( res => {
							var result_talk = res.data;
							getAriticle(0, 'Found').then( res =>{
								var result_note = res.data;
								var result = [result_article,result_fun,result_note,result_talk];
								// result 为其 list ,resule.extra = datalist
								if( ( result_article.code && result_fun.code && result_talk.code && result_note.code) == 200) {
									const titles = ['浙理知道', '浙理寻物', '浙理招领', '浙理微聊']
									result.forEach((value, index) => {
										value.text = titles[index]	
										// console.log(this.dataList)
									})
									self.navList = result.slice(0,4)
									// console.log(self.navList)
								}
							}).catch(function(error){
								console.log(error);
							})
						})
					 })
				})
			},
			loadMore: function(cb){
				var self = this;
				this.$axios.post("/things",{author:self.activeIndex}).then(function(response){
					var result = response.data;
					cb && cb(result);
				}).catch(function(error){
					console.log(error);
				});
			},
			toSearch: function(){
				this.$router.push("/search");
			}
		},
		computed: {
			prevIndex(){
				if(this.currentIndex == 0) {
					return this.dataList_lunbo.length - 1;
				}else{
					return this.currentIndex -1;
				}
			},
			nextIndex(){
				// debugger
				if( this.currentIndex == this.dataList_lunbo.length -1 ) {
					return  0 ;
				}else{
					return this.currentIndex +1;
				}
			}
		}
	};
</script>
<style>
	.banner{
		width: 100%;
		background:#fff;
		height: 300px;
	}
	.lunbo_item img{
		width: 70%;
		margin-left:110px ;
		height: 300px;
	}
	.lunbo_page{
		position: absolute;
		top: 265px;
		right: 120px;
		color: #aaa;
	}
	.lunbo_page li{
		display: inline;
	}
	
</style>