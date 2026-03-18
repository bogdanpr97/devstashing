// Mock data for dashboard UI — replace with real DB queries once Prisma is set up

export const MOCK_USER = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const MOCK_ITEM_TYPES = [
  { id: "type_snippet", name: "Snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "Prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_command", name: "Command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_note", name: "Note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_file", name: "File", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "Image", icon: "Image", color: "#ec4899", isSystem: true },
  { id: "type_link", name: "Link", icon: "Link", color: "#10b981", isSystem: true },
];

export const MOCK_COLLECTIONS = [
  {
    id: "col_react",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    userId: "user_1",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "col_python",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    userId: "user_1",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  {
    id: "col_context",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    userId: "user_1",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
  {
    id: "col_interview",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    userId: "user_1",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "col_git",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    userId: "user_1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    userId: "user_1",
    createdAt: "2023-12-28T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];

export const MOCK_ITEMS = [
  {
    id: "item_1",
    title: "useAuth Hook",
    contentType: "TEXT" as const,
    content: `import { useContext } from 'react'
import { AuthContext } from './AuthContext'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthP...')
  }
  return context
}`,
    description: "Custom authentication hook for React applications",
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    userId: "user_1",
    tags: ["react", "auth", "hooks"],
    collectionIds: ["col_react"],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    contentType: "TEXT" as const,
    content: `async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options)
      if (!res.ok) throw new Error(res.statusText)
      return await res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
}`,
    description: "Fetch wrapper with exponential backoff retry logic",
    language: "javascript",
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type_snippet",
    userId: "user_1",
    tags: ["fetch", "error-handling", "retry"],
    collectionIds: ["col_react"],
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  {
    id: "item_3",
    title: "Git: Undo Last Commit",
    contentType: "TEXT" as const,
    content: "git reset --soft HEAD~1",
    description: "Undo the last commit but keep changes staged",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_command",
    userId: "user_1",
    tags: ["git", "undo"],
    collectionIds: ["col_git"],
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    contentType: "TEXT" as const,
    content: "Review the following code for bugs, performance issues, and best practices. Provide specific, actionable feedback with examples.",
    description: "General-purpose code review prompt",
    language: null,
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_prompt",
    userId: "user_1",
    tags: ["code-review", "ai"],
    collectionIds: ["col_ai_prompts"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "item_5",
    title: "Interview Notes — System Design",
    contentType: "TEXT" as const,
    content: "## Key Concepts\n- Scalability: horizontal vs vertical\n- CAP theorem\n- Load balancing strategies\n- Database sharding",
    description: "Notes on system design interview topics",
    language: null,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    userId: "user_1",
    tags: ["interview", "system-design"],
    collectionIds: ["col_interview"],
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z",
  },
];

// Item counts per type — derived from MOCK_ITEMS for sidebar display
export const MOCK_TYPE_COUNTS: Record<string, number> = {
  type_snippet: 24,
  type_prompt: 18,
  type_command: 15,
  type_note: 12,
  type_file: 5,
  type_image: 3,
  type_link: 8,
};
