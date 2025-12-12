import { NextRequest, NextResponse } from "next/server";

// Instagram Graph API configuration
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID || "fd.futuredesignz";
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || "";

interface InstagramPost {
  id: string;
  image: string;
  title: string;
  likes: number;
  comments: number;
  timestamp?: string;
}

export async function GET(request: NextRequest) {
  try {
    // If no access token, return fallback data
    if (!INSTAGRAM_ACCESS_TOKEN) {
      return NextResponse.json(
        {
          posts: [
            {
              id: "1",
              image: "/images/projects/project-1.webp",
              title: "Modern Bathroom Design",
              likes: 234,
              comments: 18,
            },
            {
              id: "2",
              image: "/images/projects/project-2.webp",
              title: "Luxury Tile Installation",
              likes: 456,
              comments: 32,
            },
            {
              id: "3",
              image: "/images/projects/project-3.webp",
              title: "Contemporary Design",
              likes: 189,
              comments: 14,
            },
            {
              id: "4",
              image: "/images/projects/project-4.webp",
              title: "Bathroom Renovation",
              likes: 321,
              comments: 25,
            },
            {
              id: "5",
              image: "/images/projects/project-5.webp",
              title: "Premium Installation",
              likes: 278,
              comments: 21,
            },
            // Removed missing project-6 to avoid 404s
          ] as InstagramPost[],
        },
        { status: 200 }
      );
    }

    // Fetch from Instagram Graph API
    const apiUrl = `https://graph.instagram.com/v18.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || "Failed to fetch Instagram posts");
    }

    // Transform Instagram data to our format
    const posts: InstagramPost[] = (data.data || [])
      .slice(0, 6) // Get last 6 posts
      .map((post: any) => ({
        id: post.id,
        image: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
        title: post.caption?.split("\n")[0] || "Untitled",
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        timestamp: post.timestamp,
      }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Instagram API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram posts" },
      { status: 500 }
    );
  }
}
