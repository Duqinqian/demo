<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>浙理微聊</h3>	
		</div>
	<scroller>
		<div class="lost-main">
            <div v-for="(data,index) in lostList" class="lost-item" 
                :key="index"
                @click="showLost(data)">
                <h6> <i class="fa fa-tag "> </i>{{data.title}}</h6>
                <div class="lost_item_img">
                      <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
					<!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt="" >-->
                </div>
                <!--<p v-html="data.cover_desc">{{data.cover_desc}}</p>-->
				<p v-html="data.content" class="lost_content">{{data.content}}</p>
                <p>时间：{{data.publish_time}}</p>
            </div>
        </div>
	</scroller>
	</div>
</template>
<script>
    import {getChat} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				lostList:[]
			}
		},
        created: function(){
            this.getData();
        },
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
            showLost: function(data){
                console.log(data)
				this.$router.push('/comment/'+data.id);
            },
            getData: function(){
	            getChat(0, 'Chat').then(res=> {
					let result = res.data;
					if( result.code == 200){
						this.lostList  = res.data.extra;
						// console.log(this.lostList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
            }
	    }
	};
</script>
