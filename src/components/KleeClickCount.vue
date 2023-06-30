<script>
export default {
	data() {
		return {
			globalClickCount: 0,
			localClickCount: 0,
		};
	},
};
</script>
<template>
	<div class="counter-container">
		<h3 class="counter-description">可莉已经哒哒哒~</h3>
		<p class="counter global-counter">{{ globalClickCount }}</p>
		<p class="counter local-counter">{{ localClickCount }}</p>
		<button id="counter-button">哒哒哒</button>
	</div>
</template>
<style scoped>
.counter-container {
	font-weight: bold;
	margin: 64px 0;
}
.counter {
	text-shadow: #f77676 0 0 10px, #f77676 0 0 10px, #f77676 0 0 10px, #f77676 0 0 10px, #f77676 0 0 10px;
}
.global-counter {
	color: #4d2020;
	font-size: 4em;
	text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black; /* 描边效果 */
}

/* 本地计数器文字颜色 */
.local-counter {
	color: #646363;
	font-size: 1.5em;
}

#counter-button {
	/* 动画触发按钮颜色 */
	background-color: #b93535;
	border: none;
	border-radius: 16px;
	color: white;
	padding: 16px 32px;
	text-decoration: none;
	font-size: 1em;
	font-family: "Roboto", sans-serif;
	font-weight: bold;
	margin-top: 16px;

	position: relative;
	overflow: hidden;
	box-shadow: 6px 7px 40px -4px rgba(43, 42, 42, 0.2);
	cursor: pointer;
	transition: background-color 0.1s ease-in-out, scale 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
}

/* 动画触发按钮的悬挂颜色 */
#counter-button:hover {
	background-color: #a71212;
}

#counter-button:active {
	scale: 0.95;
}

#counter-button span {
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
</style>
