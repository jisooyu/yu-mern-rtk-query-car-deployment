import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAddCarMutation } from '../store';

function CarForm() {
	const navigate = useNavigate();
	const [addCar, { isLoading: isAdding, error: addError }] =
		useAddCarMutation();

	const [formData, setFormData] = useState({
		carMakerName: '',
		modelYear: '',
		modelName: '',
		engine: '',
		minPrice: '',
		maxPrice: '',
		mpg: '',
		range: '',
		options: [],
		imageFiles: [],
	});

	const handleImage = (e) => {
		const files = e.target.files;
		setFormData((prevFiles) => ({
			...prevFiles,
			imageFiles: [...(prevFiles.imageFiles || []), ...files],
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleArrayChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value.split(',').map((opt) => opt.trim()),
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataObject = new FormData();
		formDataObject.append('carMakerName', formData.carMakerName);
		formDataObject.append('modelYear', Number(formData.modelYear));
		formDataObject.append('modelName', formData.modelName);
		formDataObject.append('engine', formData.engine);
		formDataObject.append('maxPrice', Number(formData.maxPrice));
		formDataObject.append('minPrice', Number(formData.minPrice));
		formDataObject.append('mpg', Number(formData.mpg));
		formDataObject.append('range', Number(formData.range));
		formDataObject.append('options', formData.options.join(','));

		if (formData.imageFiles.length) {
			for (let i = 0; i < formData.imageFiles.length; i++) {
				formDataObject.append('imageFiles', formData.imageFiles[i]);
			}
		}

		try {
			/* If you don't use unwrap(), you have to manually check the fulfilled
			and rejected states of the promise, which can be more verbose */
			await addCar(formDataObject).unwrap();
			navigate('/dashboard');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='container mx-auto flex flex-col items-center'>
			<h1 className='m-3'>자동차 정보 입력 양식</h1>
			<form
				onSubmit={handleSubmit}
				className='w-full max-w-lg'
			>
				{/* Form Fields */}
				<div className='mb-2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='carMakerName'
					>
						자동차 회사
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='carMakerName'
						name='carMakerName'
						value={formData.carMakerName}
						onChange={handleChange}
						placeholder='Car Maker Name'
					/>
				</div>
				<div className='mb-2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='modelYear'
					>
						연도
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='modelYear'
						name='modelYear'
						value={formData.modelYear}
						onChange={handleChange}
						placeholder='Model Year'
					/>
				</div>
				<div className='mb-2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='modelName'
					>
						모델명
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='modelName'
						name='modelName'
						value={formData.modelName}
						onChange={handleChange}
						placeholder='Model Name'
					/>
				</div>
				<div className='mb-2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='engine'
					>
						엔진
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='engine'
						name='engine'
						value={formData.engine}
						onChange={handleChange}
						placeholder='Engine Names'
					/>
				</div>
				<div className='mb-2'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						최저가격 ($)
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='minPrice'
						name='minPrice'
						value={formData.minPrice}
						onChange={handleChange}
						placeholder='Lower Price'
					/>
				</div>
				<div className='mb-2'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						최고가격 ($)
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='maxPrice'
						name='maxPrice'
						value={formData.maxPrice}
						onChange={handleChange}
						placeholder='Upper Price'
					/>
				</div>
				<div className='mb-2'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						MPG
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='mpg'
						name='mpg'
						value={formData.mpg}
						onChange={handleChange}
						placeholder='miles per gallon'
					/>
				</div>
				<div className='mb-2'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						EV Range
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='number'
						id='range'
						name='range'
						value={formData.range}
						onChange={handleChange}
						placeholder='miles per charge'
					/>
				</div>
				<div className='mb-2'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>
						옵션
					</label>
					<textarea
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='text'
						id='options'
						name='options'
						rows='6'
						value={formData.options.join(',')}
						onChange={handleArrayChange}
						placeholder='Option Names (comma-separated)'
					/>
				</div>
				<div className='mb-2'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='imageFiles'
					>
						Upload Images
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						type='file'
						id='imageFiles'
						name='imageFiles'
						accept='image/jpeg, image/jp,image/jpg, image/png'
						onChange={handleImage}
					/>
				</div>
				<div className='flex flex-row mt-3'>
					<Button
						type='submit'
						className='bg-blue-500 hover:bg-blue-700 text-white'
						rounded
						primary
						disabled={isAdding}
					>
						{isAdding ? 'Submitting...' : 'Submit'}
					</Button>
					<Button
						type='button'
						className='bg-blue-500 hover:bg-blue-700 text-white ml-5'
						rounded
						danger
						onClick={() => navigate('/dashboard')}
					>
						Cancel
					</Button>
				</div>
				{addError && (
					<p className='text-red-500 mt-2'>Error: {addError.message}</p>
				)}
			</form>
		</div>
	);
}

export default CarForm;
