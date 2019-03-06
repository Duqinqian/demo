<template>
	<div class="swiper-box">
		<swiper :options="swiperOption" ref="swiper" >
			<swiper-slide  
						  v-for="(data, index) in dataList" 
		  	  			  :key="index"
						 :class="{active: index == isActive}" 
							@click="addActive(index,item)">
		  	  			  <!--:class="{active: activeIndex == index}">-->
				<!--导航栏显示的数据-->
				<slot name="swiperMain" :data="data">{{data.text}}</slot> 	
			</swiper-slide>
			<!--<div class="swiper-pagination" slot="pagination"></div>-->
		</swiper>
	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide} from 'vue-awesome-swiper'
	export default{
		name: 'appnav',
		// 子组件，接受父组件的props值
		// props:{
		// 	activeIndex:{},
		// 	swiperOption:{
		// 		type:Object
		// 	},
		// 	// dataList:[]
		// 	dataList:[
		// 		{text:"tuijian"},
		// 		{text:"csdv"}
		// 	]
		// },
		data(){
			return {
				isActive:this.$store.state.tabIndex,
				dataList:[
					{text:"推荐"},
					{text:"tuijian"},
		 			{text:"csdv"},
				    {text:"dwsgetj"}
				]
			}
		},
			mounted(){
			if(this.isActive != 0){
				this.$router.push(this.dataList[this.isActive].link);
			}
		},
		methods:{
			addActive: function(index,data){
				this.isActive = index;
				this.$router.push(data.link);
				this.$store.commit("changeTab",index);
			}
		},
		components:{
			swiper,
			swiperSlide
		}
	};
</script>
