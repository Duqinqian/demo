<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>关注的作者</h3>	
		</div>

     <scroller>
		<div class="focusauthor-main">
            <div v-for="(data,index) in userfocuslist" class="focusauthor-item" 
                :key="index"
            >
                <h6 class="focusauthor_wrap"> <i class="fa fa-close"  @click="deletefocus(data)"> </i></h6>
                <div class=" focusauthorhead" >
                    <img src='../../static/images/head.jpg' alt=""  class="focusauthor_img"  @click="showallarticle(data)" >
                    <span class="focusauthor_author">{{data}}</span>
                    <!--<span @click="change()" v-if="userfoucus" class="userfocus">+关注</span>-->
				    <span  @click="deletefocus(data)" class="userfocus">取消关注</span>
                </div>
                
            </div>
        </div>
     </scroller>
	</div>
</template>
<script>
import {getuserFocus , getAriticle, deleteuserFocus, userFocus} from '../api/index'
	export default{
		// name: '',
		data (){
			return{
				userfocuslist:[],
				title:'',
				img:'',
                userfoucus:''
			}
		},
        created: function(){
            this.getData();
        },
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			showallarticle: function(item){
				// console.log(item)
				this.$router.push("/allarticle/"+item);
			},
            getData: function(){
				let self = this;
                let username = localStorage.getItem('username');
				getuserFocus(username).then(res =>{
					let response = res.data;
					if( response.code == 200){
						// console.log(response.extra,22)
						for(let i= 0 ; i < res.data.extra.length  ; i++){
							const temp  = res.data.extra[i].focus_User;
							this.userfocuslist = this.userfocuslist.concat(temp)
								// console.log(this.userfocuslist,11);
						}
						console.log(this.userfocuslist);
					}
				})
            },
			deletefocus: function(item){
				// debugger
				console.log(item);
				let username = localStorage.getItem('username');
		    	deleteuserFocus(username,item).then(res =>{
                    let response = res.data;
                    if( response.code == 200){
                        // this.foucus = false ;
                        // this.$router.go(0)
                         this.userfocuslist = []
                        	getuserFocus(username).then(res =>{
                                let response = res.data;
                                if( response.code == 200){
                                    // console.log(response.extra,22)
                                    for(let i= 0 ; i < res.data.extra.length  ; i++){
                                        const temp  = res.data.extra[i].focus_User;
                                        this.userfocuslist = this.userfocuslist.concat(temp)
                                            // console.log(this.userfocuslist,11);
                                    }
                                    console.log(this.userfocuslist);
                                }
                            })
                        // console.log(item)
                    }
                })
			}
	    }
	};
</script>
<style>

	.fa-clone{
		color:#515151;
		margin-right: 10px;
	}
    .focusauthor-main{
         background: #FAFAFA;
         margin: 120px 0;
    }
    .focusauthor-item{
        /*margin: 15px 20px;*/
        border-bottom: 1px solid #ddd;
        /*clear: both;*/
    }
	.fa-close{
		color:#bbb;
		position: absolute;
		right: 30px;
	}
    .focusauthorhead{
        /*width: 600px;*/
        height: 200px;
        padding: 30px;
        /*margin: auto;*/
        margin:30px 0; 
    }
    .focusauthor_img{
        width: 160px;
        height: 160px;
        float: left;
    }
    .focusauthor_author{
        /*display: inline-block;*/
        font-size: 58px;
        padding: 30px;
        color: #999;
        line-height:160px;
        /*margin-left: 30px;*/
        /*width: 3px;*/
    }
    .userfocus{ 
        border: 1px solid #ccc;
        float: right;
        margin: 50px 0 ;
        /*margin-right: 30px;*/
        padding: 10px 20px;
        color: #515151;
    }
</style>

