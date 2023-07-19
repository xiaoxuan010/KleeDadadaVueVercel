<script>
// 引入自己封装的组件
import Headers from "./components/header.vue";
import BeautifiedDivider from "./components/beautifiedDivider.vue";
import KleeClickCount from "./components/kleeClickCount.vue";
import Footer from "./components/footer.vue";
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
			// Flag：判断音乐是否已经正常加载中
			isMusicReadyFlag: false,
		};
	},
	mounted() {
		// 当音乐能正常下载时（不是说音乐已经下载完，而是说当前网速能支撑流畅地边下边播），设置Flag为True，使音乐按钮显示
		this.$refs.bgm_audio.addEventListener("canplaythrough", _ => {
			this.isMusicReadyFlag = true;
		});

		// 检测到音乐切换到播放状态（可能经由系统控制）
		this.$refs.bgm_audio.addEventListener("play", _ => {
			this.setting.musicOn = true;
			this.$refs.toolBar.toggleMusicButtonAnimation();
			// console.debug("[bgm]检测到音乐播放");
		});

		// 检测到音乐切换到暂停状态（可能经由系统控制）
		this.$refs.bgm_audio.addEventListener("pause", _ => {
			this.setting.musicOn = false;
			this.$refs.toolBar.toggleMusicButtonAnimation();
			// console.debug("[bgm]检测到音乐暂停");
		});

		// 如果5秒后仍未Ready，则仍然显示按钮（防止浏览器不支持canplaythrough特性）
		setTimeout(_ => {
			this.isMusicReadyFlag = true;
		}, 5000);
	},
	watch: {
		//监视是否要播放音乐
		"setting.musicOn"(newMusicOn) {
			// 1（true）：应当处在播放中的状态
			if (newMusicOn) {
				// 先设置音量为0
				this.$refs.bgm_audio.volume = 0;
				// 开始播放
				this.$refs.bgm_audio.play();

				// 音乐淡入，使用setInterval周期性调大音量
				var musicFadeInTimer = setInterval(_ => {
					this.$refs.bgm_audio.volume += 0.01;
					// 如果音量大于40%，则停止增加（40%的数字来自于PC端和移动端的测试，个人认为是比较合适的音量）
					if (this.$refs.bgm_audio.volume >= 0.4) clearInterval(musicFadeInTimer);
				}, 10);
			} else {
				// 0（false）：应当处在暂停状态
				// 音乐淡出
				var musicFadeOutTimer = setInterval(_ => {
					this.$refs.bgm_audio.volume -= 0.02;
					if (this.$refs.bgm_audio.volume <= 0.05) {
						// 当音量小于5%时，暂停播放
						clearInterval(musicFadeOutTimer);
						this.$refs.bgm_audio.pause();
					}
				}, 10);
			}
		},
	},
};
</script>

<template>
	<div class="page-container">
		<ToolBar ref="toolBar" :isMusicReadyFlag="isMusicReadyFlag" :settingReac="setting"></ToolBar>
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
		<source src="https://genshin.1752e.com/ys/1/ys_xgkc/resource/sound/bgm.mp3" type="audio/mp3" />
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
