<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>浙理招领
				<div class="selectBox">
					<div class="selectBox_show" v-on:click.stop="arrowDown">
						<p title="全部">{{unitName}}<i class="fa fa-caret-down"></i> </p>
						<input type="hidden" name="unit" v-model="unitModel">
					</div>
					<div class="selectBox_list" v-show="isShowSelect">
						<!--style="max-height: 240px; width: 398px; display: block;">-->
						<div class="selectBox_listLi" v-for="(item, index) in dataList" :key="index"
							@click.stop="select(item, index)">
								{{item.value}}
						</div>
					</div>
				</div>	
			</h3>	
		</div>
	  <scroller>
		<div class="lost-main">
            <div v-for="(data,index) in lostList" class="lost-item" 
                :key="index"
                @click="showLost(data)">
                <h6> <i class="fa fa-tag "> </i>{{data.title}}</h6>
                <div class="lost_item_img">
                    <!--<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img0.jpg' " alt="" >-->
					<img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
                </div>
                <p v-html="data.content" class="lost_content">{{data.content}}</p>
                <p>时间：{{data.publish_time}}</p>
            </div>
        </div>
	  </scroller>
	  
	</div>
</template>
<script>
    import {getFound} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				lostList:[],
				isShowSelect: false,
				dataList: [
					{key: -1, value: "全部"},
					{key: 0, value: "钥匙"},
					{key: 1, value: "饭卡"},
					{key: 2, value: "其他"}
				],
				unitName:'全部',
				unitModel:''

			}
		},
        created: function(){
            this.getData();
        },
	    methods: {
			arrowDown() {
				this.isShowSelect = !this.isShowSelect;
			},
			select:function(item, index) {
				this.isShowSelect = false;
				// console.log(item.value,8888888);
				// console.log(index,99999999);
				this.unitModel = index;
				this.unitName = item.value;
			    getFound(0, 'Found').then(res=> {
					let result = res.data;
					if( result.code == 200){
						if( (this.unitName) == "全部"){
							this.lostList = [];
							this.lostList  = res.data.extra;
							console.log(this.lostList,1166)
						}else{
							if( (this.unitName )== "钥匙"){
								this.lostList = [];
								for( let i = 0 ; i < res.data.extra.length; i++){
									console.log(res.data.extra[i].title,this.unitName,122166)
									if( res.data.extra[i].title == this.unitName){
										const temp = res.data.extra[i]
										this.lostList = this.lostList.concat(temp);
										console.log(this.lostList,1111)
										// console.log(res.data.extra[i].title,11)
									}
									// else{
									// 	this.lostList = [];
									// 	// console.log(this.lostList,11999)
									// }
								}
							}
							if( (this.unitName )== "饭卡"){
								this.lostList = [];
								for( let i = 0 ; i < res.data.extra.length; i++){
									// console.log(res.data.extra[i].title,this.unitName,122166)
									if( res.data.extra[i].title == this.unitName){
										const temp = res.data.extra[i]
										this.lostList = this.lostList.concat(temp);
										// console.log(temp,11)
										console.log(this.lostList,2221111)
										// console.log(res.data.extra[i].title,11)
									}
								}
							}
							if( (this.unitName )== "其他"){
								this.lostList = [];
								for( let i = 0 ; i < res.data.extra.length; i++){
									// console.log(res.data.extra[i].title,this.unitName,122166)
									if((( res.data.extra[i].title != "钥匙") && ( res.data.extra[i].title != "饭卡"))){
										const temp = res.data.extra[i]
										this.lostList = this.lostList.concat(temp);
										// console.log(this.lostList,11)
										console.log(this.lostList,13333111)
										// console.log(res.data.extra[i].title,11)
									}
								}
							}
						}
					}
				}).catch(function(error){
					console.log(error);
				});

			},
	    	goBack: function(){	
				this.$router.goBack();	
			},
            showLost: function(data){
                console.log(data)
				this.$router.push('/comment/'+data.id);
            },
            getData: function(){
	            getFound(0, 'Found').then(res=> {
					let result = res.data;
					if( result.code == 200){
						this.lostList  = res.data.extra;
						console.log(this.lostList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
            }
	    }
	};
</script>
<style scoped>
	.selectBox{
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 28px;
		color: #999;
	}
	.lost_item_img{

	}
</style>