from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import fitz  # PyMuPDF
import os
import tempfile

app = Flask(__name__)
model = SentenceTransformer("sbert-paws-finetuned")

def extract_text_from_pdf(file):
    """Extract text from uploaded PDF file using PyMuPDF."""
    text = ""
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text.strip()

@app.route('/compare_pdfs', methods=['POST'])
def compare_pdfs():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({'error': 'Both PDF files must be uploaded as file1 and file2'}), 400

    file1 = request.files['file1']
    file2 = request.files['file2']

    # Extract text
    text1 = extract_text_from_pdf(file1)
    text2 = extract_text_from_pdf(file2)

    if not text1 or not text2:
        return jsonify({'error': 'One or both PDFs have no readable text.'}), 400

    # Encode and compare
    embeddings = model.encode([text1, text2], convert_to_tensor=True)
    similarity = util.cos_sim(embeddings[0], embeddings[1]).item()
    similarity_percent = round(similarity * 100, 2)

    return jsonify({
        'similarity_percent': similarity_percent,
        'copied': similarity_percent > 85  # You can adjust this threshold
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
