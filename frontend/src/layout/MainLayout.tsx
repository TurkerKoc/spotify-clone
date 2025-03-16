import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSideBar from "./components/LeftSidebar"
function MainLayout() {
  const isMobile = false;  
  return (
    <div className="h-screen bg-black text-white flex flex-col">
    <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
        {/* leftSideBar */}
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
            <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
            <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* rightSideBar */}
        <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
            friends activity
        </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout
