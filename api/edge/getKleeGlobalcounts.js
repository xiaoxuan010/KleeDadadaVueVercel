/* edge/getKleeGlobalcount.js
 * Vercel Edge Function 边缘函数
 * 将网页前端发送到Vercel Edge Function的请求转发到原站服务, 并添加鉴权请求头.
 */

export const config = {
	runtime: "edge", // this is a pre-requisite
};

export default async request => {
	function checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		}
		const error = new Error(response.statusText);
		error.response = response;
		throw error;
	}

	// 从GET参数中获取本次要加的点击次数
	var addNum = new URL(request.url).searchParams.get("thistimecountFromFront") || 0;

	// 向原站发送请求
	try {
		var res = await fetchTimeout(
			`http://8.130.126.167:3000/getKleeGlobalcounts?thistimecountFromFront=${addNum}`,
			{
				headers: {
					// 原站要求的鉴权请求头
					"ajax-requests": "true",
				},
			},
			5000
		);
	} catch (err) {
		// 向前端返回504并发送错误信息
		return new Response(
			JSON.stringify({
				code: 504,
				msg: "从原站获取数据时超时",
				err,
			}),
			{ status: 504 }
		);
	}
	try {
		// 测试原站发回的状态码是否正常
		checkStatus(res);
		// 将原站发回的response转换为JavaScript Object
		var resObj = await res.json();
	} catch (err) {
		// 向前端返回502并发送错误信息
		return new Response(
			JSON.stringify({
				code: 502,
				msg: "从原站获取数据时出错",
				err,
			}),
			{ status: 502 }
		);
	}

	var KleeClickTimes = resObj.globalcountsFromBackend;
	// 向前端发回数据
	return new Response(
		JSON.stringify({
			code: 0,
			msg: "Success",
			data: {
				KleeClickTimes: KleeClickTimes,
			},
		}),
		{ status: 200 }
	);
};

var fetchTimeout = function (url, opt, timeout) {
	var fetchPromise = fetch(url, opt),
		timeoutPromise = new Promise((resolve, reject) => {
			setTimeout(_ => {
				reject();
			}, timeout);
		});
	return Promise.race([fetchPromise, timeoutPromise]);
};
