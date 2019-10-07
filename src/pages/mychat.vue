<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>我的微聊</h3>	
		</div>
		<scroller>
		<div class="lost-main">
            <div v-for="(data,index) in mychatList" class="lost-item" 
                :key="index"
            >
                <h6> <i class="fa fa-tag "> </i>{{data.title}}<i class="fa fa-close" @click="deletemyfound(data)"></i></h6>
                <div class="lost_item_img">
					 <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt=""  @click="showmychat(data)" >
                    <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt=""  @click="showmychat(data)" >-->
                </div>
                <p class="lost_content" v-html="data.content">{{data.content}}</p>
                <!--<p>{{data.publish_time}}</p>-->
            </div>
        </div>
	  </scroller>

	</div>
</template>
<script>
import {getmyfound,deletemypublish} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				mychatList:[]
			}
		},
		created(){
			this.getData();
		},
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			showmychat(data){
				console.log(data)
				this.$router.push('/comment/'+data.id);
			},
			deletemyfound(data){
				console.log(data.id);
				let username = localStorage.getItem('username');
				deletemypublish(username,data.id).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response)
						//  this.$router.go(0)
						this.mychatList  = []
							getmyfound(this.username,'Chat').then(res =>{
								let result = res.data;
								if( result.code == 200){
									this.mychatList  = res.data.extra;
									console.log(this.mychatList,11)
								}
							}).catch(function(error){
								console.log(error);
							});
					}
				})
			},
			getData(){
				this.username = localStorage.getItem('username');
				getmyfound(this.username,'Chat').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.mychatList  = res.data.extra;
						this.mychatList  = this.mychatList.reverse();
						console.log(this.mychatList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
			}
	    }
	};
</script>
