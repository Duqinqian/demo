<template>
	<div class="about">
		<div class="page-title">	
			<span @click="goBack" class="goBack"><i class="fa fa-2x fa-angle-left"></i></span>	
			<h3>浙理知道</h3>	
		</div>
        <scroller>

            <div class="selectBox">
                <div class="selectBox_show" v-on:click.stop="arrowDown">
                    <p title="全部">2019&nbsp;年&nbsp;{{unitName}}&nbsp;&nbsp;<i class="fa fa-angle-down"></i> </p>
                    <input type="hidden" name="unit" v-model="unitModel">
                </div>
                <div class="selectBox_list" v-show="isShowSelect">
                    <!--style="max-height: 240px; width: 398px; display: block;">-->
                    <div class="selectBox_listLi" v-for="(item, index) in dataList" :key="index"
                        @click.stop="select(item, index)">
                            {{item.value}}
                    </div>
                </div>
            </div>	

          <div class="kown_wrap">
              <div v-show="isshowfive">
                   <p class="kown_time">------5月------</p>
                   <div class="kown_exam" >
                       <a href="http://192.168.43.247:8080/#/pictoral_today">
                            <img src="../../static/images/log7.jpg" class="kown_exam_img">
                       </a>
                       <span>2019 / 05 / 13</span>
                   </div>
                   <div class="kown_exam">
                       <a href="http://192.168.43.247:8080/#/">
                            <img src="../../static/images/log5.jpg" class="kown_exam_img">
                       </a>
                       <span>2019 / 05 / 08</span>
                   </div>
              </div>
               <div v-show="isshowfour">
                    <p class="kown_time">------4月------</p>
                   <div class="kown_exam">
                      <img src="../../static/images/log6.jpg" class="kown_exam_img">
                       <span>2019 / 04 / 03</span>
                   </div>
               </div>
               <div v-show="isshowthree">
                    <p class="kown_time">------3月------</p>
                   <div class="kown_exam">
                       <img src="../../static/images/log11.jpg" class="kown_exam_img">
                       <span>2019 / 03 / 16</span>
                   </div>
                    <div class="kown_exam">
                       <img src="../../static/images/log12.jpg" class="kown_exam_img">
                       <span>2019 / 03 / 04</span>
                   </div>
               </div>
                    <div class="kown_footer">
                        <p>-------------------我也是有底线的-------------------</p>
                   </div>
                </div>
        </scroller>
	</div>
</template>
<script>
	export default{
		name: '',
		data (){
			return{
				isShowSelect: false,
                isshowfive: false,
                isshowfour:false,
                isshowthree:false,
				dataList: [
                    {key: -1, value: "全部"},
					{key: 0, value: "一月"},
					{key: 1, value: "二月"},
					{key: 2, value: "三月"},
                    {key: 3, value: "四月"},
					{key: 4, value: "五月"},
					{key: 5, value: "六月"},
					{key: 6, value: "七月"},
                    {key: 7, value: "八月"},
					{key: 8, value: "九月"},
					{key: 9, value: "十月"},
					{key: 10, value: "十一月"},
                    {key: 11, value: "十二月"}
				],
				unitName:'选择月份',
				unitModel:''
			}
		},
         created: function(){
            this.getData();
        },
	    methods: {
	    	goBack: function(){	
				this.$router.goBack();	
			},
            arrowDown() {
				this.isShowSelect = !this.isShowSelect;
			},
            select:function(item, index) {
				this.isShowSelect = false;
				// console.log(item.value,8888888);
				// console.log(index,99999999);
				this.unitModel = index;
				this.unitName = item.value;
                // console.log(this.unitName,99999999);
                if( this.unitName == "五月"){
                    this.isshowfive = true;
                    //  console.log(this.isshowfive,99999999);
                }else{
                    this.isshowfive = false;
                    //  console.log(this.isshowfive,99999999);
                }
                 if( this.unitName == "四月"){
                    this.isshowfour = true;
                    //  console.log(this.isshowfour,99999999);
                }else{
                    this.isshowfour = false;
                    //  console.log(this.isshowfour,99999999);
                }
                 if( this.unitName == "三月"){
                    this.isshowthree = true;
                    //  console.log(this.isshowthree,99999999);
                }else{
                    this.isshowthree = false;
                    //  console.log(this.isshowthree,99999999);
                }
                 if( this.unitName == "全部"){
                    this.isshowthree = true;
                    this.isshowfour = true;
                    this.isshowfive = true;
                     console.log(this.unitName,99999999);
                }
            },
            getData:function(){
                 this.isshowthree = true;
                 this.isshowfour = true;
                 this.isshowfive = true;
            }
	    }
	};
</script>
<style>
    .selectBox{
		/*position: absolute;*/
		/*top: 20px;
		right: 120px;*/
        margin-top: 100px;
        padding: 20px;
        background:#F2F6FC;
        text-align: center;
		font-size: 28px;
		color: #999;
	}
    .kown_wrap{
        height: 1530px;
        background:#fafafa;
        border-top: 1px solid #cccccc;
        /*margin-top: 10px;*/
    }
    .kown_exam{
        background:#fafafa;
        border: 1px solid #cccccc;
        margin:  30px 15px ;
        width: 46%;
        height: 350px;
        float: left;
        border-radius: 15px;
    }
    .kown_exam span{
        color: #aaa;
        margin: 0px 0 0px 60px;
        font-size: 34px;
    }
    .kown_exam_img{
        width: 100%;
        margin-bottom: 25px;
        height:250px;
    }
    .kown_footer{
       clear: both;
       margin: 55px;
       color: #bbb;
    }
    .kown_time{
        text-align: center;
        clear: both;
    }
</style>

