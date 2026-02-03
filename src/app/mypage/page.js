"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./mypage.module.css";

export default function MyPageEditor() {
  const { user } = useUser();
  const userId = user?.id;

  const [pages, setPages] = useState([]);
  const [currentPageTitle, setCurrentPageTitle] = useState("My First Page");
  const [images, setImages] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "/api/mypage";

  useEffect(() => {
    if (!userId) return;

    async function loadPages() {
      setLoading(true);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load pages");
        const data = await res.json();

        if (data.length > 0) {
          const page = data[0];
          setCurrentPageTitle(page.page_title);
          setImages(page.images || []);
          setTextBoxes(page.text_boxes || []);
        } else {
          setImages([]);
          setTextBoxes([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPages();
  }, [userId]);

  const savePage = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`${API_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageTitle: currentPageTitle,
          images,
          textBoxes,
        }),
      });

      if (res.ok) {
        alert("Page saved!");
      } else {
        const text = await res.text();
        console.error("Save failed:", text);
        alert("Error saving page");
      }
    } catch (err) {
      console.error("Save page error:", err);
      alert("Error saving page");
    }
  };

  const startImageDrag = (index) => {
    const move = (ev) => {
      setImages((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          x: ev.clientX - updated[index].width / 2,
          y: ev.clientY - updated[index].height / 2,
        };
        return updated;
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const startResize = (index, e) => {
    e.stopPropagation();
    const startX = e.clientX;

    setImages((prev) => {
      const updated = [...prev];
      const img = updated[index];
      if (!img.originalRatio) img.originalRatio = img.width / img.height;
      return updated;
    });

    const move = (ev) => {
      setImages((prev) => {
        const updated = [...prev];
        const img = updated[index];
        const dx = ev.clientX - startX;

        let newWidth = img.width + dx;
        let newHeight = newWidth / img.originalRatio;

        if (newWidth > 400) { newWidth = 400; newHeight = newWidth / img.originalRatio; }
        if (newHeight > 400) { newHeight = 400; newWidth = newHeight * img.originalRatio; }
        if (newWidth < 50) { newWidth = 50; newHeight = newWidth / img.originalRatio; }
        if (newHeight < 50) { newHeight = 50; newWidth = newHeight * img.originalRatio; }

        updated[index] = { ...img, width: newWidth, height: newHeight };
        return updated;
      });
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const startTextDrag = (index) => {
    const move = (ev) => {
      setTextBoxes((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], x: ev.clientX - 50, y: ev.clientY - 20 };
        return updated;
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const addImage = () => {
    if (!newImageUrl) return;
    setImages([...images, { url: newImageUrl, x: 100, y: 100, width: 150, height: 150, originalRatio: 1 }]);
    setNewImageUrl("");
  };

  const addTextBox = () => {
    if (!newText) return;
    setTextBoxes([...textBoxes, { text: newText, x: 150, y: 150 }]);
    setNewText("");
  };

  const deleteImage = (idx) => setImages(images.filter((_, i) => i !== idx));
  const deleteTextBox = (idx) => setTextBoxes(textBoxes.filter((_, i) => i !== idx));

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.controls}>
        <input
          value={currentPageTitle}
          onChange={(e) => setCurrentPageTitle(e.target.value)}
          placeholder="Page title"
        />
        <input
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="Image URL"
        />
        <button onClick={addImage}>Add Image</button>

        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Text"
        />
        <button onClick={addTextBox}>Add Text</button>

        <button onClick={savePage}>Save Page</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className={styles.workspace}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className={styles.draggableWrapper}
            style={{ left: img.x, top: img.y, width: img.width, height: img.height }}
          >
            <Image
              src={img.url}
              alt="User uploaded"
              width={img.width}
              height={img.height}
              style={{ objectFit: "cover" }}
              onMouseDown={() => startImageDrag(idx)}
            />
            <div className={styles.resizeHandle} onMouseDown={(e) => startResize(idx, e)} />
            <button className={styles.deleteBtn} onClick={() => deleteImage(idx)}>×</button>
          </div>
        ))}

        {textBoxes.map((tb, idx) => (
          <div
            key={idx}
            className={styles.textBox}
            style={{ left: tb.x, top: tb.y }}
            onMouseDown={() => startTextDrag(idx)}
          >
            <textarea
              value={tb.text}
              onChange={(e) => {
                const updated = [...textBoxes];
                updated[idx].text = e.target.value;
                setTextBoxes(updated);
              }}
              rows={1}
              style={{
                width: "200px",
                resize: "none",
                overflow: "hidden",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "16px",
                fontFamily: "inherit",
                whiteSpace: "pre-wrap",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            <button className={styles.deleteBtn} onClick={() => deleteTextBox(idx)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
