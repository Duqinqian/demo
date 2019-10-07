<template>
	<div>
		<div class="page-title">	
			<h3>浙理圈子<i class="fa fa-search all_search"  @click="toSearch"></i></h3>	
		</div>
        <scroller >
            <div class="all_main">
                <!--四类-->
                <div class="all_all">
                    <p>分类导航</p>
                    <div class="all_imgwrap">
                        <a href="http://192.168.43.247:8080/#/kown">
                            <img src="../../static/images/all8.jpg" class="all_kown">
                        </a>
                        <span class="all_1">浙理知道</span>
                         <a href="http://192.168.43.247:8080/#/lost"> 
                            <img src="../../static/images/all3.jpg" class="all_lost">
                         </a>
                        <span class="all_2">失物</span>
                         <a href="http://192.168.43.247:8080/#/found"> 
                             <img src="../../static/images/all6.jpg" class="all_found">
                         </a>
                        <span class="all_3">招领</span>
                         <a href="http://192.168.43.247:8080/#/chat"> 
                             <img src="../../static/images/all5.jpg" class="all_chat">
                         </a>
                        <span class="all_4">微聊</span>
                    </div>
                </div>
                <div class="all_fun">
                    <p>开心一刻 <span class="all_change" @click="all_changebtn()">换一换&nbsp;&nbsp;<i class="fa fa-refresh"></i></span></p>
                     <div v-for="(data,index) in funList" class="all_funitem" 
                        :key="index"
                     >
                        <h6 v-html="data.content"> <i class="fa fa-certificate "> </i>{{data.content}}</h6>
                    </div>
                </div>
                  <div class="all_footer">
                        <p>------------------我也是有底线的------------------</p>
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
				funList:[],
                // item:[]
			}
		},
        created: function(){
            this.getData();
        },
        methods:{
            toSearch: function(){
				this.$router.push("/search");
			},
            getData: function(){
                getFound( 0 , 'Fun').then(res =>{
                    let result = res.data;
                    // debugger
                    if ( result.code == 200 ){
                        this.funList = res.data.extra;
                        var item = (this.funList)[Math.floor(Math.random()*(this.funList).length)];
                        this.funList = []
                        //  console.log(this.funList,33223)
                        this.funList = this.funList.concat(item)
                        console.log(this.funList,33223)
                        // this.content = this.item.content;
                        console.log((item),223332)
                        // this.funList = item;
                        //  console.log(this.funList,333)
                    }
                }).catch(function(error){
                    console.log(error)
                });
            },
            all_changebtn:function(){
                getFound( 0 , 'Fun').then(res =>{
                    let result = res.data;
                    // debugger
                    if ( result.code == 200 ){
                        this.funList = res.data.extra;
                        var item = (this.funList)[Math.floor(Math.random()*(this.funList).length)];
                        this.funList = []
                        //  console.log(this.funList,33223)
                        this.funList = this.funList.concat(item)
                        console.log(this.funList,5555)
                        // this.content = this.item.content;
                        console.log((item),6666)
                    }
                }).catch(function(error){
                    console.log(error)
                });
            }
        }
	   
	};
</script>
<style>
    .all_all{
        margin: 120px 0px 20px 0;
        width: 100%;
        height: 620px;
        background:#fafafa;
        color: #515151;
        font-size: 30px;
        padding: 30px 40px;
    }
    .all_imgwrap{
        margin: 10px 25px;
    }
    .all_imgwrap img{
        margin: 10px;
        /*position: relative;*/
    }
    .all_1{
        position: absolute;
        left: 160px;
        top: 520px;
        color: #fafafa;
        font-weight: normal;
    }
    .all_2{
        position: absolute;
        left: 495px;
        top: 200px;
        color: #fafafa;
    }
    .all_3{
        position: absolute;
        left: 495px;
        top: 365px;
        color: #fafafa;
    }
    .all_4{
        position: absolute;
        left: 495px;
        top: 540px;
        color: #fafafa;
    }
    .all_kown{
        width: 280px;
        float: left;
        height: 490px;
    }
    .all_lost{
        width: 300px;
        float: left;
        height: 150px;
    }
    .all_found{
        float: left;
        width: 300px;
        height: 150px;
    }
    .all_chat{
        float: left;
        width: 300px;
        height: 150px;
    }
    /*.all_exam{
        height: 1660px;
    }
    .all_e1{
        background:#fafafa;
        margin: 10px 15px ;
        width: 46%;
        float: left;
        padding: 20px;
    }*/
    /*.all_eaxm_1{
        width: 100%;
        padding: 30px 40px;
        border-radius: 50px;
        height:400px;
        border-radius: 15px;
    }*/
    /*.all_e1 span{
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
        color: #515151;
        font-size: 30px;
        padding: 0px 40px 60px 45px;
    }
    .all_e1 p{
        color: #515151;
        font-size: 30px;
        padding: 30px 40px 0px 40px;
    }*/
   .all_footer{
       clear: both;
       /*margin: 50px;*/
       text-align: center;
       color: #bbb;
   }
   .all_search{
       color: #aaa;
       float: right;
       line-height: 50px;
   }
   .all_fun{
        margin: 20px 0px 20px 0;
        width: 100%;
        /*height: 620px;*/
        background:#fafafa;
        color: #515151;
        font-size: 30px;
        padding: 30px 40px;
    }
    .all_change{
        /*position: absolute;*/
        float: right;
        font-size: 28px;
        color: #999;
    }
    .all_funitem{
        padding: 30px 0;
    }
   
</style>
