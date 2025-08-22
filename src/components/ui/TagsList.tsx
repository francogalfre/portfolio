// TagsList.tsx
import React from "react";

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <ul className="flex space-x-2 space-y-2 sm:gap-0 flex-wrap md:flex-nowrap">
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={`flex w-fit px-2.5 py-1 rounded-lg text-xs gap-1.5 items-center text-black/60 bg-black/10 dark:bg-white/10 dark:text-white/60`}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TagsList;
