/* getKleeGlobalcount.js
 * Vercel Serverless Function 云函数
 * 将网页前端发送到Vercel Serverless Function的请求转发到原站服务, 并添加鉴权请求头.
 */

import fetchTimeout from "fetch-timeout";

export default function handler(request, response) {
	// 从GET参数中获取本次要加的点击次数
	var addNum = request.query.thistimecountFromFront || 0;

	// 向原站发送请求
	// fetch(`http://8.130.126.167:3000/getKleeGlobalcounts?thistimecountFromFront=${addNum}`, {
	fetchTimeout(
		`http://8.130.126.167:3000/getKleeGlobalcounts?thistimecountFromFront=${addNum}`,
		{
			headers: {
				// 原站要求的鉴权请求头
				"ajax-requests": "true",
			},
			method: "GET",
		},
		5000,
		"向/从原站同步数据时出现超时!"
	).then(
		res => {
			// 将原站发回的response转换为JavaScript Object
			res.json()
				.then(resObj => {
					var KleeClickTimes = resObj.globalcountsFromBackend;
					// 向前端发回数据
					response.status(200).json({
						code: 0,
						msg: "Success",
						data: {
							KleeClickTimes: KleeClickTimes,
						},
					});
				})
				.catch(err => {
					// 向前端返回502并发送错误信息
					response.status(502).json({
						code: 502,
						msg: "Server Error",
						err,
					});
				});
		},
		err => {
			// 向前端返回504并发送错误信息
			response.status(504).json({
				code: 504,
				msg: "Server Error",
				err,
			});
		}
	);
}
