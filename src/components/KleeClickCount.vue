<script>
import beautifiedDivider from "./beautifiedDivider.vue";
import { Roller } from "vue-roller";
import "vue-roller/dist/style.css";

const gif = import.meta.globEager("../img/animation/*.webp");
const voice = import.meta.globEager("../audio/*/*.mp3");

export default {
	props: ["settingReac"],
	components: {
		Roller,
		beautifiedDivider,
	},
	data() {
		return {
			globalClickCount: undefined,
			localClickCount: 0,
			thistimecountFromFront: 0,
			rollerRefresh: true,
			rollerRefreshTimer: undefined,
			cachedObjects: {},
			isFirstTimePlayVoice: true,
			// gif: [gif1, gif2, gif3, gif4, gif4, gif5],
		};
	},
	async mounted() {
		let updateClickTimesData = async () => {
			var res = await fetch(`/api/getKleeGlobalcounts?getKleeGlobalcounts=${this.thistimecountFromFront}`);
			var resObj = await res.json();
			this.thistimecountFromFront = 0;
			var resKleeClickTimes = parseInt(resObj.data.KleeClickTimes);

			// console.debug("[globalClickCount]", this.globalClickCount);
			if (resKleeClickTimes - parseInt(this.globalClickCount || 0) >= 10)
				this.globalClickCount = resKleeClickTimes + this.thistimecountFromFront;
		};
		window.onload = updateClickTimesData;
		setInterval(updateClickTimesData, 5000);
		window.onresize = _ => {
			// console.log("检测到窗口大小变化，刷新组件");
			if (typeof this.rollerRefreshTimer == "undefined") {
				this.rollerRefreshTimer = setTimeout(_ => {
					this.rollerRefresh = false;
					this.$nextTick(_ => {
						this.rollerRefresh = true;
					});
					this.rollerRefreshTimer = undefined;
				}, 500);
			}
		};
	},
	methods: {
		animateKlee() {
			var randomId = Math.floor(Math.random() * 5) + 1; //0-4，可莉的GIF
			var elem = document.createElement("img");
			// elem.src = `../img/animation/${randomId}.gif`;

			elem.src = gif[`../img/animation/${randomId}.webp`].default;

			//下面根据不同的窗口改变可莉动画的样式（响应式）
			var screenWidth = document.documentElement.clientWidth;
			elem.style.position = "absolute";
			elem.style.marginBottom = "1rem";
			elem.style.bottom = 0;
			elem.style.height = "auto"; // 自动计算高度，保持纵横比
			elem.style.zIndex = "-10";
			if (screenWidth > 768) {
				elem.style.width = "500px";
			} else {
				//移动端，把动画变小、变慢一点
				elem.style.width = "250px"; // 设置宽度为 200px（让移动端方便观看）
			}

			this.$refs.counterRootContainer.appendChild(elem);
			elem.classList.add("movingToLeft");
			setTimeout(_ => {
				elem.remove();
			}, 2000);
		},
		playDadada() {
			function getRandomAudioUrl(curMode) {
				var localAudioList = audioList;
				var randomIndex;
				//根据模式产生符合模式的音频下标
				if (curMode == 0) {
					randomIndex = Math.floor(Math.random() * 11); //默认语音的文件是：文件下标0-10.这儿的数字就写8.
				}
				if (curMode == 2) {
					randomIndex = Math.floor(Math.random() * 17); //文件下标0-16.这儿的数字就写14. 【这儿写彩蛋对应的audioList下标】
				}

				var randomItem = localAudioList[randomIndex];
				return randomItem;
			}
			var currentVoiceMode = this.settingReac.voiceMode;
			//要播放的音频Url
			var audioList = [
				/* 0-10：默认模式 mode1 */
				"../audio/CN_voice/BengbengBombCN.mp3",
				"../audio/CN_voice/DadadaCN.mp3",
				"../audio/CN_voice/HidoiCN.mp3",
				"../audio/CN_voice/HaoyeCN.mp3",
				"../audio/CN_voice/HeixiuCN.mp3",
				"../audio/CN_voice/HenghenghengCN.mp3",
				"../audio/CN_voice/LalalaCN.mp3",
				"../audio/CN_voice/QiangqiangCN.mp3",
				"../audio/CN_voice/ChildlabourWuuu_CN.mp3",
				"../audio/CN_voice/Lueluelue_CN.mp3",
				"../audio/CN_voice/Aowu_CN.mp3",
				/* 11-16：彩蛋模式 mode3 */
				"../audio/General/Egg_LZKBomb_General.mp3",
				"../audio/General/Egg_LZKDadada_General .mp3",
				"../audio/General/Egg_LZKHei_General.mp3",
				"../audio/General/Egg_HLbomb_General.mp3",
				"../audio/General/Egg_HLlalala_General.mp3",
				"../audio/General/Egg_HLdadada_General.mp3",
			];
			var audioUrl;

			//根据当前模式获取符合模式语音的 AudioURL
			switch (currentVoiceMode) {
				//curMode==0  默认模式
				case "0":
					if (this.isFirstTimePlayVoice) {
						//随机获取一个音频的URL，第一个必定是哒哒哒
						this.isFirstTimePlayVoice = false;
						audioUrl = audioList[1]; //First play fixed Dadada
					} else {
						audioUrl = getRandomAudioUrl(currentVoiceMode);
					}

					break;

				//curMode==1  只哒哒哒
				case "1":
					console.log(1);
					audioUrl = audioList[1];
					break;

				//cueMode==2   彩蛋
				case "2":
					if (this.isFirstTimePlayVoice == true) {
						//随机获取一个音频的URL，第一个必定是哒哒哒
						this.isFirstTimePlayVoice = false;
						audioUrl = audioList[1]; //First play fixed Dadada
					} else {
						audioUrl = getRandomAudioUrl(currentVoiceMode);
					}
					break;
			}

			//根据音频URL从本地获取音频资源。同时将该音频缓存到本地
			let audio = new Audio(voice[audioUrl].default);

			//播放音频后监听音频结束事件，并在音频播放结束时将音频元素从 DOM 中移除
			audio.play();
			audio.addEventListener("ended", function () {
				this.remove();
			});
		},
		counterButtonClick(event) {
			var triggerRipple = _event => {
				let ripple = document.createElement("span");
				ripple.parentElement;
				ripple.classList.add("ripple");

				const counter_button = this.$refs.counterButton;
				counter_button.appendChild(ripple);

				let x = _event.clientX - _event.target.offsetLeft;
				let y = _event.clientY - _event.target.offsetTop;

				ripple.style.left = `${x}px`;
				ripple.style.top = `${y}px`;

				setTimeout(() => {
					ripple.remove();
				}, 300);
			};
			this.thistimecountFromFront++;
			this.localClickCount++;
			this.globalClickCount++;
			triggerRipple(event);
			this.animateKlee();
			this.playDadada();
		},
	},
};
</script>
<template>
	<div class="counter-container" ref="counterRootContainer">
		<p class="counter-description">可莉已经哒哒哒了这么多次</p>

		<div class="counter global-counter">
			<Roller
				ref="globalCounterNumRoller"
				class="global-counter-num-roller"
				v-if="rollerRefresh"
				:value="(globalClickCount || 0).toString()"
				defaultValue="0"
				:duration="200"></Roller>
		</div>
		<div class="counter local-counter">{{ localClickCount }}</div>

		<button class="counter-button" ref="counterButton" @click="counterButtonClick">哒哒哒</button>

		<beautifiedDivider ref="lowDivider" />
	</div>
</template>
<style>
/* @import "../../node_modules/mdui/dist/css/mdui.min.css"; */

.counter-container {
	/* font-weight: bold; */
	margin-top: 64px;
	padding: 1rem;
}
.counter {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", "Roboto", sans-serif;
	text-shadow: #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px;
}
.global-counter {
	color: #4d2020;
	font-size: clamp(3rem, 1.909rem + 5.45vw, 6rem);
	font-weight: bold;
}
.global-counter-num-roller {
	justify-content: center;
}

/* 本地计数器文字颜色 */
.local-counter {
	color: #646363;
	font-size: 2rem;
}

.counter-button {
	/* 动画触发按钮颜色 */
	-webkit-tap-highlight-color: transparent;
	background-color: #b93535;
	border: none;
	border-radius: 16px;
	color: white;
	padding: 0.8rem 2rem;
	text-decoration: none;
	font-size: 1.4rem;
	font-family: genshin;
	/* font-weight: bold; */
	margin-top: 1rem;
	position: relative;
	overflow: hidden;
	box-shadow: 6px 7px 40px -4px rgba(43, 42, 42, 0.2);
	cursor: pointer;
	transition: background-color 0.1s ease-in-out, scale 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.counter-button:hover {
	background-color: #a71212;
}

.counter-button:active {
	scale: 0.95;
}
.counter-button span {
	position: absolute;
	border-radius: 50%;
	background-color: #ffffff50;

	width: 100px;
	height: 100px;
	margin-top: -50px;
	margin-left: -50px;

	animation: ripple 1s;
	opacity: 0;
}
@keyframes ripple {
	from {
		opacity: 1;
		transform: scale(0);
	}

	to {
		opacity: 0;
		transform: scale(10);
	}
}

/* 可莉左移动画 */
.movingToLeft {
	animation: 2s linear gifMoveToLeft;
	right: 0px;
}
@keyframes gifMoveToLeft {
	from {
		/* left: 100%; */
		transform: translateX(100%);
	}
	to {
		/* left: -100%; */
		transform: translateX(-100vw);
	}
}
</style>
