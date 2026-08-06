"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CommentIcon, HeartIcon, HeartOutlineIcon, SendIcon, SettingsIcon } from "../icons";
import { Activity } from "./vista/Activity";
import { MyProfile } from "./vista/MyProfile";
import { MyProfileView } from "./vista/MyProfileView";
import { activity, directThreads, formatCount, me as seedMe, posts, stories, type MyVista, type Post } from "@/lib/vista";
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
  const [activityOpen, setActivityOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mineOpen, setMineOpen] = useState(false);
  const [account, setAccount] = useState<MyVista>(seedMe);

  const unread = directThreads.filter((thread) => thread.unread).length;
  const fresh = activity.filter((item) => item.bucket === "hoje").length;

  const openDirect = (handle: string | null) => {
    setDirectHandle(handle);
    setDirectOpen(true);
  };

  return (
    <div className={styles.stage}>
      <div className={styles.scroll}>
        <header className={styles.head}>
          <h1 className={styles.title}>Vista</h1>
          <div className={styles.menuWrap}>
            <button
              className={styles.menuButton}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-label="Opções do perfil"
            >
              <SettingsIcon size={20} />
            </button>

            <AnimatePresence>
              {menuOpen ? (
                <>
                  <button className={styles.menuScrim} onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />
                  <motion.div
                    className={styles.menu}
                    initial={{ opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <button
                      className={styles.menuItem}
                      onClick={() => {
                        setMenuOpen(false);
                        setMineOpen(true);
                      }}
                    >
                      Ver perfil
                    </button>
                    <button
                      className={styles.menuItem}
                      onClick={() => {
                        setMenuOpen(false);
                        setEditorOpen(true);
                      }}
                    >
                      Editar perfil
                    </button>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>
          </div>
          <button
            className={styles.directButton}
            onClick={() => setActivityOpen(true)}
            aria-label="Abrir atividade"
          >
            <HeartOutlineIcon size={23} />
            {fresh > 0 ? <span className={styles.directBadge}>{fresh}</span> : null}
          </button>
          <button className={styles.directButton} onClick={() => openDirect(null)} aria-label="Abrir direct">
            <SendIcon size={23} />
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
        {mineOpen ? (
          <MyProfileView
            profile={account}
            onEdit={() => setEditorOpen(true)}
            onBack={() => setMineOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {editorOpen ? (
          <MyProfile
            profile={account}
            onSave={(next) => {
              setAccount(next);
              setEditorOpen(false);
            }}
            onBack={() => setEditorOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activityOpen ? (
          <Activity
            onBack={() => setActivityOpen(false)}
            onOpenProfile={(handle) => {
              setActivityOpen(false);
              setProfileHandle(handle);
            }}
          />
        ) : null}
      </AnimatePresence>

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
