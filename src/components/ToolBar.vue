<script>
export default {
	props: ["settingReac", "isMusicReadyFlag"],
	mounted() {
		// setInterval(_ => {
		// 	this.settingReac.musicOn ^= 1;
		// }, 1000);
	},
	methods: {
		toggleMusic() {
			this.settingReac.musicOn ^= 1;
			this.$refs.music_toggle_icon_button.classList.add("button-bounce");
			setTimeout(_ => {
				this.$refs.music_toggle_icon_button.classList.remove("button-bounce");
			}, 200);
		},
	},
};
</script>

<template>
	<div class="tool-bar">
		<Transition name="zoom">
			<div v-show="isMusicReadyFlag" class="music-toggle" ref="music_toggle_icon_button" @click="toggleMusic">
				<img class="tool-bar-icon-button" v-show="settingReac.musicOn" src="../img/music_on.webp" />
				<img class="tool-bar-icon-button" v-show="!settingReac.musicOn" src="../img/music_off.webp" />
			</div>
		</Transition>
	</div>
</template>
<style scoped>
.tool-bar {
	position: absolute;
	top: 1rem;
	left: 1rem;
	z-index: 100;
}

.music-toggle {
	cursor: pointer;
}
.music-toggle > img {
	width: clamp(2rem, 1.636rem + 1.82vw, 3rem);
}

.tremble {
	animation: shake 40ms ease infinite;
}

/* 缩放转场 */

.zoom-enter-active,
.zoom-leave-active {
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

.button-bounce > img {
	animation: button-bounce 200ms ease-in-out infinite;
}
@keyframes button-bounce {
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
