<template>
	<div class="publicNotes">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>发布小记</h3>	
		</div>
		<div class="main">
			<p>声明：无 ...</p>
		</div>
	</div>
</template>
<script>
	export default{
		name: '',
		data (){
			return{
				desc:''
			}
		},
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			}
	    }
	};
</script>
