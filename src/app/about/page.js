"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { useRouter } from "next/navigation";
import styles from "./about.module.css";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.hero}>
        <h1>Welcome to Scrapbook!</h1>
        <p>Design your pages. Connect with friends. Make it yours.</p>
      </div>

      <div className={styles.section}>
        <h2>What is Scrapbook?</h2>
        <p>
          A social media app where you can design your own pages like a real scrapbook. 
          Drag images around, add text anywhere, and save your creations. It&apos;s your space 
          to express yourself however you want.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Features</h2>
        <ul className={styles.featureList}>
          <li>Drag &amp; drop images and text anywhere</li>
          <li>Resize images to fit your style</li>
          <li>Save your pages and come back anytime</li>
          <li>Chat with friends</li>
          <li>Create multiple pages</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>FAQ</h2>
        <Accordion.Root type="single" collapsible className={styles.accordion}>
          <Accordion.Item value="item-1" className={styles.accordionItem}>
            <Accordion.Trigger className={styles.accordionTrigger}>
              Is it free?
              <span className={styles.chevron}>▼</span>
            </Accordion.Trigger>
            <Accordion.Content className={styles.accordionContent}>
              Yep, completely free!
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-2" className={styles.accordionItem}>
            <Accordion.Trigger className={styles.accordionTrigger}>
              How do I add images?
              <span className={styles.chevron}>▼</span>
            </Accordion.Trigger>
            <Accordion.Content className={styles.accordionContent}>
              Just paste an image URL in the editor and click &quot;Add Image&quot;. You can then 
              drag it around and resize it.
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="item-3" className={styles.accordionItem}>
            <Accordion.Trigger className={styles.accordionTrigger}>
              Does my work auto-save?
              <span className={styles.chevron}>▼</span>
            </Accordion.Trigger>
            <Accordion.Content className={styles.accordionContent}>
              Not automatically, but just click &quot;Save Page&quot; whenever you want to save 
              your changes.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>

      <div className={styles.cta}>
        <button onClick={() => router.push("/mypage")}>
          Start Creating
        </button>
      </div>
    </div>
  );
}