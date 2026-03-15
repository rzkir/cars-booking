export const headerBg = (
  isPending: boolean,
  isConfirmed: boolean,
  isOngoing: boolean,
  isCancelled: boolean,
) =>
  isPending
    ? "bg-yellow-50 border-yellow-100"
    : isConfirmed
      ? "bg-blue-50 border-blue-100"
      : isOngoing
        ? "bg-sky-50 border-sky-100"
        : isCancelled
          ? "bg-red-50 border-red-100"
          : "bg-green-50 border-green-100";

export const pillBg = (
  isPending: boolean,
  isConfirmed: boolean,
  isOngoing: boolean,
  isCancelled: boolean,
) =>
  isPending
    ? "bg-yellow-500"
    : isConfirmed
      ? "bg-blue-500"
      : isOngoing
        ? "bg-sky-500"
        : isCancelled
          ? "bg-red-500"
          : "bg-green-500";

export const pillText = (
  isPending: boolean,
  isConfirmed: boolean,
  isOngoing: boolean,
  isCancelled: boolean,
) =>
  isPending
    ? "text-yellow-700"
    : isConfirmed
      ? "text-blue-700"
      : isOngoing
        ? "text-sky-700"
        : isCancelled
          ? "text-red-700"
          : "text-green-700";
