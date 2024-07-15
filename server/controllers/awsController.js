const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const config = require('../config/keys');
const awsConfig = config.aws;

const bucketName = awsConfig.bucketName;
const region = awsConfig.region;
const accessKeyId = awsConfig.accessKeyId;
const secretAccessKey = awsConfig.secretAccessKey;

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads a file to s3
async function upload(file) {
	if (!bucketName) {
		console.error('Missing AWS_BUCKET_NAME in environment variables');
		return; // Handle the error appropriately
	}

	const fileStream = fs.createReadStream(file.path);
	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	try {
		return await s3.upload(uploadParams).promise();
	} catch (error) {
		console.error('Error uploading file to S3:', error);
		throw error; // Handle the error appropriately
	}
}

async function getList() {
	const params = { Bucket: bucketName };
	await s3.listObjectsV2(params, (err, data) => {
		if (err) {
			console.log('Error from getList()', err, err.stack);
		} else {
			console.log('Data from bucket', data);
			console.log('get succeeded');
		}
	});
}

module.exports = { upload, getList };
