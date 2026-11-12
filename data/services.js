/**
 * BIKEFIX – Workshop Services Data Module
 * Ride Smooth. Travel Happy.
 */

export const WORKSHOP_SERVICES = {
  motorcycle: [
    {
      id: "moto-engine",
      title: "Precision Engine Diagnostic & Care",
      summary: "Full computerized ECU diagnostic scan, valve clearance lash measurement, spark plug ignition test, and synthetic oil replacement.",
      duration: "90–120 mins",
      warranty: "90 Days / 2,000 km",
      startingPrice: 1299,
      image: "assets/images/services/moto-engine.jpg",
      checklist: [
        "Digital OBD-II diagnostic read for active error codes",
        "Tappet & valve lash clearance check with feeler gauges",
        "Synthetic engine oil and high-flow oil filter replacement",
        "Spark plug gap verification and electrode cleaning",
        "Throttle body cleaning and idle RPM calibration"
      ]
    },
    {
      id: "moto-brakes",
      title: "Hydraulic Brake Overhaul & Caliper Service",
      summary: "DOT 4/5.1 vacuum fluid bleed, caliper piston ultrasonic ultrasonic cleanse, rotor runout dial indicator truing, and organic/sintered pad replacement.",
      duration: "45–60 mins",
      warranty: "60 Days / 1,500 km",
      startingPrice: 649,
      image: "assets/images/services/moto-brakes.jpg",
      checklist: [
        "Dual-line vacuum fluid bleed and reservoir flush",
        "Caliper slide pins deglazed and high-temp silicone lubed",
        "Pad thickness measurement against minimum 1.5mm safety limit",
        "Brake lever travel and hydraulic pressure threshold check"
      ]
    },
    {
      id: "moto-chain",
      title: "Drive Chain Ultrasonic Degrease & Tensioning",
      summary: "High-pressure solvent degreasing, roller elongation measurement, laser wheel alignment, and heavy-duty PTFE synthetic wax lubrication.",
      duration: "30–40 mins",
      warranty: "30 Days / 800 km",
      startingPrice: 399,
      image: "assets/images/services/moto-chain.jpg",
      checklist: [
        "Chain sag measured against swingarm factory tolerances",
        "Ultrasonic solvent tank immersion to strip grit and grit",
        "Laser alignment of rear axle and sprocket teeth",
        "High-adhesion synthetic chain wax application"
      ]
    },
    {
      id: "moto-tyres",
      title: "Tyre Inspection, Dynamic Balancing & Puncture Fix",
      summary: "Tread depth vernier caliper check, high-speed computerized wheel balancing, mushroom plug tubeless repair, and air pressure balancing.",
      duration: "30 mins",
      warranty: "30 Days",
      startingPrice: 349,
      image: "assets/images/services/moto-tyres.jpg",
      checklist: [
        "Internal patch and vulcanized mushroom puncture repair",
        "Dynamic spin balancing to eliminate handlebar wobble",
        "Valve stem inspection and airtight brass core replacement"
      ]
    }
  ],
  bicycle: [
    {
      id: "bike-gears",
      title: "Derailleur Micro-Tuning & Cable Replacement",
      summary: "H/L limit screw calibration, B-tension gap setup, derailleur hanger alignment gauge verification, and stainless PTFE slick inner cable install.",
      duration: "35–45 mins",
      warranty: "45 Days",
      startingPrice: 449,
      image: "assets/images/services/bike-gears.jpg",
      checklist: [
        "Derailleur hanger alignment tool (DAG-3) frame alignment",
        "High and low limit screw indexing under simulated load",
        "Pre-stretched stainless steel slick inner shift cables",
        "Chain wear gauge check to safeguard cassette sprockets"
      ]
    },
    {
      id: "bike-wheel",
      title: "Sub-Millimeter Wheel Truing & Tension Balance",
      summary: "Precision dial gauge lateral and radial runout correction, spoke tensiometer equalization, and hub cartridge bearing preload adjustment.",
      duration: "45–60 mins",
      warranty: "60 Days",
      startingPrice: 499,
      image: "assets/images/services/bike-wheel.jpg",
      checklist: [
        "Park Tool TS-2.3 precision truing stand calibration",
        "Spoke tension balanced to within 5% deviation across all spokes",
        "Hub axle dished symmetrically for perfect frame tracking"
      ]
    },
    {
      id: "bike-brakes",
      title: "Hydraulic Bleed & Mechanical Cable Brake Setup",
      summary: "Mineral oil / DOT bleed with dual-syringe vacuum kits, rotor degreasing, pad resurfacing, and lever reach bite point adjustment.",
      duration: "40–50 mins",
      warranty: "45 Days",
      startingPrice: 399,
      image: "assets/images/services/bike-brakes.jpg",
      checklist: [
        "Mineral oil or DOT 5.1 hydraulic system vacuum bleed",
        "Rotors cleaned with isopropyl alcohol to prevent squealing",
        "Caliper pistons centered with zero rotor rub"
      ]
    }
  ]
};

if (typeof window !== "undefined") {
  window.WORKSHOP_SERVICES = WORKSHOP_SERVICES;
}

