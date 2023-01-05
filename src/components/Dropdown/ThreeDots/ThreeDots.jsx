import React from "react";
import styles from "./ThreeDots.module.css";
import { useState } from "react";

export function ThreeDots({ item }) {
  const [open, setOpen] = useState(false);
  const menuRef = React.useRef();
  const dotsRef = React.useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== dotsRef.current) {
      setOpen(false);
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.contentDots}>
        <p onClick={() => setOpen(!open)} className={styles.dots} ref={dotsRef}>
          ...
        </p>
      </div>
      {open && (
        <div ref={menuRef}>
          <ul className={styles.contentList}>
            {item.map((menus) => {
              return (
                <li
                  key={menus}
                  value={menus}
                  className={styles.list}
                  onClick={() => setOpen(false)}
                >
                  <span>{menus}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
