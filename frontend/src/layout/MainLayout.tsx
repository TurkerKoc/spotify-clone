import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSideBar from "./components/LeftSidebar"
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "@/layout/components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

function MainLayout() {
  const [isMobile, setIsMobile] = useState(false);  

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    }

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
          {/* audio player to play songs */}
          <AudioPlayer />

          {/* leftSideBar */}
          <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
              <LeftSideBar />
          </ResizablePanel>

          <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

          {/* main content */}
          <ResizablePanel defaultSize={isMobile ? 80 : 60}>
              <Outlet />
          </ResizablePanel>

          {!isMobile && (
            <>
              <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

              {/* rightSideBar */}
              <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                  <FriendsActivity />
              </ResizablePanel>
            </>
          )}
      </ResizablePanelGroup>
      <PlaybackControls />
    </div>
  )
}

export default MainLayout
