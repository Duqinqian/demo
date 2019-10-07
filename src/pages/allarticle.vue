<template>
	<div  class="allarticle_head">
        <div class="allarticle_wrap">
            <span @click="goBack" class="allarticle_goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
            <div class="allarticle_imgwrap">	
                <img src='../../static/images/head.jpg' alt="" class="allarticle_img">
                <p class="allsrticle_article"> {{item}}</p>
                <span @click="change()" v-if="!article_focus" class="article_focus">+关注</span>
                <span v-else @click="change()" class="article_focus">已关注</span>
            </div>
        </div>
       <scroller>
           <div  class="article_articles">
                 <p class="articles_name">------代表作------</p>
                 <div class="articles-main">
                    <div v-for="(data,index) in myfoundList" class="articles-item" 
                        :key="index">
                        <h6> {{data.title}}</h6>
                        <div class="articles_item_img"  @click="showmyfound(data)">
                            <img :src="'http://192.168.43.247/public/ariticle/' + data.id +'/' + '/cover_img.jpg' " alt="" >
                        </div>
                        <p class="articles_desc" v-html="data.content">{{data.content}}</p>
                        <!--<p>{{data.publish_time}}</p>-->
                    </div>
                </div>
                <p class="articles_name">--------没有更多了--------</p>
           </div>
	  </scroller>
	</div>
</template>
<script>
import {userFocus, deleteuserFocus, getAriticleFocus,getmyfound,getuserFocus} from '../api/index'
	export default{
		name: '',
		data (){
			return{
                article_focus:'',
                myfoundList:[]
			}
		},
        created: function(){
            this.item = this.$route.params.item;
            this.getData();
            // console.log(this.item)
        },
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
            showmyfound(data){
				// console.log(data,222222)
				this.$router.push('/comment/'+data.id);
			},
             getData: function(){
               this.username = localStorage.getItem('username');
				getmyfound(this.item,'').then(res =>{
					let result = res.data;
					if( result.code == 200){
						this.myfoundList  = res.data.extra;
						console.log(this.myfoundList,11)
					}
				}).catch(function(error){
					console.log(error);
				});
                getuserFocus(username).then(res =>{
                    let response = res.data;
                    if( response.code == 200){
                        // console.log(response.extra,22)
                        for(let i= 0 ; i < res.data.extra.length  ; i++){
                            if( response.extra[i].focus_User == this.item){
                                this.article_focus = true;
                                break;
                            }else{
                                this.article_focus = false;
                                // console.log(",,,")
                            }
                                    console.log(response.extra[i].focus_User,33);
                        }
                        console.log(this.item,66);
                    }
                })
            },
            change:function(){
				this.username = localStorage.getItem('username');
				let params = { username: this.username,focus_username: this.item}
				// debugger
				if( this.article_focus == false ){
					userFocus(params).then(res =>{
						let success = res.data
						if( success.code == 200){
							this.article_focus = true;
							// console.log(this.username)
						}
					})
				}else{
					deleteuserFocus(this.username,this.item).then(res =>{
						let response = res.data;
						if( response.code == 200){
							this.article_focus = false ;
							// console.log(this.item)
						}
					})
				}
				this.article_focus == false?this.article_focus = true:this.article_focus = false;
				localStorage.setItem('article_focus',this.article_focus);
			}
	    }
	};
</script>
<style>
     .allarticle_wrap{
         position: absolute;
           /*position: absolute;*/
         z-index:989;
         background:#fafafa;
         width: 800px;
         height: 410px;
     }
     .allarticle_head{
         background:#fff;
         width: 750px;
         height: 410px;
         /*margin-bottom: 30px;*/
     }
     .allarticle_goBack { 
        /*display: inline-block;*/
        position: absolute;
        /*position: fixed;*/
        float: left;
        color: #bbb;
        margin: 20px;
        z-index:9999;
        /*margin-top: -10px; */
    }
    .allarticle_img{
        width: 160px;
        margin: 60px 0 0  320px;
    }
    .allsrticle_article{
        /*clear: both;*/
        color:#999;
        text-align: center;
        margin-bottom: 20px;
        /*margin: 0px 0 30px 43px;*/
        font-size: 56px;
    }
    .article_focus{
        color: #999;
        padding: 10px 20px ;
        /*margin:  auto;*/
        margin: 0px 0 0 340px;
        border: 1px solid #ccc;
    }
    .article_articles{
        /*position: absolute;*/
        /*z-index:-9999;*/
        background:#fff;
        margin-top: 420px;
        height: 3300px;
        /*width: 800px;*/
    }
    .articles_name{
        color: #ccc;
        margin: 10px 0 0 0;
        text-align: center;
        clear: both;
    }
    .articles-item{
        color: #515151;
        width: 300px;
        float: left;
        margin: 20px 10px 20px 50px; 
        text-align: center;
        padding: 30px;
        border: 1px solid #eee;
    }
    .articles_item_img{
        padding: 20px 0;
    }
    .articles_desc{
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:3;
        overflow: hidden;
    }
</style>

