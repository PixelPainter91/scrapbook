"use client";

import { useState, useEffect, useRef } from "react";
import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const menuRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    console.log("Message sent:", message);
    setMessage("");
    setChatOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h2 className={styles.logo}>Scrapbook</h2>

        <ul>
          <li className={styles.navItem}>
            <Link href="/home">Home</Link>
          </li>

          <li className={styles.navItem}>
            <Link href="/about">About</Link>
          </li>

          <li className={styles.navItem} ref={menuRef}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
                Profile
            </button>

            <ul
  className={`${styles.subMenu} ${menuOpen ? styles.subMenuOpen : ""}`}
  role="menu"
>
    <li role="menuitem"> 
            <Link href="/mypage">My Page</Link>
          </li>


              <li role="menuitem">
                <button
                  className={styles.chatBtn}
                  onClick={() => {
                    setMenuOpen(false);
                    setChatOpen(true);
                  }}
                >
                  Chat
                </button>
              </li>
              <li role="menuitem"><a href="#">2</a></li>
              <li role="menuitem"><a href="#">3</a></li>
              <li role="menuitem"><a href="#">Settings</a></li>
            </ul>
          </li>

          <li>
            <SignedOut>
            <SignInButton/>
            <SignUpButton/>

        </SignedOut>
        
        <SignedIn>
            <UserButton/>
        </SignedIn>
          </li>
        </ul>
      </nav>

      {chatOpen && (
        <div
          className={styles.chatOverlay}
          onClick={() => setChatOpen(false)}
        >
          <div
            className={styles.chatModal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Chat</h3>

            <textarea
              placeholder="Mock Social Messaging box..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            <div className={styles.chatActions}>
              <button
                className={styles.cancel}
                onClick={() => setChatOpen(false)}
              >
                Cancel
              </button>
              <button
                className={styles.send}
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}