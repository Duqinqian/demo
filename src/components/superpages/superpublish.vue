<template>
	<div class="about" style=" position:fixed">
		<div class="page-title" >	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>发布文章</h3>	
		</div>
			<form class="top" ref="form" id="form">
				<div class="upload">
					<input type="text" placeholder="请输入标题" ref="text" id="title" name="title" class="found_title">
					<label for="file" id="ph" name="ph">
						<img :src="src" alt="image" class="photo">
					</label>
					<!--<input type="text" placeholder="写点什么吧" ref="text" id="content" name="content" class="found_content">-->
					<textarea type="text" placeholder="简介" ref="text" id="cover_desc" name="cover_desc" class="found_scontent"></textarea>
					<textarea type="text" placeholder="写点什么吧" ref="text" id="content" name="content" class="found_content"></textarea>
				</div>
				<!--wenjianshangchuan input-->
				<input type="file" @change="getFile" ref="file" id="file" name="cover_img">
				
				<div class="btn" @click="publish_btn">发布</div>
			</form>
	</div>
</template>
<script>
	import {publish} from '../../api/index'

	export default{
		name: 'upload',
		data () {
			return {
				src: '../../static/images/logo.jpg'
			}
		},
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
			getFile(e) {
				let _this = this
				var files = e.target.files[0];
				if(!e || !window.FileReader) 
					return
				let reader = new FileReader()
				reader.readAsDataURL(files)
				reader.onloadend = function (){
					_this.src = this.result
				}
			},
            async publish_btn(){
				var form = document.querySelector("#form")
				this.username = localStorage.getItem('username');
				var formData = new FormData(form)
				formData.append('cover_img', formData.get('files[0]'))
				// console.log( formData.get('files[0]'));
				// formData.append('content', formData.get("content"))
				formData.append('type', 'Ariticle_today')
				formData.append('username', this.username)
				try {
					var res = await publish(formData)
					console.log(res)
				} catch (error) {
					console.error(error)
				}	
				this.$router.push('/superPersonal');
				this.$toast("发布成功");
                console.log('ok')
            }
	    }
	};
</script>
<style>
  #form{
	  	/*width: 314px;*/
		height: 1200px;
		background: #ffffff;
		/*margin:  auto;*/
		margin-top: 120px;
  }
  .found_title{
	  margin-left: 70px;
	  width: 600px;
	  font-size: 34px;
	  text-align: center;
	  height: 80px;
	  color: #515151;
	  /*background:#EDEDED;*/
	  margin-top: 30px;
	  border: 1px solid #EDEDED;
  }
  .photo{
	  width: 738px;
	  height: 300px;
	  padding: 10px 70px;
  }
  input[type='file'] {
		display: none;
		z-index: 10;
		width: 120px;
		font-size: 0;
		height: 30px;
  }
  .found_scontent{
	  border: 1px solid #EDEDED;
	  margin-left: 70px;
	  width: 600px;
	  font-size: 32px;
	  padding: 20px 30px;
	  height: 130px;
	  color: #515151;
  }
  #content{
	  border: 1px solid #EDEDED;
	  margin-left: 70px;
	  width: 600px;
	  font-size: 32px;
	  padding: 20px 30px;
	  height: 320px;
	  color: #515151;
	  /*background:#EDEDED;*/
  }
  .btn{
	  margin: 30px 160px 30px 160px;
      padding: 20px 180px;
	  background:#ddd;
	  border: none;
	  color: #fff;
	  border-radius: 5px;
  }
</style>
