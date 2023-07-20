# Adding your app or integration

Feel free to submit a PR to add your app or integration to this list. Here's the format of the object to add to appList.json:

```json
{
    "slug": "your-app-slug",
    "url": "https://your-app.com",
    "githubUrl": "https://github.com/company/your-app",
    "image": {
        "sm": "/images/apps/company.png",
        "lg": "/images/apps/company-lg.png"
    },
    "title": "Your App Name",
    "subtitle": "your-app.com",
    "description": "A brief description of your app or integration and how it works with Worldcoin. Don't go longer than this.",
    "tags": ["Integration", "Sign In"],
    "body": "Here you can put a more detailed description of your app or integration. This can be as long as you'd like it to be!",
    "bookmark": false,
    "worldcoin": false
}
```

Ensure you also add the images (or `.svg` files) to the `/public/images/apps` directory. The `sm` image should be square (minimum 200x200px) and the `lg` image should be 16:9 ratio (minimum 600x338px).