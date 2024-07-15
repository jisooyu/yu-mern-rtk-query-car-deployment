const asyncHandler = require('express-async-handler');
const { upload, getList } = require('./awsController');

const createPhoto = asyncHandler(async (file) => {
	const result = await upload(file);
	return result;
});

const getPhotos = asyncHandler(async () => {
	const result = await getList();
	return result;
});

module.exports = { createPhoto, getPhotos };
