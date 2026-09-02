'use client';

import { useState, useRef } from 'react';
import { Download, Copy, Check, Shuffle } from 'lucide-react';
import {
  BuildShapeMarkupProps,
  ShapeType,
} from '@/interfaces/tools/svg.interfaces';
import { PRESET_COLORS, SHAPES } from '@/constant/tools';
import { starPoints } from '@/utils/tools/starPoints';
import { polygonPoints } from '@/utils/tools/polygonPoints';
import { isValidHex } from '@/utils/tools/isValidHex';
import { trianglePoints } from '@/utils/tools/trianglePoints';
import { normalizeHex } from '@/utils/tools/normalizeHex';

function buildShapeMarkup({
  shape,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  cornerRadius,
  sides,
}: BuildShapeMarkupProps): string {
  const padding = Math.max(strokeWidth, 2);
  const w = width;
  const h = height;
  const cx = w / 2;
  const cy = h / 2;

  switch (shape) {
    case 'Rectangle': {
      const x = padding / 2;
      const y = padding / 2;
      const rw = w - padding;
      const rh = h - padding;
      return `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" rx="${cornerRadius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }
    case 'Circle': {
      const r = Math.min(w, h) / 2 - padding / 2;
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
    }
    case 'Triangle': {
      const r = Math.min(w, h) / 2 - padding / 2;
      const pts = trianglePoints(cx, cy, r);
      return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />`;
    }
    case 'Star': {
      const outerR = Math.min(w, h) / 2 - padding / 2;
      const innerR = outerR * 0.45;
      const pts = starPoints(cx, cy, outerR, innerR, 5);
      return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />`;
    }
    case 'Polygon': {
      const r = Math.min(w, h) / 2 - padding / 2;
      const pts = polygonPoints(cx, cy, r, sides);
      return `<polygon points="${pts}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />`;
    }
    default:
      return '';
  }
}

export default function ShapeGeneratorPage() {
  const [shape, setShape] = useState<ShapeType>('Rectangle');
  const [width, setWidth] = useState<number>(200);
  const [height, setHeight] = useState<number>(200);
  const [fill, setFill] = useState<string>('#00d4ff');
  const [fillInput, setFillInput] = useState<string>('#00d4ff');
  const [fillError, setFillError] = useState<boolean>(false);
  const [stroke, setStroke] = useState<string>('#0a0a0a');
  const [strokeInput, setStrokeInput] = useState<string>('#0a0a0a');
  const [strokeError, setStrokeError] = useState<boolean>(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [cornerRadius, setCornerRadius] = useState<number>(16);
  const [sides, setSides] = useState<number>(6);
  const [rotation, setRotation] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const svgPreviewRef = useRef<SVGSVGElement | null>(null);

  const innerMarkup = buildShapeMarkup({
    shape,
    width,
    height,
    fill,
    stroke,
    strokeWidth,
    rotation,
    cornerRadius,
    sides,
  });

  const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n  <g transform="rotate(${rotation} ${width / 2} ${height / 2})">\n    ${innerMarkup}\n  </g>\n</svg>`;

  function handleFillChange(value: string): void {
    setFillInput(value);
    if (isValidHex(value)) {
      setFill(normalizeHex(value));
      setFillError(false);
    } else {
      setFillError(true);
    }
  }

  function handleStrokeChange(value: string): void {
    setStrokeInput(value);
    if (isValidHex(value)) {
      setStroke(normalizeHex(value));
      setStrokeError(false);
    } else {
      setStrokeError(true);
    }
  }

  function randomizeColors() {
    const rand = () =>
      '#' +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0');
    const f = rand();
    setFill(f);
    setFillInput(f);
    setFillError(false);
  }

  function handleDownload() {
    const blob = new Blob([fullSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${shape.toLowerCase()}-${width}x${height}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(fullSvg);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {}
  }

  return (
    <div
      className="constainer mx-auto"
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(1200px 600px at 50% -10%, rgba(0,212,255,0.10), transparent 60%), #07090c',
        color: '#e7eef2',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{ margin: '0 auto', padding: '64px 20px' }}
        className="flex flex-col"
      >
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#00d4ff',
              textShadow: '0 0 24px rgba(0,212,255,0.45)',
            }}
          >
            SVG Generator
          </h1>
          <p style={{ marginTop: 8, color: '#8a98a3', fontSize: 15 }}>
            Create and customize SVG shapes instantly — any hex color, any size.
          </p>
        </div>

        {/* Main layout */}
        <div
          style={{
            display: 'grid',
            gap: 24,
            gridTemplateColumns: '380px 1fr',
          }}
          className="svg-gen-grid"
        >
          {/* Controls */}
          <div
            style={{
              border: '1px solid rgba(0,212,255,0.25)',
              background: '#0d1117',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              Shape Settings
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Shape */}
              <Field label="Shape">
                <select
                  value={shape}
                  onChange={(e) => setShape(e.target.value as ShapeType)}
                  style={selectStyle}
                >
                  {SHAPES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Sides (only for Polygon) */}
              {shape === 'Polygon' && (
                <Field label={`Sides: ${sides}`}>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={sides}
                    onChange={(e) => setSides(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </Field>
              )}

              {/* Width / Height */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <Field label="Width">
                  <input
                    type="number"
                    min={10}
                    max={800}
                    value={width}
                    onChange={(e) =>
                      setWidth(clampNum(e.target.value, 10, 800, width))
                    }
                    style={inputStyle}
                  />
                </Field>
                <Field label="Height">
                  <input
                    type="number"
                    min={10}
                    max={800}
                    value={height}
                    onChange={(e) =>
                      setHeight(clampNum(e.target.value, 10, 800, height))
                    }
                    style={inputStyle}
                  />
                </Field>
              </div>

              {/* Corner radius for rectangle */}
              {shape === 'Rectangle' && (
                <Field label={`Corner Radius: ${cornerRadius}px`}>
                  <input
                    type="range"
                    min={0}
                    max={Math.min(width, height) / 2}
                    value={cornerRadius}
                    onChange={(e) => setCornerRadius(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </Field>
              )}

              {/* Rotation */}
              <Field label={`Rotation: ${rotation}°`}>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </Field>

              {/* Fill Color */}
              <Field label="Fill Color">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={fill}
                    onChange={(e) => {
                      setFill(e.target.value);
                      setFillInput(e.target.value);
                      setFillError(false);
                    }}
                    style={swatchStyle}
                    aria-label="Pick fill color"
                  />
                  <input
                    type="text"
                    value={fillInput}
                    onChange={(e) => handleFillChange(e.target.value)}
                    placeholder="#00d4ff"
                    style={{
                      ...inputStyle,
                      flex: 1,
                      borderColor: fillError
                        ? '#f43f5e'
                        : 'rgba(255,255,255,0.12)',
                      fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                      textTransform: 'lowercase',
                    }}
                  />
                  <button
                    type="button"
                    onClick={randomizeColors}
                    title="Random color"
                    style={iconButtonStyle}
                  >
                    <Shuffle size={16} />
                  </button>
                </div>
                {fillError && (
                  <p
                    style={{
                      color: '#f43f5e',
                      fontSize: 12,
                      marginTop: 6,
                      marginBottom: 0,
                    }}
                  >
                    Enter a valid hex code, like #00d4ff or #0df.
                  </p>
                )}
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setFill(c);
                        setFillInput(c);
                        setFillError(false);
                      }}
                      title={c}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: c,
                        border:
                          fill.toLowerCase() === c
                            ? '2px solid #00d4ff'
                            : '1px solid rgba(255,255,255,0.2)',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </Field>

              {/* Stroke Color */}
              <Field label="Stroke Color">
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={stroke}
                    onChange={(e) => {
                      setStroke(e.target.value);
                      setStrokeInput(e.target.value);
                      setStrokeError(false);
                    }}
                    style={swatchStyle}
                    aria-label="Pick stroke color"
                  />
                  <input
                    type="text"
                    value={strokeInput}
                    onChange={(e) => handleStrokeChange(e.target.value)}
                    placeholder="#0a0a0a"
                    style={{
                      ...inputStyle,
                      flex: 1,
                      borderColor: strokeError
                        ? '#f43f5e'
                        : 'rgba(255,255,255,0.12)',
                      fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                      textTransform: 'lowercase',
                    }}
                  />
                </div>
                {strokeError && (
                  <p
                    style={{
                      color: '#f43f5e',
                      fontSize: 12,
                      marginTop: 6,
                      marginBottom: 0,
                    }}
                  >
                    Enter a valid hex code, like #0a0a0a or #000.
                  </p>
                )}
              </Field>

              {/* Stroke Width */}
              <Field label={`Stroke Width: ${strokeWidth}px`}>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </Field>

              {/* Actions */}
              <button
                type="button"
                onClick={handleDownload}
                style={primaryButtonStyle}
              >
                <Download size={16} />
                Download SVG
              </button>

              <button
                type="button"
                onClick={handleCopyCode}
                style={secondaryButtonStyle}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy SVG Code'}
              </button>
            </div>
          </div>

          {/* Preview */}
          <div
            style={{
              border: '1px solid rgba(0,212,255,0.25)',
              background: '#0d1117',
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>
                Live Preview
              </h2>
              <span
                style={{
                  background: 'rgba(0,212,255,0.12)',
                  color: '#00d4ff',
                  borderRadius: 999,
                  padding: '4px 12px',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {width} × {height}
              </span>
            </div>

            <div
              style={{
                background:
                  'repeating-conic-gradient(#11161c 0% 25%, #0b0f14 0% 50%) 50% / 20px 20px',
                border: '1px dashed rgba(255,255,255,0.15)',
                borderRadius: 12,
                minHeight: 420,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                overflow: 'auto',
                padding: 24,
              }}
            >
              <svg
                ref={svgPreviewRef}
                width={Math.min(width, 480)}
                height={Math.min(height, 420)}
                viewBox={`0 0 ${width} ${height}`}
                style={{
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                dangerouslySetInnerHTML={{
                  __html: `<g transform="rotate(${rotation} ${width / 2} ${height / 2})">${innerMarkup}</g>`,
                }}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 12, color: '#8a98a3', marginBottom: 6 }}>
                SVG Code
              </p>
              <pre
                style={{
                  background: '#05070a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: 14,
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: '#9fe9ff',
                  overflowX: 'auto',
                  margin: 0,
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                }}
              >
                {fullSvg}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: 8,
          fontSize: 13,
          fontWeight: 500,
          color: '#c5cdd3',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function clampNum(
  value: string,
  min: number,
  max: number,
  fallback: number
): number {
  const n = Number(value);

  if (Number.isNaN(n)) return fallback;

  return Math.min(max, Math.max(min, n));
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#05070a',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 10,
  padding: '10px 12px',
  color: '#e7eef2',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box' as const,
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
};

const swatchStyle = {
  height: 40,
  width: 48,
  flexShrink: 0,
  cursor: 'pointer',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'transparent',
};

const primaryButtonStyle = {
  width: '100%',
  background: '#00d4ff',
  color: '#06222b',
  border: 'none',
  borderRadius: 12,
  padding: '12px 0',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  boxShadow: '0 0 0 rgba(0,212,255,0)',
  transition: 'box-shadow 0.2s ease, transform 0.15s ease',
};

const secondaryButtonStyle = {
  width: '100%',
  background: 'transparent',
  color: '#00d4ff',
  border: '1px solid #00d4ff',
  borderRadius: 12,
  padding: '12px 0',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  transition: 'background 0.2s ease, color 0.2s ease',
};

const iconButtonStyle = {
  height: 40,
  width: 40,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#05070a',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: '#e7eef2',
  cursor: 'pointer',
};
