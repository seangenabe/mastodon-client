import MultiLayout from "@/components/app/main/MultiLayout";
import Sidebar from "@/components/app/sidebar/Sidebar";
import type { ElementOf } from "@/types/ElementOf";
import { MASTO_URL } from "astro:env/client";
import { createRestAPIClient } from "masto";
import { createSignal } from "solid-js";

export default function App() {
  const masto = createRestAPIClient({
    url: MASTO_URL,
  });
  const [posts, setPosts] = createSignal<
    (ElementOf<ReturnType<typeof masto.v1.timelines.public.list>>)
  >([]);

  (async () => {
    const postsIterable = masto.v1.timelines.public.list();
    console.log("postsIterable", postsIterable);
    for await (const p of postsIterable) {
      console.log("p", p);
      if (posts.length < 5) {
        setPosts(posts().concat(p));
      }
    }
  })();

  return (
    <div class="flex dark:bg-blue-950 dark:text-neutral-50 gap-4 h-screen">
      <Sidebar />
      <MultiLayout />
      <div>
        <pre>{
        JSON.stringify(posts)
      }
        </pre>
      </div>
    </div>
  );
}
