import { FileText, User2, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Post, PostWithUser } from "@/lib/types";
import Link from "next/link";

interface PostCardProps {
  post: Post | PostWithUser;
}

export default function PostCard({ post }: PostCardProps) {

  return (
    <Card className="flex flex-col py-7">
      <CardHeader className="relative flex-row gap-4 items-start px-7">
        <div className="text-muted-foreground absolute -top-4 right-4 text-xs">
          #{post.id}
        </div>
        <CardTitle className="flex gap-2">
          <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
          <h2>{post.title}</h2>
        </CardTitle>
        {post.hasOwnProperty('user') && (
          <CardDescription className="flex items-center gap-2">
            <User2 className="size-4" />
            {(post as PostWithUser).user.name}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 px-7">
        <p className="line-clamp-4 text-sm text-muted-foreground">{post.body}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {post.hasOwnProperty('user') && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={`/dashboard/users/${post.userId}`}>View User</Link>
          </Button>
        )}
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/dashboard/posts/${post.id}`}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Post
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
