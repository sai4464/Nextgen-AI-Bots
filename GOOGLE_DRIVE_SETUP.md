# Google Drive Gallery Setup Guide

This guide will help you set up a photo gallery that pulls images from a public Google Drive folder.

## Step 1: Create a Public Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder (or use an existing one)
3. Right-click the folder and select "Share"
4. Click "Change to anyone with the link"
5. Set permission to "Viewer"
6. Copy the folder link (it will look like: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`)
7. Extract the Folder ID from the URL:
   - The Folder ID is the part after `/folders/` in the URL
   - Example: If your link is `https://drive.google.com/drive/folders/1ABC123xyz456`, your Folder ID is `1ABC123xyz456`

## Step 2: Get a Google Drive API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on it and press "Enable"
4. Create an API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
   - (Optional but recommended) Click "Restrict Key" and restrict it to "Google Drive API" only

## Step 3: Add Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY=your_api_key_here
```

Replace:
- `your_folder_id_here` with the Folder ID from Step 1
- `your_api_key_here` with the API Key from Step 2

## Step 4: Upload Images to Your Google Drive Folder

1. Open your Google Drive folder
2. Upload your images directly to the folder
3. The gallery will automatically fetch all image files from this folder
4. Supported formats: JPEG, PNG, GIF, WebP

## Step 5: Restart Your Development Server

After adding the environment variables, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

## Notes

- Images are fetched client-side when the page loads
- The gallery automatically displays all images from your Google Drive folder
- Images are loaded directly from Google Drive (no need to download/upload them to your repository)
- The API key is public (prefixed with `NEXT_PUBLIC_`), but since it's restricted to Google Drive API and only reads public folders, it's safe to use in client-side code
- Images are cached for better performance

## Troubleshooting

**Images not loading?**
- Make sure the folder is set to "Anyone with the link can view"
- Verify your Folder ID is correct
- Check that your API Key is valid and has Google Drive API enabled
- Check the browser console for any error messages

**API Quota Exceeded?**
- Google Drive API has a free quota (1,000 requests/day)
- If you exceed this, you may need to implement caching or upgrade your Google Cloud plan

## Alternative: Using Manual File IDs

If you prefer not to use the API, you can manually specify file IDs in the component. Contact the developer for this approach.

