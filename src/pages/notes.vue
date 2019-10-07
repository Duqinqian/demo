<template>
	<div class="publicNotes">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>大家说</h3>	
		</div>
		<div class="main">
			<form class="top" ref="form">
				<div class="upload">
					<label for="file">
						<img :src="src" alt="image" class="photo">
					</label>
				</div>
				<!--wenjianshangchuan input-->
				<input type="file" @change="getFile" ref="file" id="file" name="cover_img">
				<div class="kuang">
				</div>
				<div class="btn" @click="publish_btn">发布</div>
			</form>
		</div>
	</div>
</template>
<script>
	import {publish} from '../api/index'

	export default{
		name: 'upload',
		data () {
			return {
				src: '../../static/images/xinmeiti.jpg'
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
				var formData = new FormData(this.$refs.form);
				// formData.append('cover_img', this.$refs.file.files[0])
				try {
					var res = await publish(formData)
					console.log(res)
				} catch (error) {
					console.error(error)
				}
					
							
                console.log('ok')
            }
	    }
	};
</script>
<style>
	/*.kuang{
		width: 600px;
		height: 400px;
		background: #cdba96;
		margin:  auto;
		margin-top: 100px;
	}
	.btn{
		width: 160px;
		height: 70px;
		margin-left: 280px;
		margin-top: 80px;
	}*/
	/*.upload {
    label {
      width: 120px;
      display: block;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      margin-top: 10px;
      font-size: 12px;
      background-color: map-get($global-color-base, primary);
    }
  }*/
  .upload{
	  	width: 100%;
		height: 100px;
		/*background: #cdba96;*/
		/*margin:  auto;*/
		/*margin-top: 100px;*/
  }
  .photo{
	  width: 100%;
	  height: 600px;
  }
  input[type='file'] {
		display: none;
		z-index: 10;
		width: 120px;
		font-size: 0;
		height: 30px;
  }
</style>
