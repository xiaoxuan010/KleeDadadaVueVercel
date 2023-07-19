<script>
export default {
	props: ["settingReac", "isMusicReadyFlag"],
	methods: {
		// 当按下音乐控制按钮时
		toggleMusic() {
			// 反转musicOn变量（使用异或运算优化）
			this.settingReac.musicOn ^= 1;
			this.toggleMusicButtonAnimation();
		},
		toggleMusicButtonAnimation() {
			// 给音乐控制按钮施加动画，动画结束后移除类
			this.$refs.music_toggle_icon_button.classList.add("button-bounce-big");
			setTimeout(_ => {
				this.$refs.music_toggle_icon_button.classList.remove("button-bounce-big");
			}, 150);
		},
	},
};
</script>

<template>
	<div class="tool-bar">
		<Transition name="zoom">
			<!-- 只有在音乐正常加载时才会显示音乐控制按钮 -->
			<div v-show="isMusicReadyFlag" class="music-toggle" ref="music_toggle_icon_button" @click="toggleMusic">
				<!-- musicOn变量决定了显示的图片 -->
				<img class="tool-bar-icon-button" v-show="settingReac.musicOn" src="../img/music_on.webp" />
				<img class="tool-bar-icon-button" v-show="!settingReac.musicOn" src="../img/music_off.webp" />
			</div>
		</Transition>
	</div>
</template>
<style scoped>
/* 整个工具栏的位置：固定文档左上角 */
.tool-bar {
	position: absolute;
	top: 1rem;
	left: 1rem;
	z-index: 100;
}

.music-toggle {
	/* 指定鼠标样式为类似按钮的样式 */
	cursor: pointer;
	/* 禁用手机端那个蓝色的按钮提示 */
	-webkit-tap-highlight-color: transparent;
}
.music-toggle > .tool-bar-icon-button {
	/* 自适应按钮大小 */
	width: clamp(2rem, 1.636rem + 1.82vw, 3rem);
}

/* 缩放转场 */
.zoom-enter-active,
.zoom-leave-active {
	/* 这个只是给vue的Transition作参考的，并不参与实际的动画，设置略小于实际动画时间，防止动画放完会出现鬼畜 */
	transition: 0.29s;
}
.zoom-enter-active > .tool-bar-icon-button {
	animation: bounce-in 0.3s cubic-bezier(0, 1.65, 0.555, 1.005);
}
.zoom-leave-active > .tool-bar-icon-button {
	animation: bounce-in 0.3s reverse cubic-bezier(0, 1.65, 0.555, 1.005);
}
@keyframes bounce-in {
	0% {
		transform: scale(0);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}

/* 按钮点击的动画 */
.button-bounce-big > .tool-bar-icon-button {
	animation: button-bounce-big 150ms ease-out infinite;
}
@keyframes button-bounce-big {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}
</style>
