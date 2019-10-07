<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>我的消息</h3>	
		</div>
		<scroller>
		<div class="lost-main">
            <div v-for="(data,index) in mymsgList" class="lost-item" 
                :key="index"
               >
                <h6> <i class="fa fa-tag "> </i>{{data.title}}</h6>
                <div class="lost_item_img">
                    <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt=""  @click="showmylost(data)">
                </div>
                <p class="lost_content" v-html="data.content">{{data.content}}</p>
                <!--<p>{{data.publish_time}}</p>-->
            </div>
        </div>
	  </scroller>

	</div>
</template>
<script>
import {getmyfound} from '../api/index'
	export default{
		name: '',
		data (){
			return{
				mylostList:[],
                myfoundList:[],
                mychatList:[],
                myallList:[],
                mymsgList:[],
                num:''
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
				// console.log(data)
				this.$router.push('/comment/'+data.id);
			},
			getData(){
				this.username = localStorage.getItem('username');
				getmyfound(this.username,'Lost').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.mylostList  = []
						this.mylostList  = this.mylostList.concat(res.data.extra);
						console.log(this.mylostList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
                getmyfound(this.username,'Found').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.myfoundList  = []
						this.myfoundList  = this.myfoundList.concat(res.data.extra);
						console.log(this.myfoundList,22)
					}
				}).catch(function(error){
					console.log(error);
				});
                getmyfound(this.username,'Chat').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.mychatList  = []
						this.mychatList  = this.mychatList.concat(res.data.extra);
						console.log(this.mychatList,33)
                        this.myallList = this.myallList.concat(this.mychatList,this.myfoundList,this.mylostList);
                        console.log(this.myallList,44)
                        this.msgList = localStorage.getItem('msgList');
                        console.log(this.msgList,55)
                        this.mymsgList = [];
                        localStorage.setItem('mymsgList',this.mymsgList);
                        console.log(this.msgList,99)
                        // debugger
                        for ( let i = 0; i < this.msgList.length; i++ ){
                            if( this.myallList[i].id == this.msgList ){
                                this.mymsgList = this.mymsgList.concat(this.myallList[i])
                                localStorage.setItem('mymsgList',this.mymsgList);
                                console.log(this.mymsgList,66)
                            }else{
                                this.num ++;
                                console.log(this.num,77)
                                if( this.num == this.msgList.length ){
                                    this.mymsgList = [];
                                    localStorage.setItem('mymsgList',this.mymsgList);
                                    console.log(this.msgList,88)
                                }
                            }
                        }
                        // console.log(this.mymsgList,66)
					}
				}).catch(function(error){
					console.log(error);
				});
			}
	    }
	};
</script>
