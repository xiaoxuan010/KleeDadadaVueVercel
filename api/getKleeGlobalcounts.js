export default async function handler(request, response) {
	var addNum = request.query.thistimecountFromFront || 0;
	var res = await fetch(`http://8.130.126.167:3000/getKleeGlobalcounts?thistimecountFromFront=${addNum}`, {
		headers: {
			"ajax-requests": "true",
		},
		method: "GET",
	});
	var resObj = await res.json();
	var KleeClickTimes = resObj.globalcountsFromBackend;

	response.status(200).json({
		code: 0,
		msg: "Success",
		data: {
			KleeClickTimes: KleeClickTimes,
		},
	});
}
