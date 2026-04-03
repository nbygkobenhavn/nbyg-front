import { BlogPost } from "@/types/blogPost";
import { PortableText } from "@portabletext/react";
import { getBlogPortableTextComponents } from "../portableTextComponents/blogPortableTextComponents";

interface ContentSectionProps {
  article: BlogPost;
}

export default function ContentSection({ article }: ContentSectionProps) {
  return (
    <section className="py-25 lg:pt-20 lg:pb-0">
      <div className="prose prose-lg max-w-none min-w-0 overflow-x-visible [&_figure]:mx-0 [&_figure]:max-w-none [&_img]:mx-0 [&_img]:max-w-full [&_img]:w-full">
        <PortableText
          value={
            article.content as unknown as Parameters<
              typeof PortableText
            >[0]["value"]
          }
          components={getBlogPortableTextComponents(article.slug)}
        />
      </div>
    </section>
  );
}
