import React from 'react';
import './About.css'; // Import CSS file for styling

export default function About() {
  return (
    <div className="card">
      <div className="card-content">
        <h2>About Soil Liquefaction</h2>
        <p>
          Soil liquefaction is a phenomenon where saturated soil loses its strength and stiffness under cyclic loading or shaking, such as during an earthquake. This results in the soil behaving more like a liquid than a solid, which can lead to significant structural damage to buildings, bridges, and other infrastructure.
        </p>
        <p>
          Liquefaction occurs primarily in loose, saturated sandy soils with poor drainage. During an earthquake, the cyclic loading causes the water pressure within the soil pores to increase, reducing the effective stress and causing the soil particles to lose contact with each other. This leads to a loss of shear strength and the collapse of soil structure.
        </p>
        <p>
          The consequences of soil liquefaction can be severe, resulting in ground settlement, tilting, or sinking of structures, and even the collapse of buildings and bridges. Engineers and geologists use various methods to assess the susceptibility of soil to liquefaction and implement mitigation measures to reduce its impact on infrastructure.
        </p>
        <p>
          Understanding soil liquefaction is crucial for designing resilient infrastructure and ensuring the safety of communities in earthquake-prone regions.
        </p>
      </div>
    </div>
  );
}
