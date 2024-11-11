import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input/Input.jsx";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { createAccountData, resetPassData } from '../../utils/variables.jsx'
import Button from '../../components/Button/Button.jsx';

const ResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.message || "Error resetting password");
		}
	};

	return (
		<div className='cardContent'>
			<div className='formBox'>
				<h2 className='title textTogradient'>{createAccountData.createAccountTitle}</h2>
				{error && <p className='textError'>{error}</p>}
				{message && <p className='textAccept'>{message}</p>}

				<form onSubmit={handleSubmit}>
					<Input
						icon={Lock}
						type='password'
						placeholder='New Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Confirm New Password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>




<Button
	type='submit'
	text={resetPassData.resetBtnText}
	animateText={resetPassData.resetBtnTextAnimate}
	animate={isLoading}
	color={'0'}
></Button>
				</form>
				</div>
			</div>
	);
};
export default ResetPasswordPage;
