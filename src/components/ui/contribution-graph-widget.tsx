"use client";

import { cn } from "@/lib/utils";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  type Activity,
} from "./contribution-graph";

export default function ContributionGraphWidget({ data }: { data: Activity[] }) {
  return (
    <ContributionGraph data={data} blockSize={8} blockMargin={2} blockRadius={2} fontSize={10}>
      <ContributionGraphCalendar hideMonthLabels className="overflow-hidden">
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
            className={cn(
              'data-[level="0"]:fill-gray-100',
              'data-[level="1"]:fill-gray-300',
              'data-[level="2"]:fill-gray-500',
              'data-[level="3"]:fill-gray-700',
              'data-[level="4"]:fill-gray-900',
            )}
          />
        )}
      </ContributionGraphCalendar>
    </ContributionGraph>
  );
}
