<!-- 核心组件：包括全球计数、本地计数、哒哒哒按钮等部分 -->
<script>
import beautifiedDivider from "./beautifiedDivider.vue";
// 全球计数器使用vue-roller组件
// 开源地址：https://github.com/andy-0414/vue-roller
import { Roller } from "vue-roller";
import "vue-roller/dist/style.css";

// 批量导入动图和语音文件
const gif = import.meta.globEager("../img/animation/*.webp");
const voice = import.meta.globEager("../audio/*/*.mp3");

export default {
	// 接收settingReac指针
	props: ["settingReac"],

	// 声明调用的组件
	components: {
		Roller,
		beautifiedDivider,
	},

	// 声明组件内使用的变量
	data() {
		return {
			globalClickCount: undefined, // 全球计数
			localClickCount: 0, // 本地计数
			thistimecountFromFront: 0, // 轮询间隔内产生的点击次数，没有规范使用驼峰命名法的锅我要甩给原作者@Graskli
			rollerRefresh: true, // vue-roller刷新使用的flag，先false再true即可触发刷新
			rollerRefreshTimer: undefined, // setTimeout计时器id
			isFirstTimePlayVoice: true, //是否是第一次播放语音
		};
	},

	// 组件初始化执行的函数
	async mounted() {
		// 封装函数：更新全球计数数据
		let updateClickTimesData = async () => {
			// 向Vercel Serverless Function发送请求，由后端代发至原站
			fetch(`/api/edge/getKleeGlobalcounts?thistimecountFromFront=${this.thistimecountFromFront}`)
				// 后端发回的数据转换为JavaScript Object
				.then(res => {
					if (res.ok) return res.json();
					else throw new Error("Response not OK");
				})
				.then(resObj => {
					// 数据格式化
					var resKleeClickTimes = parseInt(resObj.data.KleeClickTimes);

					// 向控制台打印后端返回的数据，作测试用
					// console.debug("[globalClickCount]", this.globalClickCount);
					// 如果后端返回的数据比前端大，则更新前端显示的数字
					if (resKleeClickTimes > parseInt(this.globalClickCount || 0)) {
						// 更新前端时会加上用户已经点击的次数，虽然理论上thistimecountFromFront几乎一定为0（几微秒的时间应该不会有人能点到吧 ← 啥笔，fetch少说也得1秒钟，够点好多下了，哪里止几微秒

						// globalClickCount相当于一个基本值，后续显示的时候再加上thistimecountFromFront.
						this.globalClickCount = resKleeClickTimes;
					} else {
						// 如果不满足数据更新条件，则只加上本地的次数.
						this.globalClickCount += this.thistimecountFromFront;
					}

					// 重置区间计数
					this.thistimecountFromFront = 0;
				})
				.catch(err => {
					console.warn("检测到失败的Fetch请求：", err);
				});
		};

		// 自动刷新一次计数器
		updateClickTimesData();

		// 设置定时器，每xxx毫秒刷新一次
		setInterval(updateClickTimesData, 5000);

		// 监测窗口变化，最少500毫秒才刷新一次，减少资源消耗
		window.onresize = _ => {
			// console.log("检测到窗口大小变化，刷新组件");

			// 如果不存在定时器
			if (typeof this.rollerRefreshTimer == "undefined") {
				// 添加定时器，500毫秒后执行
				this.rollerRefreshTimer = setTimeout(_ => {
					this.rollerRefresh = false;

					// 调用Vue的API，延后一点点执行
					this.$nextTick(_ => {
						this.rollerRefresh = true;
					});
					this.rollerRefreshTimer = undefined;
				}, 500);
			}
		};
	},

	// 封装方法
	methods: {
		// 播放从右向左移动的可莉GIF图
		animateKlee() {
			//随机选择0-4，可莉的GIF
			var randomId = Math.floor(Math.random() * 5) + 1;

			// 创建一个DOM元素
			var elem = document.createElement("img");

			// elem.src = `../img/animation/${randomId}.gif`; // 弃用
			// 因为是Js调用的动态资源，Vue不会自动打包，导致构建出来的网页无法加载可莉的GIF图片（404）
			// 因此，此处采用显示声明的引用资源模式，详情参考本文件最上方“批量导入动图和语音文件”
			elem.src = gif[`../img/animation/${randomId}.webp`].default;

			// 一些共有的属性，其实这些应该在CSS里设置，但是在这里也行
			var screenWidth = document.documentElement.clientWidth;
			elem.style.position = "absolute";
			elem.style.marginBottom = "1rem";
			elem.style.bottom = 0;
			elem.style.height = "auto"; // 自动计算高度，保持纵横比
			elem.style.zIndex = "-10";

			//下面根据不同的窗口改变可莉动画的样式（响应式）
			if (screenWidth > 768) {
				elem.style.width = "500px";
			} else {
				//移动端，把动画变小
				elem.style.width = "250px"; // 设置宽度为 200px（让移动端方便观看）
			}

			// 挂载到本组件的根节点
			this.$refs.counterRootContainer.appendChild(elem);

			// 添加从右向左移动的动画类声明
			elem.classList.add("movingToLeft");

			// 动画结束后移除元素
			setTimeout(_ => {
				elem.remove();
			}, 2000);
		},

		// 播放语音
		playDadada() {
			// 选取要播放的语音URL
			function getRandomAudioUrl(curMode) {
				//根据模式产生符合模式的音频下标
				var randomIndex;
				if (curMode == 0) {
					randomIndex = Math.floor(Math.random() * 11); //默认语音的文件是：文件下标0-10.这儿的数字就写11.
				}
				if (curMode == 2) {
					randomIndex = Math.floor(Math.random() * 17); //文件下标0-16.这儿的数字就写17. 【这儿写彩蛋对应的audioList下标】
				}

				// audioList是全部语音的URL列表
				var randomItemUrl = audioList[randomIndex];
				return randomItemUrl;
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

			//根据音频URL从本地获取音频资源。
			let audio = new Audio(voice[audioUrl].default);

			//播放音频后监听音频结束事件，并在音频播放结束时将音频元素从 DOM 中移除
			audio.play();
			audio.addEventListener("ended", function () {
				this.remove();
			});
		},

		// 点击哒哒哒按钮的回调函数（参数为点击产生的的event）
		counterButtonClick(event) {
			var triggerRipple = _event => {
				// 创建元素
				let ripple = document.createElement("span");

				// Homo特有的意义不明代码
				// ripple.parentElement;

				// 添加类
				ripple.classList.add("ripple");

				// 将ripple挂载到按钮上
				this.$refs.counterButton.appendChild(ripple);

				// 让ripple中心点在鼠标点击处
				let x = _event.clientX - _event.target.offsetLeft;
				let y = _event.clientY - _event.target.offsetTop;
				ripple.style.left = `${x}px`;
				ripple.style.top = `${y}px`;

				// 300毫秒后移除元素
				setTimeout(() => {
					ripple.remove();
				}, 300);
			};

			// 触发按钮动画
			this.$refs.counterButton.classList.add("button-bounce");
			setTimeout(_ => {
				this.$refs.counterButton.classList.remove("button-bounce");
			}, 100);

			// 各计数器自增
			this.thistimecountFromFront++;
			this.localClickCount++;
			// this.globalClickCount++;

			// 触发ripple
			triggerRipple(event);
			// 触发GIF出现和移动动画
			this.animateKlee();
			// 触发音频播放
			this.playDadada();
		},
	},
};
</script>
<template>
	<div class="counter-container" ref="counterRootContainer">
		<p class="counter-description">可莉已经哒哒哒了这么多次</p>

		<div class="counter global-counter">
			<!-- 引用vue-roller组件显示全球计数, 动画时间为200ms，注意value必须为字符串 -->
			<Roller
				ref="globalCounterNumRoller"
				class="global-counter-num-roller"
				v-if="rollerRefresh"
				:value="(globalClickCount + thistimecountFromFront || 0).toString()"
				defaultValue="0"
				:duration="200"></Roller>
		</div>
		<!-- 本地计数器 -->
		<div class="counter local-counter">{{ localClickCount }}</div>

		<!-- 哒哒哒按钮，绑定回调函数 -->
		<button class="counter-button" ref="counterButton" @click="counterButtonClick">哒哒哒</button>

		<beautifiedDivider ref="lowDivider" />
	</div>
</template>
<style>
/* 计数器容器 */
.counter-container {
	/* font-weight: bold; */
	margin-top: 64px;
	padding: 1rem;
}
/* 计数器 */
.counter {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", "Roboto", sans-serif;
	text-shadow: #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px, #f77676 0 0 5px;
}

/* 全球计数器 */
.global-counter {
	color: #4d2020;
	font-size: clamp(3rem, 1.909rem + 5.45vw, 6rem);
	font-weight: bold;
}

.global-counter-num-roller {
	justify-content: center;
}

/* 本地计数器 */
.local-counter {
	color: #646363;
	font-size: 2rem;
}

.counter-button {
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
	transition: background-color 0.1s ease-in-out, scale 40ms cubic-bezier(0.07, 0.66, 0.67, 1.16);
}
/* 鼠标移上去 */
.counter-button:hover {
	background-color: #a71212;
}

/* 新的按钮按下动画 */
.button-bounce {
	animation: button-bounce 100ms ease-in-out infinite;
}
.counter-button:active {
	transform: scale(0.95);
}
@keyframes button-bounce {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.95);
	}
	100% {
		transform: scale(1);
	}
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
