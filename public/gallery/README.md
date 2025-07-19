# Gallery Images Instructions

To add your own images to the West Hill Basketball Club gallery, follow these steps:

## Folder Structure

Place your images in the appropriate folders:

- `public/gallery/games/` - Game highlights and action shots
- `public/gallery/training/` - Training sessions and skill development
- `public/gallery/events/` - Community events and special occasions

## Image Guidelines

### File Formats

- Recommended: `.jpg` or `.jpeg` for photos
- Also supported: `.png`, `.webp`

### Naming Convention

- Use descriptive names: `game1.jpg`, `training1.jpg`, `event1.jpg`
- Avoid spaces in filenames - use hyphens or underscores instead
- Example: `championship-game-vs-ignite.jpg`

### Image Sizes

- Recommended resolution: 1200x800 pixels or higher
- Keep file sizes under 2MB for fast loading
- Images will be automatically resized and cropped to fit the gallery layout

## Updating the Gallery Data

After adding images to the folders, update the gallery data in:
`client/pages/Gallery.tsx`

Find the `galleryCategories` array and add your new images:

```javascript
{
  id: 8, // Use next available ID
  src: "/gallery/games/your-new-image.jpg",
  alt: "Description of the photo",
  category: "games", // or "training" or "events"
  date: "2025-07-20", // Date in YYYY-MM-DD format
  description: "Detailed description of what's happening in the photo"
}
```

## Example

If you add a file `public/gallery/games/championship-final.jpg`, add this to the gallery data:

```javascript
{
  id: 8,
  src: "/gallery/games/championship-final.jpg",
  alt: "West Hill Basketball Club Championship Final",
  category: "games",
  date: "2025-07-20",
  description: "Exciting final moments of our championship game"
}
```

## Testing

After adding images and updating the data:

1. Restart your development server (`npm run dev`)
2. Visit `/gallery` to see your new images
3. Test the category filters to make sure images appear in the right sections

## Backup

Keep backup copies of your original photos in case you need to replace or update them later.
