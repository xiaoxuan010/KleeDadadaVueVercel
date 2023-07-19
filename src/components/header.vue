<!-- 封装的页头部分，包括页面大标题、页旁摇晃图片、模式选择器等 -->
<script>
export default {
	// 使用props传入“设置”的指针（即reactive引用）
	props: ["settingReac"],
};
</script>

<template>
	<div class="header-container">
		<div class="title-container">
			<h1 class="page-title">「可莉」哒哒哒~</h1>
			<img class="title-img shake" width="100" height="100" alt="Image of Klee" src="../img/favicon.webp" />
		</div>

		<!-- 选择器, 绑定"设置"的voiceMode属性，触发选择时Vue将自动把更改同步到变量 -->
		<select id="mode-selector" v-model="settingReac.voiceMode">
			<option value="0">默认模式（随机）</option>
			<option value="1">哒哒哒</option>
			<option value="2">彩蛋</option>
		</select>
	</div>
</template>

<style>
.header-container {
	text-align: center;
	margin: auto;
}
.title-container {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: nowrap;
}

.page-title {
	font-family: genshin;

	/* 自适应字体大小 */
	font-size: clamp(2rem, -3.059rem + 18.82vw, 4rem);

	font-weight: 500;
}
.title-container .title-img {
	height: clamp(2rem, -3.059rem + 18.82vw, 4rem);
	width: auto;
}

/* title旁的小图片的摇动动画 */
@keyframes shake {
	0% {
		transform: rotate(-5deg);
	}
	50% {
		transform: rotate(5deg);
	}
	100% {
		transform: rotate(-5deg);
	}
}
.shake {
	animation: shake 1s linear infinite;
}

/* 模式选择器 */
#mode-selector {
	width: 200px;
	height: 40px;
	background-color: #f7b7b3;
	border: none;
	border-radius: 5px;

	font-size: 1rem;
	font-family: genshin;
	text-align: center;
	text-align-last: center;
	padding: 10px;
	margin: 0 10px;
	color: rgb(38, 0, 63);

	appearance: none;
	cursor: pointer;
	outline: none;

	:hover {
		box-shadow: 0 0 10px #ce7171;
	}
}
</style>
