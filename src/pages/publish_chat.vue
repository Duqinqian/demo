<template>
	<div class="about" style=" position:fixed">
		<div class="page-title" >	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>发布微聊</h3>	
		</div>
			<form class="top" ref="form" id="form">
				<div class="upload">
					<input type="text" placeholder="请输入标题" ref="text" id="title" name="title" class="found_title">
					<label for="file" id="ph" name="ph">
						<img :src="src" alt="image" class="photo">
					</label>
					<label for="nextfile" id="ph" name="ph">
					<img :src="nextsrc" alt="image" class="photo2" v-show="isshowimg">
					</label>
					<!--<input type="text" placeholder="写点什么吧" ref="text" id="content" name="content" class="found_content">-->
					<textarea type="text" placeholder="写点什么吧" ref="text" id="content" name="content" class="found_content"></textarea>
				</div>
				<!--wenjianshangchuan input-->
				<input type="file" @change="getFile" ref="file" id="file" name="cover_img">
				<input type="file" @change="getFileother" ref="nextfile" id="nextfile" name="cover_img">

				<div class="btn" @click="publish_btn">发布</div>
			</form>
	</div>
</template>
<script>
	import {publish} from '../api/index'

	export default{
		name: 'upload',
		data () {
			return {
				src: '../../static/images/jia.jpg',
				nextsrc: '../../static/images/jia.jpg',
				isshowimg:false
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
				this.isshowimg = true;
			},
			getFileother:function(e) {
				let _this = this
				var files = e.target.files[0];
				if(!e || !window.FileReader) 
					return
				let reader = new FileReader()
				reader.readAsDataURL(files)
				reader.onloadend = function (){
					_this.nextsrc = this.result
				}
				console.log(e,28833)
			},
            async publish_btn(){
				// var formData = new FormData()
				// formData.append('cover_img', this.$refs.file.files[0])
				// debugger
				// console.log( this.$refs.text.textContent);
				var form = document.querySelector("#form")
				this.username = localStorage.getItem('username');
				var formData = new FormData(form)
				// console.log(formdata.get("file".files));
				// formData.append('title', formData.get("title"))
				formData.append('cover_img', formData.get('files[0]'))
				// formData.append('content', formData.get("content"))
				formData.append('type', 'Chat')
				formData.append('username', this.username)
				try {
					var res = await publish(formData)
					console.log(res)
				} catch (error) {
					console.error(error)
				}	
				this.$router.push('/publish_all');
				this.$toast("发布成功");
                console.log('ok')
            }
	    }
	};
</script>
<style>
  #form{
	  	/*width: 314px;*/
		height: 1000px;
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
	  width: 280px;
	  height: 240px;
	  margin: 20px 0 20px 78px ;
	  float: left;
	  /*padding: 10px 70px;*/
  }
.photo2{
	  width: 280px;
	  height: 240px;
	  margin: 20px 20px ;
	  float: left;
	  /*padding: 10px 70px;*/
  }
  input[type='file'] {
		display: none;
		z-index: 10;
		width: 120px;
		font-size: 0;
		height: 30px;
  }
  #content{
	  border: 1px solid #EDEDED;
	  margin-left: 70px;
	  width: 600px;
	  font-size: 32px;
	  padding: 20px 30px;
	  height: 360px;
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
