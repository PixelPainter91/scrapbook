"use client";

import { useState, useEffect, useRef } from "react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const menuRef = useRef(null);
  const router = useRouter();

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
      
          <SignedOut>
            <li>
              <SignInButton />
            </li>
            <li>
              <SignUpButton />
            </li>
          </SignedOut>

          <SignedIn>
            <li className={styles.navItem}>
              <Link href="/home">Home</Link>
            </li>

            <li className={styles.navItem}>
              <Link href="/about">About</Link>
            </li>

            <li className={styles.navItem} ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                Profile
              </button>

              <ul
                className={`${styles.subMenu} ${
                  menuOpen ? styles.subMenuOpen : ""
                }`}
              >
                <li>
                
              <Link href="/mypage">mypage</Link>
            
                </li>

                <li>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setChatOpen(true);
                    }}
                  >
                    Chat
                  </button>
                </li>
              </ul>
            </li>

            <li>
              <UserButton />
            </li>
          </SignedIn>
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
              placeholder="Mock chat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className={styles.chatActions}>
              <button
                className={styles.cancel}
                onClick={() => setChatOpen(false)}
              >
                Cancel
              </button>
              <button className={styles.send} onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
