<script>
export default {
	props: ["settingReac"],
};
</script>

<template>
	<div class="header-container">
		<div class="title-container">
			<h1 class="page-title">「可莉」哒哒哒~</h1>
			<img class="title-img shake" alt="Image of Klee" src="../img/favicon.webp" />
		</div>
		<select id="mode-selector" v-model="settingReac.voiceMode">
			<option value="0">默认模式（随机）</option>
			<option value="1">哒哒哒</option>
			<option value="2">彩蛋</option>
		</select>
	</div>
</template>

<style scoped>
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
	font-size: clamp(2rem, -3.059rem + 18.82vw, 4rem);
	font-weight: 500;
}
.title-container .title-img {
	height: clamp(2rem, -3.059rem + 18.82vw, 4rem);
}

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

#mode-selector {
	width: 200px;
	height: 40px;
	background-color: #f7b7b3;
	border: none;
	border-radius: 5px;
	font-size: 16px;
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
