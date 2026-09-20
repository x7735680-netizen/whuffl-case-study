import { useCallback, useEffect, useRef, useState } from "react";
import { langPair } from "../lib/lang.js";

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

export default function JourneyMapViewer({ src, alt, openLabel, note }) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const stageRef = useRef(null);
  const pointerRef = useRef(null);
  const lastPinchRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  const handleWheel = (e) => {
    if (!open) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0025;
    setScale((s) => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s + delta)));
  };

  const handlePointerDown = (e) => {
    if (!open) return;
    if (e.pointerType === "touch") return; // pinch handled separately
    pointerRef.current = { x: e.clientX, y: e.clientY, tx, ty };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e) => {
    if (!open || !pointerRef.current) return;
    const dx = e.clientX - pointerRef.current.x;
    const dy = e.clientY - pointerRef.current.y;
    setTx(pointerRef.current.tx + dx);
    setTy(pointerRef.current.ty + dy);
  };
  const handlePointerUp = (e) => {
    if (!open) return;
    pointerRef.current = null;
    if (e.currentTarget?.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleTouchStart = (e) => {
    if (!open) return;
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastPinchRef.current = { distance: Math.hypot(dx, dy), scale };
    }
  };
  const handleTouchMove = (e) => {
    if (!open || e.touches.length !== 2 || !lastPinchRef.current) return;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const distance = Math.hypot(dx, dy);
    const ratio = distance / lastPinchRef.current.distance;
    setScale(Math.max(MIN_SCALE, Math.min(MAX_SCALE, lastPinchRef.current.scale * ratio)));
  };
  const handleTouchEnd = () => {
    lastPinchRef.current = null;
  };

  const reset = () => {
    setScale(1);
    setTx(0);
    setTy(0);
  };

  const zoomIn  = () => setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP));
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP));

  return (
    <>
      <figure className="journey-frame">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="journey-img"
          onClick={() => setOpen(true)}
        />
        <figcaption className="journey-caption">
          <span className="journey-caption-text">
            {langPair({ en: "User journey map — full export.", zh: "用户旅程图 — 完整导出。" })}
          </span>
          <button
            type="button"
            className="journey-open"
            onClick={() => setOpen(true)}
          >
            {langPair(openLabel ?? { en: "View full journey", zh: "放大查看" })}
          </button>
        </figcaption>
      </figure>

      {open ? (
        <div
          className="journey-modal"
          role="dialog"
          aria-modal="true"
          aria-label={langPair({ en: "Journey map viewer", zh: "旅程图查看器" })}
        >
          <div className="journey-modal-backdrop" onClick={close} />
          <div
            className="journey-modal-stage"
            ref={stageRef}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: "none" }}
          >
            <img
              src={src}
              alt={alt}
              className="journey-modal-img"
              draggable="false"
              style={{
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transformOrigin: "center center",
              }}
            />
          </div>
          <div className="journey-modal-toolbar" role="toolbar" aria-label="Zoom controls">
            <button type="button" className="journey-tool" onClick={zoomOut} aria-label="Zoom out">−</button>
            <span className="journey-tool-scale" aria-live="polite">{Math.round(scale * 100)}%</span>
            <button type="button" className="journey-tool" onClick={zoomIn} aria-label="Zoom in">+</button>
            <button type="button" className="journey-tool" onClick={reset}>
              {langPair({ en: "Reset", zh: "重置" })}
            </button>
            <button type="button" className="journey-tool journey-tool--close" onClick={close} aria-label="Close">
              {langPair({ en: "Close", zh: "关闭" })}
            </button>
          </div>
        </div>
      ) : null}

      {note ? <p className="journey-note">{langPair(note)}</p> : null}
    </>
  );
}
