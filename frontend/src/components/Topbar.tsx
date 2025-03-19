import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
  const isAdmin = useAuthStore((state) => state.isAdmin);

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center'>
				<img src='./spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>
			<div className='flex items-center gap-4'>
        {/* if the user is an admin, show the admin dashboard link */}
				{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

        {/* if the user is not signed in, show the sign in buttons */}
				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

        {/* if the user is signed in, show the user button */}
				<UserButton />
			</div>
		</div>
	);
};
export default Topbar;