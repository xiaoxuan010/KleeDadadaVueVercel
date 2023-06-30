<script>
import Headers from "./components/header.vue";
import BeautifiedDivider from "./components/beautifiedDivider.vue";
import KleeClickCount from "./components/KleeClickCount.vue";
export default {
	components: {
		Headers,
		BeautifiedDivider,
		KleeClickCount,
	},
	data() {
		return {
			hello: "Hello World",
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
			<Headers />
			<div class="content">
				<BeautifiedDivider />
				<h2 class="page-description">给可莉酱写的小网站，对，就是那个<del>烦人的</del>最可爱的《原神》角色！</h2>
				<KleeClickCount />
				<BeautifiedDivider />
			</div>
		</div>
	</div>
</template>

<style>
/* @import "../node_modules/mdui/dist/css/mdui.min.css"; */
body {
	background-color: rgba(233, 233, 233);
}
.page-container {
	/* 底部颜色 */
	/* background-color: white; */
	/* font-size: 1.5em; */
	/* 文字颜色 */
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
		background-image: url("/src/img/klee1.webp");
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
h2.page-description {
	text-align: center;
	font-weight: bold;
	font-size: 1.5em;
}
</style>
