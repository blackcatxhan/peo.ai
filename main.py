import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
load_dotenv()

def create_client():
    return genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY"),
    )

class Conversation:
    def __init__(self):
        self.client = create_client()
        self.model = "gemini-2.0-flash"
        self.conversation_history = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text="""Here's my prompt:

<github_repo_code>
Based on github repository codes given above, generate a creative-styled blog. Make sure to keep the blog fun and immersive for the readers. Use emojis."""),
                ],
            ),
            types.Content(
                role="model",
                parts=[
                    types.Part.from_text(text="""
**Enhancements Made:**

*   **Clarity and Specificity:** The original prompt was vague. The enhanced prompt specifies what aspects of the code to focus on, the target audience, and the desired tone.
*   **Context:** Added context about the purpose of the blog (e.g., tutorial, showcase, personal reflection).
*   **Format Specification:** Clarified that the output should be a blog post.
*   **Instructional Keywords:** Used stronger action verbs like \"craft,\" \"weave,\" and \"infuse.\"
*   **Example of Tone:** Provided adjectives like \"whimsical\" and \"engaging\" to set the tone.
*   **Reasoning Request:** The prompt asks the AI to explain its creative choices.

```
You are a creative blog writer. Your task is to craft an engaging and immersive blog post based on the provided GitHub repository code.

```github_repo_code```
[PASTE GITHUB REPO CODE HERE]
```github_repo_code```

```Context```
The purpose of this blog post is to [choose one: explain the code to beginners / showcase the project's capabilities / share my personal experience building this]. The target audience is [choose one: beginner developers / experienced programmers / general tech enthusiasts].
```Context```

```Instructions```
Weave a narrative that makes the code come alive!

1.  **Introduce the project:** Start with a catchy headline and a brief overview of what the project does. Use emojis to add some flair! 🚀
2.  **Explain key concepts:** Break down the most important parts of the code in a way that's easy to understand. Use analogies, metaphors, and even jokes to make it more memorable. 🤔
3.  **Showcase the fun parts:** Highlight the most interesting or innovative aspects of the code. What makes this project unique? ✨
4.  **Add personal anecdotes:** Share your own experiences working on the project. What challenges did you face? What did you learn? ✍️
5.  **Keep it visual:** Use code snippets, images, and GIFs to illustrate your points. 🖼️
6.  **End with a call to action:** Encourage readers to try out the code, contribute to the project, or learn more. 🤝

```Styling and Tone```
*   **Overall tone:** Whimsical, enthusiastic, and engaging. Think of it as explaining code to a friend over coffee. ☕
*   **Use emojis liberally:** But don't overdo it! 😉
*   **Keep it concise:** Aim for a blog post that's easy to read in one sitting.
*   **Be creative with formatting:** Use headings, subheadings, bullet points, and other formatting elements to break up the text.
```Styling and Tone```

```Reasoning Request```
After generating the blog post, briefly explain your creative choices. Why did you choose to highlight certain aspects of the code? How did you try to make the blog post more engaging?
```Reasoning Request```
```Output Format```
Blog Post (ready to be published on a platform like Medium or a personal website)
```Output Format```
```
"""),
                ],
            ),
        ]
        self.system_instruction = """Your task is to enhance and optimize prompts. Follow these guides to complete your task.

# Here are some good practices for prompt engineering:

1. Be clear and specific - Clearly state what you want to achieve. The more specific your instructions, the better the response.
2. Use examples - Provide positive and negative examples to demonstrate exactly what you're looking for.
3. Break complex tasks into steps - For difficult problems, guide the AI through a step-by-step approach.
4. Specify format - If you need a particular output format (code, bullet points, table), explicitly request it.
5. Provide context - Include relevant background information that helps frame the problem.
6. Use delimiters - Use quotes, triple backticks, or XML tags to clearly separate different parts of your prompt.
7. Request reasoning - Ask the AI to explain its thinking process, which often leads to better results.
8. Iterative refinement - Start with a basic prompt and gradually improve it based on the responses you get.
9. Control verbosity - Specify if you want a concise or detailed response.
10. Test different approaches - Try different phrasings and structures to see what works best for your specific need.

# Step-by-Step Guide to Making a Good Prompt

Define your goal clearly
- Ask yourself: What specific outcome am I looking for?
- Be precise about what you want to achieve

Provide context
- Include relevant background information
- Explain why you need this information or task completed
- Mention any constraints or requirements

Structure your request
- Start with a clear instruction
- Use imperative language like \"Write,\" \"Create,\" \"Explain,\" or \"Analyze\"
- Break complex requests into smaller parts

Specify format and style
- Request a specific output format if needed (code, paragraph, list, etc.)
- Indicate tone or style preferences (formal, casual, technical)
- Specify desired length or level of detail

Include examples
- Provide sample inputs and outputs when possible
- Show both good and bad examples to clarify expectations

Use delimiters
- Separate different parts of your prompt with clear markers
- Use quotes, triple backticks, XML tags, or other delimiters

Request reasoning
- sAsk the AI to explain its thought process
- Use phrases like \"Think step by step\" or \"Explain your reasoning\"

Test and refine
- Start with a basic version of your prompt
- sEvaluate the response
- Iterate by adding clarifications or adjusting requirements

Consider limitations
- Be aware of the AI's knowledge cutoff date
- Understand what types of tasks the AI can and cannot perform

Be explicit about tradeoffs
- Specify priorities (accuracy vs. creativity, brevity vs. detail)
- Indicate what aspects are most important to you"""

    def generate(self, prompt: str, is_followup=False):
        # Format the prompt based on whether it's a new prompt or follow-up
        formatted_prompt = prompt if is_followup else f"Here's my prompt:\n{prompt}"
        
        # Add user message to conversation history
        self.conversation_history.append(
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=formatted_prompt),
                ],
            )
        )
        
        generate_content_config = types.GenerateContentConfig(
            temperature=1,
            top_p=0.95,
            top_k=40,
            max_output_tokens=8192,
            response_mime_type="text/plain",
            system_instruction=[
                types.Part.from_text(text=self.system_instruction),
            ],
        )

        # Get the response
        response_text = ""
        for chunk in self.client.models.generate_content_stream(
            model=self.model,
            contents=self.conversation_history,
            config=generate_content_config,
        ):
            print(chunk.text, end="")
            response_text += chunk.text if chunk.text is not None else ""
        
        # Add model response to conversation history
        self.conversation_history.append(
            types.Content(
                role="model",
                parts=[
                    types.Part.from_text(text=response_text),
                ],
            )
        )
        print("\n")  # Add a newline after the complete response

if __name__ == "__main__":
    conversation = Conversation()
    
    prompt = input("[:] ")
    conversation.generate(prompt)
    
    while True:
        follow_up = input("\n[:] ")
        if follow_up == "TERMINATE":
            print("Goodbye!")
            break
        conversation.generate(follow_up, is_followup=True)