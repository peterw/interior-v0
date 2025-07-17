import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'app/data/learn-course.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Return the data as JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading course data:', error);
    return NextResponse.json(
      { error: 'Failed to load course data' },
      { status: 500 }
    );
  }
} 