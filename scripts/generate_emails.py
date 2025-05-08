import os
import openai

def generate_email_sequence(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    for idx, stage in enumerate(['welcome', 'offer', 'reminder']):
        prompt = (
            f"Write a {'welcome' if idx==0 else 'sales'} email for new subscribers. "
            "Include a subject line and body. Make it engaging and include a CTA to purchase novelty products."
        )
        response = openai.ChatCompletion.create(
            model='gpt-4',
            messages=[
                {'role': 'system', 'content': 'You are an expert email marketing copywriter.'},
                {'role': 'user', 'content': prompt}
            ]
        )
        email_content = response.choices[0].message.content
        filename = f"{idx+1}_{stage}_email.md"
        with open(os.path.join(output_dir, filename), 'w') as out:
            out.write(email_content)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--output_dir', required=True, help='Directory for email sequences')
    args = parser.parse_args()
    openai.api_key = os.getenv('OPENAI_API_KEY')
    generate_email_sequence(args.output_dir)
