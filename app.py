from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from main import Conversation
from google.genai import types
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the conversation
conversation = Conversation()

@app.route('/generate', methods=['GET'])
def generate():
    prompt = request.args.get('prompt', '')
    is_followup = request.args.get('is_followup', 'false').lower() == 'true'
    
    def generate_stream():
        # Format the prompt based on whether it's a new prompt or follow-up
        if is_followup:
            formatted_prompt = prompt
        else:
            # Add proper line breaks to make the prompt more readable
            formatted_prompt = f"""Here's my prompt:\n\n{prompt}"""
        
        # Add user message to conversation history
        conversation.conversation_history.append(
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=formatted_prompt),
                ],
            )
        )
        
        # Stream the response directly from the API
        full_response = ""
        
        try:
            for chunk in conversation.client.models.generate_content_stream(
                model=conversation.model,
                contents=conversation.conversation_history,
                config=types.GenerateContentConfig(
                    temperature=1,
                    top_p=0.95,
                    top_k=40,
                    max_output_tokens=8192,
                    response_mime_type="text/plain",
                    system_instruction=[
                        types.Part.from_text(text=conversation.system_instruction),
                    ],
                ),
            ):
                if chunk.text:
                    # Only send the new portion of text that hasn't been sent before
                    new_text = chunk.text
                    full_response += new_text
                    
                    # Send the new portion to the client
                    yield f"data: {json.dumps({'token': new_text})}\n\n"
            
            # Add model response to conversation history
            conversation.conversation_history.append(
                types.Content(
                    role="model",
                    parts=[
                        types.Part.from_text(text=full_response),
                    ],
                )
            )
            
            # Signal that the stream is complete
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            # Log the error
            print(f"Error during content generation: {str(e)}")
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
            yield f"data: {json.dumps({'done': True})}\n\n"
    
    return Response(stream_with_context(generate_stream()), 
                   content_type='text/event-stream')

@app.route('/generate_complete', methods=['POST'])
def generate_complete():
    data = request.json
    prompt = data['prompt'] if data else ''
    is_followup = data['is_followup'] if data else False
    
    conversation.generate(prompt, is_followup=is_followup)
    
    # Get the latest response from the conversation history
    if conversation.conversation_history and len(conversation.conversation_history) > 0 and conversation.conversation_history[-1].parts:
        latest_response = conversation.conversation_history[-1].parts[0].text
    else:
        latest_response = "No response generated yet."
    
    return jsonify({
        'response': latest_response
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)