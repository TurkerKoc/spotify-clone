import { SignInButton } from "@clerk/clerk-react"
import { SignedOut } from "@clerk/clerk-react"
import { UserButton } from "@clerk/clerk-react"
import { SignedIn } from "@clerk/clerk-react"
import { Button } from "./components/ui/button"

function App() {
  return (
    <>
    <header>
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
