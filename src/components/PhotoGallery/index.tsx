import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";

import { cn } from "../../libs/utils";
import { Button, type ButtonProps } from "../Button";

type PhotoGalleryVariant = "light" | "dark";

type VariantStyleConfig = {
  container: string;
  emptyState: {
    border: string;
    background: string;
    text: string;
  };
  mainImageWrapper: string;
  navButtonVariant: ButtonProps["variant"];
  captionContainer: string;
  captionTitle: string;
  captionDescription: string;
  captionAttribution: string;
  captionLink: string;
  gradientLeft: string;
  gradientRight: string;
  thumbnailActive: string;
  thumbnailInactive: string;
  overlayBackdrop: string;
  overlayContainer: string;
  overlayButtonVariant: ButtonProps["variant"];
  overlayCaptionBackground: string;
  overlayTitle: string;
  overlayDescription: string;
  overlayAttribution: string;
  overlayLink: string;
  overlayLinkDecoration: string;
};

const VARIANT_STYLES: Record<PhotoGalleryVariant, VariantStyleConfig> = {
  light: {
    container: "border-govbr-gray-20 bg-govbr-gray-2 text-govbr-gray-80",
    emptyState: {
      border: "border-govbr-gray-20",
      background: "bg-govbr-pure-0",
      text: "text-govbr-gray-50",
    },
    mainImageWrapper: "border-govbr-gray-20 bg-govbr-pure-0",
    navButtonVariant: "ghost",
    captionContainer: "border-govbr-gray-20 bg-govbr-pure-0/95",
    captionTitle: "text-govbr-blue-warm-vivid-70 text-sm",
    captionDescription: "text-govbr-gray-60 text-xs",
    captionAttribution: "text-govbr-blue-warm-vivid-70",
    captionLink: "text-govbr-blue-warm-vivid-70 hover:text-govbr-blue-warm-vivid-50 decoration-govbr-blue-warm-vivid-70 decoration-1",
    gradientLeft: "from-govbr-gray-2",
    gradientRight: "from-govbr-gray-2",
    thumbnailActive: "border-[3px] border-govbr-blue-warm-vivid-70 shadow-sm",
    thumbnailInactive: "border border-govbr-gray-20 hover:border-govbr-blue-warm-vivid-70/60",
    overlayBackdrop: "bg-govbr-gray-80/90",
    overlayContainer: "border border-govbr-gray-20 bg-govbr-pure-0 text-govbr-gray-80",
    overlayButtonVariant: "default",
    overlayCaptionBackground: "bg-govbr-gray-10/60 text-govbr-gray-80",
    overlayTitle: "text-govbr-blue-warm-vivid-70 text-sm",
    overlayDescription: "text-govbr-gray-60 text-xs",
    overlayAttribution: "text-govbr-blue-warm-vivid-70 text-xs",
    overlayLink: "text-govbr-blue-warm-vivid-70 hover:text-govbr-blue-warm-vivid-50 decoration-1",
    overlayLinkDecoration: "decoration-govbr-blue-warm-vivid-70 decoration-1",
  },
  dark: {
    container: "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-95 text-govbr-pure-0",
    emptyState: {
      border: "border-govbr-blue-warm-20",
      background: "bg-govbr-blue-warm-vivid-90",
      text: "text-govbr-blue-warm-20",
    },
    mainImageWrapper: "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-90",
    navButtonVariant: "ghost-dark",
    captionContainer: "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-90/95",
    captionTitle: "text-govbr-pure-0 text-sm",
    captionDescription: "text-govbr-blue-warm-20 text-xs",
    captionAttribution: "text-govbr-blue-warm-10",
    captionLink: "text-govbr-blue-warm-10 hover:text-govbr-pure-0 decoration-govbr-blue-warm-10 decoration-1",
    gradientLeft: "from-govbr-blue-warm-vivid-95",
    gradientRight: "from-govbr-blue-warm-vivid-95",
    thumbnailActive: "border-[3px] border-govbr-blue-warm-10 shadow-sm",
    thumbnailInactive: "border border-govbr-blue-warm-40 hover:border-govbr-blue-warm-10/70",
    overlayBackdrop: "bg-govbr-gray-90/95",
    overlayContainer: "border border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-95/95 text-govbr-pure-0",
    overlayButtonVariant: "ghost-dark",
    overlayCaptionBackground: "bg-govbr-blue-warm-vivid-90 text-govbr-pure-0",
    overlayTitle: "text-govbr-pure-0",
    overlayDescription: "text-govbr-blue-warm-10",
    overlayAttribution: "text-govbr-blue-warm-20",
    overlayLink: "text-govbr-blue-warm-20 hover:text-govbr-pure-0 decoration-1",
    overlayLinkDecoration: "decoration-govbr-blue-warm-20 decoration-1",
  },
};

type FieldSelector<TItem> = keyof TItem extends string
  ? keyof TItem | string | ((item: TItem) => unknown)
  : string | ((item: TItem) => unknown);

export type PhotoGalleryFieldMap<TItem> = {
  /**
   * Path or getter that resolves to the full sized image URL.
   */
  image?: FieldSelector<TItem>;
  /**
   * Path or getter for the thumbnail image URL. Falls back to the `image` value.
   */
  thumbnail?: FieldSelector<TItem>;
  /**
   * Path or getter for the image title.
   */
  title?: FieldSelector<TItem>;
  /**
   * Path or getter for the image description.
   */
  description?: FieldSelector<TItem>;
  /**
   * Path or getter for the attribution label (e.g. source name).
   */
  attributionLabel?: FieldSelector<TItem>;
  /**
   * Path or getter for the attribution URL.
   */
  attributionUrl?: FieldSelector<TItem>;
  /**
   * Path or getter that indicates the media type ("image" | "video").
   */
  mediaType?: FieldSelector<TItem>;
  /**
   * Path or getter for the video URL (e.g., YouTube).
   */
  videoUrl?: FieldSelector<TItem>;
  /**
   * Path or getter for the video identifier (e.g., YouTube video ID).
   */
  videoId?: FieldSelector<TItem>;
  /**
   * Path or getter for the video provider (e.g., "youtube").
   */
  videoProvider?: FieldSelector<TItem>;
};

export interface PhotoGalleryProps<TItem = Record<string, unknown>>
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * The raw list of media objects to be rendered.
   */
  items: TItem[];
  /**
   * Mapping used to resolve the relevant fields inside each item.
   */
  fieldMap?: Partial<PhotoGalleryFieldMap<TItem>>;
  /**
   * Accessible label for the gallery main region.
   */
  ariaLabel?: string;
  /**
   * Message displayed when there are no media items.
   */
  emptyStateLabel?: string;
  /**
   * Visual variant of the gallery.
   */
  variant?: PhotoGalleryVariant;
  /**
   * Maximum number of characters shown in the main caption area before truncation.
   */
  captionMaxLength?: number;
  /**
   * Determines how the image is rendered inside the fullscreen lightbox.
   */
  fullscreenFit?: "contain" | "cover";
  /**
   * Custom labels for internationalization.
   */
  labels?: Partial<PhotoGalleryLabels>;
}

type NormalizedVideoInfo = {
  provider: "youtube";
  videoId: string;
  url: string;
  embedUrl: string;
  embedAutoplayUrl: string;
};

type NormalizedGalleryItem = {
  mediaType: "image" | "video";
  image?: string;
  thumbnail: string;
  title?: string;
  description?: string;
  attributionLabel?: string;
  attributionUrl?: string;
  video?: NormalizedVideoInfo;
};

const DEFAULT_FIELD_MAP: PhotoGalleryFieldMap<Record<string, unknown>> = {
  image: "imageUrl",
  thumbnail: "thumbnailUrl",
  title: "title",
  description: "description",
  attributionLabel: "attributionLabel",
  attributionUrl: "attributionUrl",
  mediaType: "mediaType",
  videoUrl: "videoUrl",
  videoId: "videoId",
  videoProvider: "videoProvider",
};

export type PhotoGalleryLabels = {
  galleryLabel: string;
  emptyState: string;
  previousImageButton: string;
  nextImageButton: string;
  scrollThumbnailsLeft: string;
  scrollThumbnailsRight: string;
  creditPrefix: string;
  closeLightbox: string;
  openLightbox: string;
  selectedImageAlt: string;
  fullscreenImageAlt: string;
  thumbnailAlt: string;
  thumbnailButton: string;
  openVideoLightbox: string;
  videoPreviewAlt: string;
  videoIframeTitle: string;
};

const DEFAULT_LABELS: PhotoGalleryLabels = {
  galleryLabel: "Galeria de fotos",
  emptyState: "Nenhuma imagem disponivel.",
  previousImageButton: "Imagem anterior",
  nextImageButton: "Proxima imagem",
  scrollThumbnailsLeft: "Deslocar miniaturas para a esquerda",
  scrollThumbnailsRight: "Deslocar miniaturas para a direita",
  creditPrefix: "Credito:",
  closeLightbox: "Fechar visualizacao em tela cheia",
  openLightbox: "Ver imagem em tela cheia",
  selectedImageAlt: "Imagem selecionada da galeria {{title}}",
  fullscreenImageAlt: "Imagem em tela cheia {{title}}",
  thumbnailAlt: "Miniatura {{index}} {{title}}",
  thumbnailButton: "Selecionar imagem {{index}} {{title}}",
  openVideoLightbox: "Assistir video {{title}} em tela cheia",
  videoPreviewAlt: "Miniatura do video {{title}}",
  videoIframeTitle: "Player do video {{title}}",
};

const formatLabel = (template: string, replacements: Record<string, string | number>): string => {
  return template
    .replace(/\{\{(\w+)\}\}/g, (_, key) => {
      const value = replacements[key];
      if (value === undefined || value === null) {
        return "";
      }
      return String(value);
    })
    .replace(/\s{2,}/g, " ")
    .trim();
};

const truncateText = (value: string | undefined, maxLength: number): string | undefined => {
  if (!value) {
    return undefined;
  }
  if (!Number.isFinite(maxLength) || maxLength <= 0) {
    return "...";
  }
  if (value.length <= maxLength) {
    return value;
  }
  if (maxLength <= 3) {
    return "...".slice(0, maxLength);
  }
  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
};

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

const extractYouTubeId = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  if (YOUTUBE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  const url = new URL(trimmed, "https://youtube.com");
  const directId = url.searchParams.get("v");
  if (directId && YOUTUBE_ID_REGEX.test(directId)) {
    return directId;
  }

  const path = url.pathname;
  const embedMatch = path.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  const shortMatch = path.match(/\/([a-zA-Z0-9_-]{11})$/);
  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  return undefined;
};

const splitPath = (path: string) =>
  path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

const resolvePathValue = (item: unknown, path: string): unknown => {
  if (!path) {
    return undefined;
  }

  return splitPath(path).reduce<unknown>((acc, key) => {
    if (acc == null) {
      return undefined;
    }

    if (typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }

    if (Array.isArray(acc)) {
      const index = Number.parseInt(key, 10);
      return Number.isNaN(index) ? undefined : acc[index];
    }

    return undefined;
  }, item);
};

const resolveFieldValue = <TItem,>(
  item: TItem,
  selector: FieldSelector<TItem> | undefined,
): unknown => {
  if (!selector) {
    return undefined;
  }

  if (typeof selector === "function") {
    return selector(item);
  }

  if (typeof selector === "string") {
    return resolvePathValue(item, selector);
  }

  return undefined;
};

export function PhotoGallery<TItem = Record<string, unknown>>({
  items,
  fieldMap,
  className,
  ariaLabel,
  emptyStateLabel,
  variant = "light",
  captionMaxLength = 140,
  fullscreenFit = "contain",
  labels: labelsProp,
  ...rest
}: PhotoGalleryProps<TItem>) {
  const styles = VARIANT_STYLES[variant];
  const resolvedLabels = useMemo(
    () => ({
      ...DEFAULT_LABELS,
      ...labelsProp,
    }),
    [labelsProp],
  );

  const resolvedAriaLabel = ariaLabel ?? resolvedLabels.galleryLabel;
  const resolvedEmptyState = emptyStateLabel ?? resolvedLabels.emptyState;
  const resolvedCaptionLength = Math.max(1, Math.floor(captionMaxLength));
  const overlayImageClass =
    fullscreenFit === "cover"
      ? "h-full w-full object-cover"
      : "h-auto max-h-full w-auto max-w-full object-contain";
  const mountedRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const map = useMemo(
    () =>
      ({
        ...DEFAULT_FIELD_MAP,
        ...fieldMap,
      }) as PhotoGalleryFieldMap<TItem>,
    [fieldMap],
  );

  const normalizedItems = useMemo<NormalizedGalleryItem[]>(() => {
    return items.reduce<NormalizedGalleryItem[]>((acc, item) => {
      const mediaTypeValue = resolveFieldValue(item, map.mediaType);
      const mediaType =
        mediaTypeValue === "video" || mediaTypeValue === "Video" ? "video" : "image";

      const imageValue = resolveFieldValue(item, map.image);
      const thumbnailValue = resolveFieldValue(item, map.thumbnail);
      const titleValue = resolveFieldValue(item, map.title);
      const descriptionValue = resolveFieldValue(item, map.description);
      const attributionLabelValue = resolveFieldValue(item, map.attributionLabel);
      const attributionUrlValue = resolveFieldValue(item, map.attributionUrl);

      const baseTitle = typeof titleValue === "string" ? titleValue : undefined;
      const baseDescription =
        typeof descriptionValue === "string" ? descriptionValue : undefined;
      const baseAttributionLabel =
        typeof attributionLabelValue === "string" ? attributionLabelValue : undefined;
      const baseAttributionUrl =
        typeof attributionUrlValue === "string" ? attributionUrlValue : undefined;

      if (mediaType === "video") {
        const providerValue = resolveFieldValue(item, map.videoProvider);
        const provider =
          typeof providerValue === "string" ? providerValue.toLowerCase().trim() : "youtube";
        if (provider !== "youtube") {
          return acc;
        }

        const videoUrlValue = resolveFieldValue(item, map.videoUrl);
        const videoIdValue = resolveFieldValue(item, map.videoId);

        const resolvedVideoUrl =
          typeof videoUrlValue === "string" ? videoUrlValue.trim() : undefined;
        const videoIdFromField =
          typeof videoIdValue === "string" && videoIdValue.trim().length > 0
            ? videoIdValue.trim()
            : undefined;
        const videoId = videoIdFromField ?? extractYouTubeId(resolvedVideoUrl);
        if (!videoId) {
          return acc;
        }

        const thumbnailCandidate =
          typeof thumbnailValue === "string" && thumbnailValue.trim().length > 0
            ? thumbnailValue.trim()
            : undefined;

        const imageCandidate =
          typeof imageValue === "string" && imageValue.trim().length > 0
            ? imageValue.trim()
            : undefined;

        const thumbnail =
          thumbnailCandidate ??
          imageCandidate ??
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const image = imageCandidate ?? thumbnail;
        if (!thumbnail) {
          return acc;
        }

        const embedBase = `https://www.youtube.com/embed/${videoId}`;
        const embedUrl = `${embedBase}?rel=0`;
        const embedAutoplayUrl = `${embedBase}?autoplay=1&rel=0`;

        acc.push({
          mediaType: "video",
          image,
          thumbnail,
          title: baseTitle,
          description: baseDescription,
          attributionLabel: baseAttributionLabel,
          attributionUrl: baseAttributionUrl,
          video: {
            provider: "youtube",
            videoId,
            url: resolvedVideoUrl ?? `https://www.youtube.com/watch?v=${videoId}`,
            embedUrl,
            embedAutoplayUrl,
          },
        });
        return acc;
      }

      const resolvedImage =
        typeof imageValue === "string" && imageValue.trim().length > 0
          ? imageValue.trim()
          : undefined;

      if (!resolvedImage) {
        return acc;
      }

      const thumbnail =
        typeof thumbnailValue === "string" && thumbnailValue.trim().length > 0
          ? thumbnailValue.trim()
          : resolvedImage;

      acc.push({
        mediaType: "image",
        image: resolvedImage,
        thumbnail,
        title: baseTitle,
        description: baseDescription,
        attributionLabel: baseAttributionLabel,
        attributionUrl: baseAttributionUrl,
      });
      return acc;
    }, []);
  }, [items, map]);

  useEffect(() => {
    if (currentIndex >= normalizedItems.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, normalizedItems.length]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const activeItem = normalizedItems[currentIndex];
  const hasImages = normalizedItems.length > 0;
  const truncatedDescription =
    activeItem?.description != null
      ? truncateText(activeItem.description, resolvedCaptionLength)
      : undefined;
  const mainImageAlt =
    activeItem?.mediaType === "image"
      ? formatLabel(resolvedLabels.selectedImageAlt, { title: activeItem.title ?? "" })
      : undefined;
  const videoPreviewAlt =
    activeItem?.mediaType === "video"
      ? formatLabel(resolvedLabels.videoPreviewAlt, { title: activeItem.title ?? "" })
      : undefined;
  const fullscreenImageAlt =
    activeItem?.mediaType === "image"
      ? formatLabel(resolvedLabels.fullscreenImageAlt, { title: activeItem.title ?? "" })
      : undefined;
  const videoIframeTitle =
    activeItem?.mediaType === "video"
      ? formatLabel(resolvedLabels.videoIframeTitle, {
          title: activeItem.title ?? activeItem.video?.videoId ?? "",
        })
      : undefined;
  const openLightboxLabel =
    activeItem?.mediaType === "video"
      ? formatLabel(resolvedLabels.openVideoLightbox, { title: activeItem.title ?? "" })
      : formatLabel(resolvedLabels.openLightbox, { title: activeItem?.title ?? "" });

  const goToIndex = useCallback(
    (index: number) => {
      if (!hasImages) {
        return;
      }
      const nextIndex = (index + normalizedItems.length) % normalizedItems.length;
      setCurrentIndex(nextIndex);
    },
    [hasImages, normalizedItems.length],
  );

  const goNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goPrevious = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const scrollThumbnails = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    const amount = direction === "left" ? -240 : 240;
    container.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
      } else if (event.key === "ArrowRight") {
        goNext();
      } else if (event.key === "ArrowLeft") {
        goPrevious();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, goNext, goPrevious, isLightboxOpen]);

const lightbox =
  isLightboxOpen && activeItem && mountedRef.current && typeof document !== "undefined"
    ? createPortal(
        <div
          className={cn(
            "fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm px-4 py-8",
            styles.overlayBackdrop,
          )}
        >
          <div
              className={cn(
                "relative flex h-full w-full max-w-5xl min-h-0 flex-col items-stretch justify-center rounded-lg shadow-2xl",
                styles.overlayContainer,
              )}
            >
              <div className="absolute right-4 top-4">
                <Button
                  size="icon"
                  variant={styles.overlayButtonVariant}
                  aria-label={resolvedLabels.closeLightbox}
                  onClick={closeLightbox}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              </div>
              <div className="flex h-full w-full min-h-0 flex-1 items-center justify-center p-4 sm:p-6">
                {activeItem.mediaType === "video" && activeItem.video ? (
                  <div className="aspect-video w-full max-w-4xl overflow-hidden rounded-md bg-black">
                    <iframe
                      key={activeItem.video.videoId}
                      src={activeItem.video.embedAutoplayUrl}
                      title={videoIframeTitle ?? activeItem.video.videoId}
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                ) : (
                  <img
                    src={activeItem.image ?? activeItem.thumbnail}
                    alt={fullscreenImageAlt}
                    className={cn("max-h-[65vh] max-w-full rounded-md", overlayImageClass)}
                  />
                )}
              </div>
              <div className="relative w-full min-h-0">
                <div
                  className={cn(
                    "w-full max-h-[35vh] overflow-y-auto px-4 py-5 sm:px-6",
                    styles.overlayCaptionBackground,
                  )}
                >
                  {activeItem.title ? (
                    <h3 className={cn("text-lg font-semibold", styles.overlayTitle)}>
                      {activeItem.title}
                    </h3>
                  ) : null}
                  {activeItem.description ? (
                    <p className={cn("mt-2 text-sm", styles.overlayDescription)}>
                      {activeItem.description}
                    </p>
                  ) : null}
                  {activeItem.attributionLabel ? (
                    <p className={cn("mt-3 text-sm", styles.overlayAttribution)}>
                      {resolvedLabels.creditPrefix}{" "}
                      {activeItem.attributionUrl ? (
                        <a
                          href={activeItem.attributionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "underline decoration-2 underline-offset-4",
                            styles.overlayLinkDecoration,
                            styles.overlayLink,
                          )}
                        >
                          {activeItem.attributionLabel}
                        </a>
                      ) : (
                        activeItem.attributionLabel
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        className={cn(
          "flex w-full flex-col gap-4 rounded-lg border p-4 sm:gap-6 sm:p-6",
          styles.container,
          className,
        )}
        aria-label={resolvedAriaLabel}
        {...rest}
      >
        {!hasImages ? (
          <div
            className={cn(
              "flex h-48 items-center justify-center rounded-md border border-dashed",
              styles.emptyState.border,
              styles.emptyState.background,
            )}
          >
            <p className={cn("text-sm text-center", styles.emptyState.text)}>{resolvedEmptyState}</p>
          </div>
        ) : (
          <>
            <div className={cn("relative overflow-hidden rounded-lg border", styles.mainImageWrapper)}>
              <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
                <Button
                  size="icon"
                  variant={styles.navButtonVariant}
                  onClick={goPrevious}
                  aria-label={resolvedLabels.previousImageButton}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                <Button
                  size="icon"
                  variant={styles.navButtonVariant}
                  onClick={goNext}
                  aria-label={resolvedLabels.nextImageButton}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>

              <div className="flex w-full flex-col">
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-lg border",
                    styles.mainImageWrapper,
                    activeItem.mediaType === "video" ? "aspect-video" : undefined,
                  )}
                >
                  {activeItem.mediaType === "video" ? (
                    <img
                      src={activeItem.image ?? activeItem.thumbnail}
                      alt={videoPreviewAlt ?? ""}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  ) : (
                    <img
                      src={activeItem.image ?? activeItem.thumbnail}
                      alt={mainImageAlt}
                      className="max-h-[55vh] w-full object-cover transition-transform duration-300 group-hover:scale-[1.01] sm:max-h-[480px]"
                    />
                  )}
                  <button
                    type="button"
                    className={cn(
                      "absolute inset-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-govbr-blue-warm-vivid-50",
                      activeItem.mediaType === "video" ? "cursor-pointer" : "cursor-zoom-in",
                    )}
                    onClick={() => setIsLightboxOpen(true)}
                    aria-label={openLightboxLabel}
                  >
                    <span className="sr-only">{openLightboxLabel}</span>
                  </button>
                  {activeItem.mediaType === "video" ? (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                        <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                      </div>
                    </div>
                  ) : null}
                </div>
                <div
                  className={cn(
                    "w-full border-t px-4 py-4 text-left sm:px-6 sm:py-4",
                    styles.captionContainer,
                  )}
                >
                  {activeItem.title ? (
                    <h3 className={cn("text-base font-semibold", styles.captionTitle)}>
                      {activeItem.title}
                    </h3>
                  ) : null}
                  {truncatedDescription ? (
                    <p className={cn("mt-1 text-sm", styles.captionDescription)}>
                      {truncatedDescription}
                    </p>
                  ) : null}
                  {activeItem.attributionLabel ? (
                    <p className={cn("mt-2 text-xs", styles.captionAttribution)}>
                      {resolvedLabels.creditPrefix}{" "}
                      {activeItem.attributionUrl ? (
                        <a
                          href={activeItem.attributionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={cn(
                            "underline decoration-2 underline-offset-4",
                            styles.captionLink,
                          )}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {activeItem.attributionLabel}
                        </a>
                      ) : (
                        activeItem.attributionLabel
                      )}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className={cn(
                  "pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r to-transparent",
                  styles.gradientLeft,
                )}
              />
              <div
                className={cn(
                  "pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l to-transparent",
                  styles.gradientRight,
                )}
              />

              <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
                <Button
                  size="icon"
                  variant={styles.navButtonVariant}
                  onClick={() => scrollThumbnails("left")}
                  aria-label={resolvedLabels.scrollThumbnailsLeft}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
              </div>
              <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2">
                <Button
                  size="icon"
                  variant={styles.navButtonVariant}
                  onClick={() => scrollThumbnails("right")}
                  aria-label={resolvedLabels.scrollThumbnailsRight}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex gap-3 overflow-x-auto px-8 py-2 sm:px-14"
              >
                {normalizedItems.map((item, index) => {
                  const isActive = index === currentIndex;
                  const displayIndex = index + 1;
                  const thumbnailLabel = formatLabel(resolvedLabels.thumbnailButton, {
                    index: displayIndex,
                    title: item.title ?? "",
                  });
                  const thumbnailAltBase =
                    item.mediaType === "video"
                      ? formatLabel(resolvedLabels.videoPreviewAlt, {
                          index: displayIndex,
                          title: item.title ?? "",
                        })
                      : formatLabel(resolvedLabels.thumbnailAlt, {
                          index: displayIndex,
                          title: item.title ?? "",
                        });
                  const fallbackThumbnailAlt =
                    thumbnailAltBase || item.title || `Miniatura ${displayIndex}`;
                  return (
                    <button
                      key={`${item.thumbnail}-${index}`}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={cn(
                        "relative flex h-20 w-24 flex-shrink-0 overflow-hidden rounded-md border transition-all duration-200 sm:w-32",
                        isActive ? styles.thumbnailActive : styles.thumbnailInactive,
                      )}
                      aria-label={thumbnailLabel || `Selecionar imagem ${displayIndex}`}
                    >
                      <img
                        src={item.thumbnail}
                        alt={fallbackThumbnailAlt}
                        className="h-full w-full object-cover"
                      />
                      {item.mediaType === "video" ? (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white shadow-md">
                            <FontAwesomeIcon icon={faPlay} className="text-lg" />
                          </div>
                        </div>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
      {lightbox}
    </>
  );
}

export default PhotoGallery;
