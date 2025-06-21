<h1 align="center">🌋 Soil Liquefaction Susceptibility Predictor</h1>

<p align="center">
  A machine learning web application that predicts soil liquefaction risk based on geotechnical parameters. Built with Flask, React, and a trained Random Forest model.
</p>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li><strong>📊 Risk Prediction:</strong> Predict soil liquefaction susceptibility using geotechnical input values.</li>
  <li><strong>🧠 Random Forest Model:</strong> Trained on parameters such as SPT N‑value, moisture content, fines percentage, groundwater level, and D50 grain size.</li>
  <li><strong>⚡ Flask API:</strong> RESTful backend serving fast, reliable predictions.</li>
  <li><strong>💻 React Frontend:</strong> Interactive interface providing real-time inputs and feedback.</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Backend:</strong> Python, Flask</li>
  <li><strong>Machine Learning:</strong> scikit-learn (Random Forest)</li>
  <li><strong>Frontend:</strong> React, JavaScript, CSS, Bootstrap</li>
  <li><strong>Database:</strong> MySQL</li>
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
<p>Navigate to the React interface and input geotechnical parameters such as SPT N‑value, moisture content, fines percentage, D50, and groundwater level. The application communicates with the Flask API and returns a classification: “Susceptible” or “Not Susceptible”. The API may also be accessed directly via <code>/predict</code> with a JSON payload.</p>

<hr>

<h2>📈 Model & Dataset</h2>
<p>The Random Forest model is trained on geotechnical datasets from Guagua, Pampanga, achieving approximately 90–96% accuracy. Key features include SPT N‑value, moisture content, fines content, D50 grain size, groundwater depth, and plasticity index.</p>

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
