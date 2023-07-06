<script>
// 引入自己封装的组件
import Headers from "./components/header.vue";
import BeautifiedDivider from "./components/beautifiedDivider.vue";
import KleeClickCount from "./components/KleeClickCount.vue";
import Footer from "./components/footer.vue";

// 引入Vue方法
import { reactive } from "vue";
export default {
	// 声明引入的组件
	components: {
		Headers,
		BeautifiedDivider,
		KleeClickCount,
		Footer,
	},
	// 声明变量
	data() {
		return {
			setting: reactive({
				// 类"指针"的变量
				voiceMode: "0",
			}),
		};
	},
};
</script>

<template>
	<div class="page-container">
		<!--主体部分 -->
		<div class="wrapper">
			<!-- 给背景图片叠加滤镜 -->
			<div id="wrapper-background-filter"></div>

			<!-- 背景图片 -->
			<div id="wrapper-background"></div>

			<!-- 调用头部 -->
			<Headers :setting-reac="setting" />

			<!-- 核心模块(计数器) -->
			<div class="content">
				<!-- 分割线 -->
				<BeautifiedDivider />

				<!-- 网页介绍 -->
				<p class="page-description">给可莉酱写的小网站，对，就是那个<del>烦人的</del>最可爱的《原神》角色！</p>

				<!-- 计数器及按钮等 -->
				<KleeClickCount :setting-reac="setting" />
			</div>
		</div>

		<!-- 页脚部分 -->
		<Footer></Footer>
	</div>
</template>

<style>
.page-container {
	/* 字体 */
	font-family: genshin;

	/* 默认字体颜色 */
	color: #ffffff;

	/* 子元素居中 */
	text-align: center;
}
.wrapper {
	/* 相对定位模式(作用: 定位哒哒哒时可莉的GIF) */
	position: relative;

	/* 主要部分的背景 */
	#wrapper-background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: url("./img/klee1.webp");
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: contain;
		z-index: -30;
	}

	#wrapper-background-filter {
		/* 滤镜颜色 */
		background-color: rgba(244, 117, 117, 0.9);
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -20;
	}
}
.content {
	width: 80%;
	margin: auto;
}
.page-description {
	font-family: genshin;
	text-align: center;

	/* 若使用genshin字体, 则禁用粗体 */
	/* font-weight: bold; */

	font-size: 2rem;
}
</style>
