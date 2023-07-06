/* getKleeGlobalcount.js
 * Vercel Serverless Function 云函数
 * 将网页前端发送到Vercel Serverless Function的请求转发到原站服务, 并添加鉴权请求头.
 */

export default async function handler(request, response) {
	// 从GET参数中获取本次要加的点击次数
	var addNum = request.query.thistimecountFromFront || 0;

	// 向原站发送请求
	var res = await fetch(`http://8.130.126.167:3000/getKleeGlobalcounts?thistimecountFromFront=${addNum}`, {
		headers: {
			// 原站要求的鉴权请求头
			"ajax-requests": "true",
		},
		method: "GET",
	});

	// 将原站发回的response转换为JavaScript Object
	var resObj = await res.json();
	var KleeClickTimes = resObj.globalcountsFromBackend;

	// 向前端发回数据
	response.status(200).json({
		code: 0,
		msg: "Success",
		data: {
			KleeClickTimes: KleeClickTimes,
		},
	});
}
