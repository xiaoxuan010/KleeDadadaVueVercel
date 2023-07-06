# KleeDadadaVue

## 这是什么

本项目是基于[原神角色主题网站](https://gitee.com/KleeGitee/Klee)的Vue3重构版本，使用[Vercel](https://vercel.com/)部署。由于使用了Vercel Serverless Function作代理转发，因此推荐在Vercel部署运行，其他环境未经测试，不保证能正常工作。

## 部署方式

### Vercel公开部署

进入[Vercel官网](https://vercel.com/)，按照提示导入本仓库（https://github.com/xiaoxuan010/KleeDadadaVue）并部署。

可根据需要绑定自己的域名。

### 本地测试/部署

#### 环境要求

- Git（推荐）

- [NodeJs](https://nodejs.org/) （18或以上版本）

- Vercel环境

  ```sh
  npm i -g vercel
  ```

#### 本地部署

```sh
git clone https://github.com/xiaoxuan010/KleeDadadaVue # 将本仓库克隆到本地（方法不唯一）
cd KleeDadadaVue # 进入文件夹
npm install # 自动安装相关依赖
vercel dev # 启动本地服务器
```

经过上述步骤后，即可在[localhost:3000](localhost:3000)访问本地部署的网站。

> 安装Vercel可能需要绑定账号，部署等相关的配置亦是在官网进行修改。



## 项目介绍

### 文件结构

```dir
/api/					# Vercel Serverless Function 源文件
	hello.js			# 测试API
	getKleeGlobalcount.js	# 全球计数核心API
	
/src/					# Vue开发核心源文件
	assets/base.css		# 基础样式
	audio/				# 语音素材库
	components/			# Vue开发：自己封装的各类组件
		beautifiedDivider.vue	# 美化的分割线
		header.vue			# 页头部分
		footer.vue			# 页脚部分
		KleeClickCount.vue	# 中间技术部分
	font/				# 字体
	img/				# 图片素材
	music/				# 音乐素材
	App.vue				# Vue主要文件
	main.js				# Vue主要文件
index.html		# Vue主要页面文件

……（以下省略）
```

