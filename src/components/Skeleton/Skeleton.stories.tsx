import React from "react";
import Skeleton from "."; // ajuste o caminho conforme sua estrutura

export default {
  component: Skeleton,
  title: "Skeleton",
};

export const Default = () => (
  <div className="flex flex-col gap-4 w-[720px]">
    <Skeleton className="h-4 w-48" />
  </div>
);

export const Avatar = () => (
  <div className="flex items-center gap-4 w-[720px]">
    <Skeleton radius="full" className="h-12 w-12" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/5" />
    </div>
  </div>
);

export const Card = () => (
  <div className="w-[720px] rounded border p-4 space-y-4">
    <Skeleton className="h-40 w-full rounded-md" />
    <div className="space-y-2">
      <Skeleton className="h-5 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const Dark = () => (
  <div className="w-[720px] rounded bg-govbr-blue-warm-vivid-90 p-6 space-y-4">
    <Skeleton theme="dark" className="h-4 w-48" />
    <div className="flex items-center gap-4">
      <Skeleton theme="dark" radius="full" className="h-10 w-10" />
      <div className="flex-1 space-y-2">
        <Skeleton theme="dark" className="h-4 w-1/2" />
        <Skeleton theme="dark" className="h-4 w-1/3" />
      </div>
    </div>
  </div>
);

export const RadiusAndSizes = () => (
  <div className="grid w-[720px] grid-cols-2 gap-4">
    <Skeleton radius="none" className="h-4 w-full" />
    <Skeleton radius="sm" className="h-4 w-full" />
    <Skeleton radius="md" className="h-4 w-full" />
    <Skeleton radius="lg" className="h-4 w-full" />
    <Skeleton radius="full" className="h-10 w-10" />
    <Skeleton radius="full" className="h-16 w-16" />
  </div>
);

export const WithoutAnimation = () => (
  <div className="flex flex-col gap-3 w-[720px]">
    <Skeleton animate={false} className="h-4 w-60" />
    <Skeleton animate={false} className="h-4 w-40" />
    <Skeleton animate={false} className="h-4 w-32" />
  </div>
);

export const ComplexLayout = () => (
  <div className="w-[720px] grid grid-cols-3 gap-4">
    {/* Sidebar */}
    <div className="col-span-1 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    {/* Content */}
    <div className="col-span-2 space-y-4">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-11/12" />
      <Skeleton className="h-64 w-full rounded-md" />
    </div>
  </div>
);

export const CustomTone = () => (
  <div className="flex flex-col gap-4 w-[720px]">
    {/* Troca apenas a cor/base que pulsa */}
    <Skeleton toneClassName="bg-emerald-200" className="h-4 w-48" />

    {/* Tema dark com cor custom */}
    <div className="rounded bg-govbr-blue-warm-vivid-90 p-4">
      <Skeleton theme="dark" toneClassName="bg-white/20" className="h-4 w-48" />
    </div>

    {/* Animação custom (desativa a padrão e aplica outra) */}
    <Skeleton
      animate={false}
      animateClassName="animate-pulse"
      toneClassName="bg-pink-200"
      className="h-4 w-56"
    />
  </div>
);
