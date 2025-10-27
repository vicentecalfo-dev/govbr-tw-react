import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { PhotoGallery, type PhotoGalleryFieldMap } from ".";

const TAXON_ENDPOINT = "https://api.inaturalist.org/v1/taxa/874491";
const PHOTO_PAGE_BASE_URL = "https://www.inaturalist.org/photos/";
const MAX_ITEMS = 8;

type InaturalistPhoto = {
  id: number;
  square_url?: string;
  small_url?: string;
  medium_url?: string;
  large_url?: string;
  original_url?: string;
  url?: string;
  attribution?: string;
  attribution_name?: string;
  license_code?: string;
};

type InaturalistTaxonPhoto = {
  taxon_id: number;
  photo: InaturalistPhoto;
};

type EnrichedTaxonPhoto = InaturalistTaxonPhoto & {
  displayIndex: number;
  taxonName: string;
  taxonScientific: string;
};

type InaturalistTaxon = {
  id: number;
  name: string;
  preferred_common_name?: string;
  wikipedia_summary?: string;
  taxon_photos?: InaturalistTaxonPhoto[];
};

type InaturalistResponse = {
  results?: InaturalistTaxon[];
};

type DefaultGalleryItem = {
  imageUrl: string;
  thumbnailUrl: string;
  title: string;
  description?: string;
  attributionLabel?: string;
  attributionUrl?: string;
};

type GalleryData = {
  defaultItems: DefaultGalleryItem[];
  rawItems: EnrichedTaxonPhoto[];
};

let cachedGalleryData: GalleryData | null = null;

const extractYoutubeId = (value: string): string | undefined => {
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  const idMatch = trimmed.match(/([a-zA-Z0-9_-]{11})/);
  return idMatch?.[1];
};

type YouTubeVideoItem = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  thumbnailUrl: string;
  mediaType: "video";
  attributionLabel: string;
  attributionUrl: string;
};

const youtubeVideosSource: Array<{
  url: string;
  title: string;
  description: string;
  attribution?: string;
}> = [
  {
    url: "https://www.youtube.com/watch?v=5mXWxEMSdE4&list=PL01qlDRpvDXdFZ0qYwQPQ1Uew_qkULT8R",
    title: "Design System GovBR - Episodio 1",
    description: "Visao geral do design system GovBR e principais componentes.",
  },
  {
    url: "https://youtu.be/zvK3cxUIcOs?list=PL01qlDRpvDXdFZ0qYwQPQ1Uew_qkULT8R",
    title: "Design System GovBR - Episodio 2",
    description: "Demonstracao pratica de uso em interfaces responsivas.",
  },
  {
    url: "https://youtu.be/KTUZ-evtRwk?list=PL01qlDRpvDXdFZ0qYwQPQ1Uew_qkULT8R",
    title: "Design System GovBR - Episodio 3",
    description: "Componentes de formularios e padroes de acessibilidade.",
  },
  {
    url: "https://youtu.be/q2HnykK78g8",
    title: "GovBR - Ferramentas de Desenvolvimento",
    description: "Recursos digitais e integracoes com o ecossistema GovBR.",
  },
   {
    url: "https://youtu.be/v002H5fbSqE",
    title: "GovBR - Ferramentas de Desenvolvimento",
    description: "Recursos digitais e integracoes com o ecossistema GovBR.",
  },
];


const youtubeVideoItems: YouTubeVideoItem[] = youtubeVideosSource
  .map((video, index) => {
    const id = extractYoutubeId(video.url);
    if (!id) {
      return undefined;
    }
    const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    return {
      id,
      title: video.title || `Video ${index + 1}`,
      description: video.description || "",
      videoUrl: video.url,
      imageUrl: thumbnail,
      thumbnailUrl: thumbnail,
      mediaType: "video" as const,
      attributionLabel: video.attribution ?? "YouTube",
      attributionUrl: video.url,
    };
  })
  .filter((item): item is YouTubeVideoItem => Boolean(item));

const resolveImageUrl = (photo: InaturalistPhoto): string | undefined =>
  photo.large_url ?? photo.medium_url ?? photo.original_url ?? photo.url ?? undefined;

const resolveThumbnailUrl = (photo: InaturalistPhoto): string | undefined =>
  photo.square_url ?? photo.small_url ?? photo.medium_url ?? resolveImageUrl(photo);

const stripHtml = (input?: string): string | undefined => {
  if (!input) {
    return undefined;
  }
  return input.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || undefined;
};

const toDefaultGalleryItems = (taxon: InaturalistTaxon): DefaultGalleryItem[] => {
  const photos = taxon.taxon_photos ?? [];
  const displayName = taxon.preferred_common_name ?? taxon.name;
  const summary = stripHtml(taxon.wikipedia_summary);
  const baseDescription = summary ?? `Registro fotografico de ${displayName}`;

  return photos
    .slice(0, MAX_ITEMS)
    .map<DefaultGalleryItem | undefined>((entry, index) => {
      const image = resolveImageUrl(entry.photo);
      if (!image) {
        return undefined;
      }

      const thumbnail = resolveThumbnailUrl(entry.photo) ?? image;

      return {
        imageUrl: image,
        thumbnailUrl: thumbnail,
        title: `${displayName} (#${index + 1})`,
        description: baseDescription,
        attributionLabel:
          entry.photo.attribution ?? entry.photo.attribution_name ?? "iNaturalist",
        attributionUrl: `${PHOTO_PAGE_BASE_URL}${entry.photo.id}`,
      };
    })
    .filter((item): item is DefaultGalleryItem => Boolean(item));
};

const toRawGalleryItems = (taxon: InaturalistTaxon): EnrichedTaxonPhoto[] => {
  const photos = taxon.taxon_photos ?? [];
  const displayName = taxon.preferred_common_name ?? taxon.name;

  return photos
    .slice(0, MAX_ITEMS)
    .map<EnrichedTaxonPhoto | undefined>((entry, index) => {
      const image = resolveImageUrl(entry.photo);
      if (!image) {
        return undefined;
      }

      return {
        ...entry,
        displayIndex: index + 1,
        taxonName: displayName,
        taxonScientific: taxon.name,
      };
    })
    .filter((item): item is EnrichedTaxonPhoto => Boolean(item));
};

function useInaturalistGalleryData() {
  const [state, setState] = React.useState<{
    loading: boolean;
    error?: string;
    data?: GalleryData;
  }>({
    loading: !cachedGalleryData,
    data: cachedGalleryData ?? undefined,
  });

  React.useEffect(() => {
    if (cachedGalleryData) {
      setState({ loading: false, data: cachedGalleryData });
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(TAXON_ENDPOINT, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload: InaturalistResponse = await response.json();
        const taxon = payload.results?.[0];
        if (!taxon) {
          throw new Error("Sem dados de taxon");
        }

        const defaultItems = toDefaultGalleryItems(taxon);
        const rawItems = toRawGalleryItems(taxon);
        if (defaultItems.length === 0 || rawItems.length === 0) {
          throw new Error("Sem imagens disponiveis");
        }

        const data: GalleryData = {
          defaultItems,
          rawItems,
        };

        if (!cancelled) {
          cachedGalleryData = data;
          setState({ loading: false, data });
        }
      } catch (error) {
        if (cancelled) {
          return;
        }
        setState({
          loading: false,
          error: error instanceof Error ? error.message : "Falha ao carregar dados",
        });
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return {
    loading: state.loading,
    error: state.error,
    defaultItems: state.data?.defaultItems ?? [],
    rawItems: state.data?.rawItems ?? [],
  };
}

const inaturalistFieldMap: PhotoGalleryFieldMap<EnrichedTaxonPhoto> = {
  image: (item) => resolveImageUrl(item.photo) ?? "",
  thumbnail: (item) => resolveThumbnailUrl(item.photo) ?? resolveImageUrl(item.photo) ?? "",
  title: (item) => `${item.taxonName} (#${item.displayIndex})`,
  description: (item) => `Taxon: ${item.taxonScientific}`,
  attributionLabel: (item) =>
    item.photo.attribution ?? item.photo.attribution_name ?? item.taxonName,
  attributionUrl: (item) => `${PHOTO_PAGE_BASE_URL}${item.photo.id}`,
};

const youtubeFieldMap: PhotoGalleryFieldMap<YouTubeVideoItem> = {
  mediaType: "mediaType",
  videoUrl: "videoUrl",
  image: "imageUrl",
  thumbnail: "thumbnailUrl",
  title: "title",
  description: "description",
  attributionLabel: "attributionLabel",
  attributionUrl: "attributionUrl",
};

const meta: Meta<typeof PhotoGallery> = {
  title: "PhotoGallery",
  component: PhotoGallery,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    items: {
      control: false,
    },
    fieldMap: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhotoGallery>;

export const Default: Story = {
  args: {
    className: "max-w-4xl w-full",
    variant: "light",
    captionMaxLength: 100,
  },
  render: (args) => {
    const { loading, error, defaultItems } = useInaturalistGalleryData();

    if (loading) {
      return <div>Carregando dados do iNaturalist...</div>;
    }

    if (error || defaultItems.length === 0) {
      return <div>Erro ao carregar dados do iNaturalist.</div>;
    }

    return <PhotoGallery {...args} items={defaultItems} />;
  },
};

export const CustomFieldMap: Story = {
  args: {
    className: "max-w-4xl w-full",
    variant: "dark",
    captionMaxLength: 140,
  },
  render: (args) => {
    const { loading, error, rawItems } = useInaturalistGalleryData();

    if (loading) {
      return <div>Carregando dados do iNaturalist...</div>;
    }

    if (error || rawItems.length === 0) {
      return <div>Erro ao carregar dados do iNaturalist.</div>;
    }

    return (
      <PhotoGallery<EnrichedTaxonPhoto>
        {...args}
        fieldMap={inaturalistFieldMap}
        items={rawItems}
      />
    );
  },
};

export const FullscreenCover: Story = {
  args: {
    className: "max-w-4xl w-full",
    variant: "light",
    fullscreenFit: "cover",
    captionMaxLength: 80,
  },
  render: (args) => {
    const { loading, error, defaultItems } = useInaturalistGalleryData();

    if (loading) {
      return <div>Carregando dados do iNaturalist...</div>;
    }

    if (error || defaultItems.length === 0) {
      return <div>Erro ao carregar dados do iNaturalist.</div>;
    }

    return <PhotoGallery {...args} items={defaultItems} />;
  },
};

export const Videos: Story = {
  args: {
    className: "w-[600px]",
    variant: "light",
    captionMaxLength: 90,
  },
  render: (args) => {
    if (youtubeVideoItems.length === 0) {
      return <div>Nenhum video disponivel.</div>;
    }

    return (
      <PhotoGallery<YouTubeVideoItem>
        {...args}
        fieldMap={youtubeFieldMap}
        items={youtubeVideoItems}
      />
    );
  },
};

export const Internationalized: Story = {
  args: {
    className: "max-w-4xl w-full",
    variant: "light",
    captionMaxLength: 120,
    labels: {
      galleryLabel: "Photo gallery",
      emptyState: "No images available.",
      previousImageButton: "Previous image",
      nextImageButton: "Next image",
      scrollThumbnailsLeft: "Scroll thumbnails to the left",
      scrollThumbnailsRight: "Scroll thumbnails to the right",
      creditPrefix: "Credit:",
      closeLightbox: "Close fullscreen view",
      openLightbox: "View fullscreen image {{title}}",
      selectedImageAlt: "Selected gallery image {{title}}",
      fullscreenImageAlt: "Fullscreen image {{title}}",
      thumbnailAlt: "Thumbnail {{index}} {{title}}",
      thumbnailButton: "Select image {{index}} {{title}}",
    },
  },
  render: (args) => {
    const { loading, error, defaultItems } = useInaturalistGalleryData();

    if (loading) {
      return <div>Loading iNaturalist data...</div>;
    }

    if (error || defaultItems.length === 0) {
      return <div>Unable to load iNaturalist data.</div>;
    }

    return <PhotoGallery {...args} items={defaultItems} />;
  },
};
