import openai
import datetime

openai.api_key = os.getenv("OPENAI_API_KEY")

today = datetime.datetime.now().strftime("%B %d, %Y")
prompt = f"Generate a witty, engaging social media post promoting novelty products for {today}."

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a marketing expert for a novelty product site."},
        {"role": "user", "content": prompt}
    ]
)

post = response['choices'][0]['message']['content']

with open("_posts/social-" + datetime.datetime.now().strftime("%Y-%m-%d") + ".md", "w") as f:
    f.write(f"---\ntitle: Social Post for {today}\n---\n\n{post}")

