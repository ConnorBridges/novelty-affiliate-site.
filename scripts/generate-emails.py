import openai
import datetime

openai.api_key = os.getenv("OPENAI_API_KEY")

today = datetime.datetime.now().strftime("%B %d, %Y")
prompt = f"Write a marketing email promoting a unique novelty product. Make it persuasive, concise, and include a call-to-action."

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a marketing expert writing email copy for a novelty product store."},
        {"role": "user", "content": prompt}
    ]
)

email = response['choices'][0]['message']['content']

with open("_posts/email-" + datetime.datetime.now().strftime("%Y-%m-%d") + ".md", "w") as f:
    f.write(f"---\ntitle: Email Copy for {today}\n---\n\n{email}")

