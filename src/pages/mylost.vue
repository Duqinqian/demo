<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>我的寻物</h3>	
		</div>
		<scroller>
		<div class="lost-main">
            <div v-for="(data,index) in mylostList" class="lost-item" 
                :key="index"
               >
                <h6> <i class="fa fa-tag "> </i>{{data.title}}<i class="fa fa-close" @click="deletemyfound(data)"></i></h6>
                <div class="lost_item_img">
					 <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt=""  @click="showmylost(data)">
                    <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt=""  @click="showmylost(data)">-->
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
				mylostList:[]
			}
		},
		created(){
			this.getData();
		},
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			showmylost(data){
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
						this.mylostList  = []
							getmyfound(this.username,'Lost').then(res =>{
								let result = res.data;
								if( result.code == 200){
									this.mylostList  = res.data.extra;
									console.log(this.mylostList,11)
								}
							}).catch(function(error){
								console.log(error);
							});
					}
				})
			},
			getData(){
				this.username = localStorage.getItem('username');
				getmyfound(this.username,'Lost').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.mylostList  = []
						this.mylostList  = this.mylostList.concat(res.data.extra);
						this.mylostList  = this.mylostList.reverse();
						console.log(this.mylostList,1221)
					}
				}).catch(function(error){
					console.log(error);
				});
			}
	    }
	};
</script>
