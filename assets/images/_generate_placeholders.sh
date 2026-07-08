#!/bin/bash
# Generate all SVG placeholder files

generate_placeholder() {
  local filepath="$1"
  local label="$2"
  local filename="$3"
  local width="$4"
  local height="$5"
  local recommended="$6"
  
  cat > "$filepath" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#f3f4f6"/>
  <rect x="1" y="1" width="$((width-2))" height="$((height-2))" fill="none" stroke="#e5e7eb" stroke-width="2" rx="12"/>
  <g transform="translate($((width/2)), $((height/2 - 40)))" text-anchor="middle">
    <rect x="-24" y="-24" width="48" height="48" rx="24" fill="#e5e7eb"/>
    <path d="M-8,-6 L8,-6 L8,6 L-8,6 Z M-5,-3 L-1,1 L2,-1 L5,3 L5,5 L-5,5 Z M-3,-3 A1.5,1.5 0 1,0 0,-3 A1.5,1.5 0 1,0 -3,-3" fill="#9ca3af" transform="scale(1.1)"/>
    <text y="48" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="20" fill="#6b7280" font-weight="500">${label}</text>
    <text y="74" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="13" fill="#9ca3af">Recommended: ${recommended}</text>
    <text y="96" font-family="Inter, system-ui, -apple-system, sans-serif" font-size="11" fill="#d1d5db">${filename}</text>
  </g>
</svg>
EOF
}

# Service placeholders (800x600)
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/cctv-placeholder.svg" "Replace with CCTV Image" "cctv-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/gate-motor-placeholder.svg" "Replace with Gate Motor Image" "gate-motor-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/access-control-placeholder.svg" "Replace with Access Control Image" "access-control-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/alarm-system-placeholder.svg" "Replace with Alarm System Image" "alarm-system-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/intercom-placeholder.svg" "Replace with Intercom Image" "intercom-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/electric-fencing-placeholder.svg" "Replace with Electric Fencing Image" "electric-fencing-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/garage-door-placeholder.svg" "Replace with Garage Door Image" "garage-door-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/services/repairs-maintenance-placeholder.svg" "Replace with Repairs Image" "repairs-maintenance-placeholder.jpg" 800 600 "800 × 600 px"

# About placeholder (1200x800)
generate_placeholder "/Users/kik/Desktop/neo/assets/images/about/about-company-placeholder.svg" "Replace with Company Image" "about-company-placeholder.jpg" 1200 800 "1200 × 800 px"

# Promotion placeholders (800x600)
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/gate-installation-placeholder.svg" "Replace with Gate Installation Image" "gate-installation-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/gate-repairs-placeholder.svg" "Replace with Gate Repairs Image" "gate-repairs-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/garage-automation-placeholder.svg" "Replace with Garage Automation Image" "garage-automation-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/remote-programming-placeholder.svg" "Replace with Remote Programming Image" "remote-programming-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/automation-upgrades-placeholder.svg" "Replace with Automation Upgrades Image" "automation-upgrades-placeholder.jpg" 800 600 "800 × 600 px"
generate_placeholder "/Users/kik/Desktop/neo/assets/images/promotions/maintenance-support-placeholder.svg" "Replace with Maintenance Image" "maintenance-support-placeholder.jpg" 800 600 "800 × 600 px"

# Background placeholder (1200x800)
generate_placeholder "/Users/kik/Desktop/neo/assets/images/backgrounds/contact-placeholder.svg" "Replace with Contact Background" "contact-placeholder.jpg" 1200 800 "1200 × 800 px"

echo "All placeholder SVGs generated successfully!"
