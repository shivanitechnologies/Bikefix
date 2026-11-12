/**
 * BIKEFIX – Workshop Pricing & Estimation Data Module
 * Ride Smooth. Travel Happy.
 */

export const PRICING_PLANS = {
  basic: {
    name: "Quick Tune / Safety Inspection",
    motorcycle: 399,
    bicycle: 199,
    turnaround: "30–45 Minutes",
    features: [
      "20-Point Multi-Point Safety Inspection",
      "Tyre Pressure & Tread Depth Vernier Check",
      "Brake Cable & Lever Modulation Check",
      "Chain Sag Inspection & Surface Lubrication",
      "Digital Workshop Inspection Sheet via SMS"
    ]
  },
  standard: {
    name: "Standard Maintenance Service",
    motorcycle: 899,
    bicycle: 499,
    popular: true,
    turnaround: "2–3 Hours",
    features: [
      "Everything in Quick Tune Package",
      "Ultrasonic Chain Solvent Degrease & Bath",
      "Brake Caliper Ultrasonic Cleanse & Pad Deglaze",
      "Derailleur / Gear Indexing Calibration",
      "Control Cable Tensioning & Lubrication",
      "Complimentary High-Pressure Foam Bike Wash"
    ]
  },
  complete: {
    name: "Master Overhaul & Performance Reset",
    motorcycle: 1999,
    bicycle: 1199,
    turnaround: "Same-Day (5–6 Hours)",
    features: [
      "Everything in Standard Maintenance",
      "Full Hydraulic DOT / Mineral Oil Fluid Flush",
      "Sub-Millimeter Wheel Truing (Dial Indicator)",
      "Bearing Race Inspection & High-Speed Grease Repack",
      "Engine Valve Lash / Di2 Electronic Alignment",
      "Comprehensive Road Test & 90-Day Warranty"
    ]
  }
};

export const COMMON_REPAIR_RATES = [
  { item: "Puncture Fix (Tubeless Mushroom Plug)", motorcycle: "₹120", bicycle: "₹80" },
  { item: "Inner Tube Replacement (Excl. Part)", motorcycle: "₹180", bicycle: "₹120" },
  { item: "Chain Cleaning & PTFE Hot Waxing", motorcycle: "₹350", bicycle: "₹250" },
  { item: "Brake Pad Replacement (Per Wheel)", motorcycle: "₹220", bicycle: "₹150" },
  { item: "Hydraulic Brake Bleed & Fluid Flush", motorcycle: "₹450", bicycle: "₹350" },
  { item: "Wheel Truing & Tension Balance (Per Wheel)", motorcycle: "₹500", bicycle: "₹350" },
  { item: "Fork Oil & Seal Overhaul", motorcycle: "₹1,200", bicycle: "₹850" },
  { item: "Complete Engine Oil Flush & Filter Install", motorcycle: "₹300", bicycle: "N/A" }
];

if (typeof window !== "undefined") {
  window.PRICING_PLANS = PRICING_PLANS;
  window.COMMON_REPAIR_RATES = COMMON_REPAIR_RATES;
}

