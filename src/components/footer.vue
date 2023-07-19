<!-- 页脚部分：包括角色图片、相关说明和链接等 -->
<!-- 仅作封装，无特殊功能 -->
<script>
export default {};
</script>

<template>
	<div class="footer" id="footer">
		<!-- 可莉卡片图片 -->
		<img class="klee-card" loading="lazy" width="1513" height="631" src="../img/card_cn.webp" alt="" />

		<!-- 页脚文字部分 -->
		<div class="footer-text">
			<p class="footer-text-title">开源地址</p>
			<p class="footer-text-link">
				<!-- 本项目的Github地址 -->
				<a target="_blank" href="https://github.com/xiaoxuan010/KleeDadadaVue"> KleeDadadaVue</a>
			</p>
			<p class="footer-text-title">引用/致谢</p>
			<p class="footer-text-link">
				<a target="_blank" href="https://gitee.com/KleeGitee/Klee">「可莉哒哒哒」主题网站（原站）</a>
			</p>
			<p class="footer-text-link">
				<a target="_blank" href="https://github.com/duiqt/herta_kuru">「黑塔转圈圈」主题网站</a>
			</p>
			<p class="footer-text-link">
				<a target="_blank" href="https://twitter.com/Seseren_kr">「可莉GIF图片」Twitter@Seseren_kr</a>
			</p>
			<hr />
			<p>
				本网站调用<a style="text-decoration: none" target="_blank" href="http:/yuanshenweb.top/yuanshen/webs/KleeWeb/klee.html">原站</a
				>接口，与其保持数据同步与互通。
			</p>
		</div>
	</div>
</template>

<style scoped>
.footer {
	background-color: rgb(253, 250, 244);
	color: black;
	padding: 16px 10vw;
	display: flex;
	gap: 30px;
	align-items: center;
	justify-content: center;
}
/* Klee banner 图片样式 */
.klee-card {
	min-width: 256px;
	max-width: 720px;
	height: auto;
	border-top-left-radius: 2% 3.5%;
	border-top-right-radius: 2% 3.5%;
	border-bottom-left-radius: 2% 3.5%;
	border-bottom-right-radius: 2% 3.5%;
}

.footer-text-title {
	/* font-weight: bold; */
	font-size: larger;
}
.footer-text-link > a {
	/* 禁用链接的下划线 */
	text-decoration: none;
}

/* 若屏幕宽度较小，则角色卡片图片与文字为上下显示，否则为左右排布 */
@media screen and (max-width: 1280px) {
	.footer {
		flex-wrap: wrap;
	}
	.footer-text {
		text-align: center;
	}
}
</style>
