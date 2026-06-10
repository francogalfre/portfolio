"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import type { UIMessage } from "ai";
import type { ComponentProps, HTMLAttributes } from "react";
import { memo } from "react";
import { Streamdown } from "streamdown";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full flex-col gap-2",
      from === "user" ? "is-user max-w-[85%] ml-auto items-end" : "is-assistant",
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      "flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-[14.5px] font-light leading-relaxed",
      "group-[.is-user]:rounded-2xl group-[.is-user]:rounded-br-md group-[.is-user]:bg-muted group-[.is-user]:px-3.5 group-[.is-user]:py-2 group-[.is-user]:text-foreground",
      "group-[.is-assistant]:text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

const streamdownPlugins = { cjk, code };

const MarkdownLink = ({
  node,
  children,
  ...props
}: ComponentProps<"a"> & { node?: unknown }) => {
  const isExternal =
    typeof props.href === "string" && /^https?:\/\//.test(props.href);

  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
      {isExternal && (
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={13}
          className="ml-0.5 inline-block align-text-top"
        />
      )}
    </a>
  );
};

const markdownComponents = { a: MarkdownLink };

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        "[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-medium [&_p]:my-1.5 [&_ul]:my-1.5 [&_ol]:my-1.5",
          className
      )}
      plugins={streamdownPlugins}
      components={markdownComponents}
      lineNumbers={false}
      linkSafety={{ enabled: false }}
      {...props}
    />
  ),
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    nextProps.isAnimating === prevProps.isAnimating
);

MessageResponse.displayName = "MessageResponse";
