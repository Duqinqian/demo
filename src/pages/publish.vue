<template>
	<div class="publish">
		<div class="page-title">	
			<!--<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	-->
			<h3>发布</h3>	
		</div>
		<div class="warp">
			<img class="photoes" src="../../static/images/logo.jpg"/>
            <span class="text" @click="public_notes">发布小记</span>
            <img class="photoes" src="../../static/images/logo.jpg">
            <span class="text" @click="public_question">大家问</span>
            <img class="photoes" src="../../static/images/logo.jpg">
            <span class="text" @click="public_fun">发布轶事</span>
		</div>
	</div>
</template>
<script>
	export default{
		name: '',
        methods:{
            public_notes: function(){
                this.$router.push("/notes");
            },
             public_question: function(){
                this.$router.push("/question");
            },
             public_fun: function(){
                this.$router.push("/fun");
            }
        }
	};
</script>
<style>
    .warp{
        width:200px;
        margin:auto;
        padding-top: 200px;
    }
    .photoes{
        border-radius: 100%;
        padding: 10px;
    }
    .text{
        width: 200px;
        text-align: center;
        display: table-cell;
        padding-bottom: 68px;
    }
</style>
