"use client";

import { useEffect, useState } from "react";
import ContactModal from "./ContactModal";

export default function BookingTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#book-call") {
        setIsOpen(true);
      }
    };

    // Check hash on initial load
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Clear URL hash cleanly without forcing a page reload
    if (window.location.hash === "#book-call") {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  return <ContactModal isOpen={isOpen} onClose={handleClose} />;
}
