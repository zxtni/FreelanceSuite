import { NextRequest, NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Project } from '@/lib/types';

export async function GET() {
  try {
    const data = await readJSONFile<{ projects: Project[] }>('projects.json');
    return NextResponse.json(data.projects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ projects: Project[] }>('projects.json');
    
    const newProject: Project = {
      id: (data.projects.length + 1).toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    
    data.projects.push(newProject);
    await writeJSONFile('projects.json', data);
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readJSONFile<{ projects: Project[] }>('projects.json');
    
    const index = data.projects.findIndex(p => p.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    data.projects[index] = { ...data.projects[index], ...body };
    await writeJSONFile('projects.json', data);
    
    return NextResponse.json(data.projects[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    const data = await readJSONFile<{ projects: Project[] }>('projects.json');
    data.projects = data.projects.filter(p => p.id !== id);
    await writeJSONFile('projects.json', data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
