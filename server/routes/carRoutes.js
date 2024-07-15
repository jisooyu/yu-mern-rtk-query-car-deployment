const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const multer = require('multer');
const { createPhoto } = require('../controllers/photoController');

const upload = multer({ dest: 'uploads/' });
const Cars = require('../models/Cars');

// post data
router.post(
	'/car/save',
	requireLogin,
	upload.array('imageFiles'), // multiple fields upload
	async (req, res) => {
		try {
			const {
				carMakerName,
				modelName,
				modelYear,
				engine,
				maxPrice,
				minPrice,
				mpg,
				range,
				options,
			} = req.body;
			// Save car details and AWS URL to MongoDB
			const newCar = new Cars({
				carMakerName,
				modelName,
				modelYear,
				maxPrice,
				minPrice,
				mpg,
				range,
				engine,
				options,
			});

			// Upload photo to AWS and get the URL
			if (req.files && req.files.length > 0) {
				const s3ImageUrls = [];

				for (let i = 0; i < req.files.length; i++) {
					const result = await createPhoto(req.files[i]);
					if (result) {
						s3ImageUrls.push(result.Location);
					} else {
						console.log(`Error uploading image ${i + 1}`);
					}
				}
				// Assuming newCar.s3ImageUrl is an array field in your model
				newCar.s3ImageUrl = s3ImageUrls;
			} else {
				console.log('No images to upload');
			}
			await newCar.save();
			// console.log('newCat from server', newCar);
			// res.status(200).json({ message: 'New data posted sucessfully' });
			res.status(200).json(newCar);
		} catch (error) {
			console.error('Error uploading car details and photo:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

// fetch data
router.get('/car/fetch', async (req, res) => {
	try {
		const cars = await Cars.find({});
		res.status(200).json(cars);
	} catch (error) {
		res.status(422).send(error);
	}
});

// fetch data by id
// Define a route to get car data by ID
router.get('/car/fetchDataById/:id', async (req, res) => {
	const { id } = req.params;
	try {
		// Use the findById method to find a car by its ID
		const car = await Cars.findById(id);
		if (!car) {
			// If no car is found with the given ID, return a 404 status
			return res.status(404).json({ error: 'Car not found' });
		}
		// If the car is found, return it as JSON
		res.status(200).json(car);
	} catch (error) {
		console.error('Error fetching car by ID:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// delete data
router.delete('/car/delete/:id', async (req, res) => {
	const { id } = req.params;
	try {
		// Use the findOneAndDelete method to find a car by its ID and remove it
		const deletedCar = await Cars.findOneAndDelete({ _id: id });
		if (!deletedCar) {
			// If no car is found with the given ID, return a 404 status
			return res.status(404).json({ error: 'Car not found' });
		}
		// If the car is found and deleted, return the deleted car data as JSON
		res.status(200).json(deletedCar);
	} catch (error) {
		console.error('Error deleting car by ID:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// edit data
router.put(
	'/car/update/:id',
	requireLogin,
	upload.array('imageFiles'),
	async (req, res) => {
		try {
			const { id } = req.params;
			const {
				carMakerName,
				modelName,
				modelYear,
				engine,
				maxPrice,
				minPrice,
				mpg,
				range,
				options,
			} = req.body;

			// Upload photo to AWS and get the URL
			let s3ImageUrls = [];
			if (req.files && req.files.length > 0) {
				for (let i = 0; i < req.files.length; i++) {
					const result = await createPhoto(req.files[i]);
					if (result) {
						s3ImageUrls.push(result.Location);
					} else {
						console.log(`Error uploading image ${i + 1}`);
					}
				}
			}
			const updatedCar = await Cars.findByIdAndUpdate(
				id,
				{
					carMakerName,
					modelName,
					modelYear,
					engine,
					maxPrice,
					minPrice,
					mpg,
					range,
					$set: {
						options: Array.isArray(options) ? options : [options],
						s3ImageUrl: s3ImageUrls,
					},
				},
				{ new: true } // Return the updated document
			);

			if (!updatedCar) {
				return res.status(404).json({ error: 'Car not found' });
			}
			res.status(200).json(updatedCar);
		} catch (error) {
			console.error('Error updating car data:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
);

module.exports = router;
