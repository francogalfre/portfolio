"use client";

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "./MorphingCard";

interface TechnologiesTags {
  name: string;
  class: string;
  icon?: (_props: Record<string, any>) => any;
}

interface ProjectCardProps {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  image2: string;
  alt: string;
  href: string;
  repository: string;
  tags: Array<TechnologiesTags>;
}

export default function ProjectCard({
  title,
  description,
  longDescription,
  image,
  image2,
  alt,
  href,
  repository,
  tags,
}: ProjectCardProps) {
  return (
    <MorphingDialog
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
    >
      <MorphingDialogTrigger className="max-w-[364px] w-full text-start space-y-4 rounded-xl">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <MorphingDialogImage
            src={image}
            alt={alt}
            className="w-full h-full cursor-zoom-in object-cover object-top scale-105 hover:scale-100 duration-700 transition-transform"
          />
        </div>

        <div className="w-full">
          <h2 className="text-lg">{title}</h2>
          <p className="text-white/50 w-full text-pretty">{description}</p>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent
          className="relative max-w-lg w-full mx-4 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 overflow-hidden"
          style={{
            transformOrigin: "center",
          }}
        >
          <div className="flex flex-col">
            <div className="w-full aspect-video">
              <MorphingDialogImage
                src={image2}
                alt={alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
              <div className="flex flex-col gap-4">
                <header>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-300 mb-2">
                    {title}
                  </h2>

                  <ul className="flex flex-row mb-2 gap-x-2">
                    {tags.map((tag) => (
                      <li key={tag.name}>
                        <span
                          className={`flex gap-x-2 rounded-full text-xs ${tag.class} py-1 px-2 `}
                        >
                          {tag.icon && <tag.icon class="size-4" />}
                          {tag.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </header>

                <p className="text-black/50 dark:text-zinc-400 text-sm leading-relaxed prose">
                  {longDescription}
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-2">
                <a
                  href={href}
                  target="_blank"
                  className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-sm font-medium rounded-lg text-center hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                >
                  Ver proyecto
                </a>

                <a
                  href={repository}
                  target="_blank"
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Código
                </a>
              </div>
            </div>
          </div>
        </MorphingDialogContent>

        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1 shadow-lg hover:shadow-xl transition-shadow"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                delay: 0.1,
                duration: 0.2,
              },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.1 },
            },
          }}
        >
          <span className="h-5 w-5 text-zinc-500 flex items-center justify-center">
            ×
          </span>
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
