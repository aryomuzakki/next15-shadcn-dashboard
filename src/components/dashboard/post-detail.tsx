import { PostWithUser } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FileText, User2 } from "lucide-react";

export default function PostDetail({ post }: { post: PostWithUser }) {
  return (
    <Card>
      <CardHeader className="relative flex-row gap-4 items-start">
        <div className="text-muted-foreground absolute -top-2 right-4 text-xs">
          #{post.id}
        </div>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
          <h2 className="text-xl">{post.title}</h2>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <User2 className="size-4" />
          {(post as PostWithUser).user.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <p className="text-muted-foreground">{post.body}</p>
      </CardContent>
    </Card>
  )
}
