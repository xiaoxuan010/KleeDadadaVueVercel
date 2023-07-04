<script>
import Headers from "./components/header.vue";
import BeautifiedDivider from "./components/beautifiedDivider.vue";
import KleeClickCount from "./components/KleeClickCount.vue";
import Footer from "./components/footer.vue";
import { reactive } from "vue";
export default {
	components: {
		Headers,
		BeautifiedDivider,
		KleeClickCount,
		Footer,
	},
	data() {
		return {
			setting: reactive({
				voiceMode: "0",
			}),
		};
	},
};
</script>

<template>
	<div class="page-container">
		<!--主体部分 | Main page-->
		<div class="wrapper">
			<div id="wrapper-background-filter"></div>
			<div id="wrapper-background"></div>
			<Headers :setting-reac="setting" />
			<div class="content">
				<BeautifiedDivider />
				<p class="page-description">给可莉酱写的小网站，对，就是那个<del>烦人的</del>最可爱的《原神》角色！</p>
				<KleeClickCount :setting-reac="setting" />
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<style>
.page-container {
	/* 底部颜色 */
	/* background-color: white; */
	/* font-size: 1.5em; */
	/* 文字颜色 */
	font-family: genshin;
	color: #ffffff;
	text-align: center;
}
.wrapper {
	position: relative;
	/* background-color: rgba(244, 117, 117, 0.9); */
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
		/* 顶部颜色 */
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
	/* font-weight: bold; */
	font-size: 2rem;
}
</style>
