export default function handler(request, response) {
	response.status(200).json({
		code: 0,
		msg: "Success",
		data: {
			msg: "Hello, Genshin Impact Players!",
		},
	});
}
