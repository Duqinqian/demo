<template>
	<div class="publish"  style=" position:fixed"d>
		<div class="page-title">	
			<!--<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	-->
			<h3>发布</h3>	
		</div>
		<div class="warp">
            <div class="publish1" @click="mylost">
			    <img class="photoes" src="../../static/images/log2.jpg"/>
                <span class="text1">发布寻物</span>
            </div>
            <div class="publish1"  @click="myfound">
                <img class="photoes" src="../../static/images/logo3.jpg">
                <span class="text2">发布招领</span>
            </div>
            <div class="publish2" @click="mychat">
                <img class="photoes" src="../../static/images/fg04.jpg">
                <span class="text" >发布微聊</span>
            </div>
		</div>
	</div>
</template>
<script>
	export default{
		name: '',
        methods:{
            mylost: function(){
                this.$router.push("/publish_lost");
            },
             myfound: function(){
                this.$router.push("/publish");
            },
             mychat: function(){
                this.$router.push("/publish_chat");
            }
        }
	};
</script>
<style>
    .text1{
        margin-left: 20px;
    }
    .text2{
        margin-left: 160px;
    }
    .text{
        width: 300px;
        text-align: center;
        display: table-cell;
        color:#515151;
    }
    .publish1{
        margin: 220px 35px 0 35px;
        color:#515151;
        float: left;
        width: 300px;
        height: 300px;
    }
    .publish2{
        width: 300px;
        height: 300px;
        margin: auto;
    }
</style>
