from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import fitz  # PyMuPDF
import os
import tempfile
import torch
import torch.nn as nn
import numpy as np
import logging
logging.basicConfig(level=logging.DEBUG)


app = Flask(__name__)

# Load the sentence transformer model
model = SentenceTransformer("sbert-degpt-finetuned")

device = torch.device("cpu")



# Load the classifier head
embedding_dim = model.get_sentence_embedding_dimension()
classifier_head = nn.Linear(embedding_dim, 2)
classifier_head.load_state_dict(torch.load("sbert-degpt-finetuned/classifier_head.pt", map_location=torch.device('cpu')))
classifier_head.to(device)
classifier_head.eval()

def predict_text_source(text):
    """Predict if text is written by a human or AI"""
    # Encode the text
    embedding = model.encode(text, convert_to_tensor=True).to(device)  # ✅ Correct
    # Get logits
    logits = classifier_head(embedding)
    # Get probabilities
    probs = torch.softmax(logits, dim=-1)
    return {
        "human_probability": probs[0].item(),
        "ai_probability": probs[1].item(),
        "predicted_source": "human" if probs[0].item() > probs[1].item() else "ai"
    }

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the uploaded PDF to a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
        file.save(temp_file.name)
        temp_file_path = temp_file.name

    # Extract text from the PDF
    text = extract_text_from_pdf(temp_file_path)
    text = text[:4096]  # Or use a smarter tokenizer-based truncation


    # Clean up the temporary file
    os.remove(temp_file_path)

    # Encode the text using the model
    embeddings = model.encode(text, convert_to_tensor=True)
    
    # Check if text is AI-generated or human-written
    source_prediction = predict_text_source(text)

    return jsonify({
        "text": text, 
        "embeddings": embeddings.tolist(),
        "ai_detection": source_prediction
    })

def extract_text_from_pdf(pdf_path):
    try:
        with fitz.open(pdf_path) as doc:
            text = ""
            for page in doc:
                text += page.get_text()
            return text
    except Exception as e:
        return jsonify({"error": f"Failed to extract text from PDF: {str(e)}"}), 500


@app.route('/similarity', methods=['POST'])
def calculate_similarity():
    data = request.get_json()
    if 'text1' not in data or 'text2' not in data:
        return jsonify({"error": "Missing text1 or text2"}), 400

    text1 = data['text1']
    text2 = data['text2']

    # Encode the texts using the model
    embeddings1 = model.encode(text1, convert_to_tensor=True)
    embeddings2 = model.encode(text2, convert_to_tensor=True)

    # Calculate cosine similarity
    cosine_similarity = util.pytorch_cos_sim(embeddings1, embeddings2).item()

    # AI detection for both texts
    source_prediction1 = predict_text_source(text1)
    source_prediction2 = predict_text_source(text2)

    return jsonify({
        "similarity": cosine_similarity,
        "text1_ai_detection": source_prediction1,
        "text2_ai_detection": source_prediction2
    })

@app.route('/search', methods=['POST'])
def search_text():
    data = request.get_json()
    if 'query' not in data or 'text' not in data:
        return jsonify({"error": "Missing query or text"}), 400

    query = data['query']
    text = data['text']

    # Encode the query and text using the model
    query_embedding = model.encode(query, convert_to_tensor=True)
    text_embedding = model.encode(text, convert_to_tensor=True)

    # Calculate cosine similarity
    cosine_similarity = util.pytorch_cos_sim(query_embedding, text_embedding).item()

    return jsonify({"similarity": cosine_similarity})

@app.route('/detect', methods=['POST'])
def detect_ai_text():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error": "Missing text"}), 400

    text = data['text']
    
    # Predict if text is AI-generated or human-written
    result = predict_text_source(text)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5002)