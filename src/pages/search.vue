<template>
	<div class="search_all">
		<div class="searchpage-title">	
			<input type="text" name="searchinput" id="searchinput" placeholder="搜索" v-model="search"/>
			<i @click="btn" class="fa fa-search"></i>
		</div>
		<!--<div class="search_wrap">历史记录:</div>-->
		<div v-for="(data,index) in searchdata" :key="index" @click="showsearch(data)" class="search_item">
 				<h6><i class="fa fa-x fa-sun-o "></i>{{data.title}}</h6>
		</div>
	</div>
</template>
<script>
import {getAriticle} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				search:'',
				searchdata:[],
				alldata:[]
			}
		},
	    methods: {
			showsearch:function(item){
				this.$router.push("/comment/"+item.id);
			},
	    	btn:function(){
				// debugger
				getAriticle(0,'Ariticle').then(res=> {
					let result = res.data;
					if( result.code == 200){
						this.alldata  = res.data.extra;
						getAriticle(0,'Found').then(res=> {
							let result = res.data;
							if( result.code == 200){
								// console.log(res.data.extra,999)
								this.alldata  = this.alldata.concat(res.data.extra);
								// console.log(this.alldata,19991)
									getAriticle(0,'Lost').then(res=> {
										let result = res.data;
										if( result.code == 200){
											// console.log(res.data.extra,999)
											this.alldata  = this.alldata.concat(res.data.extra);
											// console.log(this.alldata,19991)
												getAriticle(0,'Chat').then(res=> {
													let result = res.data;
													if( result.code == 200){
														console.log(res.data.extra,999)
														this.alldata  = this.alldata.concat(res.data.extra);
														console.log(this.alldata,19991)
														for( let i = 0; i < this.alldata.length; i++){
															if( this.search == this.alldata[i].title ){
																this.searchdata = this.searchdata.reverse();
																this.searchdata = this.searchdata.concat(this.alldata[i]);
															}
														}
														this.searchdata = this.searchdata.reverse();
													}
												})
										}
									})
							}
						})
						console.log(this.searchdata,1333331)
						console.log(this.alldata,11)
						console.log(this.search,2211)
					}
				}).catch(function(error){
					console.log(error);
				});
			}
	    }
	};
</script>
<style>
	.searchpage-title{
	    /*position:fixed;*/
		padding: 20px 30px; 
		background: #fff; 
		color: #000;
		font-weight:bold; 
		height: 100px; z-index: 999; width: 100%; text-align: center; line-height: 60px;
	}
	.search_wrap{
		color: #888;
		margin: 30px;
	}
	.search_item{
		color: #aaa;
		margin: 60px 60px;
		font-size: 38px;
	}
</style>
