import openai
import json
import base64
import PyPDF2

# Read PDF file and extract text
pdf_path = "shortstory.pdf"

def read_pdf_and_extract_text(file_path):
    with open(file_path, "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

# Extract text from PDF
pdf_text = read_pdf_and_extract_text(pdf_path)

# OpenAI API Key
openai.api_key = "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"  # Replace with your OpenAI API Key

# Make the API call to OpenAI to summarize the extracted text
response = openai.Completion.create(
    model="gpt-4",  # Use the GPT-4 model for summarization
    prompt=f"Summarize the following PDF content:\n\n{pdf_text}",
    max_tokens=150,  # Adjust the length of the summary as needed
    temperature=0.7  # Adjust the creativity level of the response
)

# Print the result
print("API Response:")
print(response)

# Extract and print the model's summary
if "choices" in response and len(response["choices"]) > 0:
    model_response = response["choices"][0]["text"]
    print("\nModel's response (summary):")
    print(model_response)
