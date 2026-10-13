"use client";

import { useEffect, useState } from "react";
import CheckoutModal from "./CheckoutModal";

export default function BookingTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#lock-pricing") {
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
    if (window.location.hash === "#lock-pricing") {
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  return (
    <CheckoutModal
      isOpen={isOpen}
      onClose={handleClose}
      nicheName="Founding Member"
      planTitle="Founding Member Partner"
      price="$97"
      period="mo"
    />
  );
}
