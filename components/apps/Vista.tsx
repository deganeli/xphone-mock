"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CommentIcon, HeartIcon, HeartOutlineIcon, SendIcon } from "../icons";
import { directThreads, formatCount, posts, stories, type Post } from "@/lib/vista";
import { Comments } from "./vista/Comments";
import { Direct } from "./vista/Direct";
import { Profile } from "./vista/Profile";
import { StoryViewer } from "./vista/StoryViewer";
import styles from "./Vista.module.css";

const DOUBLE_TAP_MS = 280;
const BURST_MS = 700;
const pop = { type: "spring", stiffness: 600, damping: 18 } as const;

type Story = (typeof stories)[number];

function PostCard({
  post,
  onOpenProfile,
  onOpenComments,
}: {
  post: Post;
  onOpenProfile: (handle: string) => void;
  onOpenComments: (post: Post) => void;
}) {
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);
  const lastTap = useRef(0);

  useEffect(() => {
    if (!burst) return;
    const timer = window.setTimeout(() => setBurst(false), BURST_MS);
    return () => window.clearTimeout(timer);
  }, [burst]);

  const likeFromTap = () => {
    const now = Date.now();
    if (now - lastTap.current < DOUBLE_TAP_MS) {
      setLiked(true);
      setBurst(true);
    }
    lastTap.current = now;
  };

  return (
    <article className={styles.post}>
      <header className={styles.postHead}>
        <button className={styles.postAuthor} onClick={() => onOpenProfile(post.handle)}>
          <span className={styles.avatarRing} style={{ background: post.tint }}>
            <span className={styles.avatar}>{post.author.slice(0, 1)}</span>
          </span>
          <span className={styles.identity}>
            <span className={styles.handle}>{post.handle}</span>
            <span className={styles.place}>{post.place}</span>
          </span>
        </button>
        <span className={styles.postedAt}>{post.postedAt}</span>
      </header>

      <div
        className={styles.media}
        style={{
          background: `linear-gradient(160deg, ${post.gradient[0]}, ${post.gradient[1]} 52%, ${post.gradient[2]})`,
        }}
        onPointerDown={likeFromTap}
        role="presentation"
      >
        <AnimatePresence>
          {burst ? (
            <motion.span
              className={styles.burst}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={pop}
            >
              <HeartIcon size={92} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.action} ${liked ? styles.liked : ""}`}
          onClick={() => setLiked((prev) => !prev)}
          aria-pressed={liked}
          aria-label={liked ? "Remover curtida" : "Curtir"}
        >
          <motion.span animate={{ scale: liked ? [1, 1.28, 1] : 1 }} transition={{ duration: 0.32 }}>
            {liked ? <HeartIcon /> : <HeartOutlineIcon />}
          </motion.span>
        </button>
        <button className={styles.action} onClick={() => onOpenComments(post)} aria-label="Comentar">
          <CommentIcon />
        </button>
        <button className={styles.action} aria-label="Enviar">
          <SendIcon size={22} />
        </button>
      </div>

      <p className={styles.likes}>{formatCount(post.likes + (liked ? 1 : 0))} curtidas</p>
      <p className={styles.caption}>
        <strong className={styles.captionHandle}>{post.handle}</strong> {post.caption}
      </p>
      <button className={styles.commentsLink} onClick={() => onOpenComments(post)}>
        Ver {formatCount(post.comments)} comentários
      </button>
    </article>
  );
}

export function Vista() {
  const [profileHandle, setProfileHandle] = useState<string | null>(null);
  const [directHandle, setDirectHandle] = useState<string | null>(null);
  const [directOpen, setDirectOpen] = useState(false);
  const [commentsFor, setCommentsFor] = useState<Post | null>(null);
  const [story, setStory] = useState<Story | null>(null);

  const unread = directThreads.filter((thread) => thread.unread).length;

  const openDirect = (handle: string | null) => {
    setDirectHandle(handle);
    setDirectOpen(true);
  };

  return (
    <div className={styles.stage}>
      <div className={styles.scroll}>
        <header className={styles.head}>
          <h1 className={styles.title}>Vista</h1>
          <button className={styles.directButton} onClick={() => openDirect(null)} aria-label="Abrir direct">
            <SendIcon size={20} />
            {unread > 0 ? <span className={styles.directBadge}>{unread}</span> : null}
          </button>
        </header>

        <div className={styles.stories}>
          {stories.map((item) => (
            <button
              key={item.id}
              className={styles.story}
              onClick={() => (item.own ? undefined : setStory(item))}
              disabled={item.own}
            >
              <span
                className={`${styles.storyRing} ${item.own ? styles.storyOwn : ""}`}
                style={item.own ? undefined : { background: `linear-gradient(150deg, ${item.tint}, var(--flame))` }}
              >
                <span className={styles.storyAvatar} style={{ background: item.tint }}>
                  {item.own ? "+" : item.label.slice(0, 1)}
                </span>
              </span>
              <span className={styles.storyLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        {posts.map((post) => (
          <PostCard key={post.id} post={post} onOpenProfile={setProfileHandle} onOpenComments={setCommentsFor} />
        ))}

        <p className={styles.end}>Você viu tudo do dia</p>
      </div>

      <AnimatePresence>
        {profileHandle ? (
          <Profile
            key={profileHandle}
            handle={profileHandle}
            onBack={() => setProfileHandle(null)}
            onMessage={() => openDirect(profileHandle)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {directOpen ? <Direct initialHandle={directHandle} onBack={() => setDirectOpen(false)} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {commentsFor ? <Comments post={commentsFor} onClose={() => setCommentsFor(null)} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {story ? (
          <StoryViewer
            key={story.id}
            storyId={story.id}
            label={story.label}
            tint={story.tint}
            onClose={() => setStory(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
