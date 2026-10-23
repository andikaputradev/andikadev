interface BlogPostContentProps {
  content: string
  estimatedReadTime?: number
}

export function BlogPostContent({ content, estimatedReadTime = 5 }: BlogPostContentProps) {
  return (
    <div
      style={{ minHeight: `${estimatedReadTime * 100}px` }}
      className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
