<script>
// 引入自己封装的组件
import Headers from "./components/Header.vue";
import BeautifiedDivider from "./components/BeautifiedDivider.vue";
import KleeClickCount from "./components/KleeClickCount.vue";
import Footer from "./components/Footer.vue";
import ToolBar from "./components/toolBar.vue";

// 引入Vue方法
import { reactive } from "vue";
export default {
	// 声明引入的组件
	components: {
		Headers,
		BeautifiedDivider,
		KleeClickCount,
		Footer,
		ToolBar,
	},
	// 声明变量
	data() {
		return {
			setting: reactive({
				// 类"指针"的变量
				voiceMode: "0",
				musicOn: false,
			}),
			isMusicReadyFlag: false,
		};
	},
	mounted() {
		this.$refs.bgm_audio.addEventListener("canplaythrough", _ => {
			// console.log("音乐加载有效！");
			this.isMusicReadyFlag = true;
		});

		setTimeout(_ => {
			this.isMusicReadyFlag = true;
			// setInterval(_ => {
			// 	this.isMusicReadyFlag ^= 1;
			// }, 1000);
		}, 2000);
	},
	watch: {
		"setting.musicOn"(newMusicOn) {
			if (newMusicOn) {
				this.$refs.bgm_audio.volume = 0;
				this.$refs.bgm_audio.play();
				// console.log("[音乐]播放");

				var musicFadeInTimer = setInterval(_ => {
					this.$refs.bgm_audio.volume += 0.01;
					if (this.$refs.bgm_audio.volume >= 0.3) clearInterval(musicFadeInTimer);
				}, 10);
			} else {
				var musicFadeOutTimer = setInterval(_ => {
					this.$refs.bgm_audio.volume -= 0.02;
					if (this.$refs.bgm_audio.volume <= 0.05) {
						clearInterval(musicFadeOutTimer);
						this.$refs.bgm_audio.pause();
						// console.log("[音乐]暂停");
					}
				}, 10);
			}
		},
	},
};
</script>

<template>
	<div class="page-container">
		<ToolBar :isMusicReadyFlag="isMusicReadyFlag" :settingReac="setting"></ToolBar>
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
	<audio loop preload="auto" ref="bgm_audio">
		<!-- <source src="/src/music/IridescentSummerDay.ogg" type="audio/ogg" /> -->
		<source src="/src/music/IridescentSummerDay.webm" type="audio/webm" />
		<source src="/src/music/IridescentSummerDay.mp3" type="audio/mp3" />
	</audio>
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
