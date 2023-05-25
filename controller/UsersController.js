import Users from "../models/UsersModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
	const page = parseInt(req.query.page) || 0;
	const limit = parseInt(req.query.limit) || 10;
	const search = req.query.search_query || "";
	const offset = limit * page;
	const totalRows = await Users.count({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.like]: "%" + search + "%",
					},
				},
				{
					email: {
						[Op.like]: "%" + search + "%",
					},
				},
			],
		},
	});
	const totalPage = Math.ceil(totalRows / limit); // dengan match ceil akan menghitung jika hasil bagi terdapat sisa maka akan digenapkan ke atas
	const result = await Users.findAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.like]: "%" + search + "%",
					},
				},
				{
					email: {
						[Op.like]: "%" + search + "%",
					},
				},
			],
		},
		offset: offset,
		limit: limit,
		order: [["id", "DESC"]],
	});

	res.json({
		result: result,
		page: page,
		limit: limit,
		totalRows: totalRows,
		totalPage: totalPage,
	});
};
