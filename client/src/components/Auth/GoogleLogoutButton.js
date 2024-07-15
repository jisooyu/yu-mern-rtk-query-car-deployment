import Button from '../../components/Button';
import { logout } from '../../services/auth';
function GoogleLogoutButton() {
	const handleLogout = () => {
		logout();
	};
	return (
		<div>
			<Button
				className='text-blue-700
				hover:cursor-pointer  m-2'
				onClick={handleLogout}
				rounded
				danger
			>
				Logout
			</Button>
		</div>
	);
}

export default GoogleLogoutButton;
