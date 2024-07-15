import Button from '../../components/Button';
import { login } from '../../services/auth';

function GoogleLoginButton() {
	const handleLogin = () => {
		login();
	};
	return (
		<div>
			<Button
				className='text-red-500 hover:cursor-pointer m-2'
				onClick={handleLogin}
				rounded
				danger
			>
				Login With Google
			</Button>
		</div>
	);
}

export default GoogleLoginButton;
