import { getContent } from "@/lib/db-content";
import { defaultContent } from "@/data/defaults";
import { d1Configured } from "@/lib/d1";
import { cloudinaryConfigured } from "@/lib/cloudinary";
import { ContentProvider } from "@/components/layout/ContentProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Tools } from "@/components/sections/Tools";
import { WhyWork } from "@/components/sections/WhyWork";
import { Social } from "@/components/sections/Social";
import { Contact } from "@/components/sections/Contact";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { LoginModal } from "@/components/admin/LoginModal";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default async function Home() {
  let content = defaultContent;
  try {
    content = await getContent();
  } catch {
    // fall back to defaults
  }

  return (
    <ContentProvider
      initial={content}
      backendStatus={{ d1: d1Configured, cloudinary: cloudinaryConfigured }}
    >
      <div className="grain relative flex min-h-screen flex-col bg-background">
        {/* Desktop custom cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10 flex-1">
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Process />
          <Tools />
          <WhyWork />
          <Social />
          <Contact />
        </main>

        {/* Footer sticks to bottom via flex-1 main */}
        <Footer />

        {/* Admin panel overlay (opened by double-clicking the logo) */}
        <AdminPanel />
        {/* Login modal (shown before admin if not authenticated) */}
        <LoginModal />
        {/* Floating WhatsApp button */}
        <WhatsAppButton />
      </div>
    </ContentProvider>
  );
}
