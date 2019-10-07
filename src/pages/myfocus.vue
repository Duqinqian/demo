<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>我的收藏</h3>	
		</div>

     <scroller>
		<div class="lost-main">
            <div v-for="(data,index) in focuslist" class="lost-item" 
                :key="index"
            >
                <h6 class="focus_wrap"> <i class="fa fa-clone "> </i>{{data.title}} <i class="fa fa-close"  @click="deletefocus(data)"> </i></h6>
                <div class="lost_item_img"  @click="showLost(data)">
                    <!--<img :src="'http://192.168.43.247/public/images/' + data.cover_img" alt="" >-->
					 <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
					 <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt="" >-->
                </div>
                <p class="myfocus_desc" v-html="data.cover_desc">{{data.cover_desc}}</p>
            </div>
        </div>
     </scroller>
	</div>
</template>
<script>
import {getAriticleFocus , getAriticle, deleteAriticleFocus} from '../api/index'
	export default{
		// name: '',
		data (){
			return{
				focuslist:[],
				title:'',
				img:'',
			
			}
		},
        created: function(){
            this.getData();
        },
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			showLost: function(item){
				// console.log(item)
				this.$router.push("/comment/"+item.id);
			},
            getData: function(){
				let self = this;
                let username = localStorage.getItem('username');
				getAriticleFocus(username).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response.extra)
						for(let i= 0 ; i < res.data.extra.length  ; i++){
							const temp  = res.data.extra[i].info;
							this.focuslist = this.focuslist.concat(temp)
								console.log(this.focuslist);
						}
						// localStorage.setItem('focuslist',this.focuslist)
						// console.log(this.focuslist);
					}
				})
            },
			deletefocus: function(item){
				// debugger
				console.log(item.id);
				let username = localStorage.getItem('username');
				deleteAriticleFocus(username,item.id).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response)
						// this.$router.go(0)
						this.focuslist = []
						getAriticleFocus(username).then(res =>{
							let response = res.data;
							if( response.code == 200){
								// console.log(response.extra)
								for(let i= 0 ; i < res.data.extra.length  ; i++){
									const temp  = res.data.extra[i].info;
									this.focuslist = this.focuslist.concat(temp)
										console.log(this.focuslist,333);
								}
								// localStorage.setItem('focuslist',this.focuslist)
								// console.log(this.focuslist);
							}
						})
					}
				})
			}
	    }
	};
</script>
<style>
	.photo{
		width: 180px;
		height: 180px;
		/*background:*/
	}
	.fa-clone{
		color:#515151;
		margin-right: 10px;
	}
	.focus_wrap{
		position: relative;
	}
	.fa-close{
		color:#bbb;
		position: absolute;
		right: 10px;
	}
</style>

