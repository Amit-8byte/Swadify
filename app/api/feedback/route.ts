import { NextResponse } from 'next/server';

// In-memory database for demonstration
let feedbacks = [
  {
    id: "1",
    name: "TechCorp Systems",
    message: "The food quality is consistently excellent. Our team looks forward to lunch every day!",
    rating: 5,
  },
  {
    id: "2",
    name: "Innovate Labs",
    message: "Swadify has transformed our office catering. Healthy, tasty, and always on time.",
    rating: 5,
  },
  {
    id: "3",
    name: "Creative Studios",
    message: "Great variety in the menu. The North Indian options are particularly authentic.",
    rating: 4,
  },
  {
    id: "4",
    name: "FinServe Group",
    message: "Hygienic packaging and reliable delivery. Highly recommended for corporate lunches.",
    rating: 5,
  }
];

export async function GET() {
  return NextResponse.json(feedbacks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, rating } = body;

    if (!name || !message || !rating) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const newFeedback = { 
      id: Date.now().toString(),
      name, 
      message, 
      rating 
    };
    // Add to beginning of array
    feedbacks = [newFeedback, ...feedbacks];

    return NextResponse.json({ data: newFeedback }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const pin = searchParams.get('pin');

  // Use environment variable or fallback to "1234"
  const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";

  if (pin !== correctPin) {
    return NextResponse.json({ error: "Unauthorized: Incorrect PIN" }, { status: 401 });
  }

  if (id) {
    feedbacks = feedbacks.filter((f) => f.id !== id);
  }

  return NextResponse.json({ success: true });
}
