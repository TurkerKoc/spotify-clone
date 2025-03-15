import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const { signIn, isLoaded } = useSignIn(); // useSignIn is a hook that will be used to sign in the user

	if (!isLoaded) {
		return null;
	}

	const signInWithGoogle = () => {
        // authenticateWithRedirect is a method that will be used to sign in the user
		signIn.authenticateWithRedirect({
			strategy: "oauth_google",
			redirectUrl: "/sso-callback",
			redirectUrlComplete: "/auth-callback", // this is the page that will be redirected to after the user signs in to save user to database
		});
	};

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
			{/* <img src='/google.png' alt='Google' className='size-5' /> */}
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;