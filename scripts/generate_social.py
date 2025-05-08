import os
import openai

def generate_social_snippets(post_dir, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    for filename in os.listdir(post_dir):
        if not filename.endswith('.md'):
            continue
        filepath = os.path.join(post_dir, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        prompt = (
            "Generate 5 tweet threads and 3 LinkedIn post captions for the following article content. "
            "Include relevant hashtags and a call-to-action to visit the site for deals.\n\n" + content
        )
        response = openai.ChatCompletion.create(
            model='gpt-4',
            messages=[
                {'role': 'system', 'content': 'You are a helpful social media content creator.'},
                {'role': 'user', 'content': prompt}
            ]
        )
        snippets = response.choices[0].message.content
        out_path = os.path.join(output_dir, filename.replace('.md', '_social.md'))
        with open(out_path, 'w') as out:
            out.write(snippets)

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--input_dir', required=True, help='Directory of markdown posts')
    parser.add_argument('--output_dir', required=True, help='Directory for social snippets')
    args = parser.parse_args()
    openai.api_key = os.getenv('OPENAI_API_KEY')
    generate_social_snippets(args.input_dir, args.output_dir)
