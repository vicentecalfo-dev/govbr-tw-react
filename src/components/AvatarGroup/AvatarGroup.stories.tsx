import React from "react";

import { Avatar } from "../Avatar";
import { AvatarGroup } from ".";

export default {
  component: AvatarGroup,
  title: "AvatarGroup",
};

const people = [
  { name: "Ana Souza", imageId: 3 },
  { name: "Bruno Rocha", imageId: 5 },
  { name: "Carla Nunes", imageId: 7 },
  { name: "Daniel Lima", imageId: 8 },
  { name: "Eduarda Martins", imageId: 9 },
  { name: "Felipe Gomes", imageId: 10 },
  { name: "Gabriela Castro", imageId: 11 },
  { name: "Henrique Silva", imageId: 12 },
  { name: "Isabela Farias", imageId: 13 },
  { name: "Joao Ramos", imageId: 14 },
];

const renderAvatars = (
  count: number,
  size: "small" | "medium" | "large" = "small"
) =>
  people.slice(0, count).map((person, index) => {
    const usePhoto = true;
    return (
      <Avatar
        key={person.name}
        size={size}
        title={person.name}
        variant={usePhoto ? "image" : "initials"}
        src={
          usePhoto ? `https://i.pravatar.cc/150?img=${person.imageId}` : undefined
        }
      />
    );
  });

export const Default = () => (
  <div className="flex flex-col gap-6">
    <AvatarGroup spacing="space-x-3">{renderAvatars(4)}</AvatarGroup>
    <AvatarGroup spacing="space-x-6" size="medium">
      {renderAvatars(3, "medium")}
    </AvatarGroup>
  </div>
);

export const Stacked = () => (
  <div className="flex flex-col gap-6">
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
        spacing = -space-x-6 (sobreposicao forte)
      </p>
      <AvatarGroup spacing="-space-x-6">
        {renderAvatars(5)}
      </AvatarGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
        spacing = -space-x-2 (sobreposicao leve)
      </p>
      <AvatarGroup spacing="-space-x-2">
        {renderAvatars(5)}
      </AvatarGroup>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-govbr-gray-80">
        spacing = space-x-10 (sem sobreposicao)
      </p>
      <AvatarGroup spacing="space-x-10">
        {renderAvatars(6)}
      </AvatarGroup>
    </div>
  </div>
);

export const WithMaxVisible = () => (
  <div className="flex flex-col gap-6">
    <AvatarGroup spacing="space-x-3" maxVisible={4}>
      {renderAvatars(8)}
    </AvatarGroup>
    <AvatarGroup
      spacing="-space-x-3"
      maxVisible={5}
      renderOverflowAvatar={(extra, groupSize) => (
        <Avatar
          key="overflow"
          size={groupSize}
          variant="initials"
          className="bg-govbr-blue-warm-vivid-80 text-white"
          title={`+${extra} participantes`}
        >
          +{extra}
        </Avatar>
      )}
    >
      {renderAvatars(10)}
    </AvatarGroup>
  </div>
);
