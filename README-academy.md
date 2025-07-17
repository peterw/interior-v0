# Academy Course System

This document explains how to use and update the Academy course system in the LocalRank application.

## Overview

The Academy course system is designed to display educational content in a structured format. It consists of:

1. A JSON data file containing course content
2. An API endpoint to serve the data
3. A frontend component to display the content

## Data Structure

The course data is stored in a JSON file with the following structure:

```json
{
  "courseTitle": "Course Title",
  "courseDescription": "Course description text",
  "courseStats": {
    "duration": "4 hours",
    "lessons": "15 Lessons",
    "students": "1,243 Students",
    "certificate": true
  },
  "sections": [
    { "id": "section-id", "title": "Section Title", "free": true/false }
  ],
  "modules": [
    {
      "id": "module-id",
      "title": "Module Title",
      "lessons": [
        {
          "id": "lesson-id",
          "title": "Lesson Title",
          "content": "Lesson content text"
        }
      ]
    }
  ]
}
```

## File Locations

- Main JSON data: `app/data/academy-course.json`
- Static fallback: `public/data/academy-course.json`
- API endpoint: `app/api/academy-course/route.ts`
- Frontend component: `app/(public)/academy/page.tsx`

## How to Update Course Content

1. Edit the JSON data in `app/data/academy-course.json`
2. Copy the same content to `public/data/academy-course.json` (for fallback)
3. The frontend will automatically fetch and display the updated content

## Adding New Modules or Lessons

To add a new module:

1. Add a new object to the `modules` array in the JSON file
2. Ensure it has a unique `id`, a `title`, and a `lessons` array
3. Add corresponding section in the `sections` array if needed

To add a new lesson:

1. Add a new object to the `lessons` array of the appropriate module
2. Ensure it has a unique `id`, a `title`, and `content`

## Content Formatting

- The `content` field supports basic formatting with newlines (`\n`)
- Use Markdown-style formatting for lists and emphasis
- The frontend renders content with `whitespace-pre-line` to preserve formatting

## Premium vs Free Content

- Set the `free` property in the section object to control access
- `free: true` sections are accessible to all users
- `free: false` sections are marked as "Premium" and can be restricted

## Starting the Development Server

To run the development server:

```bash
npm run dev
```

## Deployment

When deploying, both the API route and static JSON file will be available, with the system automatically falling back to the static file if the API fails.

## Troubleshooting

If content is not displaying correctly:

1. Check browser console for errors
2. Verify JSON syntax is valid
3. Ensure the API route is accessible
4. Check that the static fallback file is up to date 