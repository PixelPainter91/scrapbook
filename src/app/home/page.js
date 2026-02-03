"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Homepage() {
  const textVariants = {
  hidden: {
    opacity: 0,
    x: 150, 
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

  return (
    <div className="relative min-h-screen">
  
  <div
    className="absolute inset-0 text-yellow-400 "
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1615826932727-ed9f182ac67e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />

 

  
  <div className="relative z-10 h-screen flex items-center px-6 md:px-16">
  <motion.div
    variants={textVariants}
    initial="hidden"
    animate="show"
    className="ml-auto max-w-xl text-right"
  >
    
    <div className="glass">
      <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-black">
        Scrapbook
      </h2>

      <p className="text-lg md:text-2xl mb-6 text-black">
        Discover hidden gems around the world, share your adventures, and
        connect with fellow travelers.
      </p>

      <Link
        href="/mypage"
        className="inline-block px-6 py-3 bg-yellow-400/80 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:scale-105"
      >
        Create Your Page!
      </Link>
    </div>
  </motion.div>
</div>

</div>
  )};