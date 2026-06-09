export function getSession(): { threadId: string; resourceId: string } {
  const resourceId = localStorage.getItem("visitor_id") ?? crypto.randomUUID();
  localStorage.setItem("visitor_id", resourceId);
  return { threadId: crypto.randomUUID(), resourceId };
}
