"use client";

import React, { useEffect, useState } from "react";

const UNIT_CONVERSIONS: Record<string, number> = {
  m: 1,
  ft: 0.3048,
  cm: 0.01,
  in: 0.0254,
};

function toMeters(value: number, unit: string) {
  return value * (UNIT_CONVERSIONS[unit] ?? 1);
}

export default function Calculator() {
  const [scale, setScale] = useState<number>(1);
  const [currentShape, setCurrentShape] = useState("rectangle");
  const [length, setLength] = useState<string>("12");
  const [width, setWidth] = useState<string>("10");
  const [radius, setRadius] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [lengthUnit, setLengthUnit] = useState<string>("ft");

  const [tileLength, setTileLength] = useState<string>("24");
  const [tileWidth, setTileWidth] = useState<string>("24");
  const [tileUnit, setTileUnit] = useState<string>("in");

  const [wastage, setWastage] = useState<number>(10);
  const [groutGap, setGroutGap] = useState<number>(2);
  const [tilesPerBox, setTilesPerBox] = useState<number>(10);

  const [resultsVisible, setResultsVisible] = useState(false);
  const [calculationData, setCalculationData] = useState<any>(null);

  const [tilePrice, setTilePrice] = useState<string>("50");
  const [boxPrice, setBoxPrice] = useState<string>("");
  const [laborCost, setLaborCost] = useState<string>("5");
  const [adhesiveCost, setAdhesiveCost] = useState<string>("800");
  const [groutCost, setGroutCost] = useState<string>("500");
  const [currency, setCurrency] = useState<string>("PKR");

  const [pattern, setPattern] = useState<string>("straight");
  const [patternWastage, setPatternWastage] = useState<number>(5);

  const [rooms, setRooms] = useState<Array<{ length: string; width: string }>>([]);

  useEffect(() => {
    if (pattern === "straight") setPatternWastage(5);
    if (pattern === "diagonal") setPatternWastage(15);
    if (pattern === "herringbone") setPatternWastage(20);
    if (pattern === "basketweave") setPatternWastage(15);
  }, [pattern]);

  useEffect(() => {
    // add a default room for multi-room calculator
    if (rooms.length === 0) addRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDimensionInMeters(valueStr: string, unit: string) {
    const value = parseFloat(valueStr) || 0;
    return toMeters(value, unit);
  }

  function calculateAreaMeters() {
    let area = 0;
    switch (currentShape) {
      case "rectangle":
        area = getDimensionInMeters(length, lengthUnit) * getDimensionInMeters(width, lengthUnit);
        break;
      case "square":
        area = Math.pow(getDimensionInMeters(length, lengthUnit), 2);
        break;
      case "circle":
        area = Math.PI * Math.pow(getDimensionInMeters(radius, lengthUnit), 2);
        break;
      case "triangle":
        area = 0.5 * getDimensionInMeters(length, lengthUnit) * getDimensionInMeters(height, lengthUnit);
        break;
      case "lshape":
        // read lshape fields if present (not implemented as complex UI here)
        area = 0; // user can use multi-room instead
        break;
    }
    return area;
  }

  function calculateTiles() {
    const area = calculateAreaMeters();
    if (!area || area <= 0) {
      alert("Please enter valid room dimensions");
      return;
    }

    const tLen = getDimensionInMeters(tileLength, tileUnit);
    const tWid = getDimensionInMeters(tileWidth, tileUnit);
    if (!tLen || !tWid) {
      alert("Please enter valid tile dimensions");
      return;
    }
    const tileArea = tLen * tWid;
    const tilesNeeded = Math.ceil(area / tileArea);
    const tilesWithWast = Math.ceil(tilesNeeded * (1 + (wastage + patternWastage) / 100));
    const boxesNeeded = Math.ceil(tilesWithWast / tilesPerBox);

    const data = { area, tilesNeeded, tilesWithWast, boxesNeeded, tileArea, tLen, tWid };
    setCalculationData(data);
    setResultsVisible(true);
  }

  function calculateCost() {
    if (!calculationData) {
      alert("Please calculate tiles first!");
      return;
    }
    const box = parseFloat(boxPrice) || 0;
    const tPrice = parseFloat(tilePrice) || 0;
    const labor = parseFloat(laborCost) || 0;
    const adhesive = parseFloat(adhesiveCost) || 0;
    const grout = parseFloat(groutCost) || 0;

    const tileCost = box > 0 ? box * calculationData.boxesNeeded : tPrice * calculationData.tilesWithWast;
    const areaSqFt = calculationData.area * 10.7639;
    const totalLabor = labor * areaSqFt;
    const adhesiveBags = Math.ceil(areaSqFt / 100);
    const groutBags = Math.ceil(areaSqFt / 150);
    const materials = adhesiveBags * adhesive + groutBags * grout;
    const grandTotal = tileCost + totalLabor + materials;

    return { tileCost, totalLabor, materials, grandTotal, adhesiveBags, groutBags };
  }

  function calculateBorder() {
    if (!calculationData) {
      alert("Please calculate main tiles first!");
      return;
    }
    let perimeterFeet = 0;
    switch (currentShape) {
      case "rectangle":
      case "square":
        const L = getDimensionInMeters(length, lengthUnit) / UNIT_CONVERSIONS["ft"];
        const W = getDimensionInMeters(width, lengthUnit) / UNIT_CONVERSIONS["ft"];
        perimeterFeet = 2 * (L + W);
        break;
      case "circle":
        const r = getDimensionInMeters(radius, lengthUnit) / UNIT_CONVERSIONS["ft"];
        perimeterFeet = 2 * Math.PI * r;
        break;
      default:
        alert("Border calculation for this shape is approximate or unsupported.");
        return;
    }
    const borderTileSizeFeet = (parseFloat((document.getElementById("border-tile-size") as HTMLInputElement)?.value || "6") || 6) / 12;
    const borderWidthVal = parseInt((document.getElementById("border-width") as HTMLInputElement)?.value || "1") || 1;
    const borderTilesNeeded = Math.ceil((perimeterFeet / borderTileSizeFeet) * borderWidthVal);
    const borderWithWastage = Math.ceil(borderTilesNeeded * 1.1);
    return { borderTilesNeeded, borderWithWastage, perimeterFeet };
  }

  function addRoom() {
    setRooms((r) => [...r, { length: "", width: "" }]);
  }

  function removeRoom(index: number) {
    setRooms((r) => r.filter((_, i) => i !== index));
  }

  function calculateMultiRoom() {
    if (rooms.length === 0) {
      alert("Please add rooms first!");
      return;
    }
    let totalSqFt = 0;
    const roomDetails: Array<any> = [];
    rooms.forEach((room) => {
      const l = parseFloat(room.length) || 0;
      const w = parseFloat(room.width) || 0;
      const area = l * w; // area in sq ft (assume user enters ft here)
      totalSqFt += area;
      roomDetails.push({ l, w, area });
    });
    const totalAreaMeters = totalSqFt * UNIT_CONVERSIONS["ft"] * UNIT_CONVERSIONS["ft"];
    const tLen = getDimensionInMeters(tileLength, tileUnit);
    const tWid = getDimensionInMeters(tileWidth, tileUnit);
    const tileArea = tLen * tWid;
    if (!tileArea) return alert("Please enter tile sizes first.");
    const tilesNeeded = Math.ceil(totalAreaMeters / tileArea);
    const tilesWithWast = Math.ceil(tilesNeeded * (1 + wastage / 100));
    const boxes = Math.ceil(tilesWithWast / tilesPerBox);
    return { totalSqFt, tilesNeeded, tilesWithWast, boxes, roomDetails };
  }

  function saveCalculation() {
    const data = {
      currentShape,
      length,
      width,
      radius,
      height,
      lengthUnit,
      tileLength,
      tileWidth,
      tileUnit,
      wastage,
      groutGap,
      tilesPerBox,
      tilePrice,
      boxPrice,
      laborCost,
      adhesiveCost,
      groutCost,
      rooms,
      savedDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tile-calculation.json";
    a.click();
  }

  function loadCalculation(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(String(e.target?.result));
        setCurrentShape(data.currentShape || "rectangle");
        setLength(data.length || "");
        setWidth(data.width || "");
        setRadius(data.radius || "");
        setHeight(data.height || "");
        setLengthUnit(data.lengthUnit || "ft");
        setTileLength(data.tileLength || "24");
        setTileWidth(data.tileWidth || "24");
        setTileUnit(data.tileUnit || "in");
        setWastage(data.wastage ?? 10);
        setGroutGap(data.groutGap ?? 2);
        setTilesPerBox(data.tilesPerBox ?? 10);
        setTilePrice(data.tilePrice || "50");
        setBoxPrice(data.boxPrice || "");
        setLaborCost(data.laborCost || "5");
        setAdhesiveCost(data.adhesiveCost || "800");
        setGroutCost(data.groutCost || "500");
        setRooms(data.rooms || []);
        alert("Project loaded successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to load project file");
      }
    };
    reader.readAsText(file);
  }

  function exportToCSV() {
    if (!calculationData) return alert("Calculate first");
    const lines = [
      ["Item", "Quantity", "Details"],
      ["Total Area", `${calculationData.area.toFixed(2)} m²`, ""],
      ["Tiles Needed", calculationData.tilesNeeded.toString(), "without wastage"],
      ["Tiles with Wastage", calculationData.tilesWithWast.toString(), "recommended"],
      ["Boxes Needed", calculationData.boxesNeeded.toString(), ""],
    ];
    const csv = lines.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tile-calculation.csv";
    a.click();
  }

  function shareCalculation() {
    if (!calculationData) return alert("Calculate first");
    const text = `Tile Calculation:\nArea: ${calculationData.area.toFixed(2)} m²\nTiles (waste): ${calculationData.tilesWithWast}`;
    if (navigator.share) {
      navigator.share({ title: "Tile Calculation", text }).then(() => alert("Shared"));
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard"));
    }
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-lg">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center', overflow: 'visible' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary dark:text-white">Premium Tile Calculator Pro</h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">PRO</div>
      </div>

      {/* Mobile-only slider to adjust calculator scale */}
      <div className="block md:hidden mt-3 mb-4 sticky top-3 bg-transparent z-50">
        <div className="rounded-md bg-white/90 dark:bg-gray-900/90 p-2 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Adjust view</label>
            <div className="text-sm font-semibold">{Math.round(scale * 100)}%</div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <input
              aria-label="Adjust calculator scale"
              type="range"
              min={70}
              max={115}
              value={Math.round(scale * 100)}
              onChange={(e) => setScale(Number(e.target.value) / 100)}
              className="w-full"
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Tip: reduce scale if content overflows on small screens.</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-2 flex-wrap">
          {[
            ["rectangle", "Rectangle"],
            ["square", "Square"],
            ["circle", "Circle"],
            ["triangle", "Triangle"],
            ["lshape", "L-Shape"],
          ].map(([key, label]) => (
            <button
              key={String(key)}
              onClick={() => setCurrentShape(String(key))}
              className={`px-3 py-2 rounded border ${currentShape === key ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 dark:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Length</label>
            <div className="flex gap-2">
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
              <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                <option value="m">Meters</option>
                <option value="ft">Feet</option>
                <option value="cm">Centimeters</option>
                <option value="in">Inches</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Width</label>
            <div className="flex gap-2">
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Tile Size</label>
            <div className="flex gap-2">
              <input type="number" value={tileLength} onChange={(e) => setTileLength(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
              <input type="number" value={tileWidth} onChange={(e) => setTileWidth(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
              <select value={tileUnit} onChange={(e) => setTileUnit(e.target.value)} className="p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
                <option value="in">Inches</option>
                <option value="cm">Centimeters</option>
                <option value="m">Meters</option>
                <option value="ft">Feet</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Wastage (%)</label>
            <input type="range" min={0} max={30} value={wastage} onChange={(e) => setWastage(parseInt(e.target.value))} />
            <div className="text-sm mt-2">{wastage}% + pattern {patternWastage}%</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Tiles per box</label>
            <input type="number" value={tilesPerBox} onChange={(e) => setTilesPerBox(parseInt(e.target.value || "0"))} className="p-2 border rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded mb-4">
            <label className="block font-semibold mb-2">Pattern</label>
            <div className="flex gap-2 flex-wrap">
              {[
                ["straight", "Straight"],
                ["diagonal", "Diagonal"],
                ["herringbone", "Herringbone"],
                ["basketweave", "Basketweave"],
              ].map(([k, label]) => (
                <button key={k} onClick={() => setPattern(String(k))} className={`px-2 py-1 rounded border ${pattern === k ? "bg-primary text-white" : "bg-white dark:bg-gray-800 dark:text-white"}`}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={calculateTiles} className="px-4 py-2 rounded bg-accent text-primary font-bold">Calculate Tiles Now</button>
        <button onClick={saveCalculation} className="px-4 py-2 rounded border">Save Project</button>
        <label className="px-4 py-2 rounded border cursor-pointer">
          Load
          <input type="file" accept=".json" onChange={(e) => loadCalculation(e.target.files?.[0] ?? null)} className="hidden" />
        </label>
        <button onClick={() => { setResultsVisible(false); setCalculationData(null); }} className="px-4 py-2 rounded border">Reset</button>
      </div>

      {resultsVisible && calculationData && (
        <div className="mt-6 bg-gradient-to-r from-primary to-blue-500 text-white p-6 rounded-lg dark:from-primary/80 dark:to-blue-500/80">
          <h3 className="text-xl font-bold mb-2">Calculation Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/10 rounded">
              <div className="text-sm opacity-80">Total Area</div>
              <div className="text-2xl font-black">{calculationData.area.toFixed(2)} m² ({(calculationData.area*10.7639).toFixed(2)} sq ft)</div>
            </div>
            <div className="p-4 bg-white/10 rounded">
              <div className="text-sm opacity-80">Tiles Needed</div>
              <div className="text-2xl font-black">{calculationData.tilesNeeded.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white/10 rounded">
              <div className="text-small opacity-80">With Wastage</div>
              <div className="text-2xl font-black">{calculationData.tilesWithWast.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-white/10 rounded">
              <div className="text-sm opacity-80">Boxes Needed</div>
              <div className="text-2xl font-black">{calculationData.boxesNeeded.toLocaleString()}</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button onClick={() => { const cost = calculateCost(); if (cost) alert(`Grand total: ${cost.grandTotal}`); }} className="px-3 py-2 bg-white dark:bg-gray-700 text-primary dark:text-white rounded">Quick Cost</button>
            <button onClick={exportToCSV} className="px-3 py-2 bg-white dark:bg-gray-700 text-primary dark:text-white rounded">Export CSV</button>
            <button onClick={shareCalculation} className="px-3 py-2 bg-white dark:bg-gray-700 text-primary dark:text-white rounded">Share</button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h4 className="font-bold mb-2">Multi-Room</h4>
        <div className="space-y-2">
          {rooms.map((r, i) => (
            <div key={i} className="flex gap-2">
              <input placeholder="Length (ft)" value={r.length} onChange={(e) => setRooms((rs)=>rs.map((it,idx)=>idx===i?{...it,length:e.target.value}:it))} className="p-2 border rounded flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
              <input placeholder="Width (ft)" value={r.width} onChange={(e) => setRooms((rs)=>rs.map((it,idx)=>idx===i?{...it,width:e.target.value}:it))} className="p-2 border rounded flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700" />
              <button onClick={()=>removeRoom(i)} className="px-3 rounded bg-red-500 text-white">Remove</button>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={addRoom} className="px-3 py-2 rounded border">Add Room</button>
          <button onClick={()=>{ const res = calculateMultiRoom(); if(res) alert(`Tiles: ${res.tilesWithWast}`); }} className="px-3 py-2 rounded border">Calc Multi</button>
        </div>
      </div>
      </div>
    </div>
  );
}
