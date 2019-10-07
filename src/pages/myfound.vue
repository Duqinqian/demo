<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>我的招领</h3>	
		</div>
	<scroller>
		<div class="lost-main">
            <div v-for="(data,index) in myfoundList" class="lost-item" 
                :key="index"
               >
                <h6> <i class="fa fa-tag "> </i>{{data.title}}<i class="fa fa-close" @click="deletemyfound(data)"></i> </h6>
                <div class="lost_item_img"  @click="showmyfound(data)">
					<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
                    <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt="" >-->
					<!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img1.jpg' " alt="" >-->
                </div>
                <p class="lost_content" v-html="data.content">{{data.content}}</p>
                <!--<p>{{data.publish_time}}</p>-->
            </div>
        </div>
	  </scroller>

	</div>
</template>
<script>
import {getmyfound, deletemypublish} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				myfoundList:[],
				// isShow: true
			}
		},
		created(){
			this.getData();
		},
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			showmyfound(data){
				console.log(data)
				this.$router.push('/comment/'+data.id);
			},
			deletemyfound:function(data){
				console.log(data.id);
				this.isShow = false;
				let username = localStorage.getItem('username');
				deletemypublish(username,data.id).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response)
						//  this.$router.go(0)
						this.myfoundList  = []
						getmyfound(this.username,'Found').then(res =>{
							let result = res.data;
							if( result.code == 200){
								this.myfoundList  = res.data.extra;
								console.log(this.myfoundList,11)
							}
						}).catch(function(error){
							console.log(error);
						});
					}
				})
			},
			getData(){
				this.username = localStorage.getItem('username');
				getmyfound(this.username,'Found').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.myfoundList  = res.data.extra;
						this.myfoundList  = this.myfoundList.reverse();
						console.log(this.myfoundList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
			}
	    }
	};
</script>
<style>
	.fa-close{
		color:#bbb;
		position: absolute;
		right: 20px;
	}
</style>
