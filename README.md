<h1 align="center">🌋 Soil Liquefaction Susceptibility Predictor</h1>

<p align="center">
  A machine learning web application that predicts soil liquefaction risk based on geotechnical parameters. Built with Flask, React, and a trained Random Forest model.
</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li><strong>📊 Risk Prediction:</strong> Enter geotechnical values and receive instant liquefaction susceptibility outputs.</li>
  <li><strong>🧠 Random Forest Model:</strong> ML model trained on input parameters like SPT N‑value, moisture, fines content, groundwater level, and D50 size :contentReference[oaicite:1]{index=1}.</li>
  <li><strong>⚡ Flask API:</strong> Fast REST endpoints for model predictions.</li>
  <li><strong>💻 React Frontend:</strong> Intuitive UI enabling real-time user interaction and results.</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> Python, Flask</li>
  <li><strong>Machine Learning:</strong> scikit-learn Random Forest model (e.g., joblib)</li>
  <li><strong>Frontend:</strong> React, JavaScript, CSS</li>
  <li><strong>Database/Storage:</strong> JSON or file-stored trained model</li>
</ul>

<hr>

<h2>📁 Project Structure</h2>

<pre>
├── backend/             # Flask API and model integration
├── frontend/            # React app (user interface)
├── model/               # Serialized Random Forest model artifacts
├── requirements.txt     # Python dependencies
├── package.json         # JS dependencies
└── README.md            # Project overview
</pre>

<hr>

<h2>⚙️ Installation Guide</h2>

<ol>
  <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/qppd/Soil-Liquefaction.git
cd Soil-Liquefaction</code></pre>
  </li>

  <li><strong>Set up backend:</strong>
    <pre><code>cd backend
pip install -r requirements.txt
# Ensure the trained model is in /model</code></pre>
  </li>

  <li><strong>Run Flask API:</strong>
    <pre><code>flask run</code></pre>
    Default runs at <code>http://127.0.0.1:5000</code>.
  </li>

  <li><strong>Set up frontend:</strong>
    <pre><code>cd ../frontend
npm install
npm start</code></pre>
    Default runs at <code>http://localhost:3000</code>.
  </li>
</ol>

<hr>

<h2>📄 Usage</h2>
<p>Navigate to the React UI, enter parameters such as SPT N‑value, moisture content, fines, D50, and groundwater level. The app sends a request to the Flask API and returns “Susceptible” or “Not Susceptible”. You can also use the API directly via <code>/predict</code> with JSON payload.</p>

<hr>

<h2>📈 Model & Dataset</h2>
<p>The Random Forest model was trained on local geotechnical datasets (Guagua, Pampanga) with approximately 90‑96% accuracy :contentReference[oaicite:2]{index=2}. Key features include N‑value, moisture, fines percentage, D50, groundwater level, and plasticity index.</p>

<hr>

<h2>📄 License</h2>
<p>This project is open-source under the <strong>MIT License</strong>.</p>

<pre>
MIT License
Copyright (c) 2025 QPPD
</pre>

<hr>

<h2>🙌 Acknowledgements</h2>
<ul>
  <li>QPPD (Quezon Province Programmers and Developers)</li>
  <li>Flask & React communities</li>
  <li>scikit-learn Random Forest</li>
</ul>
